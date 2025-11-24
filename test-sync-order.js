// Test script to sync payment for order: 6924c86f3d7b23c4935f8b28
const axios = require("axios");

const BASE_URL = "http://localhost:4000/v1";
const ORDER_ID = "6924c86f3d7b23c4935f8b28";

// You need to get your JWT token from browser localStorage
const ACCESS_TOKEN = "YOUR_TOKEN_HERE"; // Replace with actual token

async function syncOrder() {
  try {
    console.log("🔄 Syncing payment for order:", ORDER_ID);

    const response = await axios.post(
      `${BASE_URL}/orders/${ORDER_ID}/check-payment`,
      {},
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Success:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

syncOrder();
