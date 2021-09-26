/** @format */

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE; // 픽셀 사이즈
canvas.height = CANVAS_SIZE; // 픽셀 사이즈

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 우리가 그릴 선들이 모두 이 색을 갖는다고 말해준다
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 선의 두께

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath(); // 클릭하지 않고 마우스를 움직였을때는 path를 시작한다
		ctx.moveTo(x, y); // path를 만들면 마우스의 x,y좌표로 path를 옮긴다
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	ctx.lineWidth = event.target.value;
}

function handleModeClick() {
	// 버튼 이름 바꾸기
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
		ctx.fillStyle = ctx.strokeStyle;
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

range.addEventListener("input", handleRangeChange);

function handleCM(event) {
	event.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS[🎨]";
	link.click();
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
	color.addEventListener("click", handleColorClick)
);

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}
