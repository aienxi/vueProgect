
module.exports = {
  getHourDate
};

function getHourDate() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  return y + "-" + m + "-" + d + " " + h;
}
