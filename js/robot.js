var totalRows;
var totalCols;
var hooverPos;
var grid;

//running the robot
function run(rows, cols, hoover, dirtPos, directions, g) {
  totalRows = rows;
  totalCols = cols;
  hooverPos = hoover;
  grid = g;

  let dirt = new Set();
  dirtPos.forEach((pos) => dirt.add(+pos[0] + "," + pos[1]));

  let counter = 0;

  while (directions.length) {
    let dir = directions.shift();

    switch (dir) {
      case "N":
        if (withinBounds(hooverPos[0] - 1, hooverPos[1])) {
            updateRobotPos(
            hooverPos[0],
            hooverPos[1],
            hooverPos[0] - 1,
            hooverPos[1],
          );

          let curPos = +hooverPos[0] + "," + hooverPos[1];
          if (dirt.has(curPos)) {
            dirt.delete(curPos);
            counter++;
          }
        }
        break;
      case "S":
        if (withinBounds(hooverPos[0] + 1, hooverPos[1])) {
          updateRobotPos(
            hooverPos[0],
            hooverPos[1],
            hooverPos[0] + 1,
            hooverPos[1],
          );

          let curPos = +hooverPos[0] + "," + hooverPos[1];
          if (dirt.has(curPos)) {
            dirt.delete(curPos);
            counter++;
          }
        }
        break;
      case "E":
        if (withinBounds(hooverPos[0], hooverPos[1] + 1)) {
          updateRobotPos(
            hooverPos[0],
            hooverPos[1],
            hooverPos[0],
            hooverPos[1] + 1,
          );

          let curPos = +hooverPos[0] + "," + hooverPos[1];

          if (dirt.has(curPos)) {
            dirt.delete(curPos);
            counter++;
          }
        }
        break;
      case "W":
        if (withinBounds(hooverPos[0], hooverPos[1] - 1)) {
          updateRobotPos(
            hooverPos[0],
            hooverPos[1],
            hooverPos[0],
            hooverPos[1] - 1,
          );

          let curPos = +hooverPos[0] + "," + hooverPos[1];
          if (dirt.has(curPos)) {
            dirt.delete(curPos);
            counter++;
          }
        }
        break;
      default:
        return;
    }
  }
   
  let resultPosition = `${hooverPos[1]}, ${totalRows - 1 - hooverPos[0]}`;
  console.log("Final position of the Robot: ", resultPosition);
  console.log("Dirt collected: ", counter);
  
  return { hoover: resultPosition, count: counter };
}

//checking for valid position
function withinBounds(row, col) {
  if (row < 0 || row >= totalRows || col < 0 || col >= totalCols) {
    return false;
  }
  return true;
}

//updating position of the robot
function updateRobotPos(StartRow, startCol, endRow, endCol) {
  grid[StartRow][startCol] = ".";
  hooverPos[0] = endRow;
  hooverPos[1] = endCol;
  grid[hooverPos[0]][hooverPos[1]] = "H";
}

export { run };