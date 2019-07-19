// Here we go! Buckle up!
var grid;
var cols;
var rows;
let gridResolution = 2;
let canvas;
let ctx;

//Here we make our grid
function makeGrid(cols, rows){
  let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++){
      arr[i] = new Array(rows);
    }
    return arr;
  };

//Here we set it up
function setup(){
  canvas = document.getElementById("Game");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  cols = 600 / gridResolution;
  rows = 500 / gridResolution;
  grid = makeGrid(cols,rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      grid[i][j] = Math.random() > 0.75 ? 1 : 0;
    }
  }
  window.requestAnimationFrame(draw);
};

//Here we make it so we can look at it
function draw(){
  ctx.clearRect(0, 0, 600, 500);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * gridResolution;
      let y = j * gridResolution;
      if(grid[i][j] == 1){
        ctx.fillRect(x,y,gridResolution-1,gridResolution-1);
      }
    }
  }
  let next = makeGrid(cols,rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      //count live neighbors
      let neighbors = countNeighbors(grid, i, j);
      let state = grid[i][j];
      if(state == 0 && neighbors == 3){
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)){
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
  window.requestAnimationFrame(draw);
}

function countNeighbors(grid, x, y){
  let sum = 0;
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      //this will help with a wraparound of sorts to have the edge cells change too.
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}
