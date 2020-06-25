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
      totalRows = +cur[2]
      totalCols = +cur[0]; 
    } else if(i === 1){
      hooverPos = [+cur[2], +cur[0]]
      // hooverPos = [0, 1]//test
    } else if( i === data.length - 1){
      directions = cur.split('');
    } else {
     dirtPos.push([+cur[2], +cur[0]])
    } 
  }
}



//robot instructions
function placeElements(){
  let grid = new Array(totalRows).fill(null);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(totalCols).fill('.')
  }
  
  dirtPos = adjustPositions(dirtPos);
  adjustPositions(hooverPos);
  grid[hooverPos[0]][hooverPos[1]] = 'H'

  dirtPos.forEach(dirt => {
    let [row, col] = [...dirt]
    grid[row][col] = 'D';
  })
  console.log(grid)

}


function adjustPositions(element){
  
  if(element.length > 2){
    console.log(dirtPos, 'before update')
    element = element.map(pos => {
      let row = (totalRows - 1) - pos[0]
      //let col = pos[1]
      // console.log(row, pos)
      pos[0] = row
      return pos
    })
    // console.log(dirtPos, "dirt Positions updated")
    return element;
  } else {
    let row = (totalRows - 1) - element[0]
    let col = element[1]
    // console.log(element, 'element')
    // console.log(row, col, "'current target positions")
     hooverPos[0] = row
    //  hooverPos[1] = col;
      return 
  }
}

placeElements()