/**
 * Created by Administrator on 2017-10-16.
 */

var tmpSessionData = JSON.stringify(sessionStorage);

  sessionStorage.clear();

var sessionData = JSON.parse(tmpSessionData);

console.log(sessionData);

const headerHeight = $('header').eq(0).height();

const contentHeight = $('.content').height();

const screenHeight = document.documentElement.clientHeight;

const containerHight = screenHeight - headerHeight - contentHeight;

// console.log(headerHeight);

// console.log(contentHeight);

// console.log(containerHight);

// console.log(screenHeight);

$('.container').height(containerHight);

$('.sickName').html(sessionData.diseaseName);

if(sessionData.provinceName&&sessionData.cityName){

  $('.place').html(sessionData.provinceName+' '+sessionData.cityName);

}else if(sessionData.provinceName&&!sessionData.cityName){

    $('.place').html(sessionData.provinceName);

}else{
  $('.place').html('');
}


//这是跳转展示;

var province_id,city_id;

if(sessionData.provinceId){
  province_id = sessionData.provinceId
}else{
  province_id = ''
}

if(sessionData.cityId){
  city_id = sessionData.cityId
}else{
  city_id = ''
}

// var postData = {
//   'disease_id':sessionData.diseaseId,
//   'province_id':province_id,
//   'city_id':city_id,
//   'sponsor_name': '',
//   'drug_name':'',
//   'indication_name':''
// };

console.log(Main.urll('/index.php/api/wechat/get_trials_detail?token=')+getCode());

$(function() {
  // 页数
  var page = -1;

  // 每页展示10个

  // var size = 10;
  // dropload
  $('.contentDrag').dropload({
    scrollArea: window,
    loadDownFn: function(me) {
      console.log(1232);
      page++;
      $.ajax({
        type: 'post',
        url: Main.urll('/index.php/api/wechat/get_trials_detail?token=' + getCode()),
        dataType: 'json',
        data: {
          page: page,
          'disease_id':sessionData.diseaseId,
          'province_id':province_id,
          'city_id':city_id,
          'sponsor_name': '',
          'drug_name':'',
          'indication_name':''
        },
        success: function(data) {

          console.log(data);

          var arrLen = data.data.length;

          if(arrLen > 0) {

            var temp = $('#template').html();

            var relData = data.data;

            console.log(relData);

            // console.log(temp);

            for(var i = 0; i < data.data.length; i++) {
              var realTemp = temp.replace('{{hospital}}', relData[i].involved_name)
                .replace('{{investigator}}', relData[i].researcher_name)
                .replace('{{status}}', relData[i].sinfo)
                .replace('{{apply}}', relData[i].sponsor_name)
                .replace('{{mobile}}', relData[i].contact_mobile);

              $('.lists').append(realTemp);
            }

            // 如果没有数据
          } else {
            // 锁定
            me.lock();
            // 无数据
            me.noData();
          }
          // 为了测试，延迟1秒加载
          setTimeout(function() {
            // 插入数据到页面，放到最后面
            me.resetload();
          }, 1000);
        },
        error: function(xhr, type) {
          alert('Ajax error!');
          // 即使加载出错，也得重置
          me.resetload();
        }
      });
    }
  });
});
// $.ajax({
//   type: 'post',
//   url: Main.urll('/index.php/api/wechat/get_trials_detail?token='+getCode()),
//   dataType: 'json',
//   data:postData,
//   success:function (data) {
//
//     console.log(data);
//
//     console.log(data.length);
//
//     var temp = $('#template').html();
//
//     var relData = data.data;
//
//     console.log(relData);
//
//     console.log(temp);
//
//     for(var i=0;i < data.data.length;i++){
//       var realTemp = temp.replace('{{hospital}}',relData[i].involved_name)
//         .replace('{{investigator}}',relData[i].researcher_name)
//         .replace('{{status}}',relData[i].sinfo)
//         .replace('{{apply}}',relData[i].sponsor_name)
//         .replace('{{mobile}}',relData[i].contact_mobile);
//
//       $('.container').append(realTemp);
//     }
//
//   },
//   error:function () {
//     alert('请求失败')
//   }
// });

$('.inquire').on('click',function () {

  $('.lists').html('');

  $('.dropload-down').remove();
  var inquire = {
    // page:1,
    'disease_id':sessionData.diseaseId,
    'province_id':province_id,
    'city_id':city_id,
    'sponsor_name': $('.applyBox').val(),
    'drug_name':$('.medicineNameBox').val(),
    'indication_name':$('.suitBox').val()
  };

  console.log(inquire);

  $(function() {
    // 页数
    var page = -1;

    // 每页展示10个

    // var size = 10;

    // dropload
    $('.contentDrag').dropload({
      scrollArea: window,
      loadDownFn: function(me) {
        page++;
        $.ajax({
          type: 'post',
          url: Main.urll('/index.php/api/wechat/get_trials_detail?token=' + getCode()),
          dataType: 'json',
          data: {
            page:page,
            'disease_id':sessionData.diseaseId,
            'province_id':province_id,
            'city_id':city_id,
            'sponsor_name': $('.applyBox').val(),
            'drug_name':$('.medicineNameBox').val(),
            'indication_name':$('.suitBox').val()
          },
          success: function(data) {

            console.log(data);

            var arrLen = data.data.length;

            if(arrLen > 0) {

              var temp = $('#template').html();

              var relData = data.data;

              console.log(relData);

              // console.log(temp);

              for(var i = 0; i < data.data.length; i++) {
                var realTemp = temp.replace('{{hospital}}', relData[i].involved_name)
                  .replace('{{investigator}}', relData[i].researcher_name)
                  .replace('{{status}}', relData[i].sinfo)
                  .replace('{{apply}}', relData[i].sponsor_name)
                  .replace('{{mobile}}', relData[i].contact_mobile);

                $('.lists').append(realTemp);
              }

              // 如果没有数据
            } else {
              // 锁定
              me.lock();
              // 无数据
              me.noData();
            }
            // 为了测试，延迟1秒加载
            setTimeout(function() {
              // 插入数据到页面，放到最后面
              me.resetload();
            }, 500);
          },
          error: function(xhr, type) {
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
          }
        });
      }
    });
  });
});

var bd = document.getElementsByTagName('body')[0];
var div = document.getElementById('top');

bd.onscroll = function(){

  var toTop = document.documentElement.scrollTop||document.body.scrollTop;

  console.log(toTop);

  if(toTop>=800){
    div.style.display = 'block';
  }else{
    div.style.display = 'none';
  }
};
div.onclick = function(){
  (function smoothscroll(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo (0,currentScroll - (currentScroll/5));
    }
  })();
//      alert('回到顶部');
};

