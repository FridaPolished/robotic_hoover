var totalRows;
var totalCols;
var hooverPos;
var dirtPos = [];
var directions = [];
let grid;


function setData(data) {
  for (let i = 0; i < data.length; i++) {
    let cur = data[i];
    if (i === 0) {
      totalRows = +cur[2];
      totalCols = +cur[0];
    } else if (i === 1) {
      hooverPos = [+cur[2], +cur[0]];
    } else if (i === data.length - 1) {
      directions = cur.split("");
    } else {
      dirtPos.push([+cur[2], +cur[0]]);
    }
  }
}

function placeElements() {
  grid = new Array(totalRows).fill(null);
 

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(totalCols).fill(".");
  }

  dirtPos = adjustPositions(dirtPos);
  adjustPositions(hooverPos);
  grid[hooverPos[0]][hooverPos[1]] = "H";

  dirtPos.forEach((dirt) => {
    let [row, col] = [...dirt];
    grid[row][col] = "D";
  });
  
}

function adjustPositions(element) {
   if (element.length > 2) {
     element = element.map((pos) => {
       let row = totalRows - 1 - pos[0];
       pos[0] = row;
       return pos;
     });
     return element;
   } else {
     let row = totalRows - 1 - element[0];
     hooverPos[0] = row;
     return;
   }
 };
export {setData, placeElements, totalRows, totalCols, hooverPos, dirtPos, directions, grid};