// JavaScript Document     //尝试用Ajax实现每个页面切换的交互
//fundalmental function
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

//home
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
/*function prepareAjax(){
	var navs = document.getElementsByTagName("nav");
	var links = navs[0].getElementsByTagName("a");
	links[0].onclick = 
}

function ajax(href){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(e){
		xhr = new ActiveXobject("Msxml2.XMLHTTP.6.0");
	}
	xhr.open('get','href',true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState = 4){
			
		}
	};
}*/
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

//about
function showSection(id){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("section")) return false;
	var sections=document.getElementsByTagName("section");
	for (var i=0; i<sections.length;i++)
	{
		//alert(sections[i].getAttribute("id"));
		//alert(id);
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

//Photos
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

//live
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

// Contact

function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function resetFields(whichform) {
  if (Modernizr.input.placeholder) return;
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.getAttribute('placeholder')) continue;
    element.onfocus = function() {
    if (this.value == this.getAttribute('placeholder')) {
      this.value = "";
     }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}

function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.getAttribute("required") == 'required') {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.getAttribute("type") == 'email') {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function isFilled(field) {
  return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}

// Ajax

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {}
      return false;
  }
  return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    // Remove the existing content.
  while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
  }
  //  Create a loading image.
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  // Append the loading element.
  element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {
  
  var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');

  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
          var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
          if (matches.length > 0) {
            thetarget.innerHTML = matches[1];
          } else {
            thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
          }
        } else {
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
    }
  };

  request.send(data);
   
  return true;
};


function loadEvents(){
	 var bodys=document.getElementsByTagName("body");
	 var bodysId=bodys[0].getAttribute("id");
	 if (bodysId=="home"){
		 prepareSlideShow();
		 }
	 if(bodysId=="about"){
		 prepareInternalNav();
		 }
	 if(bodysId=="photos"){
		 preparePlaceHolder();
		 showPic();
		 }
	 if(bodysId=="live"){
		 stripeTables();
		 highlightRows();
		 displayAbbr();
		 }
	 if(bodysId=="contact"){
		 focusLabels();
		 prepareForms();
		 }
	}
addLoadEvent(createHere);
//addLoadEvent(preparePlaceHolder);
//addLoadEvent(prepareSlideShow);
//addLoadEvent(prepareInternalNav);
addLoadEvent(loadEvents);
/*addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
addLoadEvent(displayAbbr);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);*/


/*window.onload=function(){
	createHere();
	prepareSlideShow();
	prepareInternalNav();
	preparePlaceHolder();
}*/
	