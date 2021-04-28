console.log("start");

//const
const {initiateTower,initiateStack,drawTowers,resDrawing} = require("../utilFunc/libTower");

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const width = 1200
const height = 630

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

//initiate 
resDrawing('./newStack.png',context,canvas,width,height);

var towersH = initiateTower();
//console.log(towersH);

drawTowers(towersH,'./newStack.png',context,canvas);


