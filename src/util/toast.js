import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui';

 export default  {
    showLoading,
    hideLoading,
    showSucceedToast,
    showFailToast,
    showInfoToast,
}
function showLoading(msg){
    Indicator.open({
        text: msg?msg:'加载中...',
        spinnerType: 'fading-circle'
      });
      
}
function hideLoading(){
    Indicator.close();
}
function showSucceedToast(msg){
    Toast({
        message: msg,
        iconClass: 'mintui mintui-field-success'

      });
}
function  showFailToast(msg){
    Toast({
        message: msg,
        iconClass: 'icon mintui-field-error'

      });
}
function showInfoToast(msg){
    Toast({
        message: msg,
        iconClass: 'icon mintui-field-warning'

      });
      
}