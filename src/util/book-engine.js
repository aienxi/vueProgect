import  userEngine from './user-engine'


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
  for (var i= 0;i<arrBook.length;i++) {
    var book =  arrBook[i]
    if (book.bookid === bookInfo.bookid) {
      arrBook.splice(i,1)
      break
    }
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
function getPlayRecord() {
  var arrBook = this.getHistoryBookList()
  if(arrBook){
    return  arrBook[0]
  }
  return null
}
// 设置最后一条听书记录

function setPlayRecord(playInfo) {
  // localStorage.setItem(JSON.stringify(playInfo))
}
function setPlayPosition(){

}
export default   {
  authChapterIsOpen,
  addHistoryBook,
  getHistoryBookList,
  getPlayRecord,
  setPlayRecord,
  setPlayPosition
}; // 
