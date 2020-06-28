import * as Data from './data.js';
import * as Robot from './robot.js';

$(document).ready(function () {
  
  //reading data from txt
  $.get("../input.txt", function (d) {
    var data = d;
    data = data.split("\n");
    Data.setData(data);
    Data.placeElements();
    Robot.run(
      Data.totalRows, 
      Data.totalCols, 
      Data.hooverPos, 
      Data.dirtPos, 
      Data.directions,
      Data.grid);
  });
});