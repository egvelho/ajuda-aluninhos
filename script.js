const GAME_SPEED = 1;

const rect = createRectangle({ size: 128, backgroundColor: "blue" });
const main = document.querySelector("#main");

draw(rect, main);

function tickGame() {
  moveToDirection({ element: rect, speed: 100 });
}

setInterval(tickGame, GAME_SPEED * 1000);

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

function tick() {}

function createRectangle({
  top = 0,
  left = 0,
  size = 32,
  backgroundColor = "red",
} = {}) {
  const rectangle = document.createElement("div");
  rectangle.style.top = top;
  rectangle.style.left = left;
  rectangle.style.width = `${size}px`;
  rectangle.style.height = `${size}px`;
  rectangle.style.backgroundColor = backgroundColor;
  rectangle.style.position = "absolute";
  return rectangle;
}

function draw(what, where) {
  where.appendChild(what);
}
