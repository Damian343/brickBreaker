function Cell(i, j, col) {
        //the index in grid
        this.i = i;
        this.j = j;
        //what pixel currently at
        //so we can color it
        this.x = i*w;
        this.y = j*w;
        //color of cell
        this.col = col;
        this.white = false;
        // this.neighbors = {
        //      {-1, 0},
        // {0,-1},    {0,+1},
        //      {+1, 0}
        // };
    }

Cell.prototype.show = function() {
    stroke(0);
	this.white ? fill(255) : fill(this.col);	

    rect(this.x, this.y, w, w);
}

Cell.prototype.destroy = function() {
    this.white = true;
	this.floodFill();
}

Cell.prototype.moveDown = function() {
    for(var y = 0; y < this.j; y++) {
        this.swap(grid[this.i][y]);
    }
}

 Cell.prototype.swap = function(neighbor) {
    var tmp = grid[this.i][this.j].col;
    grid[this.i][this.j].col = neighbor.col;
    neighbor.col = tmp;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + w && y > this.y && y < this.y + w);
}

Cell.prototype.getNeighbors = function() {
    var neighbors = [];
    var top    = grid[this.i  ][this.j-1];
    var right  = grid[this.i+1][this.j  ];
    var bottom = grid[this.i  ][this.j+1];
    var left   = grid[this.i-1][this.j  ];

    if(this.safeIndex(top))   { neighbors.push(top);    }
    if(this.safeIndex(right)) { neighbors.push(right);  }
    if(this.safeIndex(bottom)){ neighbors.push(bottom); }
    if(this.safeIndex(left))  { neighbors.push(left);   }

    return neighbors;
}

Cell.prototype.safeIndex = function(cell){
  if(cell){
        if(cell.i < cols && cell.i >= 0 && cell.j < rows && cell.j >= 0) { 
          return true;
        }
  } else { return false; }
}

Cell.prototype.floodFill = function() {
    var neighbors = this.getNeighbors();
    if (neighbors.length == 0) { 
        console.log("no neighbors");
    } else {
        for (var i = 0; i < neighbors.length; i++){
            if(neighbors[i].col == this.col && !neighbors[i].white){
               neighbors[i].destroy();
            }
        }
    }
}
