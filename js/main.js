import * as Data from './data.js';
import * as Robot from './robot.js';

var output = document.getElementById('output');
var input = document.getElementById('original-input');

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
// oReq.open("GET", "../input.txt");
oReq.open("GET", "https://github.com/FridaPolished/robotic_hoover/blob/d372ec7e600e9d4b4532e7c8b09d745d0fdb6388/input.txt");
oReq.send();

var data;
function reqListener() {
  data = this.responseText;
  console.log(data)
  // data = data.split("\n");
  //     Data.setData(data);
  //     Data.placeElements();
  //     input.innerHTML = Data.showData({'input': true, 'output': false, 'res': null});
  //     let res = Robot.run(
  //       Data.totalRows, 
  //       Data.totalCols, 
  //       Data.hooverPos, 
  //       Data.dirtPos, 
  //       Data.directions,
  //       Data.grid);
  //     output.innerHTML = Data.showData({ 'input': false, 'output': true, 'res': res });
}
