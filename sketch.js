// from https://codepen.io/guerrillacontra/pen/XPZeww

let args, points, rope;
let argsNum = 4;
let argsArray = [];
let pointsArray = [];
let ropeArray = [];
let arrImg = [];
let randomColor = ['#5941A9', '#ED7BC9', '#F46036', '#DCEDFF', '#51BBFE', '#000'];
let txt = "COMING SOON ";
let arrTxt = [...txt];
let arrFruitS = [];
let arrFruitM = [];
let arrFruitL = [];

let font, font2, fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, fruit7, fruit8, fruit9;

function preload() {
  font = loadFont('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e3aeec538779abe71deab_ABCSocial-Black-Trial.otf');
  font2 = loadFont('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e3a51e18dd80acfd5ea1b_ABCSocialMono-Black-Trial.otf');
  fruit1 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bea11631c5a10bc838_Looki-Fruits-01.png');
  fruit2 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bfdb2f474f7835c69f_Looki-Fruits-02.png');
  fruit3 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bf573dabb118cc4c77_Looki-Fruits-03.png');
  fruit4 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bfea4963d559dd7d66_Looki-Fruits-04.png');
  fruit5 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bf2b16747faec0806c_Looki-Fruits-05.png');
  fruit6 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bf5e4577623322a99f_Looki-Fruits-06.png');
  fruit7 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bf7afb8198b1e071a2_Looki-Fruits-07.png');
  fruit8 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bf2a8bd972a60916d4_Looki-Fruits-08.png');
  fruit9 = loadImage('https://cdn.prod.website-files.com/659f2b4fdb355e743c422325/690e36bf61ce9f1f34db52b0_Looki-Fruits-09.png');
}

function setup() {
  arrFruitS.push(fruit1, fruit2);
  arrFruitM.push(fruit3, fruit4, fruit5);
  arrFruitL.push(fruit6, fruit7, fruit8, fruit9);
  
  createCanvas(innerWidth, innerHeight);
  
  generateRope(argsNum); 
}

function draw() {
  clear();
  for (let i in argsArray) {
    drawRopeHoles(pointsArray[i],argsArray[i].ropeSize);
  }

  for (let i in argsArray) {
    ropeArray[i].update(argsArray[i].gravity, deltaTime / 1000); // deltaTime
    drawRopePoints(pointsArray[i], argsArray[i].ropeColour, argsArray[i].ropeSize, argsArray[i].style, argsArray[i].gradientColour);
    drawStyles(pointsArray[i], argsArray[i].ropeColour, argsArray[i].style, arrImg[i]);
  }

}

function mousePressed(){
  generateRope(1, mouseX, mouseY)
}

function mouseMoved(){
  for (var i in argsArray) {
    let point = ropeArray[i].getPoint(floor((ropeArray[i].getPointLength()-1)/2));
    if (Math.hypot(mouseX-point.pos.x, mouseY-point.pos.y) <200) {
      point.pos.x = mouseX;
      point.pos.y = mouseY;
    }
  }
}

function keyPressed() {
  if (key === 'c') {
    // Code to run.
  }

  if (keyCode === 32) {
    argsArray = [];
    pointsArray = [];
    ropeArray = [];
    arrImg = [];
    generateRope(argsNum);
  }
}

// gradient generator
function interpolateColors(color1, color2, steps) {
    const result = [];

    // Helper to parse RGB string into an array [r, g, b]
    function parseRgb(rgbString) {
        const matches = rgbString.match(/\d+/g);
        return matches ? matches.map(Number) : [0, 0, 0];
    }

    // Helper to convert [r, g, b] array to RGB string
    function toRgbString(r, g, b) {
        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }

    const [r1, g1, b1] = parseRgb(color1);
    const [r2, g2, b2] = parseRgb(color2);

    for (let i = 0; i <= steps; i++) {
        const r = r1 + (r2 - r1) * (i / steps);
        const g = g1 + (g2 - g1) * (i / steps);
        const b = b1 + (b2 - b1) * (i / steps);
        result.push(toRgbString(r, g, b));
    }

    return result;
}

//draw the eyelets
const drawRopeHoles = (points, lw) => {
  const start = points[0];
  const end = points[points.length-1];
  stroke('#000');
  strokeWeight(lw);
  ellipse(start.pos.x, start.pos.y, 20);  
  ellipse(end.pos.x, end.pos.y, 20);
}

//draw each laces
const drawRopePoints = (points, colour, lw, style, grdClr) => {
  let txtColour = colour == '#5941A9' || colour == '#F46036' || colour == '#000'? '#FFF' : '#000';

  if (style == 2){
      txtColour = '#000';
      //console.log(grdClr[i]);
    }
  for (i = 0; i < points.length; i++) {  
    const p = points[i];
    const prev = i > 0 ? points[i - 1] : null;
    if (prev) {
      stroke(txtColour);
      strokeWeight(lw+5);
      line(prev.pos.x, prev.pos.y, p.pos.x, p.pos.y);
    }
  }
  for (i = 0; i < points.length; i++) {
    if (style == 2){
      colour = grdClr[i];
    }
    const p = points[i];
    const prev = i > 0 ? points[i - 1] : null;
    if (prev) {
      stroke(colour);
      strokeWeight(lw);
      line(prev.pos.x, prev.pos.y, p.pos.x, p.pos.y);
    }
  }
};

