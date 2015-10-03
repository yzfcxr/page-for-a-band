// JavaScript Document
//photos
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!="function"){
		window.onload=func;
		}
		else{
		window.onload=function(){
			oldonload();
			func();
			}	
			}
	}
	
function insertAfter(newElement,targetElement){
	var parentElement=targetElement.parentNode;
	if(parentElement.lastChild==targetElement){
		parentElement.appendChild(newElement);
		}
		else{
			parentElement.insertBefore(newElement,targetElement.nextSibling);
			}
	}

function addClass(element,value){
	var newClassName;
	if(!element.className){
		element.className=value;
		}
		else{
			newClassName=element.className;
			newClassName+=" ";
			newClassName+=value;
			element.className=newClassName;
			}
	}
	
function createHere(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("header")) return false;
	if(!document.getElementsByTagName("nav")) return false;
	if(!document.getElementsByTagName("a")) return false;
	var headers=document.getElementsByTagName("header");
	var navs=headers[0].getElementsByTagName("nav");
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!= -1){
			//给nav的链接加上here的class属性
			links[i].className="here";
			//给每个页面的body加上id属性
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
			}
		}
	}


function preparePlaceHolder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var imagegallery=document.getElementById("imagegallery");
	var placeHolder=document.createElement("img");
	placeHolder.setAttribute("id","placeHolder");
	placeHolder.setAttribute("src","images/placeholder.gif");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var text=document.createTextNode("choose an image");
	description.appendChild(text);
	//imagegallery.parentNode.appendChild(description);
	//imagegallery.parentNode.appendChild(placeHolder);
	insertAfter(description,imagegallery);
	insertAfter(placeHolder,description);
	}
	
function showPic(){
	var imagegallery=document.getElementById("imagegallery");
	var linklist=imagegallery.getElementsByTagName("a");
	for(var i=0;i<linklist.length;i++)
	{
		linklist[i].imageDirection=linklist[i].getAttribute("href");
		linklist[i].descDirection=linklist[i].getAttribute("title");
		linklist[i].onclick=function(){
			var placeHolder=document.getElementById("placeHolder");
			var description=document.getElementById("description");
			description.lastChild.nodeValue=this.descDirection;
			placeHolder.setAttribute("src",this.imageDirection);
			return false;
			}
		}
	}
addLoadEvent(createHere);
addLoadEvent(preparePlaceHolder);
addLoadEvent(showPic);