/*

		construct platform for hanoi towers		
	
*/

//const
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

//initiate 3 towers
function initiateTower(canvasWidth){
	let tower =[];
	let w = 50;
	for(i=1;i<4;i++){
		tower.push(
			{	
				//row
				id: i,
				logo: './res/tower1.png',
				dx: w + (i-1)*400,  
				dy: 200,
				width: 250,
				height: 400
			}
		) 
	}
	return tower;
};

//intiate stacks      **************** HAS TO BE REMOVED TMP 
function initiateStack(stacks){
	let actualStacks = [];
	let w = 250;
	for (i=0;i<stacks;i++){		
		actualStacks.push(
			//the graphic representation of the image
			{
				//the image with min(id) has max(width) ::: width = originalwidth / id
				id : i,
				logo: './res/stack.png',
				currrentPosition: 1,
				width: w/(id+1)
			}
		)
	}
	return actualStacks;

};

//require canvas
function drawTowers(towerArray,targetImage,contexto,canvaso){
	loadImage(towerArray[0].logo).then(image => {
		for (i=0;i<towerArray.length;i++){
			//console.log(towersH[i]);
			contexto.drawImage(image,towerArray[i].dx,towerArray[i].dy,towerArray[i].width,towerArray[i].height)   
		}
	//write	
	const buffer = canvaso.toBuffer('image/png')
	fs.writeFileSync(targetImage, buffer)
	})
};

//initiate or reset drawing 
function resDrawing(targetImage,contexto,canvaso,canvW,canvH){
	contexto.fillStyle = '#000'
	contexto.fillRect(0, 0, canvW, canvH)

	contexto.font = 'bold 30pt Menlo'
	contexto.textAlign = 'center'
	contexto.fillStyle = '#3574d4'

	const text = 'Welcome to my GraalPolyglotDemo'

	contexto.fillText(text, 600, 100)

	const buffer = canvaso.toBuffer('image/png')
	fs.writeFileSync(targetImage, buffer)
};

module.exports = {initiateTower,initiateStack,drawTowers,resDrawing};