//draw the stuff on the laces
const drawStyles = (points, colour, style, images, grdClr) => {
  for (i = 0; i < points.length; i++) {
    const img = images[Math.floor(i/2)];
    const p = points[i];
    const prev = i > 0 ? points[i - 1] : null;
    const next = i == points.length-1 ? null : points[i + 1];
    const txtColour = colour == '#5941A9' || colour == '#F46036' || colour == '#000'? '#FFF' : '#000';
    let delta, angle;
    const dist = p.distanceToNextPoint;
    
    if (prev){
      delta = p5.Vector.sub(p.pos, prev.pos);
      angle = delta.heading();
    } else {
      delta = p5.Vector.sub(next.pos, p.pos);
      angle = delta.heading();
    }
    
    switch(style) {
      case 0:
        const i2 = i % arrTxt.length;
        const p2 = arrTxt[i2];
        push();
        rectMode(CENTER);
        translate(p.pos.x, p.pos.y)
        rotate(angle);
        textFont(font2);
        fill(txtColour);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(dist*1.6);
        text(p2, 0, -(dist/5));
        pop();
        break;
      case 1:
        const eSize = 12;
        push();
        rectMode(CENTER);
        translate(p.pos.x, p.pos.y)
        rotate(angle);
        noStroke();
        fill(txtColour);
        ellipse(0, 0, eSize);
        if (next){
          ellipse(dist/2, -eSize, eSize);
          ellipse(dist/2, eSize, eSize);
        }
        pop();
        break;
      case 2:
        const i3 = i % arrTxt.length;
        const p3 = arrTxt[i3];
        const tempI = i % 2;
        if (tempI==1){
          push();
          imageMode(CENTER);
          translate(p.pos.x, p.pos.y)
          rotate(angle-HALF_PI);
          noFill();
          noStroke();
          image(img, 0, 0, img.width/dist*2.4, img.height/dist*2);
          pop();
        }
    }
  }
}

//generate end point for rope
function endPoint(v){
  let v2 = createVector(random(50,width-50), random(50,height-50));
  while (v.dist(v2)<width/2 || v2.x < v.x){
    v2.x=random(50,width-50);
    v2.y=random(50,height-50);
  }
  return v2;
}

//sets the parameter for each rope generation
function createArgs() {
  const tempArgs = {
    start: createVector(random(50,width/2), random(50,height-50)),
    get end() {
      return endPoint(this.start);
    },
    resolution: 20,
    mass: 80,
    damping: 0.95,
    gravity: createVector(0, 3000),
    solverIterations: 500,
    ropeColour: random(randomColor),
    ropeSize: 50,
    style: Math.floor(Math.random() * 3),
    gradientColour: null
  }
  return tempArgs;
}

//self explanatory, how many rope, location of where to generate
function generateRope(rope, startX, startY){
  //makes a random rope vector
  for (let i=0; i<rope; i++){
    let temp = createArgs();
    argsArray.push(temp);
  }
  if (startX || startY){
    if (startX<width/1.5){
      argsArray[argsArray.length-rope].start = createVector(startX, startY);
    } else {
      argsArray[argsArray.length-rope].start = createVector(random(50, width/2), startY);
    }
  }
  for (let i=0; i<rope; i++){
    let i2 = i+1;
    let pointsTemp = Rope.generate(
        argsArray[argsArray.length-i2].start,
        argsArray[argsArray.length-i2].end,
        argsArray[argsArray.length-i2].resolution,
        argsArray[argsArray.length-i2].mass,
        argsArray[argsArray.length-i2].damping
    );
    pointsArray.push(pointsTemp);
    
    let ropeTemp = new Rope(pointsTemp, argsArray[argsArray.length-i2].solverIterations);
    ropeArray.push(ropeTemp);
  }
  for (let i=0; i<rope; i++){
    let i2 = i+1;
    if (argsArray[argsArray.length-i2].style==2){
      let tempColor = interpolateColors('rgb(237, 123, 201)', 'rgb(242, 250, 6)', pointsArray[argsArray.length-i2].length)
      argsArray[argsArray.length-i2].gradientColour = tempColor;
    }
    let arrImgTemp = [];
    let size, prevSize, randImg;
    for (var i3 in pointsArray[argsArray.length-i2]){
      if (size < 3){
        prevSize = size;
        switch(size){
          case 0:
            size = Math.floor(Math.random() * 2)+1;
            break;
          case 1:
            size = Math.floor(Math.random() * 2);
            break;
          case 2:
            size = 0;
            break;
        }
      } else {
        size = Math.floor(Math.random() * 3);
      }
      switch(size){
        case 0:
          randImg = arrFruitS[Math.floor(Math.random() * arrFruitS.length)];
          break;
        case 1:
          randImg = arrFruitM[Math.floor(Math.random() * arrFruitM.length)];
          break;
        case 2:
          randImg = arrFruitL[Math.floor(Math.random() * arrFruitL.length)];
          break;
      }
      arrImgTemp.push(randImg);
    }
    arrImg.push(arrImgTemp);
  }
}

