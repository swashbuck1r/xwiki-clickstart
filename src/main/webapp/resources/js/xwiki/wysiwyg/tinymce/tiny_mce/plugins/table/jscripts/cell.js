function init(){tinyMCEPopup.resizeToInnerSize();
document.getElementById("backgroundimagebrowsercontainer").innerHTML=getBrowserHTML("backgroundimagebrowser","backgroundimage","image","table");
document.getElementById("bordercolor_pickcontainer").innerHTML=getColorPickerHTML("bordercolor_pick","bordercolor");
document.getElementById("bgcolor_pickcontainer").innerHTML=getColorPickerHTML("bgcolor_pick","bgcolor");
var g=tinyMCE.selectedInstance;
var i=tinyMCE.getParentElement(g.getFocusElement(),"td,th");
var h=document.forms[0];
var o=tinyMCE.parseStyle(tinyMCE.getAttrib(i,"style"));
var e=i.nodeName.toLowerCase();
var j=tinyMCE.getAttrib(i,"align");
var l=tinyMCE.getAttrib(i,"valign");
var b=trimSize(getStyle(i,"width","width"));
var m=trimSize(getStyle(i,"height","height"));
var f=convertRGBToHex(getStyle(i,"bordercolor","borderLeftColor"));
var q=convertRGBToHex(getStyle(i,"bgcolor","backgroundColor"));
var k=tinyMCE.getVisualAidClass(tinyMCE.getAttrib(i,"class"),false);
var p=getStyle(i,"background","backgroundImage").replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1");
var a=tinyMCE.getAttrib(i,"id");
var c=tinyMCE.getAttrib(i,"lang");
var d=tinyMCE.getAttrib(i,"dir");
var n=tinyMCE.getAttrib(i,"scope");
addClassesToList("class","table_cell_styles");
h.bordercolor.value=f;
h.bgcolor.value=q;
h.backgroundimage.value=p;
h.width.value=b;
h.height.value=m;
h.id.value=a;
h.lang.value=c;
h.style.value=tinyMCE.serializeStyle(o);
selectByValue(h,"align",j);
selectByValue(h,"valign",l);
selectByValue(h,"class",k);
selectByValue(h,"celltype",e);
selectByValue(h,"dir",d);
selectByValue(h,"scope",n);
if(isVisible("backgroundimagebrowser")){document.getElementById("backgroundimage").style.width="180px"
}updateColor("bordercolor_pick","bordercolor");
updateColor("bgcolor_pick","bgcolor")
}function updateAction(){tinyMCEPopup.restoreSelection();
var c=tinyMCE.selectedInstance;
var e=tinyMCE.getParentElement(c.getFocusElement(),"td,th");
var h=tinyMCE.getParentElement(c.getFocusElement(),"tr");
var f=tinyMCE.getParentElement(c.getFocusElement(),"table");
var d=document.forms[0];
c.execCommand("mceBeginUndoLevel");
switch(getSelectValue(d,"action")){case"cell":var b=getSelectValue(d,"celltype");
var j=getSelectValue(d,"scope");
if(tinyMCE.getParam("accessibility_warnings")){if(b=="th"&&j==""){var l=confirm(tinyMCE.getLang("lang_table_missing_scope","",true))
}else{var l=true
}if(!l){return
}}updateCell(e);
break;
case"row":var g=h.firstChild;
if(g.nodeName!="TD"&&g.nodeName!="TH"){g=nextCell(g)
}do{g=updateCell(g,true)
}while((g=nextCell(g))!=null);
break;
case"all":var k=f.getElementsByTagName("tr");
for(var a=0;
a<k.length;
a++){var g=k[a].firstChild;
if(g.nodeName!="TD"&&g.nodeName!="TH"){g=nextCell(g)
}do{g=updateCell(g,true)
}while((g=nextCell(g))!=null)
}break
}tinyMCE.handleVisualAid(c.getBody(),true,c.visualAid,c);
tinyMCE.triggerNodeChange();
c.execCommand("mceEndUndoLevel");
tinyMCEPopup.close()
}function nextCell(a){while((a=a.nextSibling)!=null){if(a.nodeName=="TD"||a.nodeName=="TH"){return a
}}return null
}function updateCell(d,i){var g=tinyMCE.selectedInstance;
var h=document.forms[0];
var b=d.nodeName.toLowerCase();
var f=getSelectValue(h,"celltype");
var m=g.getDoc();
if(!i){d.setAttribute("id",h.id.value)
}d.setAttribute("align",h.align.value);
d.setAttribute("vAlign",h.valign.value);
d.setAttribute("lang",h.lang.value);
d.setAttribute("dir",getSelectValue(h,"dir"));
d.setAttribute("style",tinyMCE.serializeStyle(tinyMCE.parseStyle(h.style.value)));
d.setAttribute("scope",h.scope.value);
tinyMCE.setAttrib(d,"class",getSelectValue(h,"class"));
tinyMCE.setAttrib(d,"width","");
tinyMCE.setAttrib(d,"height","");
tinyMCE.setAttrib(d,"bgColor","");
tinyMCE.setAttrib(d,"borderColor","");
tinyMCE.setAttrib(d,"background","");
d.style.width=getCSSSize(h.width.value);
d.style.height=getCSSSize(h.height.value);
if(h.bordercolor.value!=""){d.style.borderColor=h.bordercolor.value;
d.style.borderStyle=d.style.borderStyle==""?"solid":d.style.borderStyle;
d.style.borderWidth=d.style.borderWidth==""?"1px":d.style.borderWidth
}else{d.style.borderColor=""
}d.style.backgroundColor=h.bgcolor.value;
if(h.backgroundimage.value!=""){d.style.backgroundImage="url('"+h.backgroundimage.value+"')"
}else{d.style.backgroundImage=""
}if(b!=f){var e=m.createElement(f);
for(var k=0;
k<d.childNodes.length;
k++){e.appendChild(d.childNodes[k].cloneNode(1))
}for(var l=0;
l<d.attributes.length;
l++){var j=d.attributes[l];
e.setAttribute(j.name,j.value)
}d.parentNode.replaceChild(e,d);
d=e
}return d
}function changedBackgroundImage(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
b["background-image"]="url('"+a.backgroundimage.value+"')";
a.style.value=tinyMCE.serializeStyle(b)
}function changedSize(){var b=document.forms[0];
var c=tinyMCE.parseStyle(b.style.value);
var d=b.width.value;
if(d!=""){c.width=getCSSSize(d)
}else{c.width=""
}var a=b.height.value;
if(a!=""){c.height=getCSSSize(a)
}else{c.height=""
}b.style.value=tinyMCE.serializeStyle(c)
}function changedColor(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
b["background-color"]=a.bgcolor.value;
b["border-color"]=a.bordercolor.value;
a.style.value=tinyMCE.serializeStyle(b)
}function changedStyle(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
if(b["background-image"]){a.backgroundimage.value=b["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1")
}else{a.backgroundimage.value=""
}if(b.width){a.width.value=trimSize(b.width)
}if(b.height){a.height.value=trimSize(b.height)
}if(b["background-color"]){a.bgcolor.value=b["background-color"];
updateColor("bgcolor_pick","bgcolor")
}if(b["border-color"]){a.bordercolor.value=b["border-color"];
updateColor("bordercolor_pick","bordercolor")
}};