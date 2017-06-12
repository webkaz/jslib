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

