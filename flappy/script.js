const GAME_SPEED = 1;
const SPACE_BETWEEN_PIPES = 20;
const PIPE_WIDTH = 30;
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 400;
const PIPE_MOVEMENT = 50;

const main = document.querySelector("#main");
main.style.width = `${SCREEN_WIDTH}px`;
main.style.height = `${SCREEN_HEIGHT}px`;
main.style.position = "absolute";
main.style.backgroundColor = "black";

const pipes = [];

createPipes(main);

function tickMovement() {
  movePipes();
}

function tickPipeCreation() {
  createPipes(main);
}

function tickPipeDrop() {
  dropPipes();
}

setInterval(tickMovement, GAME_SPEED * 1000);
setInterval(tickPipeCreation, GAME_SPEED * 3000);
setInterval(tickPipeDrop, GAME_SPEED * 500);

function dropPipes() {
  pipes.forEach((pipe, index) => {
    const left = getLeft(pipe);
    if (left < -PIPE_WIDTH) {
      pipe.remove();
      pipes.splice(index, 1);
    }
  });
}

function movePipe(pipe) {
  const left = getLeft(pipe);
  const nextLeft = left - PIPE_MOVEMENT;
  setLeft(pipe, nextLeft);
}

function movePipes() {
  pipes.forEach((pipe) => {
    movePipe(pipe);
  });
}

function createPipes(screen) {
  const screenWidth = getWidth(screen);
  const screenHeight = getHeight(screen);

  const topHeightProportion = parseInt(Math.random() * 60);
  const bottomHeightProportion =
    100 - topHeightProportion - SPACE_BETWEEN_PIPES;

  const topHeight = screenHeight * (topHeightProportion / 100);
  const bottomHeight = screenHeight * (bottomHeightProportion / 100);

  const topPipe = createRectangle({
    width: PIPE_WIDTH,
    height: topHeight,
    backgroundColor: "blue",
    top: 0,
    left: screenWidth,
  });
  const bottomPipe = createRectangle({
    width: PIPE_WIDTH,
    height: bottomHeight,
    backgroundColor: "blue",
    top: screenHeight - bottomHeight,
    left: screenWidth,
  });

  pipes.push(topPipe, bottomPipe);

  draw(topPipe, screen);
  draw(bottomPipe, screen);
}

function getWidth(element) {
  return parseFloat(element.style.width);
}

function getHeight(element) {
  return parseFloat(element.style.height);
}

function getTop(element) {
  return parseFloat(element.style.top);
}

function getLeft(element) {
  return parseFloat(element.style.left);
}

function setTop(element, top) {
  element.style.top = `${top}px`;
}

function setLeft(element, left) {
  element.style.left = `${left}px`;
}

function moveToDirection({ element, direction = "left", speed = 5 } = {}) {
  const top = getTop(element);
  const left = getLeft(element);
  switch (direction) {
    case "top":
      setTop(element, top - speed);
      break;
    case "left":
      setLeft(element, left + speed);
      break;
    case "right":
      setLeft(element, left - speed);
      break;
    case "bottom":
      setTop(element, top + speed);
      break;
    default:
      throw new InvalidDirectionError(
        `The direction "${direction}" is invalid!`
      );
  }
}

class InvalidDirectionError extends Error {}

function createRectangle({
  top = 0,
  left = 0,
  width = 32,
  height = 64,
  backgroundColor = "red",
} = {}) {
  const rectangle = document.createElement("div");
  rectangle.style.top = `${top}px`;
  rectangle.style.left = `${left}px`;
  rectangle.style.width = `${width}px`;
  rectangle.style.height = `${height}px`;
  rectangle.style.backgroundColor = backgroundColor;
  rectangle.style.position = "absolute";
  return rectangle;
}

function draw(what, where) {
  where.appendChild(what);
}
