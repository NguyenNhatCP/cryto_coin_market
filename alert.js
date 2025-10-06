import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CMC_API_KEY = process.env.CMC_API_KEY;
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

async function getFearGreedIndex() {
  const url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest";
  const res = await axios.get(url, {
    headers: { 
         Accepts: "application/json",
         "X-CMC_PRO_API_KEY": CMC_API_KEY
        }
  });
  return res.data?.data;
}

async function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;
  await axios.post(url, { chat_id: TG_CHAT_ID, text });
}

export async function runAlert() {
  try {
    const data = await getFearGreedIndex();
    const value = data?.value;

    console.log("Fear & Greed:", value);

    if (value < 40) {
      await sendTelegram(`⚠️ Cảnh báo: Fear & Greed Index = ${value}`);
    } else if (value > 80) {
      await sendTelegram(`🚀 Thị trường quá tham lam! Index = ${value}`);
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}
