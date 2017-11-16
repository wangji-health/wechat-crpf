/**
 * Created by Administrator on 2017-10-12.
 */

const bannerHeight = $('.bannerBox').height();

const screenHeight = document.documentElement.clientHeight;

const sickListBoxHight = screenHeight - bannerHeight;

console.log(Main.urll('/index.php/api/wechat/get_disease_class?token=')+getCode());

var disease;

// 获取疾病分类
$.ajax({
  type: 'get',
  url: Main.urll('/index.php/api/wechat/get_disease_class?token=')+getCode(),
  async: true,
  dataType: 'json',
  success:function (data) {

    console.log(data);

    var tmp = $('.tmp').html();

    console.log(tmp);

    for (var i=0;i<data.data.length;i++){
        var realTmp = tmp.replace('{{name}}',data.data[i].name);
      $('.sickListBox').append(realTmp)
    }

      sessionStorage.disease = JSON.stringify(data.data);

      disease = JSON.parse(sessionStorage.disease);
  },
  error:function () {
    alert('请求失败')
  }
});




$('.sickListBox').height(sickListBoxHight).on('click','.sickList',function () {

  console.log($(this));

  var diseaseIndex = $(this).index('.sickList');

  console.log(diseaseIndex);

  sessionStorage.clear();

  console.log(sessionStorage);

  console.log(disease);

  var diseaseId = disease[diseaseIndex].id;

  sessionStorage.diseaseId = diseaseId;

  var diseaseName = disease[diseaseIndex].name;

  sessionStorage.diseaseName = diseaseName;

  console.log(diseaseName);



  $('.fontColor').removeClass('fontColor');

  $('.sickList').siblings('.chooseMap').remove();

  $(this).addClass('fontColor').after(" <div class='chooseMap'><div class='triangle'></div><span class='place'>所在地区：<span class='plz'>请选择</span></span></div>");

  $('.chooseMap').off().on('click',function () {
    $('.sOrH').show();
  });

  $('.next').show()
});

// 获取地区列表
$.ajax({
  type: 'get',
  url: Main.urll('/index.php/api/wechat/get_area_list?token=')+getCode(),
  async: true,
  dataType: 'json',
  success:function (data) {
    console.log(data);

    var province = $('#province').html();

    for (var i =0;i<data.data.length;i++){
        var realPro = province.replace('{{province}}',data.data[i].alias_name);
      $('.proBox').append(realPro);
    }

    //监听省
    $('.proBox').on('click','.province',function () {
      //点击的索引
      $('.sure').off();

      $('.ciBox').html('');

      $('.province').removeClass('provinceColor').addClass('oProvinceColor');

      $(this).removeClass('oProvinceColor').addClass('provinceColor');

      var index = $(this).index();

      var provinceName = data.data[index].alias_name;

      console.log(index);

      console.log(provinceName);

      sessionStorage.provinceName = provinceName;

      sessionStorage.provinceId = data.data[index].province_id;

      var cityList = data.data[index].city;

      console.log(cityList);

      var city = $('#city').html();

      for(var i=0;i<cityList.length;i++){

        var realCity = city.replace('{{city}}',cityList[i].city_name);

        $('.ciBox').append(realCity)

      }

      if(cityList==0){

        $('.sure').off().on('click',function () {
          $('.plz').html(provinceName);
          $('.sOrH').hide();
          $('.ciBox').html('');
          $('.provinceColor').removeClass('provinceColor');
          $('.oProvinceColor').removeClass('oProvinceColor')
        })
      }

      //监听城市
      $('.ciBox').off().on('click','.city',function () {

        var cityIndex = $(this).index();

        console.log(cityIndex);

        var cityName = cityList[cityIndex].city_name;

        console.log(cityName);

        sessionStorage.cityName = cityName;

        sessionStorage.cityId = cityList[cityIndex].city_id;

        $('.city').removeClass('cityColor').addClass('oCityColor');

        $(this).removeClass('oCityColor').addClass('cityColor');

        $('.sure').off().on('click',function () {
          $('.plz').html(provinceName+' '+ cityName);
          $('.sOrH').hide();
          $('.ciBox').html('');
          $('.provinceColor').removeClass('provinceColor');
          $('.oProvinceColor').removeClass('oProvinceColor')
        })
      })

    })

  },
  error:function () {
    alert('请求失败')
  }
});

$('.cancel').on('click',function () {
  $('.sOrH').hide();
  $('.ciBox').html('');
});

$('.next').on('click',function () {
  location.href = 'detailedInfo.html';
});










