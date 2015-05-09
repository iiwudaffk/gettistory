function getImage() {
	var a = document.getElementById('content');
	var b = a.getElementsByTagName('img');
	var c =[];
	for (i = 0; i < b.length; ++i) {
	  if(b[i].getAttribute('width')>300&&b[i].getAttribute('height')>300 || b[i].name=='zb_target_resize') {
		c.push(b[i].getAttribute('src').replace(/image/i,"original"));
		}
	}
	return c;
}

//var p = ["http://cfile28.uf.tistory.com/original/211D8136538D44E226E151", "http://cfile23.uf.tistory.com/original/24365C36538D44E9178AF0", "http://cfile30.uf.tistory.com/original/24051936538D44F033D137", "http://cfile1.uf.tistory.com/original/22341136538D44F719CE41", "http://cfile8.uf.tistory.com/original/273F2F36538D44FD1343A6","http://cfile8.uf.tistory.com/original/21773137538D461B34D419", "http://cfile7.uf.tistory.com/original/211D243A538D462131EAD0"];

function createImage(imgUrl,divShowImg) {
    var imgs = [];
	
	var div = document.createElement('div');
	for (i = 0; i < imgUrl.length; ++i){
		var tagimg = document.createElement('img');
		tagimg.src = imgUrl[i];
		div.appendChild(tagimg);
	} 

	// var element = document.getElementsByTagName("body");
	// console.log(element);
	// element.appendChild(div);
	//document.body.appendChild(div);
	
	var a = document.getElementById(divShowImg);
	a.appendChild(div);	
}

var p = getImage();
console.log(p);
//createImage(p);

//alert("contentscript");



var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);

function getText(){
    return document.body.innerText
}
function getHTML(){
    return document.body.outerHTML
}
//console.log(getText());             //Gives you all the text on the page
//console.log(getHTML()); 

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "getText"){
            sendResponse({data: document.all[0].innerText, method: "getText"}); //same as innerText
        }
		else if(request.method == "getImage") {
            sendResponse({data: getImage(), method: "getImage"}); 

		}
    }
);
// <div id="dialog" title="Basic dialog">
  // <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the 'x' icon.</p>
// </div>

  $(function() {
	var div = document.createElement('div');
	div.id = "jdialog";
	document.body.appendChild(div);
    $( "#jdialog" ).dialog({
		width: 800,
		height: 600
	});
	$( "#jdialog" ).focus();
	createImage(getImage(),"jdialog");
  });
