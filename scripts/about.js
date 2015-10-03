// JavaScript Document
//about
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

function showSection(id){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("section")) return false;
	var sections=document.getElementsByTagName("section");
	for (var i=0; i<sections.length;i++)
	{
		//alert(sections[i].getAttribute("id"));
		if(sections[i].getAttribute("id")!=id)
		{
			sections[i].style.display=="none";//第一次点击Jay,第二次点击The domsters为什么这个sections[0].style.display没有变为none?
			}
			else{
				sections[i].style.display="block";
				}
		//alert(sections[i].style.display);
		}
	}
function prepareInternalNav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("article")) return false;
	var articles=document.getElementsByTagName("article");
	var navs=articles[0].getElementsByTagName("nav");
	var linklist=navs[0].getElementsByTagName("a");
	for(var i=0;i<linklist.length;i++)
	{
		var linkSrc=linklist[i].getAttribute("href");
		//array=string.split("分隔符")
		var sectionId=linkSrc.split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		linklist[i].destination=sectionId;
		linklist[i].onclick=function(){
			//alert(this.destination);
			
			showSection(this.destination);
			//alert(this.destination);
			return false;
			}
		}
	}
addLoadEvent(createHere);
addLoadEvent(prepareInternalNav);