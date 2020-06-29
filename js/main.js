import * as Data from './data.js';
import * as Robot from './robot.js';

var output = document.getElementById('output');
var input = document.getElementById('original-input');

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
// oReq.open("GET", "../input.txt"); //use this request to run it on local server
oReq.open("GET", "input.txt");
oReq.send();

var data;
function reqListener() {
  data = this.responseText;
  data = data.split("\n");
      Data.setData(data);
      Data.placeElements();
      input.innerHTML = Data.showData({'input': true, 'output': false, 'res': null});
      let res = Robot.run(
        Data.totalRows, 
        Data.totalCols, 
        Data.hooverPos, 
        Data.dirtPos, 
        Data.directions,
        Data.grid);
      output.innerHTML = Data.showData({ 'input': false, 'output': true, 'res': res });
}
