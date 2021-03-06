/**/
var cross_hub	= "https://rawgit.com/zendesk/cross-storage/master/dist/hub.min.js";
var util_js	= "lib/util.js";
var init_key = "initJS";
var login_key= "loginConf";
var script;
var conf;
var storage = window.localStorage;

basket
    .require({ url: cross_hub },{ url: util_js, skipCache: true })
    .then(function () {
    	console.log('check storage');
    	if(storage.getItem(init_key) == null){
        	alert('初期設定ファイルをドロップしてください。');
        }else{
        	console.log('load js from localStorage');
        	script = storage.getItem(init_key);
            /*存在する場合は、JSONのロード
            console.log('load conf from localStorage');
        	conf = JSON.parse(storage.getItem(init_key) ,reciever);
            */
        }
     }).then(function () {
     	console.log('add script start');
     	addScriptString( script );
     	console.log('add script end');
     }).then(function () {
     	if(conf.origins == undefined || conf.login == undefined){
        	console.log('設定ファイルのフォーマットが不正。');
        	return;
        }
        storage.setItem(login_key ,JSON.stringify(conf.login, replacer));
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
    if(!files[0].type.match(/javascript/)){
    alert('テキストファイルを' + '選んで下さい');
    return;
  }
    var reader = new FileReader();
    reader.onload = function(evt) {
        console.log('set js from localStorage');
        storage.setItem(init_key , evt.target.result);
        alert('初期設定ファイルを登録しました。');
        location.reload();
        /*storage.setItem(init_key , JSON.stringify( files[0] , replacer));*/
    }
    reader.readAsText(files[0], "UTF-8");
  }
}
