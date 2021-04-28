/********************************************************************************

		DRAWIMG.JS IS FOR TESTING OUR JS SIDE OF THE POLYGLOT
		////////////////////DRAW in one image we can olso save every step in seperate images

*********************************************************************************/

console.log("start");

//const
const {initiateTower,drawTowers,resDrawing} = require("../utilFunc/libTower");
const {initiateStack,drawStacks,loadDestination,move}= require("../utilFunc/libStack") ;

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const width = 1200
const height = 630

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

//Draw platform && return stacks
function drawHanoi(canvaso,contexto,targetPNG) {
	//initiate or res
	resDrawing(targetPNG,contexto,canvaso,width,height);

	var towersH = initiateTower();
	console.log(towersH);
	var stacksH = initiateStack(3,width,height,towersH);
	console.log(stacksH);

	drawTowers(towersH,targetPNG,contexto,canvaso);
	drawStacks(stacksH,targetPNG,contexto,canvaso);

	//TEST: move from 1 to 2
	/*
	loadDestination(stacksH,1,2);
	move(stacksH,'./newStack.png',context,canvas);
	*/
	//MOVE ONLY WORKS WHEN THERE IS A DESTINATION
	return stacksH;
}

//Move any stack
function moveHanoi(canvas,context,targetPNG,stacks,start,end){
	loadDestination(stacks,start,end);
	move(stacks,targetPNG,context,canvas);
}
/*******************************************************************/
//Test in one image we can olso save every step in seperate images
let s = drawHanoi(canvas,context,'./newStack.png');

moveHanoi(canvas,context,'./newStack.png',s,1,2);
moveHanoi(canvas,context,'./newStack.png',s,1,3);
moveHanoi(canvas,context,'./newStack.png',s,2,3);
moveHanoi(canvas,context,'./newStack.png',s,3,1);
//impossible move
//console.log(s);
moveHanoi(canvas,context,'./newStack.png',s,2,3);

/*******************************************************************/

module.exports = {drawHanoi,moveHanoi};
