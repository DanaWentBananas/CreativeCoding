function Branch(begin,end){
  this.begin = begin
  this.end = end
  this.finished=false

  this.show = function(){
    stroke(255)
    line(this.begin.x,this.begin.y,this.end.x,this.end.y)
  }

  this.jitter = function(){
    this.end.x +=random(-1,1)
    this.end.y +=random(-1,1)
  }

  this.branchA = function(){
    var dir = p5.Vector.sub(this.end, this.begin)
    dir.rotate(PI/4)
    dir.mult(0.67)
    var newEnd = p5.Vector.add(this.end, dir)
    var right = new Branch(this.end, newEnd)
    return right
  }

  this.branchB = function(){
    var dir = p5.Vector.sub(this.end, this.begin)
    dir.rotate(-PI/4)
    dir.mult(0.67)
    var newEnd = p5.Vector.add(this.end, dir)
    var right = new Branch(this.end, newEnd)
    return right
  }

  
}

var root
var tree=[]
var leaves=[]
var count=0

function setup() {
  createCanvas(400, 400);
  var a = createVector(width/2,height)
  var b = createVector(width/2,height-100)
  root = new Branch(a,b)
  tree[0]=root
}

function draw() {
  background(0);
  for(var i=0;i<tree.length;i++){
    tree[i].show()
    //tree[i].jitter()
  }

  for(var i=0;i<leaves.length;i++){
    fill(255,0,100)
    circle(leaves[i].x,leaves[i].y,8)
    leaves[i].y += random(0,1)
  }
}

function mousePressed(){
  for(var i=tree.length-1;i>=0;i--){
    if(!tree[i].finished){
    tree.push(tree[i].branchA())
    tree.push(tree[i].branchB())
    tree[i].finished = true
    }
  }
  count++

  if (count==5){
    for(var i=0;i<tree.length;i++){
      if(!tree[i].finished){
        var leaf = tree[i].end.copy()
        leaves.push(leaf)
      }
    }
  }
}

