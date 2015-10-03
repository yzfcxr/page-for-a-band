// JavaScript Document
//home
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

function moveElement(elementId,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementId)) return false;
	var moveElem=document.getElementById(elementId);
	if(moveElem.movement){clearTimeout(moveElem.movement);}
	if(!moveElem.style.left) moveElem.style.left="0px";
	if(!moveElem.style.top) moveElem.style.top="0px";
	var xpos=parseInt(moveElem.style.left);
	var ypos=parseInt(moveElem.style.top);
	if(xpos<final_x) xpos+=Math.ceil((final_x-xpos)/10);
	if(xpos>final_x) xpos-=Math.ceil((xpos-final_x)/10);
	if(ypos<final_y) ypos+=Math.ceil((final_y-ypos)/10);
	if(ypos>final_y) ypos-=Math.ceil((ypos-final_y)/10);
	moveElem.style.left=xpos+"px";
	moveElem.style.top=ypos+"px";
	var repeat="moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	moveElem.movement=setTimeout(repeat,interval);
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
	
function prepareSlideShow(){
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.getElementById("intro")) return false;
	var slideShow=document.createElement("div");
	slideShow.setAttribute("id","slideshow")
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("id","frame");
	slideShow.appendChild(frame);
	var slideShowImage=document.createElement("img");
	slideShowImage.setAttribute("src","images/slideshow.gif");//为什么javascirpt找图片的时候不用加../images，而CSS要加？因为js是给HTML写属性，所以按HTML的路径找。
	slideShowImage.setAttribute("alt","Jay Skript");
	slideShowImage.setAttribute("id","preview");
	slideShow.appendChild(slideShowImage);
	var intro=document.getElementById("intro");
	insertAfter(slideShow,intro);
	//编写P元素中链接的响应
	var linklist=document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<linklist.length;i++)
	{
		linklist[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,10);
				}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,10);
				}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,10);
				}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,10);
				}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,10);
				}
			}
		
		}
	}
addLoadEvent(createHere);
addLoadEvent(prepareSlideShow);