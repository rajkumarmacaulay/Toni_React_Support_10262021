const express = require('express');
const multer = require("multer");
const bodyparser= require('body-parser');
var app =  express();
var upload = multer();

app.use(express.json());
app.use(upload.array());
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: true }));



// Post function for inbound/outbound
app.post('/mask/:value', function (req, res){

  //Data Initialization 
    var param = req.params.value;
    var string = req.body;
    console.log(string);
   
    var arr;

    //Inbound part
    if(param == "inbound"){        

      string=JSON.stringify(string);
    
      string =string.replace(/(\d[ -]*){14,}/g, function(match, capture) {
        return new Array(match.length-4).join("*") + capture;
      });

      string =string.replace( /\b(\d{3,4})\b/g,function(match, capture) { 
        return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
      });
      
      arr =string.replace( /(((\d{4}[ \-]?){3,4})|(\d{3}[\-|\s]?\d {5}[\-|\s]?\d{7})|\d{7,16} )/g,
      function(match, capture) { 
        return new Array(match.length-3).join("*") + capture.substr(capture.length-3);
      });
      arr = JSON.parse(arr); 
   
    }



    //Outbound part
    else if( param == "outbound" ){
        const map = new Map();
        string=JSON.stringify(string);
        string =string.replace(/(\d[ -]*){14,}/g, function(match, capture) {
          return new Array(match.length-4).join("*") + capture;
        });
        // string =string.split(" ");
        
      string  =string.replace( /\b(\d{3,4})\b/g,function(match, capture) { 
        return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
      });
      

        // arr =string.forEach(each => {each.replace( /\b((?:pin|cvv|nip|PIN|CVV|NIP)\s*)\d{3,4}\b/g,
        // function(match, capture) { 
        //   return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
        // })});
        
        arr =string.replace( /(((\d{4}[ \-]?){3,4})|(\d{3}[\-|\s]?\d {5}[\-|\s]?\d{7})|\d{7,16} )/g,
        function(match, capture) { 
          return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
        });        
        arr = JSON.parse(arr); 
       
      }
    
    
    //Error Part
    else{
      arr="Enter correct url";
      // arr.push(res.status=500);
    }          
     res.json(arr);
    });


  //Server listener
  app.listen(8000,() => {
    console.log(`Now listening on port 8000`)});