/*例：str= JSON.stringify(obj, replacer)*/
function replacer (k,v){ 
 if(typeof v === "function"){ return v.toString() }; 
  return v ;
}

/*例：var a = JSON.parse( a ,reciever)*/
function reciever (k,v ) {  
  if ( typeof v === "string" && v.match(/^function/) ){
    return Function.call(this, "return "+ v  )();
  }
  return v 
}

/*スクリプトのsrcを追加し、追加したエレメントを返す*/
var addScript = function (script){
	var s;
	s = document.createElement("script");
	s.type = "text/javascript";
  	s.src = script;
	document.body.appendChild(s);
	return s;
};
/*スクリプトの文字列を追加する*/
var addScriptString = function (scriptString){
		var head = document.head || document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.defer = true;
		// Have to use .text, since we support IE8,
		// which won't allow appending to a script
		script.text = scriptString;
		head.appendChild( script );
		return script;
};
