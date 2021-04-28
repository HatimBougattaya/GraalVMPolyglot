//the response 

//imports
const {initiateTower,initiateStack} = require("./utilFunc/libTower");


//initiate tower && variables

var algoBro = Java.type('Algo');

var changes = algoBro.moving();

//Stacks morph
//user input
var actualStacks =[];

let stacks = 0;


//**************************************************Event**************************************************
//button start onclick function call services


//stacks input && intiate the acual ones
actualStacks = initiateTowerGraph(stacks);

//Enable sync with java
algoBro.watch("changes",function(id, old, cur) {
	 //see the actual work done
	 console.log("Changed property: ", id);
	 console.log("Original val: ", old);
	 console.log("New val: ", cur);

	 //move and load

});

//lets go 
algoBro.tower(stacks,1,2,3);

