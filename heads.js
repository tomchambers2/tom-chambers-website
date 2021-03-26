const sketch = function (p) {
  let width, height;
  let headObjects = [];
  const speed = 6;
  const rotationSpeed = 1.2;
  let heads = [];
  let head;

  p.preload = function () {
    const neutral = p.loadImage("me4.png");
    const smile = p.loadImage("me5.png");
    const sad = p.loadImage("me6.png");
    heads[0] = neutral;
    heads[1] = smile;
    heads[2] = sad;
    heads[3] = neutral;
    heads[4] = smile;
    heads[5] = sad;
  };

  p.setup = function () {
    const parentDiv = p.canvas.parentElement;
    width = parentDiv.offsetWidth;
    height = parentDiv.offsetHeight;
    p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight);

    // for (let index = 0; index < 6; index++) {
    //   headObjects.push({
    //     head,
    //     //   position: p.createVector(width / 2, height / 2),
    //     position: p.createVector(width / 2, height / 2),
    //     speed: p.createVector(p.random(-speed, speed), p.random(-speed, speed)),
    //     rotation: p.random(0, 360),
    //   });
    // }
    headObjects = heads.map((head) => ({
      head,
      position: p.createVector(width / 2, height / 2),
      speed: p.createVector(p.random(-speed, speed), p.random(-speed, speed)),
      rotation: p.random(0, 360),
    }));
  };

  const moveHead = (position, speed) => {
    position = p5.Vector.add(position, speed);

    if (position.x < 0) {
      speed = p.createVector(-speed.x, speed.y);
    }
    if (position.y < 0) {
      speed = p.createVector(speed.x, -speed.y);
    }
    if (position.x > width) {
      speed = p.createVector(-speed.x, speed.y);
    }
    if (position.y > height) {
      speed = p.createVector(speed.x, -speed.y);
    }

    return { speed, position };
  };

  function rotate_and_draw_image(
    img,
    img_x,
    img_y,
    img_width,
    img_height,
    img_angle
  ) {
    p.imageMode(p.CENTER);
    p.translate(img_x + img_width / 2, img_y + img_width / 2);
    p.rotate((p.PI / 180) * img_angle);
    p.image(img, 0, 0, img_width, img_height);
    p.rotate((-p.PI / 180) * img_angle);
    p.translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
    p.imageMode(p.CORNER);
  }

  p.draw = function () {
    p.clear();

    // p.translate(-width / 2, -height / 2);

    headObjects = headObjects.map((headObject) => ({
      ...headObject,
      position: moveHead(headObject.position, headObject.speed).position,
      speed: moveHead(headObject.position, headObject.speed).speed,
      rotation: headObject.rotation + rotationSpeed,
    }));
    headObjects.map(({ head, position, rotation }) => {
      // p.ellipse(position.x, position.y, 50);
      rotate_and_draw_image(
        head,
        position.x - head.width / 2,
        position.y - head.height / 2,
        172,
        261,
        rotation
      );
    });
  };
};

const cubeSketch = function (p) {
  p.setup = function () {
    const parentDiv = p.canvas.parentElement;
    width = parentDiv.offsetWidth;
    height = parentDiv.offsetHeight;
    p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight, p.WEBGL);
  };

  p.draw = function () {
    p.clear();
    p.directionalLight(250, 250, 250, height / 2, width / 2, 1);

    for (let y = 0; y <= 10; y++) {
      const yOffset = (height / 10) * y - height / 2;
      for (let x = 0; x <= 20; x++) {
        p.push();
        p.translate((width / 20) * x - width / 2, yOffset, -10);
        // p.ambientMaterial(61, 92, 169);
        p.ambientMaterial(255, 255, 255);
        p.angleMode(p.DEGREES);
        p.rotateY((p.mouseX / width) * 180);
        p.rotateZ((p.mouseY / height) * 90);
        p.box(100);
        p.pop();
      }
    }
  };
};

new p5(sketch, "heads");
// new p5(cubeSketch, "cubes");
