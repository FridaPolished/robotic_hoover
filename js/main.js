import * as Data from './data.js';
import * as Robot from './robot.js';

var output = document.getElementById('output');
var input = document.getElementById('original-input');

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
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
        Data.grid
        );
      output.innerHTML = Data.showData({ 'input': false, 'output': true, 'res': res });
}


document.getElementById("new-file").addEventListener('change', function () {
  
  var filesList = this.files;
  if (filesList.length == 0) {
    alert('Error : please select a file');
    return;
  }

  //selected file
  var file = filesList[0];

  //validation  for file type
  var allowedTypes = ['text/plain'];
  if (allowedTypes.indexOf(file.type) == -1) {
    console.error('Incorrect file type');
    return;
  }

  var reader = new FileReader();

  reader.addEventListener('load', function (e) {
    data = e.target.result;
    console.log(data)
    data = data.split("\n");
    Data.setData(data);
    Data.placeElements();

    input.innerHTML = Data.showData({ 'input': true, 'output': false, 'res': null });
    let res = Robot.run(
      Data.totalRows,
      Data.totalCols,
      Data.hooverPos,
      Data.dirtPos,
      Data.directions,
      Data.grid);
    output.innerHTML = Data.showData({ 'input': false, 'output': true, 'res': res });
  });

  // file reading failed
  reader.addEventListener('error', function () {
    console.error('Failed to read file');
  });

  // read as text file
  reader.readAsText(file);
});