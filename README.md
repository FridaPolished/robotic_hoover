## Robotic Hoover
Created by Frida Pulido.

### Live demo
[Click here](https://fridapolished.github.io/robotic_hoover/) to see the robot in action!

### Technologies

  - HTML
  - CSS
  - NodeJS
  - JavaScript
  - Materialize


### Background and Overview
This is an implementation of a virtual robotic hoover (Roomba-like).


The robotic hoover gets the data to start running from a .txt file that lives in the same directory as the program.

##### Constraints

The robot does not encounter any obstacles on the area that is cleaning and stays put when it bumps into a wall.

### Features

The program extracts the information from the .txt file by opening the file using a XMLHttpRequest request, the response is then used on a callback function that parses the data and runs the robot.

The program displays the final position of the robot and the dirt collected after running in all the directions provided from input. This information is visible on a DOM element and on the browser terminal.

### Code sample

Formatting the retrieved the data from the .txt to create cardinal positions.

```js
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
```

Using a switch case to check for direction of the new position for the robot to explore.
```js
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
    }
  }
```

