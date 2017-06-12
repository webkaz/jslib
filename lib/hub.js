/**/
var cross_hub	= "https://rawgit.com/zendesk/cross-storage/master/dist/hub.min.js";
var util_js	= "lib/util.js";
var init_key = "loginConf";
var conf;
var storage = window.localStorage;

basket
    .require({ url: cross_hub },{ url: util_js })
    .then(function () {
    	console.log('check storage');
    	if(storage.getItem(init_key) == null){
        	alert('初期設定ファイルをドロップしてください。');
        }else{
        	console.log('load js from localStorage');
            addScriptString( storage.getItem(init_key) );
            /*存在する場合は、JSONのロード
            console.log('load conf from localStorage');
        	conf = JSON.parse(storage.getItem(init_key) ,reciever);
            */
        }
     }).then(function () {
     	if(conf.origins == undefined || conf.login == undefined){
        	console.log('設定ファイルのフォーマットが不正。');
        	return;
        }
 		console.log('init CrossStorageHub');
    	CrossStorageHub.init(conf.origins);
});

/*設定値を返す*/
function getConf() {
  return conf.login;
}

// ブラウザ上でファイルを展開する挙動を抑止
function onDragOver(event) {
  event.preventDefault();
}

// Drop領域にドロップしたファイル情報を読み取り
function onDrop(event) {
  // ブラウザ上でファイルを展開する挙動を抑止
  event.preventDefault();

  // ドロップされたファイルのfilesプロパティを参照
  var files = event.dataTransfer.files;
  if (files.length == 1) {
      console.log("Droped file:" + files[0].name + ":" + files[0].size);
      storage.setItem(init_key , files[0]);
      /*storage.setItem(init_key , JSON.stringify( files[0] , replacer));*/
  }
}
