"use client";

import React, { useState, useEffect, useRef } from "react";
import "./MessengerChat.css";

const MessengerChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMessengerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://m.me/SSBBmarket", "_blank");
    setIsOpen(false);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://wa.me/995577027700", "_blank");
    setIsOpen(false);
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="chat-container" ref={containerRef}>
      {/* Chat options menu */}
      {isOpen && (
        <div className="chat-options">
          <button
            className="chat-option whatsapp-option"
            onClick={handleWhatsAppClick}
            title="WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffffff"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </button>
          <button
            className="chat-option messenger-option"
            onClick={handleMessengerClick}
            title="Facebook Messenger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="#ffffff"
            >
              <path d="M14,2.25C7.54,2.25,2.25,7.16,2.25,13.17c0,3.36,1.67,6.35,4.28,8.28V25.5l3.92-2.15c1.13,0.31,2.33,0.48,3.55,0.48c6.46,0,11.75-4.91,11.75-10.92S20.46,2.25,14,2.25z M15.34,17.5L12.5,14.5l-5.5,3l6-6.5l3,2.84l5.34-2.84L15.34,17.5z" />
            </svg>
            <span>Messenger</span>
          </button>
        </div>
      )}

      {/* Main chat button - original design */}
      <div
        className="chatIcon"
        onClick={handleMainClick}
        title="დაგვიკავშირდით მესენჯერში"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#5b6c18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
        }}
      >
        {/* Facebook Messenger icon - original */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 28 28"
          fill="#ffffff"
        >
          <path d="M14,2.25C7.54,2.25,2.25,7.16,2.25,13.17c0,3.36,1.67,6.35,4.28,8.28V25.5l3.92-2.15c1.13,0.31,2.33,0.48,3.55,0.48c6.46,0,11.75-4.91,11.75-10.92S20.46,2.25,14,2.25z M15.34,17.5L12.5,14.5l-5.5,3l6-6.5l3,2.84l5.34-2.84L15.34,17.5z" />
        </svg>
      </div>
    </div>
  );
};

export default MessengerChat;
