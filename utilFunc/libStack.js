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
				//125 for the margin && towersdx to place in tower on iinitail position
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



//Know if a row is empty && Get the first disc's in a row id 
function minANDgetBros(imagesArray,row){
	//initalise with any value 
	let index = imagesArray[0];
	let found = false;

	for (i=0;i<imagesArray.length;i++){
		switch(found){
			case false :
				if (row==imagesArray[i].currentPosition  ){
					index = imagesArray[i];
					found=true;	
				}
			case true :
				if ((imagesArray[i].width < index.width) && row==imagesArray[i].currentPosition ){ 
					index = imagesArray[i];
				}
		}
		
	}
	return [found,index.id];
};

//stacks moving theo 
function loadDestination(stacksArray,finek,destination){
	//check possible move
	//pick stack with min width we should move with minANDgetBros
	let truth = minANDgetBros(stacksArray,finek);
	//move the image
	if(truth[0]==true){
		let targetPosition = stacksArray.findIndex(element => element.id==truth[1] );
		//the stack we need: console.log(stacksArray[targetPosition]);
		console.log("destination: "+destination);
		stacksArray[targetPosition].destination = destination;	
	}
	//the stack with his new destination : 
	//console.log(stacksArray);
	return stacksArray;
};

function orderDestinationTower(stacksArray,destination){
	//IMPORTANT: sum will never be 0 since we call this function AFTER  we move a stack object
	let sum = 0;
	for (i=0;i<stacksArray.length;i++){
		if (stacksArray[i].currentPosition==destination){
			sum++;
		}
	}
	return sum ;
};

//function rules()

function move(stacksArray,targetImage,contexto,canvaso) {
	let destination = 0;
	let finek = 0;
	let tempo = [];
	let clone =stacksArray;

	for(j=0;j<stacksArray.length;j++){
		if(stacksArray[j].currentPosition != stacksArray[j].destination){
			//add a rule: you cant move a disc on top of a smaller one
			tempo = minANDgetBros(stacksArray,stacksArray[j].destination);
			//condition : there is a stack in the destination row to compare with
			if (tempo[0]) {
				//compare the current upper stack with upper stack in the destination row
				//the stack with min(id) has max(width) 
				if(tempo[1] < stacksArray[j].id ){
					//movement
					finek = stacksArray[j].currentPosition;
					destination = stacksArray[j].destination;
					//moving with: 400*(destination-finek)
					stacksArray[j].dx = stacksArray[j].dx + 400*(destination-finek);
					//update current position
					stacksArray[j].currentPosition= destination;
					//Test rank :console.log(orderDestinationTower(stacksArray,destination));
					//update dy
					stacksArray[j].dy = 480 -20*(orderDestinationTower(stacksArray,destination)-1);		
				}

			} else {					
					finek = stacksArray[j].currentPosition ;
					destination = stacksArray[j].destination;
					//moving with: 400*(destination-finek)
					stacksArray[j].dx = stacksArray[j].dx + 400*(destination-finek);
					//update current position
					stacksArray[j].currentPosition= destination;
					//Test rank :console.log(orderDestinationTower(stacksArray,destination));
					//update dy
					stacksArray[j].dy = 480 -20*(orderDestinationTower(stacksArray,destination)-1);
			}
		}
	}

	drawStacks(stacksArray,targetImage,contexto,canvaso);
};

	

module.exports = {initiateStack,drawStacks,loadDestination,move,orderDestinationTower};