/*例：str= JSON.stringify(obj, replacer)*/
function replacer (k,v){ 
 e if(typeof v === "function"){ return v.toString() }; 
  return v ;
}

/*例：var a = JSON.parse( a ,reciever)*/
function reciever (k,v ) {  
  if ( typeof v === "string" && v.match(/^function/) ){
    return Function.call(this, "return "+ v  )();
  }
  return v 
}

/*スクリプトを追加し、追加したエレメントを返す*/
var addScript = function (script){
	var s;
	s = document.createElement("script");
	s.type = "text/javascript";
  	s.src = script;
	document.body.appendChild(s);
	return s;
};
