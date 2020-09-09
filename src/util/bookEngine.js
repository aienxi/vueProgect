
var userEngine = require('userEngine.js');

module.exports = {
  authChapterIsOpen,
  saveLastBook,
  getLastBook
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

function saveLastBook(bookInfo) {
    localStorage.setItem('lastBookInfo',JSON.stringify(bookInfo))

}
function getLastBook() {
  return JSON.parse(localStorage.getItem('lastBookInfo'))
}