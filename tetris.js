let canvas;
let ctx;
let gBArrayHeight = 20;
let gBArrayWidth = 12;
let startX = 4;
let startY = 0;
let score = 0;
let level = 1;
let winOrLose = "Playing";

let coorArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayWidth).fill(0)
);

let curTet = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
];

let tetrominos = [];

let tetrominoColors = [
  "pink",
  "cyan",
  "skyblue",
  "blue",
  "orange",
  "limegreen",
  "maroon",
];

let curTetColor;

let gameBoardArr = [...Array(20)].map((e) => Array(12).fill(0));

let stoppedShapeArray = [...Array(20)].map((e) => Array(12).fill(0));

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};
let direction;

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

document.addEventListener("DOMContentLoaded", SetupCanvas);

function CreateCoordArray() {
  let xR = 0,
    yR = 19;
  let i = 0,
    j = 0;
  for (let y = 9; y <= 446; y += 23) {
    for (let x = 11; x <= 264; x += 23) {
      coorArray[i][j] = new Coordinates(x, y);

      i++;
    }
    j++;
    i = 0;
  }
}

function SetupCanvas() {
  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 936;
  canvas.height = 956;

  ctx.scale(2, 2);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "black";
  ctx.strokeRect(8, 8, 280, 462);

  tetrisLogo = new Image(161, 54);
  tetrisLogo.onload = DrawTetrisLogo;
  tetrisLogo.src = "tetrislogo.png";

  ctx.fillStyle = "black";
  ctx.font = "21px Arial";
  ctx.fillText("SCORE", 300, 98);

  ctx.strokeRect(300, 107, 161, 24);

  ctx.fillText(score.toString(), 310, 127);

  ctx.fillText("LEVEL", 300, 157);

  ctx.strokeRect(300, 171, 161, 24);

  ctx.fillText(level.toString(), 310, 190);

  ctx.fillText("WIN / LOSE", 300, 221);

  ctx.fillText(winOrLose, 310, 261);

  ctx.strokeRect(300, 232, 161, 95);

  ctx.fillText("CONTROLS", 300, 354);

  ctx.strokeRect(300, 366, 161, 104);

  ctx.font = "19px Arial";
  ctx.fillText("A : Move Left", 310, 388);
  ctx.fillText("D : Move Right", 310, 413);
  ctx.fillText("S : Move Down", 310, 438);
  ctx.fillText("E : Rotate Right", 310, 463);

  document.addEventListener("keydown", HandleKeyPress);

  CreateTetrominos();

  CreateTetromino();

  CreateCoordArray();

  DrawTetromino();
}

function DrawTetrisLogo() {
  ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
}

function DrawTetromino() {
  for (let i = 0; i < curTet.length; i++) {
    let x = curTet[i][0] + startX;
    let y = curTet[i][1] + startY;

    gameBoardArr[x][y] = 1;

    let coorX = coorArray[x][y].x;
    let coorY = coorArray[x][y].y;

    ctx.fillStyle = curTetColor;
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function HandleKeyPress(key) {
  if (winOrLose != "Game Over") {
    if (key.keyCode === 65) {
      direction = DIRECTION.LEFT;
      if (!HittingTheWall() && !CheckForHorizontalCollision()) {
        DeleteTetromino();
        startX--;
        DrawTetromino();
      }
    } else if (key.keyCode === 68) {
      direction = DIRECTION.RIGHT;
      if (!HittingTheWall() && !CheckForHorizontalCollision()) {
        DeleteTetromino();
        startX++;
        DrawTetromino();
      }
    } else if (key.keyCode === 83) {
      MoveTetrominoDown();
    } else if (key.keyCode === 69) {
      RotateTetromino();
    }
  }
}

function MoveTetrominoDown() {
  direction = DIRECTION.DOWN;

  if (!CheckForVerticalCollison()) {
    DeleteTetromino();
    startY++;
    DrawTetromino();
  }
}
let t = 1000;

window.setInterval(function () {
  if (winOrLose != "Game Over") {
    MoveTetrominoDown();
    if (score === 50) {
      level = 2;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 2) {
        t += 100;
      }
    } else if (score === 100) {
      level = 3;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 3) {
        t += 200;
      }
    } else if (score === 150) {
      level = 4;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 4) {
        t += 300;
      }
    } else if (score === 200) {
      level = 5;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 5) {
        t += 400;
      }
    } else if (score === 250) {
      level = 6;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 6) {
        t += 500;
      }
    } else if (score === 300) {
      level = 7;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 7) {
        t += 600;
      }
    } else if (score === 350) {
      level = 8;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 8) {
        t += 700;
      }
    } else if (score === 400) {
      level = 9;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 9) {
        t += 800;
      }
    } else if (score === 500) {
      level = 10;
      ctx.fillStyle = "white";
      ctx.fillRect(300, 171, 161, 24);
      ctx.fillStyle = "black";
      ctx.fillText(level.toString(), 310, 190);
      if (level === 10) {
        t += 900;
      }
    }
  }
}, t);

