
var userEngine = require('userEngine.js');

module.exports = {
  authChapterIsOpen,
  addHistoryBook,
  getHistoryBookList,
  getLastBook,
  playHistory
}; // 

function authChapterIsOpen(bookInfo, chapterIndex) {
  if (userEngine.isAuth() == 1) {
    return true;
  }

  if (bookInfo.openChapterCount > chapterIndex) {
    return true;
  }

  return false; 
}
// 历史最多存储50条
function addHistoryBook(bookInfo) {
  var arrBook = JSON.parse(localStorage.getItem('historyBook'))
  
  if (!arrBook) {
    arrBook = []
  }
  if (arrBook.length >= 50) {
    arrBook.pop()
  }
  arrBook.push(bookInfo)
  localStorage.setItem('historyBook',JSON.stringify(arrBook))
}
function getHistoryBookList() {
  return JSON.parse(localStorage.getItem('historyBook'))
}
// 获取最后一条听书记录
function getLastBook() {
  var bookInfo = JSON.parse(localStorage.getItem('playHistory'))
  return  bookInfo
}
