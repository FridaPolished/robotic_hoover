import * as Data from './data.js';
import * as Robot from './robot.js';

var counter = document.getElementById('counter');
var robot = document.getElementById('robot-pos');
var originalInput = document.getElementById('original-input');
var savedD;
$(document).ready(function () {
  
  //reading data from txt
  $.get("../input.txt", function (d) {
    var data = d;
    data = data.split("\n");
    originalInput.innerHTML = `Original input: ${data}`
    savedD = data;
    Data.setData(data);
    Data.placeElements();
    let res = Robot.run(
      Data.totalRows, 
      Data.totalCols, 
      Data.hooverPos, 
      Data.dirtPos, 
      Data.directions,
      Data.grid);
      robot.innerHTML = `Final position of the Robot:  ${res["hoover"]}`;
      counter.innerHTML = `Dirt collected:${res["count"]}`;
    });
    
  });
