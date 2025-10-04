import cron from "node-cron";
import { runAlert } from "./alert.js";

// Chạy mỗi 5 phút
cron.schedule("*/5 * * * *", () => {
  console.log("⏰ Running crypto alert job...");
  runAlert();
});

console.log("🚀 Cron job started. Alerts sẽ gửi mỗi 2 phút.");
