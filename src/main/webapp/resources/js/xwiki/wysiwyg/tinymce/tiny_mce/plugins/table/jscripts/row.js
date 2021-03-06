function init(){tinyMCEPopup.resizeToInnerSize();
document.getElementById("backgroundimagebrowsercontainer").innerHTML=getBrowserHTML("backgroundimagebrowser","backgroundimage","image","table");
document.getElementById("bgcolor_pickcontainer").innerHTML=getColorPickerHTML("bgcolor_pick","bgcolor");
var e=tinyMCE.selectedInstance;
var j=tinyMCE.getParentElement(e.getFocusElement(),"tr");
var f=document.forms[0];
var l=tinyMCE.parseStyle(tinyMCE.getAttrib(j,"style"));
var c=j.parentNode.nodeName.toLowerCase();
var g=tinyMCE.getAttrib(j,"align");
var i=tinyMCE.getAttrib(j,"valign");
var k=trimSize(getStyle(j,"height","height"));
var h=tinyMCE.getVisualAidClass(tinyMCE.getAttrib(j,"class"),false);
var n=convertRGBToHex(getStyle(j,"bgcolor","backgroundColor"));
var m=getStyle(j,"background","backgroundImage").replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1");
var a=tinyMCE.getAttrib(j,"id");
var b=tinyMCE.getAttrib(j,"lang");
var d=tinyMCE.getAttrib(j,"dir");
addClassesToList("class","table_row_styles");
f.bgcolor.value=n;
f.backgroundimage.value=m;
f.height.value=k;
f.id.value=a;
f.lang.value=b;
f.style.value=tinyMCE.serializeStyle(l);
selectByValue(f,"align",g);
selectByValue(f,"valign",i);
selectByValue(f,"class",h);
selectByValue(f,"rowtype",c);
selectByValue(f,"dir",d);
if(isVisible("backgroundimagebrowser")){document.getElementById("backgroundimage").style.width="180px"
}updateColor("bgcolor_pick","bgcolor")
}function updateAction(){tinyMCEPopup.restoreSelection();
var f=tinyMCE.selectedInstance;
var g=tinyMCE.getParentElement(f.getFocusElement(),"tr");
var b=tinyMCE.getParentElement(f.getFocusElement(),"table");
var a=document.forms[0];
var e=getSelectValue(a,"action");
f.execCommand("mceBeginUndoLevel");
switch(e){case"row":updateRow(g);
break;
case"all":var d=b.getElementsByTagName("tr");
for(var c=0;
c<d.length;
c++){updateRow(d[c],true)
}break;
case"odd":case"even":var d=b.getElementsByTagName("tr");
for(var c=0;
c<d.length;
c++){if((c%2==0&&e=="odd")||(c%2!=0&&e=="even")){updateRow(d[c],true,true)
}}break
}tinyMCE.handleVisualAid(f.getBody(),true,f.visualAid,f);
tinyMCE.triggerNodeChange();
f.execCommand("mceEndUndoLevel");
tinyMCEPopup.close()
}function updateRow(g,h,j){var e=tinyMCE.selectedInstance;
var f=document.forms[0];
var a=g.parentNode.nodeName.toLowerCase();
var b=getSelectValue(f,"rowtype");
var l=e.getDoc();
if(!h){g.setAttribute("id",f.id.value)
}g.setAttribute("align",getSelectValue(f,"align"));
g.setAttribute("vAlign",getSelectValue(f,"valign"));
g.setAttribute("lang",f.lang.value);
g.setAttribute("dir",getSelectValue(f,"dir"));
g.setAttribute("style",tinyMCE.serializeStyle(tinyMCE.parseStyle(f.style.value)));
tinyMCE.setAttrib(g,"class",getSelectValue(f,"class"));
g.setAttribute("background","");
g.setAttribute("bgColor","");
g.setAttribute("height","");
g.style.height=getCSSSize(f.height.value);
g.style.backgroundColor=f.bgcolor.value;
if(f.backgroundimage.value!=""){g.style.backgroundImage="url('"+f.backgroundimage.value+"')"
}else{g.style.backgroundImage=""
}if(a!=b&&!j){var n=g.cloneNode(1);
var c=tinyMCE.getParentElement(g,"table");
var k=b;
var m=null;
for(var d=0;
d<c.childNodes.length;
d++){if(c.childNodes[d].nodeName.toLowerCase()==k){m=c.childNodes[d]
}}if(m==null){m=l.createElement(k);
if(k=="thead"){c.insertBefore(m,c.firstChild)
}else{c.appendChild(m)
}}m.appendChild(n);
g.parentNode.removeChild(g);
g=n
}}function changedBackgroundImage(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
b["background-image"]="url('"+a.backgroundimage.value+"')";
a.style.value=tinyMCE.serializeStyle(b)
}function changedStyle(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
if(b["background-image"]){a.backgroundimage.value=b["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1")
}else{a.backgroundimage.value=""
}if(b.height){a.height.value=trimSize(b.height)
}if(b["background-color"]){a.bgcolor.value=b["background-color"];
updateColor("bgcolor_pick","bgcolor")
}}function changedSize(){var b=document.forms[0];
var c=tinyMCE.parseStyle(b.style.value);
var a=b.height.value;
if(a!=""){c.height=getCSSSize(a)
}else{c.height=""
}b.style.value=tinyMCE.serializeStyle(c)
}function changedColor(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
b["background-color"]=a.bgcolor.value;
a.style.value=tinyMCE.serializeStyle(b)
};