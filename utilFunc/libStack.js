/********************************************************************************

		LIBRARY FOR MANIPULATING AND CREATING STACKS

*********************************************************************************/


//const
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

//intiate stacks return array
function initiateStack(stacks,canvW,canvH,towers){
	let actualStacks = [];
	let w = 250;
	let h = canvH*0.7 /(stacks+1);
	//intital dy for tower + 70% of the tower =  200 + 280
	let y=480;
	let varx = 0; 
	for (i=0;i<stacks;i++){
		//(w-w/(i+1)/2) == distance between the mass center of the stacks
		varx=  (w-(w/(i+1))/2);

		actualStacks.push(
			//the graphic representation of the image
			{
				//the image with min(id) has max(width) ::: width = originalwidth / id
				id : i,
				logo: './res/stack.png',
				currentPosition: 1,
				width: w/(i+1),
				//using 70% of the tower for stacks && leave space for spacing {(stacks +1) not stacks}
				height: h,
				//125 for the margin && towersdx for to place in tower on iinitail position
				dx: towers[0].dx + varx -125,
				dy: y - 20*i,
				destination:1
			}
		)
	}
	return actualStacks;

};

//draw ACTUAL STACKS
function drawStacks(actualStacks,targetImage,contexto,canvaso){
	//console.log( actualStacks[2]);
	
	loadImage(actualStacks[0].logo).then(image => {
		for (i=0;i<actualStacks.length;i++){
			//console.log(towersH[i]);
			contexto.drawImage(image,actualStacks[i].dx,actualStacks[i].dy,actualStacks[i].width,actualStacks[i].height)   
		}
	//write	
	const buffer = canvaso.toBuffer('image/png')
	fs.writeFileSync(targetImage, buffer)
	})
};



//get the first disc's in a row id
function minANDgetBros(imagesArray,row){
	//initalise with any value 
	let index = imagesArray[0];
	let found = 0;
	
	for ( i=0; i<imagesArray.length;i++){
		switch(found){
			case 0 :
				if (row==imagesArray[i].currrentPosition  ){
					index = imagesArray[i];
				}
			case 1 :
				if ((imagesArray[i].width < index.width) && row==imagesArray[i].currentPosition ){
					index = imagesArray[i];
				}
		}
		
	}
	//console.log(index);
	return index.id;
};

//stacks moving theo 
function loadDestination(stacksArray,finek,destination){
	//pick stack with min width we should move with finek
	//move the image
	let targetPosition = stacksArray.findIndex(element => element.id==minANDgetBros(stacksArray,finek) );
	//the stack we need: console.log(stacksArray[targetPosition]);

	console.log("destination: "+destination);
	stacksArray[targetPosition].destination = destination;
	//the stack with his new destination : 
	//console.log(stacksArray);
	return stacksArray;
};

function move(stacksArray,targetImage,contexto,canvaso) {
	let destination = 0;
	let finek = 0;
	
	for(i=0;i<stacksArray.length;i++){
		if(stacksArray[i].currentPosition != stacksArray[i].destination){
			finek = stacksArray[i].currentPosition;
			destination = stacksArray[i].destination;
			//moving with: 400*(destination-finek)
			stacksArray[i].dx = stacksArray[i].dx + 400*(destination-finek);
		}
	}

	drawStacks(stacksArray,targetImage,contexto,canvaso)
};

	

module.exports = {initiateStack,drawStacks,loadDestination,move};