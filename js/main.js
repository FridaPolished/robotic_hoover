import * as Data from './data.js';
import * as Robot from './robot.js';

var output = document.getElementById('output');
var input = document.getElementById('original-input');

$(document).ready(function () {
  
  //reading data from txt
  $.get("./blob/master/input.txt/input.txt", function (data) {
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
    }, "text");  
  });


