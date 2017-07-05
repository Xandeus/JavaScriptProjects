// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var isFullScreen = true;
fitToContainer(canvas);

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  if(isFullScreen){
	  canvas.width = innerWidth;
	  canvas.height = innerHeight;
  }
  else{
	 canvas.style.width ='50%';
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = 400; 
  }
  
  
}

// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
addEventListener("mousemove", function(event) {
	var rect = canvas.getBoundingClientRect();
    mouse.x= event.clientX - rect.left;
    mouse.y= event.clientY - rect.top;        
});

addEventListener("resize", function() {
	fitToContainer(canvas);
	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Object(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
function init() {

}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
}

init();
animate();