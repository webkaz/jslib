/**/
var cross_hub	= "https://rawgit.com/zendesk/cross-storage/master/dist/hub.min.js";
var init_conf = "init-conf";
var conf;
var storage = window.localStorage;

basket
    .require({ url: cross_hub })
    .then(function () {
    	console.log('check storage');
    	if(storage.getItem(init_conf) == null){
        	alert('初期設定ファイルをドロップしてください。');
        }else{
        	/*存在する場合は、JSONのロード*/
        	console.log('load conf from localStorage');
        	conf = JSON.parse(storage.getItem(init_conf));
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
      alert(files[0].name + ":" + files[0].size);
      storage.setItem(init_conf , JSON.stringify( files[0] ));
  }
}
