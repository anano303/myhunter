"use client";

import { useEffect, useState, useRef } from "react";
import "./MessengerChat.css";

// Add the necessary types for Facebook SDK
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: { xfbml: boolean; version: string }) => void;
      XFBML: {
        parse: (element?: HTMLElement | null) => void;
      };
      CustomerChat: {
        show: (shouldShowDialog?: boolean) => void;
        hide: () => void;
        showDialog: () => void;
        hideDialog: () => void;
      };
    };
  }
}

const MessengerChat = () => {
  const [isClient, setIsClient] = useState(false);
  const fbRootRef = useRef<HTMLDivElement>(null);
  const fbChatRef = useRef<HTMLDivElement>(null);
  const customButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const loadFacebookSDK = () => {
      // Define the callback that will be triggered once FB SDK is loaded
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v18.0",
        });

        console.log("Facebook SDK initialized");
      };

      // Load the SDK asynchronously
      (function (d, s, id) {
        const fbRoot = d.getElementById("fb-root");
        if (fbRoot && !d.getElementById(id)) {
          const js = d.createElement(s) as HTMLScriptElement;
          js.id = id;
          js.src =
            "https://connect.facebook.net/ka_GE/sdk/xfbml.customerchat.js";
          js.async = true;
          js.defer = true;
          js.crossOrigin = "anonymous";
          fbRoot.appendChild(js);
        }
      })(document, "script", "facebook-jssdk");
    };

    if (isClient) {
      loadFacebookSDK();
    }

    return () => {
      const script = document.getElementById("facebook-jssdk");
      if (script) {
        script.remove();
      }
    };
  }, [isClient]);

  // Helper function to find and click Facebook's chat button
  const openFacebookChat = () => {
    // Try multiple approaches to open the chat

    // 1. Try using FB SDK if available
    if (window.FB && window.FB.CustomerChat) {
      try {
        console.log("Using FB.CustomerChat.show");
        window.FB.CustomerChat.show(true);
        window.FB.CustomerChat.showDialog();
        return true;
      } catch (e) {
        console.error("Failed to use FB.CustomerChat:", e);
      }
    }

    // 2. Try finding and clicking Facebook's button
    try {
      // Look for Facebook's chat button in various ways
      const fbButtons = [
        document.querySelector(".fb_dialog_content button"),
        document.querySelector(".fb_dialog_content iframe"),
        document.querySelector('[aria-label="Chat with SSBBmarket"]'),
        document.querySelector('[data-testid="bubble_iframe"]'),
        document.querySelector(".fb_dialog_content"),
      ];

      for (const btn of fbButtons) {
        if (btn) {
          console.log("Found FB button, clicking:", btn);
          (btn as HTMLElement).click();
          return true;
        }
      }
    } catch (e) {
      console.error("Error finding FB chat button:", e);
    }

    // 3. Try reloading the chat widget
    try {
      if (fbRootRef.current && fbChatRef.current) {
        console.log("Trying to refresh XFBML");
        fbChatRef.current.setAttribute("data-ref", Date.now().toString());
        if (window.FB && window.FB.XFBML) {
          window.FB.XFBML.parse(fbRootRef.current);
        }
      }
    } catch (e) {
      console.error("Error refreshing chat:", e);
    }

    // 4. As a last resort, try opening Messenger in a new window
    console.log("Opening Messenger in new window as fallback");
    window.open("https://m.me/SSBBmarket", "_blank");
    return true;
  };

  // Only render on the client side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Facebook Messenger Chat Plugin Code */}
      <div id="fb-root" ref={fbRootRef}></div>
      <div
        ref={fbChatRef}
        id="fb-customer-chat"
        className="fb-customerchat"
        data-attribution="biz_inbox"
        data-page_id="542501458957000"
      ></div>

      {/* Custom Messenger Icon Button */}
      <div
        ref={customButtonRef}
        className="custom-messenger-button"
        onClick={openFacebookChat}
        aria-label="Open Facebook Messenger Chat"
      >
        <div className="messenger-icon-wrapper">
          <svg viewBox="0 0 28 28" className="messenger-icon">
            <path d="M14,2C7.4,2,2,6.9,2,13c0,3.6,1.8,6.8,4.6,8.9v3.5l4.1-2.3c1,0.3,2.1,0.4,3.3,0.4c6.6,0,12-4.9,12-10.6 C26,6.9,20.6,2,14,2z M15.1,16.8l-3.1-3.3l-6,3.3l6.6-7l3.1,3.3l6-3.3L15.1,16.8z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default MessengerChat;
