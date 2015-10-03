// JavaScript Document
//live
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

function stripeTables(){
	var tbodys=document.getElementsByTagName("tbody");
	var trs=tbodys[0].getElementsByTagName("tr");
	var flag=false;
	for(var i=0;i<trs.length;i++)
	{
		if(flag==true){
			addClass(trs[i],"odd");
			flag=false;
			}else
			flag=true;
		}
	}
function highlightRows(){
	var tbodys=document.getElementsByTagName("tbody");
	var trs=tbodys[0].getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++)
	{
		trs[i].oldClassName=trs[i].className;
		trs[i].onmouseover=function(){
			addClass(this,"highlight");
			}
		trs[i].onmouseout=function(){
			this.className=this.oldClassName;
			}
		}
	}
	
function displayAbbr(){
	var tbodys=document.getElementsByTagName("tbody");
	var abbrs=tbodys[0].getElementsByTagName("abbr");
	var defs=new Array();
	for(var i=0;i<abbrs.length;i++)
	{
		var key=abbrs[i].lastChild.nodeValue;
		defs[key]=abbrs[i].getAttribute("title");
		}
	var deftab=document.createElement("dl");
	for(key in defs){
		var dtitle=document.createElement("dt");
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement("dd");
		var ddesc_text=document.createTextNode(defs[key]);
		ddesc.appendChild(ddesc_text);
		deftab.appendChild(dtitle);
		deftab.appendChild(ddesc);
		}
	var header=document.createElement("h3");
	var header_text=document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var tables=document.getElementsByTagName("table");
	insertAfter(header,tables[0]);
	insertAfter(deftab,header);
	}

addLoadEvent(createHere);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbr);