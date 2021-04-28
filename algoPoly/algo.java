/********************************************************************************

		THE ALGORITHM SOLVING TOWER OF HANOI PROBLEM

*********************************************************************************/

public class Algo{

	// we can track movements
	private int state;
	//we dont really need a vector just the destination
	private int travelVector;

	//constructor

	//solution
	public void tower(int n,int source,int median, int target){
		if(n==1){
			//last move
			System.out.println(source+" "+target);
		}else{
			//iteration n-1 to median                               
			tower(n-1,source,target,median);
			

			//n to target
			this.moving();
			//audit
			this.travelVector = target ;
														//in jsPoly:: System out == movePicture
			System.out.println(source+" "+target);

			
			//progress ::::::::::::
			//System.out.println("******progress------>"+n+"	"+source+"	"+median+"	"+target);
			
			//n-1 to target
			tower(n-1,median,source,target);
		}
	}
	public int moving(){
		//maybe post incrementation is better in this polyglot situation
		return state++;
	}
	public int progress(){
		return state;
	}
	public int destination(){
		return travelVector;
	}
}