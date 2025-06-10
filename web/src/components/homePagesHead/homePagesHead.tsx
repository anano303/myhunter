import React from "react";

import Link from "next/link";
import "./homePagesHead.css";

const HomePagesHead = () => {
  return (
    <div className="home-pages-head">
      <div className="rifle-banner">
        {/* Hero image is set as background in CSS */}
        <div className="action-buttons">
          <Link href="/register" className="registration-btn">
            რეგისტრაცია
          </Link>
          <Link href="/login" className="auth-btn">
            ავტორიზაცია
          </Link>
        </div>

        <div className="navigation-icons">
          <Link href="/guns" className="nav-icon">
            <div className="icon-container">
              <svg viewBox="0 0 24 24" className="icon gun-icon">
                <path d="M21,7h-2V6h-2V5H9v1H7v1H5v1H3V9h2v1h2v7h1v1h2v1h8v-1h2v-1h1V9h2V7z M12,16c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,16,12,16z" />
              </svg>
              ცეცხლსასროლი
            </div>
          </Link>

          <Link href="/ammunition" className="nav-icon">
            <div className="icon-container">
              <svg viewBox="0 0 24 24" className="icon ammo-icon">
                <path d="M19,8V5h-2v3h-3v2h3v3h2v-3h3V8H19z M3,7h3V4h2v3h3v2H8v3H6v-3H3V7z M15,15H9v-2h6V15z M15,17H9v2h6V17z" />
              </svg>
              საბრძოლო მასალები
            </div>
          </Link>

          <Link href="/camping" className="nav-icon">
            <div className="icon-container">
              <svg viewBox="0 0 24 24" className="icon camp-icon">
                <path d="M12,3L1,22h22L12,3z M12,7l6.92,11H5.08L12,7z" />
              </svg>
              კემპინგი
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePagesHead;
