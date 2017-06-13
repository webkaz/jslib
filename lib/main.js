/*主処理*/
function loginMain(){
	console.log("Connect to " + hub_html);
	var storage = new CrossStorageClient(hub_html);
	storage.onConnect()
	.then(function() {
		return storage.get(login_key);
	}).then(function(confStr) {
		var confObj = JSON.parse( confStr ,reciever);
	  	console.log("Loaded loginConf " + confObj);
	  	loginExecute(confObj)
	})['catch'](function(err) {
		console.log(err);
	});
}

/*処理の実体*/
var hostname = window.location.hostname;/*ホスト名*/
function loginExecute(confObj){
	var target = confObj.site[hostname]
	console.log("Target host is " + hostname);
	/*定義されていないurlの場合は終了*/
	if(target == undefined){ alert('サイト該当なし');return }
	
	/*ID/PASSが入力されている場合は、ローカルストレージに保存*/
	storage.get(target.pass_g).then(function(pass){
		if($(target.id).val()!="" && $(target.pass).val()!=""){
			storage.set(target.pass_g ,$(target.pass).val()).then(function(){
				alert("パスワードが保存されました。");
			});
			/*localStorage.setItem(target.pass_g ,$(target.pass).val() );*/
		}else{
			if(target.before != ""){target.before();}
			$(target.id).val(target.id_s);
			$(target.pass).val(pass);
			if(target.after != ""){target.after();}
			console.log('pass:' + pass);
		}
		$(target.login).click();
	});
}
