function Cell(i, j, col){
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
        this.neighCount = 0;
}

Cell.prototype.show = function() {
    stroke(0);
    fill(255);
    rect(this.x, this.y, w, w);
//   fill(col);
//   rect(this.x, this.y, w, w);
}
