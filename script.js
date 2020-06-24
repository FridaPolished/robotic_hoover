var fs = require('fs');

var data;
var totalRows;
var totalCols;
var hooverPos;
var dirtPos = [];
var directions = [];

//extracting data from txt
var data = fs.readFileSync('input.txt', { 'encoding': 'utf8' });
  data = data.split('\n');
  setData();

//parsing data
function setData(){
  for (let i = 0; i < data.length; i++) {
    let cur = data[i];
    if(i === 0){
      totalRows = +cur[0]
      totalCols = +cur[1]; 
    } else if(i === 1){
      hooverPos = [+cur[0], +cur[1]]
    } else if( i === data.length - 1){
      directions = cur.split('');
    } else {
     dirtPos.push([+cur[0], +cur[1]])
    } 
  }
}



