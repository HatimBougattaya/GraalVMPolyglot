const http = require('http');

function handler(req,res){

	let miniform = '';

	if(req.method == "GET"){
		//return the form



	}else if(req.method == "POST"){
		 //respond with tower(n,1,2,3);
		 req.on('data', function(info) {
	      //grab form data as string
	      var formdata = info.toString();
	      //console.log(formdata);

	      //grab n value
	      var n = eval(formdata.split("&")[0]);

		}

};

http.createServer(handler).listen(8000, function(err){
  if(err){
    console.log('Error starting http server');
  } else {
    console.log("Server running at http://localhost:8000/");
  };
});