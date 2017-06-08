/**/
var cross_hub	= "https://rawgit.com/zendesk/cross-storage/master/dist/hub.min.js";
var origins_src	= "https://gitlab.odessa.shar-red.net/j.yamawaki/bookmarklet/raw/master/lib/origins.js";
basket
    .require({ url: cross_hub },{ url: origins_src })
    .then(function () {
      CrossStorageHub.init(origins);
});
