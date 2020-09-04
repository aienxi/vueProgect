var util = require('util.js');

var userEngine = require('userEngine.js');

var app = getApp();
module.exports = {
  authChapterIsOpen: authChapterIsOpen
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