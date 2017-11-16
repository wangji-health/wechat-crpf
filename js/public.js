/**
 * Created by Administrator on 2017-10-13.
 */

var Main = {
  url:'http://39.108.177.107',
  urll:function (data) {
    return this.url+data
  }
};

//获取时间，与请求链接做验证

function getCode() {

  const time = new Date();

  console.log(time);

  const year = time.getFullYear();

  const mouth = time.getMonth() + 1;

  const reallyMouth = mouth < 10 ? '0'+ mouth : mouth ;

  const date = time.getDate();

  const reallyDate = date < 10 ? '0'+ date : date ;

  const hour = time.getHours();

  const reallyHour = hour < 10 ? '0'+ hour : hour ;

  const minute = time.getMinutes();

  const reallyMinute = minute < 10 ? '0'+ minute : minute ;

  console.log(year,reallyMouth,reallyDate,reallyHour,reallyMinute);

  var info = 'lcsy_' + year + reallyMouth + reallyDate + reallyHour + reallyMinute;

  console.log(info);

////////////////////////////////////////////////aes 加密
  console.log(CryptoJS);

  var plaintText = info;

  var key = CryptoJS.enc.Utf8.parse("6b6062e5b57586998c1469bc77916aaa");

  var options = {
    iv: CryptoJS.enc.Utf8.parse("0000000000000000"),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };

  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);

  var encryptedBase64Str = encodeURIComponent(encryptedData.toString());

  console.log('encryptedBase64Str', encryptedBase64Str);

  return encryptedBase64Str
}


// 解密
// var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, options);

// 解密后，需要按照Utf8的方式将明文转位字符串
// var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);

// console.log('decryptedStr', decryptedStr);


