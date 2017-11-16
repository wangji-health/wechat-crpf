/**
 * Created by Administrator on 2017-11-8.
 */
$().ready(function () {
  //阻止缓存
  window.onpageshow = function(e) {
    if(e.persisted) {
      location.reload()
    }
  };
  $('textarea').val('');
});