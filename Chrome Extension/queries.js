var a = document.createElement('a');
var linkText = document.createTextNode("Reddit links");
a.appendChild(linkText);
a.title = "reddit";
a.href = "http://reddit.com/r/random/top";
document.body.appendChild(a);
