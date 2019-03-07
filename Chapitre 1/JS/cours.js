var h = document.head;
console.log(h);

var b = document.body;
console.log(b);

if(document.body.nodeType === document.ELEMENT_NODE){
    console.log("Body est un noeud élement")
}
else {
    console.log("Body est un noeud textuel")
}

console.log(document.body.childNodes[0]);
console.log(document.body.childNodes[1]);

for (var i = 0; i < document.body.childNodes.length; i++){
    console.log(document.body.childNodes[i]);
}


var h1 = document.body.childNodes[1];
console.log(h1.parentNode);

console.log(document.parentNode);