var grid;
var cols;
var rows;
var totalCells = 0;
//size of each cell
var w = 50;
var colors;
var totalClicks = 0;

function setup() {
  createCanvas(401, 601);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)];
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var col = colors[floor(random(colors.length))];
      grid[i][j] = new Cell(i, j, col);
      totalCells++;
    }
  }
}

function mousePressed(){
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY) && !grid[i][j].white){
                totalClicks++;
                grid[i][j].destroy();
                checkBlocks();
            }       
        }
    }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function checkBlocks(){
  for(var i = 0; i < cols; i++){
  	for(var j = 0; j < rows; j++){
  		if(grid[i][j].white){
            grid[i][j].white = false;
  			moveUp(grid[i][j]);
  		}
  	}
  }
}

function moveUp(cell){
  var i = cell.i;
  for (var y = cell.j; y >= 0; y--) {
    if(grid[i][y].white) {
        grid[i][y+1].white = true;
        break;
    } if(y == 0) {
        grid[i][0].white = true;
        break;
    } else {
        swap(grid[i][y], grid[i][y-1]);
    }
  }
}

function swap(curr, neighbor) {
    var tmp = grid[curr.i][curr.j].col;
    grid[curr.i][curr.j].col = neighbor.col;
    neighbor.col = tmp;
}

function draw() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j].show();
        }
    }

    var left = document.getElementById("left");
    var clicks= document.getElementById("clicks");

    if (totalCells > 0) {
        clicks.innerHTML  = totalClicks;
        left.innerHTML = totalCells;

        var mills = parseInt(millis() % 100);
        var secs  = parseInt(millis() / 1000 );
        var mins  = parseInt(secs / 60);

        var seconds = document.getElementById("seconds");
        var minutes = document.getElementById("minutes");
        var milli = document.getElementById("milliseconds");

        milli.innerHTML   = mills;
        seconds.innerHTML = secs;
        minutes.innerHTML = mins;
    }
}
