import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Visitor } from './schemas/visitor.schema';
import * as geoip from 'geoip-lite';

@Injectable()
export class VisitorTrackingService {
  private readonly logger = new Logger(VisitorTrackingService.name);

  constructor(
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>,
  ) {}

  async trackVisitor(data: {
    ip: string;
    userAgent: string;
    page: string;
    referrer?: string;
    sessionId: string;
    userId?: string;
  }) {
    try {
      const deviceInfo = this.parseUserAgent(data.userAgent);
      const geoInfo = this.getGeoLocation(data.ip);

      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const existingVisitor = await this.visitorModel.findOne({
        sessionId: data.sessionId,
        lastActivity: { $gte: thirtyMinutesAgo },
      });

      if (existingVisitor) {
        existingVisitor.lastActivity = new Date();
        existingVisitor.pageViews += 1;
        existingVisitor.page = data.page;
        existingVisitor.isActive = true;
        existingVisitor.country = geoInfo.country;
        existingVisitor.city = geoInfo.city;
        existingVisitor.device = deviceInfo.device;
        existingVisitor.browser = deviceInfo.browser;
        existingVisitor.os = deviceInfo.os;
        if (data.userId) {
          existingVisitor.userId = new Types.ObjectId(data.userId);
        }
        await existingVisitor.save();
        return existingVisitor;
      }

      const visitor = new this.visitorModel({
        ip: data.ip,
        userAgent: data.userAgent,
        page: data.page,
        referrer: data.referrer || 'Direct',
        sessionId: data.sessionId,
        userId: data.userId ? new Types.ObjectId(data.userId) : undefined,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        country: geoInfo.country,
        city: geoInfo.city,
        lastActivity: new Date(),
        isActive: true,
      });

      await visitor.save();
      this.logger.log(
        `New visitor tracked: ${data.ip} - ${deviceInfo.device} - ${data.page}`,
      );
      return visitor;
    } catch (error) {
      this.logger.error('Error tracking visitor:', error);
      throw error;
    }
  }

  async getActiveVisitors() {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const matchStage = {
      lastActivity: { $gte: thirtyMinutesAgo },
      isActive: true,
    };

    const [totalResult] = await this.visitorModel.aggregate([
      { $match: matchStage },
      { $group: { _id: '$ip' } },
      { $count: 'count' },
    ]);
    const total = totalResult?.count ?? 0;

    const activeVisitors = await this.visitorModel.aggregate([
      { $match: matchStage },
      { $sort: { lastActivity: -1 } },
      {
        $group: {
          _id: '$ip',
          id: { $first: '$_id' },
          ip: { $first: '$ip' },
          pages: { $addToSet: '$page' },
          currentPage: { $first: '$page' },
          device: { $first: '$device' },
          browser: { $first: '$browser' },
          os: { $first: '$os' },
          country: { $first: '$country' },
          city: { $first: '$city' },
          referrer: { $first: '$referrer' },
          pageViews: { $sum: '$pageViews' },
          lastActivity: { $first: '$lastActivity' },
          sessionId: { $first: '$sessionId' },
          userId: { $first: '$userId' },
        },
      },
      { $sort: { lastActivity: -1 } },
      { $limit: 100 },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return {
      total,
      visitors: activeVisitors.map((v: any) => ({
        id: v.id,
        ip: v.ip,
        page: v.currentPage,
        pages: v.pages || [],
        device: v.device,
        browser: v.browser,
        os: v.os,
        country: v.country || 'Unknown',
        city: v.city || 'Unknown',
        referrer: v.referrer,
        pageViews: v.pageViews,
        lastActivity: v.lastActivity,
        sessionId: v.sessionId,
        userId: v.userInfo?._id || v.userId,
        userName: v.userInfo?.name || v.userInfo?.username || null,
        userEmail: v.userInfo?.email || null,
      })),
    };
  }

  async getDailyActiveUsers(days: number = 30): Promise<{
    dauToday: number;
    dailyData: Array<{ date: string; activeUsers: number }>;
  }> {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setUTCDate(startDate.getUTCDate() - days);
    startDate.setUTCHours(0, 0, 0, 0);

    const todayStr = now.toISOString().slice(0, 10);

    const raw = await this.visitorModel.aggregate([
      {
        $match: {
          lastActivity: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: '%Y-%m-%d', date: '$lastActivity' },
            },
            ip: '$ip',
          },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          activeUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const byDate = new Map<string, number>();
    raw.forEach((r: { _id: string; activeUsers: number }) => {
      byDate.set(r._id, r.activeUsers);
    });

    const dauToday = byDate.get(todayStr) ?? 0;

    const dailyData: Array<{ date: string; activeUsers: number }> = [];
    const d = new Date(startDate);
    while (d <= now) {
      const dateStr = d.toISOString().slice(0, 10);
      dailyData.push({
        date: dateStr,
        activeUsers: byDate.get(dateStr) ?? 0,
      });
      d.setUTCDate(d.getUTCDate() + 1);
    }

    return { dauToday, dailyData };
  }

  async markInactiveVisitors() {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const result = await this.visitorModel.updateMany(
      {
        lastActivity: { $lt: thirtyMinutesAgo },
        isActive: true,
      },
      {
        $set: { isActive: false },
      },
    );

    if (result.modifiedCount > 0) {
      this.logger.log(`Marked ${result.modifiedCount} visitors as inactive`);
    }
  }

  private parseUserAgent(userAgent: string) {
    const ua = userAgent.toLowerCase();

    let device = 'desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      device = 'tablet';
    } else if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        userAgent,
      )
    ) {
      device = 'mobile';
    }

    let browser = 'Unknown';
    if (ua.includes('edg/')) browser = 'Edge';
    else if (ua.includes('chrome')) browser = 'Chrome';
    else if (ua.includes('safari')) browser = 'Safari';
    else if (ua.includes('firefox')) browser = 'Firefox';
    else if (ua.includes('opera') || ua.includes('opr/')) browser = 'Opera';

    let os = 'Unknown';
    if (ua.includes('windows')) os = 'Windows';
    else if (ua.includes('mac')) os = 'MacOS';
    else if (ua.includes('linux')) os = 'Linux';
    else if (ua.includes('android')) os = 'Android';
    else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad'))
      os = 'iOS';

    return { device, browser, os };
  }

