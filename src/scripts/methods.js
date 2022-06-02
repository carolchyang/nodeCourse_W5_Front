import emitter from "@/scripts/emitter";
import moment from "moment";

// Toast
export const pushMessage = (msg) => {
  emitter.emit("push-message", msg);
};

// 取得時間
export const getTime = (time) => {
  const newTime = moment(time).format("YYYY/MM/DD HH:mm");
  return newTime;
};

// 驗證網址 url
export const isValidUrl = (url) => {
  const validVal = new RegExp(/(http|https):\/\/([\w.]+\/?)\S*/gi).test(url);
  return validVal;
};
