var fs = require('fs');

var data;
var totalRows;
var totalCols;
var hooverPos;
var dirtPos = [];
var directions = [];

//extracting data from txt
var data = fs.readFileSync('input.txt', { 'encoding': 'utf8' });
//parsing data
function setData() {
  for (let i = 0; i < data.length; i++) {
    let cur = data[i];
    if (i === 0) {
      totalRows = +cur[2];
      totalCols = +cur[0];
    } else if (i === 1) {
      hooverPos = [+cur[2], +cur[0]];
    } else if (i === data.length - 1) {
      directions = cur.split('');
    } else {
      dirtPos.push([+cur[2], +cur[0]]);
    }
  }
}

let grid;

//placing elements in grid
function placeElements() {
  grid = new Array(totalRows).fill(null);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(totalCols).fill('.')
  }

  dirtPos = adjustPositions(dirtPos);
  adjustPositions(hooverPos);
  grid[hooverPos[0]][hooverPos[1]] = 'H';

  dirtPos.forEach(dirt => {
    let [row, col] = [...dirt];
    grid[row][col] = 'D';
  })
}

//adjusting positions 
function adjustPositions(element) {
  if (element.length > 2) {
    element = element.map(pos => {
      let row = (totalRows - 1) - pos[0];
      pos[0] = row;
      return pos;
    })
    return element;
  } else {
    let row = (totalRows - 1) - element[0];
    hooverPos[0] = row;
    return
  }
}
data = data.split('\n');
setData();


//running the robot
function run() {
  let dirt = new Set;
  dirtPos.forEach(pos => {
    let key = +pos[0] + ',' + pos[1];
    dirt.add(key);
  })

  let counter = 0;

  while (directions.length) {
    let dir = directions.shift();

    switch (dir) {
      case 'N':
        if (withinBounds(hooverPos[0] - 1, hooverPos[1])) {
          console.log('robot going north')
          updateRobotPos(hooverPos[0], hooverPos[1], hooverPos[0] - 1, hooverPos[1])
          console.log(grid)

          let curPos = +hooverPos[0] + ',' + hooverPos[1];
          if (dirt.has(curPos)) {
            console.log('found dirt!')
            dirt.delete(curPos);
            counter++;
          }
        }
        break;
      case 'S':
        if (withinBounds(hooverPos[0] + 1, hooverPos[1])) {
          console.log('robot going south')
          updateRobotPos(hooverPos[0], hooverPos[1], hooverPos[0] + 1, hooverPos[1])
          console.log(grid)

          let curPos = +hooverPos[0] + ',' + hooverPos[1];
          if (dirt.has(curPos)) {
            console.log('found dirt!')
            dirt.delete(curPos);
            counter++;
          }
        }
        break;
      case 'E':
        if (withinBounds(hooverPos[0], hooverPos[1] + 1)) {
          console.log('Robot going east')
          updateRobotPos(hooverPos[0], hooverPos[1], hooverPos[0], hooverPos[1] + 1)
          console.log(grid)

          let curPos = +hooverPos[0] + ',' + hooverPos[1];

          if (dirt.has(curPos)) {
            console.log('found dirt!')
            dirt.delete(curPos)
            counter++
          }
        }
        break;
      case 'W':
        if (withinBounds(hooverPos[0], hooverPos[1] - 1)) {
          console.log('robot going west')
          updateRobotPos(hooverPos[0], hooverPos[1], hooverPos[0], hooverPos[1] - 1)
          console.log(grid)

          let curPos = +hooverPos[0] + ',' + hooverPos[1];
          if (dirt.has(curPos)) {
            console.log('found dirt!')
            dirt.delete(curPos)
            counter++;
          }
        }
        break;
      default:
        return;
    }
  }
  // console.log(directions)
  let resultPosition = [hooverPos[1], (totalRows - 1) - hooverPos[0]]
  console.log("Final position of the Robot: ", resultPosition)
  console.log("Dirt collected", counter)
  return;
}

function withinBounds(row, col) {
  if (row < 0 || row >= totalRows || col < 0 || col >= totalCols) {
    return false;
  }
  return true;
}

function updateRobotPos(StartRow, startCol, endRow, endCol) {
  grid[StartRow][startCol] = '.'
  hooverPos[0] = endRow;
  hooverPos[1] = endCol;
  grid[hooverPos[0]][hooverPos[1]] = 'H';
}


placeElements()
run()