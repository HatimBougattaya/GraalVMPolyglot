/********************************************************************************

		POLYGLOT FOR THE SERVER RESPONSE 

*********************************************************************************/


//IMPORT
const {initiateTower,drawTowers,resDrawing} = require("../utilFunc/libTower");
const {initiateStack,drawStacks,loadDestination,move}= require("../utilFunc/libStack") ;
const {drawHanoi,moveHanoi} = require("./utilFunc/drawImg");


//REQUIRE
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

//INIT CANVACE
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

//INIT JAVA AGENTS
var algoBro = Java.type('Algo');
//auditMovements
var changes = algoBro.destination();
var movements = algoBro.progress();

//INIT nJS AGENTS
//draw and init stacks
let actualStacks = drawHanoi(canvas,context,'./newStack.png');
//Should be user input in NEXT VERSION 
let stacksNum = 3;



//SYNC WITH JAVA
algoBro.watch("changes",function(id, old, cur) {
	 //see the actual work done
	 console.log("Changed property: ", id);
	 console.log("Original val: ", old);
	 console.log("New val: ", cur);

	 //CALL MOVE FUNC
	 moveHanoi(canvas,context,'./newStack.png',actualStacks,old,cur);
});

//LETS GO
algoBro.tower(stacks,1,2,3);

//console.log("Moveent done :" + movements);
