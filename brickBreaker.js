var grid;
var cols;
var rows;
var totalCells = 0;
//size of each cell
var w = 40;
var colors;

function setup() {
	createCanvas(401, 601);
	cols = floor(width / w);
	rows = floor(height / w);
	grid = make2DArray(cols,rows);

	colors = [red, green, blue];

	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			grid[i][j] = new Cell(i, j, colors[random(4)]);
			totalCells++;
		}
	}
}

function mousePressed(){
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY)){
                grid[i][j].reveal();
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


function draw() {
    for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}
