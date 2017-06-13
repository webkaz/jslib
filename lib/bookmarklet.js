javascript:

/**/
var init_key = "initJS";
var login_key= "loginConf";
var hub_html= "https://rawgit.com/webkaz/jslib/master/hub.html";
/*読込スクリプトの定義*/
var basket_src= "https://rawgit.com/addyosmani/basket.js/gh-pages/dist/basket.full.min.js";
var jquery_src= "https://code.jquery.com/jquery-3.1.1.min.js";
var cross_src= "https://rawgit.com/zendesk/cross-storage/master/dist/client.min.js";
var util_src= "https://rawgit.com/webkaz/jslib/master/lib/util.js";
var main_src= "https://rawgit.com/webkaz/jslib/master/lib/main.js";

var backetObj = [
{ url: cross_src, skipCache: true },
{ url: util_src, skipCache: true },
{ url: main_src, skipCache: true },
];
if (!window.jQuery) {
backetObj.push({ url: jquery_src, skipCache: true });
}

/*JQueryがロードされてから、読込と主処理を実行*/
var loadSctipts = function(src_arr){
basket
    .require.apply(this , backetObj)
    .then(function () {
    console.log('Call loginMain()');
    loginMain();
});
};

/*スクリプトのsrcを追加し、追加したエレメントを返す*/
var addScript = function (script){
var head = document.head || document.getElementsByTagName('head')[0];
var s = document.createElement("script");
s.type = "text/javascript";
  s.src = script;
head.appendChild(s);
return s;
};
addScript(basket_src).addEventListener("load", loadSctipts);

