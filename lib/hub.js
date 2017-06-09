/**/
var cross_hub	= "https://rawgit.com/zendesk/cross-storage/master/dist/hub.min.js";
var origins_src	= "https://gitlab.odessa.shar-red.net/j.yamawaki/bookmarklet/raw/master/lib/origins.js";
var login_conf = "login-conf";
var storage = window.localStorage;


basket
    .require({ url: cross_hub })
    .then(function () {
        CrossStorageHub.init(origins);
    }).then(function () {
        /*localStrageに設定があるかチェック*/
        alert(storage.getItem(login_conf));
        if(storage.getItem(login_conf) == null){
              alert('初期設定ファイルをドロップしてください。');
        }
});

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
      storage.setItem(login_conf , files[0])
      //FileUpload(files[0]);
  }
}
