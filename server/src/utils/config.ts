import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const connectDB = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const uri = configService.get<string>('MONGODB_URI');
  const dbName = configService.get<string>('MONGODB_DB_NAME') || 'test';

  return {
    uri,
    dbName,
    autoIndex: true,
  };
};

export const corsConfig = (): CorsOptions => ({
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  credentials: true,
});
