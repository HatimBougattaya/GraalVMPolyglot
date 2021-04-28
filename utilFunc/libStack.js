
/*
	
	Manipulat stacks in towers 

*/

//intiate stacks
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

//draw ACTUAL STACKS
function drawStacks(actualStacks,targetImage,contexto,canvaso){
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
	
	for (int i=0; i<imagesArray.length){
		switch(found){
			case 0 :
				if (row==imagesArray[i].currrentPosition  ){
					index = imagesArray[i];
				}
			case 1 :
				if ((imagesArray[i].id > index.id) && row==imagesArray[i].currrentPosition ){
					index = imagesArray[i];
				}
		}
		
	}
	return index.id;
};

//stacks moving theo 
function move(imagesArray,finek,destination){
	//pick stack with min width we should move with finek
	//move the image
	let targetPosition = imagesArray.findIndex(element => element.id==minANDgetBros(imagesArray,finek) )
	imagesArray[targetPosition].currrentPosition = destination;
} ;

//actual stacks moving
function actualmove(imagesArray,finek,destination) {
	//theor move 
	move(imagesArray,finek,destination);
	//canvas manipulation

}
