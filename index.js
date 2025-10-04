import cron from "node-cron";
import { runAlert } from "./alert.js";

cron.schedule("0 8 * * *", () => {
  console.log("⏰ Running crypto alert job at 8:00 AM Hanoi time...");
  runAlert();
}, {
  scheduled: true,
  timezone: "Asia/Ho_Chi_Minh"   // GMT+7 (Hà Nội, Hồ Chí Minh)
});
