chrome.browserAction.onClicked.addListener(function(tabs){
  var newURL = "http://reddit.com/r/random/top";
  var newURL2 = "popup.html";
  for(var i = 0;i<5;i++)
	chrome.tabs.create({ url: newURL });
});