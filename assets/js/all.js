"use strict";

//宣告 color
var color = '';
var primary = '#FFD366';
var green = '#86D73F'; //理想體重

var blue = '#31BAF9'; //過輕

var orange = '#FF982D'; //過重

var lightOrange = '#FF6C03'; //輕度 & 重度肥胖

var danger = '#FF1200 '; //重度肥胖
//宣告變數

var myBMI;
var myHeight;
var myWeight;
var calBtn = document.getElementById('calBtnId');
var resultImg = document.querySelector('.resultImg');
var resetBtn = document.querySelector('.resetBtn');
var resultRank = document.querySelector('.rank');
var delListBtn = document.querySelector('.delListBtn');
var recordList = document.querySelector('.recordList');
var data = JSON.parse(localStorage.getItem('BMIData')) || []; //取得日期

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
updateList(data); //點擊看結果按鈕

calBtn.addEventListener('click', function (e) {
  e.preventDefault();
  myHeight = document.getElementById('inputHeight').value;
  myWeight = document.getElementById('inputWeight').value;
  myHeight = myHeight / 100;
  myBMI = (myWeight / (myHeight * myHeight.toFixed(2))).toFixed(2); //判斷是否有輸入資料

  if (myHeight == '' || myWeight == '') {
    alert('請輸入資料');
  } else {
    calculat();
  }
}, false); //計算 BMI

function calculat() {
  //reset 按鈕出現
  resetBtn.setAttribute('class', 'resetBtn');
  resultImg.setAttribute('class', 'resultImg');
  calBtn.setAttribute('class', 'd-none');
  resultImg.innerHTML = myBMI + '<span>BMI</span>';

  if (myBMI <= 18.5) {
    resultRank.textContent = '過輕';
    resultColor(blue);
    color = blue;
  } else if (myBMI > 18.5 && myBMI <= 25) {
    resultRank.textContent = '理想';
    resultColor(green);
    color = green;
  } else if (myBMI > 25 && myBMI <= 30) {
    resultRank.textContent = '過重';
    resultColor(orange);
    color = orange;
  } else if (myBMI > 30 && myBMI <= 35) {
    resultRank.textContent = '輕度肥胖';
    resultColor(lightOrange);
    color = lightOrange;
  } else if (myBMI > 35 && myBMI <= 40) {
    resultRank.textContent = '中度肥胖';
    resultColor(lightOrange);
    color = lightOrange;
  } else {
    resultRank.textContent = '重度肥胖';
    resultColor(danger);
    color = danger;
  }

  BMIData = {
    height: "".concat(myHeight * 100, "cm"),
    weight: "".concat(myWeight, "kg"),
    BMI: myBMI,
    resultRank: resultRank.textContent,
    time: "".concat(month, "-").concat(day, "-").concat(year),
    color: color
  };
  data.splice(0, 0, BMIData);
  updateList(data);
  localStorage.setItem('BMIData', JSON.stringify(data));
} //reset 按鈕設計


resetBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var reset = document.querySelector('.resetBtn');
  reset.setAttribute('class', 'd-none');
  document.getElementById('inputHeight').value = '';
  document.getElementById('inputWeight').value = '';
  document.querySelector('.rank').textContent = '';
  resultImg.setAttribute('class', 'd-none');
  calBtn.setAttribute('class', 'calBtn');
}, false); //輸出 data 資料

function updateList(items) {
  recordList.innerHTML = '';
  var str = "";
  var len = items.length;

  for (var i = 0; i < len; i++) {
    str += "<li data-num = ".concat(i, " \n                    <div style = 'border-color:").concat(data[i].color, "'> ").concat(data[i].resultRank, "</div>\n                    <div><span>BMI</span>").concat(data[i].BMI, "</div>\n                    <div><span>weight</span>").concat(data[i].weight, "</div>\n                    <div><span>height</span>").concat(data[i].height, "</div>\n                    <span>").concat(data[i].time, "</span>\n                </li>");
  }

  recordList.innerHTML = str;
} //清除所有資料


delListBtn.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.removeItem('BMIData');
  data.splice(data);
  updateList(data);
}, false); //顏色變化

function resultColor(color) {
  resultRank.style['color'] = color;
  resetBtn.style['background'] = color;
  resultImg.style['border-color'] = color;
  resultImg.style['color'] = color;
}
//# sourceMappingURL=all.js.map