function DeleteTetromino() {
  for (let i = 0; i < curTet.length; i++) {
    let x = curTet[i][0] + startX;
    let y = curTet[i][1] + startY;

    gameBoardArr[x][y] = 0;

    let coorX = coorArray[x][y].x;
    let coorY = coorArray[x][y].y;
    ctx.fillStyle = "white";
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function CreateTetrominos() {
  tetrominos.push([
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]);

  tetrominos.push([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);

  tetrominos.push([
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]);

  tetrominos.push([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ]);

  tetrominos.push([
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]);

  tetrominos.push([
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ]);

  tetrominos.push([
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ]);
}

function CreateTetromino() {
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);

  curTet = tetrominos[randomTetromino];

  curTetColor = tetrominoColors[randomTetromino];
}

function HittingTheWall() {
  for (let i = 0; i < curTet.length; i++) {
    let newX = curTet[i][0] + startX;
    if (newX <= 0 && direction === DIRECTION.LEFT) {
      return true;
    } else if (newX >= 11 && direction === DIRECTION.RIGHT) {
      return true;
    }
  }
  return false;
}

function CheckForVerticalCollison() {
  let tetrominoCopy = curTet;

  let collision = false;

  for (let i = 0; i < tetrominoCopy.length; i++) {
    let square = tetrominoCopy[i];

    let x = square[0] + startX;
    let y = square[1] + startY;

    if (direction === DIRECTION.DOWN) {
      y++;
    }

    if (typeof stoppedShapeArray[x][y + 1] === "string") {
      DeleteTetromino();

      startY++;
      DrawTetromino();
      collision = true;
      break;
    }
    if (y >= 20) {
      collision = true;
      break;
    }
  }
  if (collision) {
    if (startY <= 2) {
      winOrLose = "Game Over";
      ctx.fillStyle = "white";
      ctx.fillRect(310, 242, 140, 30);
      ctx.fillStyle = "black";
      ctx.fillText(winOrLose, 310, 261);
    } else {
      for (let i = 0; i < tetrominoCopy.length; i++) {
        let square = tetrominoCopy[i];
        let x = square[0] + startX;
        let y = square[1] + startY;

        stoppedShapeArray[x][y] = curTetColor;
      }

      CheckForCompletedRows();

      CreateTetromino();

      direction = DIRECTION.IDLE;
      startX = 4;
      startY = 0;
      DrawTetromino();
    }
  }
}

function CheckForHorizontalCollision() {
  var tetrominoCopy = curTet;
  var collision = false;

  for (var i = 0; i < tetrominoCopy.length; i++) {
    var square = tetrominoCopy[i];
    var x = square[0] + startX;
    var y = square[1] + startY;

    if (direction == DIRECTION.LEFT) {
      x--;
    } else if (direction == DIRECTION.RIGHT) {
      x++;
    }

    var stoppedShapeVal = stoppedShapeArray[x][y];

    if (typeof stoppedShapeVal === "string") {
      collision = true;
      break;
    }
  }

  return collision;
}

function CheckForCompletedRows() {
  let rowsToDelete = 0;
  let startOfDeletion = 0;

  for (let y = 0; y < gBArrayHeight; y++) {
    let completed = true;

    for (let x = 0; x < gBArrayWidth; x++) {
      let square = stoppedShapeArray[x][y];

      if (square === 0 || typeof square === "undefined") {
        completed = false;
        break;
      }
    }

    if (completed) {
      if (startOfDeletion === 0) startOfDeletion = y;
      rowsToDelete++;

      for (let i = 0; i < gBArrayWidth; i++) {
        stoppedShapeArray[i][y] = 0;
        gameBoardArr[i][y] = 0;

        let coorX = coorArray[i][y].x;
        let coorY = coorArray[i][y].y;

        ctx.fillStyle = "white";
        ctx.fillRect(coorX, coorY, 21, 21);
      }
    }
  }
  if (rowsToDelete > 0) {
    score += 10;

    ctx.fillStyle = "white";
    ctx.fillRect(310, 109, 140, 19);
    ctx.fillStyle = "black";
    ctx.fillText(score.toString(), 310, 127);
    MoveAllRowsDown(rowsToDelete, startOfDeletion);
  }
}

function MoveAllRowsDown(rowsToDelete, startOfDeletion) {
  for (var i = startOfDeletion - 1; i >= 0; i--) {
    for (var x = 0; x < gBArrayWidth; x++) {
      var y2 = i + rowsToDelete;
      var square = stoppedShapeArray[x][i];
      var nextSquare = stoppedShapeArray[x][y2];

      if (typeof square === "string") {
        nextSquare = square;
        gameBoardArr[x][y2] = 1;
        stoppedShapeArray[x][y2] = square;

        let coorX = coorArray[x][y2].x;
        let coorY = coorArray[x][y2].y;
        ctx.fillStyle = nextSquare;
        ctx.fillRect(coorX, coorY, 21, 21);

        square = 0;
        gameBoardArr[x][i] = 0;
        stoppedShapeArray[x][i] = 0;
        coorX = coorArray[x][i].x;
        coorY = coorArray[x][i].y;
        ctx.fillStyle = "white";
        ctx.fillRect(coorX, coorY, 21, 21);
      }
    }
  }
}

function RotateTetromino() {
  let newRotation = new Array();
  let tetrominoCopy = curTet;
  let curTetBU;

  for (let i = 0; i < tetrominoCopy.length; i++) {
    curTetBU = [...curTet];

    let x = tetrominoCopy[i][0];
    let y = tetrominoCopy[i][1];
    let newX = GetLastSquareX() - y;
    let newY = x;
    newRotation.push([newX, newY]);
  }
  DeleteTetromino();

  try {
    curTet = newRotation;
    DrawTetromino();
  } catch (e) {
    if (e instanceof TypeError) {
      curTet = curTetBU;
      DeleteTetromino();
      DrawTetromino();
    }
  }
}

function GetLastSquareX() {
  let lastX = 0;
  for (let i = 0; i < curTet.length; i++) {
    let square = curTet[i];
    if (square[0] > lastX) lastX = square[0];
  }
  return lastX;
}
