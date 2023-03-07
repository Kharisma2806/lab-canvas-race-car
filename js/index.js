window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};

// Create a new image
const road = new Image();
const car = new Image(); // Create new img element

// Set the source of the image
road.src = "./images/road.png";
car.src = "./images/car.png";

let score = 0;

// Create the player
class Player {
  constructor(x, y, width, height, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  } 
  
  moveLeft() {
    this.x -= 10;
  }
  
  moveRight() {
    this.x += 10;
  }
  
  moveUp() {
    this.y -= 10;
  }
}

class Obstacle {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 70;
    this.height = 30;
    this.color = "maroon";
    this.score = 0;
    this.ctx = ctx;
    this.speed = 2;
  }

  draw() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}
move() {
    this.y += this.speed;
  }
}

function checkCollision(player, obstacle) {
  if (player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y) {
    return true; // collision detected
  }
  return false; // no collision
}

//This function is called when we press start
function startGame() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas and redraw the road and car
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, canvas.width, canvas.height);

  const player = new Player(225, 600, 40, 75, ctx);
  ctx.drawImage(car, player.x, player.y, player.width, player.height);

  const obstacles = [];
  setInterval(() => {
    obstacles.push(new Obstacle(ctx));
  }, 2000); // Add a new obstacle every 2 seconds
  
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, player.x, player.y, player.width, player.height);

    obstacles.forEach(obstacle => {
    if (checkCollision(player, obstacle)) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "25px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`Game Over! Your score is ${score}`, canvas.width/2, canvas.height/2);
      return;
    }
    
    obstacle.move();
    obstacle.draw();
  });
}, 10); // decrease the interval time for smoother animations


  
  playerListener();

  // Add an event listener to listen for keyboard input
  function playerListener() {
    document.addEventListener('keydown', (event) => {
      console.log(event);
      switch(event.code) {
        case 'ArrowLeft':
          player.moveLeft();
          break;
        case 'ArrowRight':
          player.moveRight();
          break;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(car, player.x, player.y, player.width, player.height);
    });
  }
}

    /*/ Create a new obstacle every 2 seconds
    setInterval(() => {
      // Generate a random x position for the obstacle
      const x = Math.floor(Math.random() * canvas.width);

      // Generate a random direction for the obstacle
      const direction = Math.random() < 0.5 ? 'left' : 'right';

      // Create the obstacle
      const obstacle = new Obstacle(x, 0, 50, 50, direction);

      // Add the obstacle to the array
      obstacles.push(obstacle);
    }, 2000);

    // Define a function that updates the position of the obstacles
    function updateObstacles() {
  // Loop through all the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    // Move the obstacle down the canvas
    obstacles[i].y += 1;

    // Draw the obstacle at its new position
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
}
    }*/