  private getGeoLocation(ip: string): { country: string; city: string } {
    if (
      !ip ||
      ip === '::1' ||
      ip === '127.0.0.1' ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.16.') ||
      ip.startsWith('172.17.') ||
      ip.startsWith('172.18.') ||
      ip.startsWith('172.19.') ||
      ip.startsWith('172.20.') ||
      ip.startsWith('172.21.') ||
      ip.startsWith('172.22.') ||
      ip.startsWith('172.23.') ||
      ip.startsWith('172.24.') ||
      ip.startsWith('172.25.') ||
      ip.startsWith('172.26.') ||
      ip.startsWith('172.27.') ||
      ip.startsWith('172.28.') ||
      ip.startsWith('172.29.') ||
      ip.startsWith('172.30.') ||
      ip.startsWith('172.31.')
    ) {
      return { country: 'Georgia', city: 'Tbilisi' };
    }

    try {
      const geo = geoip.lookup(ip);

      if (geo) {
        const countryName = this.getCountryName(geo.country);
        const cityName = geo.city || this.getDefaultCity(geo.country);

        return {
          country: countryName,
          city: cityName,
        };
      }
    } catch (error) {
      this.logger.warn(`Failed to lookup IP: ${ip}`, error);
    }

    return { country: 'Unknown', city: 'Unknown' };
  }

  private getCountryName(countryCode: string): string {
    const countryMap: { [key: string]: string } = {
      GE: 'Georgia',
      US: 'United States',
      GB: 'United Kingdom',
      DE: 'Germany',
      FR: 'France',
      TR: 'Turkey',
      RU: 'Russia',
      UA: 'Ukraine',
      AZ: 'Azerbaijan',
      AM: 'Armenia',
      IL: 'Israel',
      IT: 'Italy',
      ES: 'Spain',
      NL: 'Netherlands',
      SE: 'Sweden',
      NO: 'Norway',
      FI: 'Finland',
      DK: 'Denmark',
      PL: 'Poland',
      CZ: 'Czech Republic',
      AT: 'Austria',
      CH: 'Switzerland',
      BE: 'Belgium',
      PT: 'Portugal',
      GR: 'Greece',
      RO: 'Romania',
      BG: 'Bulgaria',
      HR: 'Croatia',
      RS: 'Serbia',
      HU: 'Hungary',
      SK: 'Slovakia',
      LT: 'Lithuania',
      LV: 'Latvia',
      EE: 'Estonia',
      IE: 'Ireland',
      CN: 'China',
      JP: 'Japan',
      KR: 'South Korea',
      IN: 'India',
      BR: 'Brazil',
      CA: 'Canada',
      AU: 'Australia',
      NZ: 'New Zealand',
      MX: 'Mexico',
      AR: 'Argentina',
      CL: 'Chile',
      CO: 'Colombia',
      ZA: 'South Africa',
      EG: 'Egypt',
      NG: 'Nigeria',
      KE: 'Kenya',
      AE: 'United Arab Emirates',
      SA: 'Saudi Arabia',
      QA: 'Qatar',
      KW: 'Kuwait',
      BH: 'Bahrain',
      OM: 'Oman',
    };

    return countryMap[countryCode] || countryCode;
  }

  private getDefaultCity(countryCode: string): string {
    const capitalMap: { [key: string]: string } = {
      GE: 'Tbilisi',
      US: 'New York',
      GB: 'London',
      DE: 'Berlin',
      FR: 'Paris',
      TR: 'Istanbul',
      RU: 'Moscow',
    };

    return capitalMap[countryCode] || 'Unknown';
  }
}
