let dots = [];
let mult;
let tz;
let w;
let flower = ["你", "我", "YOU", "ME", "56"];
let n = 3;
let patterns = {};
let weibo = [];
let hold = 0;
let loc;
let txt;
let fiftysix = [];
let myFont;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont("Songti TC");
  textSize(20);
  weibo = [freedom];
  fiftySix();
  angleMode(DEGREES);
  let density = 24;
  let inter = width / density;
  for (let x = 0; x < width; x += inter) {
    for (let y = 0; y < height; y += inter) {
      let d = new Dot(x + width * cos(x, y), y + height * sin(x, y), 36);
      dots.push(d);
    }
  }
  mult = 0.01;
  tz = 0;
  w = 0;
}
function fiftySix() {
  fill(250, 180);
  textAlign(LEFT, BOTTOM);
  txt = weibo[0].post[0];
  hold = floor(map(windowWidth, 60, 1440, 0, 64));
  n = 3;
  for (let i = 0; i < 12; i++) {
    createPattern();
    text(gibberish(), 60, height * 0.105 + i * 56);
    if (i % 2 == 0) n++;
  }
}
function draw() {
  textSize(20);
  for (let i = 0; i < dots.length; i++) {
    dots[i].draw();
    dots[i].update(tz, mult);
  }
  tz += 0.01;
}

function keyPressed() {
  fill(0, 60);
  for (let i = 0; i < 12; i++) {
    if (i < 11) rect(60, height * 0.1 - 16 + i * 56, width - 180, 24);
    if (i == 11) rect(60, height * 0.1 - 16 + i * 56, 1000, 24);
  }
  textSize(20);
  n = 3;
  fiftySix();
  draw();
}

function createPattern() {
  for (let i = 0; i < txt.length; i++) {
    let gram = txt.substring(i, i + n - 1);
    let nextChar = txt[i + n - 1];
    if (!(gram in patterns)) {
      // if(!patterns[gram])
      patterns[gram] = [];
    }
    patterns[gram].push(nextChar);
  }
}

function gibberish() {
  let then = txt.substring(0, n - 1);
  while (!/[。]$/.test(then) && then.length < hold) {
    let gram = then.slice(-(n - 1));
    let opts = patterns[gram];
    let pick = random(opts);
    if (
      then.length >= hold - 1 &&
      !/[；，、; ,]$/.test(then.charAt(then.length - 1))
    )
      then += "......";
    else {
      then += pick;
      if (then.length >= hold) then += "......";
    }
  }
  return then;
}

function drawMountains() {
  for (let i = 0; i < width; i += 1.5) {
    for (let j = 0; j < 4; j++) {
      stroke(100, 0, 0, 2);
      let l = map(mouseX, 0, width, 0, 100);
      line(
        i - j * 2,
        j * 20 + noise(l + i / 240) * height - (height / 6) * j + height / 12,
        i - j * 2,
        j * 20 + noise(l + i / 240) * height + height / 6
      );
    }
  }
}
class Dot {
  constructor(x, y, length) {
    this.ox = x;
    this.oy = y;
    this.length = length;
    this.w = 0;
    this.vector = createVector(this.ox, this.oy);
    this.corner = createVector(0, 0);
  }
  update(tz, mult) {
    this.r = map(this.vector.y, 0, height, 100, 255 * noise(tz));
    let a = map(
      abs(dist(width / 2, height / 2, this.vector.x, this.vector.y)),
      1000,
      0,
      0,
      255
    );
    let targetW = map(a, 0, 255, 0, 8 * noise(tz * 2));
    this.w = lerp(this.w, targetW, mult * 10);
    this.alpha = lerp(50, a, mult * 5);
    this.ang = map(
      noise(this.vector.x * mult, this.vector.y * mult),
      0,
      1,
      0,
      1440 * noise(tz)
    );
    if (offScreen(this.vector))
      this.vector = p5.Vector.lerp(this.vector, this.corner, noise(tz * 10));
    this.vector.add(createVector(cos(this.ang), sin(this.ang)));
  }
  draw() {
    stroke(this.r, 30, 30, this.alpha);
    strokeWeight(this.w);
    point(this.vector.x, this.vector.y);
    noStroke();
    if (random() < 1 / 120) {
      if (
        (this.alpha <= 51.5 || this.w < 0.5) &&
        dist(width / 2, height / 2, this.vector.x, this.vector.y) >=
          height * 0.4
      ) {
        if (random() > 1 / 4) {
          fill(random(255), this.alpha * random(2));
          textAlign(CENTER, CENTER);
          textStyle(BOLD);
          textSize(this.w * 30);
          text(flower[floor(random(5))], this.vector.x, this.vector.y);
        } else {
          fill(random(250), this.alpha * random(2));
          circle(this.vector.x, this.vector.y, random(60));
        }
      }
    }
    if (random() < 1 / 60) {
      if (this.w > 3 && this.alpha >= 56) {
        if (random() > 1 / 16) {
          fill(random(250), this.alpha * random(2));
          circle(this.vector.x, this.vector.y, random(60));
        } else {
          fill(random(255), this.alpha * 2);
          textAlign(CENTER, CENTER);
          textStyle(BOLD);
          textSize(this.w * 20);
          text(flower[floor(random(5))], this.vector.x, this.vector.y);
        }
      }
    }
  }
}
function offScreen(vector) {
  return dist(width / 2, height / 2, vector.x, vector.y) <= height / 4;
}
