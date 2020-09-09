
module.exports = {
  getHourDate,
  byteToM,
  chapterListDeal,
  secondToTime
};

function getHourDate() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  return y + "-" + m + "-" + d + " " + h;
}

function byteToM (byte) {
  var m = (byte / 1024 / 1024.00).toFixed(2)
  return m + 'M'

}
function chapterListDeal(chapterList) {

  for (var i = 0;i<chapterList.length;i++) {
  var item = chapterList[i]
  item.size = byteToM(item.size)
  item.times = secondToTime(item.times)

  }

  return chapterList;
}
function secondToTime(second) {
  var hours = Math.floor(second / 60 / 60);
  var minutes = Math.floor(second % 3600 / 60);
  second = second % 60 % 60;
  var time =  (hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : "") 
  + (minutes > 0 ? minutes < 10 ? "0" + minutes + ":" : minutes + ":" : "00:") 
  + (second < 10 ? "0" + second : second);

  return  time
}