//each rope part is one of these
//uses a high precison varient of Störmer–Verlet integration
//to keep the simulation consistant otherwise it would "explode"!
class RopePoint {
  //integrates motion equations per node without taking into account pos
  //with other nodes...
  static integrate(point, gravity, dt, previousFrameDt) {
    point.velocity = p5.Vector.sub(point.pos, point.oldPos);
    point.oldPos = point.pos.copy(); // { ...point.pos };

    //drastically improves stability
    let timeCorrection = previousFrameDt != 0.0 ? dt / previousFrameDt : 0.0;

    // let accel = p5.Vector.add(gravity, { x: 0, y: point.mass });
    let accel = p5.Vector.add(gravity, createVector(0, point.mass));
    
    const velCoef = timeCorrection * point.damping;
    const accelCoef = Math.pow(dt, 2);

    point.pos.x += point.velocity.x * velCoef + accel.x * accelCoef;
    point.pos.y += point.velocity.y * velCoef + accel.y * accelCoef;
  }

  //apply constraints related to other nodes next to it
  //(keeps each node within distance)
  static constrain(point) {
    if (point.next) {
      const delta = p5.Vector.sub(point.next.pos, point.pos);
      const len = p5.Vector.mag(delta);
      const diff = len - point.distanceToNextPoint;
      const normal = p5.Vector.normalize(delta);

      if (!point.isFixed) {
        point.pos.x += normal.x * diff * 0.25;
        point.pos.y += normal.y * diff * 0.25;
      }

      if (!point.next.isFixed) {
        point.next.pos.x -= normal.x * diff * 0.25;
        point.next.pos.y -= normal.y * diff * 0.25;
      }
    }
    if (point.prev) {
      const delta = p5.Vector.sub(point.prev.pos, point.pos);
      const len = p5.Vector.mag(delta);
      const diff = len - point.distanceToNextPoint;
      const normal = p5.Vector.normalize(delta);

      if (!point.isFixed) {
        point.pos.x += normal.x * diff * 0.25;
        point.pos.y += normal.y * diff * 0.25;
      }

      if (!point.prev.isFixed) {
        point.prev.pos.x -= normal.x * diff * 0.25;
        point.prev.pos.y -= normal.y * diff * 0.25;
      }
    }
  }

  constructor(initialPos, distanceToNextPoint) {
    this.pos = initialPos;
    this.distanceToNextPoint = distanceToNextPoint;
    this.isFixed = false;
    this.oldPos = initialPos.copy(); // { ...initialPos };
    this.velocity = createVector(0, 0); // Vector2.zero();
    this.mass = 1.0;
    this.damping = 1.0;
    this.prev = null;
    this.next = null;
  }
}

//manages a collection of rope points and executes
//the integration
class Rope {
  //generate an array of points suitable for a dynamic
  //rope contour
  static generate(start, end, resolution, mass, damping) {
    const delta = p5.Vector.sub(end, start);
    const len = p5.Vector.mag(delta)*1.2;

    let points = [];
    const pointsLen = len / resolution;

    for (let i = 0; i < pointsLen; i++) {
      const percentage = i / (pointsLen - 1);

      const lerpX = lerp(start.x, end.x, percentage);
      const lerpY = lerp(start.y, end.y, percentage);

      points[i] = new RopePoint(createVector(lerpX, lerpY), resolution);
      points[i].mass = mass;
      points[i].damping = damping;
    }

    //Link nodes into a doubly linked list
    for (let i = 0; i < pointsLen; i++) {
      const prev = i != 0 ? points[i - 1] : null;
      const curr = points[i];
      const next = i != pointsLen - 1 ? points[i + 1] : null;

      curr.prev = prev;
      curr.next = next;
    }

    points[0].isFixed = points[points.length - 1].isFixed = true;

    return points;
  }

  constructor(points, solverIterations) {
    this._points = points;
    this.update = this.update.bind(this);
    this._prevDelta = 0;
    this._solverIterations = solverIterations;

    this.getPoint = this.getPoint.bind(this);
  }

  getPoint(index) {
    return this._points[index];
  }
  
  getPointLength(){
    return this._points.length;
  }

  update(gravity, dt) {
    for (let i = 1; i < this._points.length - 1; i++) {
      let point = this._points[i];

      let accel = gravity.copy(); // { ...gravity };

      RopePoint.integrate(point, accel, dt, this._prevDelta);
    }

    for (let iteration = 0; iteration < this._solverIterations; iteration++)
      for (let i = 1; i < this._points.length - 1; i++) {
        let point = this._points[i];
        RopePoint.constrain(point);
      }

    this._prevDelta = dt;
  }
}
