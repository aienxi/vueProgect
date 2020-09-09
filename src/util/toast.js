
 export default  {
    showLoading,
    hideLoading,
    showSucceedToast,
    showFailToast,
    showInfoToast,
}

function showLoading(msg){
    console.log(this)
    console.log(this.$vux)
    if(!msg){
        msg = "加载中"
    }
    this.$vux.loading.show({
        text: msg
       })
             
}
function hideLoading(){
    this.$vux.loading.hide()
}
function showSucceedToast(msg){
    // Toast({
    //     message: msg,
    //     iconClass: 'mintui mintui-field-success'

    //   });
}
function  showFailToast(msg){
    // Toast({
    //     message: msg,
    //     iconClass: 'icon mintui-field-error'

    //   });
}
function showInfoToast(msg){
    // Toast({
    //     message: msg,
    //     iconClass: 'icon mintui-field-warning'

    //   });
      
}