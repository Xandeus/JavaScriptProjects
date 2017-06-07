var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width
var height

var resize = function() {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
}
window.onresize = resize
resize()

var ship = {
  position: {
    x: (0),
    y: (0)
  },
  velocity: {
    x: 0,
    y: 0
  },
  rotation: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  },
  mass: 10
}
var planet = {
	position: {
    x: (width / 2),
    y: (height / 2)
  },
  velocity: {
    x: 0,
    y: 0
  },
  mass: 1
}
var planet2 = {
	position: {
    x: (width / 4),
    y: (height / 4)
  },
  velocity: {
    x: 0,
    y: 0
  },
  mass: 1
}
function update(progress) {
  var p = progress / 16

  updateRotation(p)
  updateVelocity(p)
  updatePosition(p)
}

function updateRotation(p) {
  if (ship.pressedKeys.left) {
    ship.rotation -= p * 5
  }
  else if (ship.pressedKeys.right) {
    ship.rotation += p * 5
  }
}

function updateVelocity(power) {
  // Behold! Mathematics for mapping a rotation to it's x, y components
  //var accelerationVector = {
   // x: power * 0.2 * Math.cos((ship.rotation-90) * (Math.PI/180)),
    //y: power * 0.2 * Math.sin((ship.rotation-90) * (Math.PI/180))
  //}
  var G = .001;
  
  var accelerationVector = {
	x: 0,
	y: 0

  }
  accelerationVector.x += G*(planet.mass)*(planet.position.x-ship.position.x);
  accelerationVector.x += G*(planet2.mass)*(planet2.position.x-ship.position.x);
  accelerationVector.y += G*(planet.mass)*(planet.position.y-ship.position.y);
  accelerationVector.y += G*(planet2.mass)*(planet2.position.y-ship.position.y);
  ship.velocity.x += accelerationVector.x
  ship.velocity.y += accelerationVector.y
  
  if (ship.pressedKeys.down) {
    ship.velocity.x -= accelerationVector.x
    ship.velocity.y -= accelerationVector.y
  }
  // Limit movement speed
  if (ship.velocity.x > 40) {
    ship.velocity.x = 40
  }
  else if (ship.velocity.x < -40) {
    ship.velocity.x = -40
  }
  if (ship.velocity.y > 40) {
    ship.velocity.y = 40
  }
  else if (ship.velocity.y < -40) {
    ship.velocity.y = -40
  }
}

function updatePosition(p) {
  ship.position.x += ship.velocity.x
  ship.position.y += ship.velocity.y
  planet.position.x += planet.velocity.x
  planet.position.y += planet.velocity.y
  // Detect boundaries
  /*
  if (ship.position.x > width) {
    ship.position.x -= width
  }
  else if (ship.position.x < 0) {
    ship.position.x += width
  }
  if (ship.position.y > height) {
    ship.position.y -= height
  }
  else if (ship.position.y < 0) {
    ship.position.y += height
  }
  */
}

function draw() {

  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.translate(ship.position.x, ship.position.y)
  ctx.rotate((Math.PI/180) * ship.rotation)

  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(10, 10)
  ctx.lineTo(0, -20)
  ctx.lineTo(-10, 10)
  ctx.lineTo(0, 0)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
  ctx.strokeStyle = 'white'
  ctx.beginPath();
  ctx.arc(planet.position.x,planet.position.y,5,0,2*Math.PI);
  ctx.stroke();
  ctx.restore()
  ctx.strokeStyle = 'white'
  ctx.beginPath();
  ctx.arc(planet2.position.x,planet2.position.y,5,0,2*Math.PI);
  ctx.stroke();
  
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()
  
  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}
function keydown(event) {
  var key = keyMap[event.keyCode]
  ship.pressedKeys[key] = true
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  ship.pressedKeys[key] = false
}
function mouseclick(event) {
	var x = event.clientX;     // Get the horizontal coordinate
	var y = event.clientY;
	planet.position.x = x;
	planet.position.y = y;
	console.log(ship.mass);
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)
window.addEventListener("click",mouseclick,false);