var preloadImg=null;
var orgImageWidth,orgImageHeight;
function preinit(){tinyMCE.setWindowArg("mce_windowresize",false);
var a=tinyMCE.getParam("external_image_list_url");
if(a!=null){if(a.charAt(0)!="/"&&a.indexOf("://")==-1){a=tinyMCE.documentBasePath+"/"+a
}document.write('<script language="javascript" type="text/javascript" src="'+a+'"><\/script>')
}}function convertURL(url,node,on_save){return eval("tinyMCEPopup.windowOpener."+tinyMCE.settings.urlconverter_callback+"(url, node, on_save);")
}function getImageSrc(b){var c=-1;
if(!b){return""
}if((c=b.indexOf("this.src="))!=-1){var a=b.substring(c+10);
a=a.substring(0,a.indexOf("'"));
if(tinyMCE.getParam("convert_urls")){a=convertURL(a,null,true)
}return a
}return""
}function init(){tinyMCEPopup.resizeToInnerSize();
var h=document.forms[0];
var f=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var i=f.getFocusElement();
var e="insert";
var g="";
g=getImageListHTML("imagelistsrc","src","onSelectMainImage");
if(g==""){document.getElementById("imagelistsrcrow").style.display="none"
}else{document.getElementById("imagelistsrccontainer").innerHTML=g
}g=getImageListHTML("imagelistover","onmouseoversrc");
if(g==""){document.getElementById("imagelistoverrow").style.display="none"
}else{document.getElementById("imagelistovercontainer").innerHTML=g
}g=getImageListHTML("imagelistout","onmouseoutsrc");
if(g==""){document.getElementById("imagelistoutrow").style.display="none"
}else{document.getElementById("imagelistoutcontainer").innerHTML=g
}g=getBrowserHTML("srcbrowser","src","image","advimage");
document.getElementById("srcbrowsercontainer").innerHTML=g;
g=getBrowserHTML("oversrcbrowser","onmouseoversrc","image","advimage");
document.getElementById("onmouseoversrccontainer").innerHTML=g;
g=getBrowserHTML("outsrcbrowser","onmouseoutsrc","image","advimage");
document.getElementById("onmouseoutsrccontainer").innerHTML=g;
g=getBrowserHTML("longdescbrowser","longdesc","file","advimage");
document.getElementById("longdesccontainer").innerHTML=g;
if(isVisible("srcbrowser")){document.getElementById("src").style.width="260px"
}if(isVisible("oversrcbrowser")){document.getElementById("onmouseoversrc").style.width="260px"
}if(isVisible("outsrcbrowser")){document.getElementById("onmouseoutsrc").style.width="260px"
}if(isVisible("longdescbrowser")){document.getElementById("longdesc").style.width="180px"
}if(i!=null&&i.nodeName=="IMG"){e="update"
}h.insert.value=tinyMCE.getLang("lang_"+e,"Insert",true);
if(e=="update"){var a=tinyMCE.getAttrib(i,"src");
var j=getImageSrc(tinyMCE.cleanupEventStr(tinyMCE.getAttrib(i,"onmouseover")));
var c=getImageSrc(tinyMCE.cleanupEventStr(tinyMCE.getAttrib(i,"onmouseout")));
a=convertURL(a,i,true);
var d=tinyMCE.getAttrib(i,"mce_src");
if(d!=""){a=d;
if(tinyMCE.getParam("convert_urls")){a=convertURL(a,i,true)
}}if(j!=""&&tinyMCE.getParam("convert_urls")){j=convertURL(j,i,true)
}if(c!=""&&tinyMCE.getParam("convert_urls")){c=convertURL(c,i,true)
}var b=tinyMCE.parseStyle(tinyMCE.getAttrib(i,"style"));
orgImageWidth=trimSize(getStyle(i,"width"));
orgImageHeight=trimSize(getStyle(i,"height"));
h.src.value=a;
h.alt.value=tinyMCE.getAttrib(i,"alt");
h.title.value=tinyMCE.getAttrib(i,"title");
h.border.value=trimSize(getStyle(i,"border","borderWidth"));
h.vspace.value=tinyMCE.getAttrib(i,"vspace");
h.hspace.value=tinyMCE.getAttrib(i,"hspace");
h.width.value=orgImageWidth;
h.height.value=orgImageHeight;
h.onmouseoversrc.value=j;
h.onmouseoutsrc.value=c;
h.id.value=tinyMCE.getAttrib(i,"id");
h.dir.value=tinyMCE.getAttrib(i,"dir");
h.lang.value=tinyMCE.getAttrib(i,"lang");
h.longdesc.value=tinyMCE.getAttrib(i,"longdesc");
h.usemap.value=tinyMCE.getAttrib(i,"usemap");
h.style.value=tinyMCE.serializeStyle(b);
if(tinyMCE.isMSIE){selectByValue(h,"align",getStyle(i,"align","styleFloat"))
}else{selectByValue(h,"align",getStyle(i,"align","cssFloat"))
}addClassesToList("classlist","advimage_styles");
selectByValue(h,"classlist",tinyMCE.getAttrib(i,"class"));
selectByValue(h,"imagelistsrc",a);
selectByValue(h,"imagelistover",j);
selectByValue(h,"imagelistout",c);
updateStyle();
showPreviewImage(a,true);
changeAppearance();
window.focus()
}else{addClassesToList("classlist","advimage_styles")
}if(tinyMCE.getParam("advimage_constrain_proportions",true)){h.constrain.checked=true
}if(h.onmouseoversrc.value!=""||h.onmouseoutsrc.value!=""){setSwapImageDisabled(false)
}else{setSwapImageDisabled(true)
}}function setSwapImageDisabled(b){var a=document.forms[0];
a.onmousemovecheck.checked=!b;
setBrowserDisabled("overbrowser",b);
setBrowserDisabled("outbrowser",b);
if(a.imagelistover){a.imagelistover.disabled=b
}if(a.imagelistout){a.imagelistout.disabled=b
}a.onmouseoversrc.disabled=b;
a.onmouseoutsrc.disabled=b
}function setAttrib(elm,attrib,value){var formObj=document.forms[0];
var valueElm=formObj.elements[attrib];
if(typeof(value)=="undefined"||value==null){value="";
if(valueElm){value=valueElm.value
}}if(value!=""){elm.setAttribute(attrib,value);
if(attrib=="style"){attrib="style.cssText"
}if(attrib=="longdesc"){attrib="longDesc"
}if(attrib=="width"){attrib="style.width";
value=value+"px"
}if(attrib=="height"){attrib="style.height";
value=value+"px"
}if(attrib=="class"){attrib="className"
}eval("elm."+attrib+"=value;")
}else{elm.removeAttribute(attrib)
}}function makeAttrib(d,c){var b=document.forms[0];
var a=b.elements[d];
if(typeof(c)=="undefined"||c==null){c="";
if(a){c=a.value
}}if(c==""){return""
}c=c.replace(/&/g,"&amp;");
c=c.replace(/\"/g,"&quot;");
c=c.replace(/</g,"&lt;");
c=c.replace(/>/g,"&gt;");
return" "+d+'="'+c+'"'
}function insertAction(){var e=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var h=e.getFocusElement();
var a=document.forms[0];
var g=a.src.value;
var f=a.onmouseoversrc.value;
var b=a.onmouseoutsrc.value;
if(tinyMCE.getParam("accessibility_warnings")){if(a.alt.value==""){var d=confirm(tinyMCE.getLang("lang_advimage_missing_alt","",true));
if(d==true){a.alt.value=" "
}}else{var d=true
}if(!d){return
}}if(f&&f!=""){f="this.src='"+convertURL(f,tinyMCE.imgElement)+"';"
}if(b&&b!=""){b="this.src='"+convertURL(b,tinyMCE.imgElement)+"';"
}if(h!=null&&h.nodeName=="IMG"){setAttrib(h,"src",convertURL(g,tinyMCE.imgElement));
setAttrib(h,"mce_src",g);
setAttrib(h,"alt");
setAttrib(h,"title");
setAttrib(h,"border");
setAttrib(h,"vspace");
setAttrib(h,"hspace");
setAttrib(h,"width");
setAttrib(h,"height");
setAttrib(h,"onmouseover",f);
setAttrib(h,"onmouseout",b);
setAttrib(h,"id");
setAttrib(h,"dir");
setAttrib(h,"lang");
setAttrib(h,"longdesc");
setAttrib(h,"usemap");
setAttrib(h,"style");
setAttrib(h,"class",getSelectValue(a,"classlist"));
setAttrib(h,"align",getSelectValue(a,"align"));
if(a.width.value!=orgImageWidth||a.height.value!=orgImageHeight){e.repaint()
}if(tinyMCE.isMSIE5){h.outerHTML=h.outerHTML
}}else{var c="<img";
c+=makeAttrib("src",convertURL(g,tinyMCE.imgElement));
c+=makeAttrib("mce_src",g);
c+=makeAttrib("alt");
c+=makeAttrib("title");
c+=makeAttrib("border");
c+=makeAttrib("vspace");
c+=makeAttrib("hspace");
c+=makeAttrib("width");
c+=makeAttrib("height");
c+=makeAttrib("onmouseover",f);
c+=makeAttrib("onmouseout",b);
c+=makeAttrib("id");
c+=makeAttrib("dir");
c+=makeAttrib("lang");
c+=makeAttrib("longdesc");
c+=makeAttrib("usemap");
c+=makeAttrib("style");
c+=makeAttrib("class",getSelectValue(a,"classlist"));
c+=makeAttrib("align",getSelectValue(a,"align"));
c+=" />";
tinyMCEPopup.execCommand("mceInsertContent",false,c)
}tinyMCE._setEventsEnabled(e.getBody(),false);
tinyMCEPopup.close()
}function cancelAction(){tinyMCEPopup.close()
}function changeAppearance(){var a=document.forms[0];
var b=document.getElementById("alignSampleImg");
if(b){b.align=a.align.value;
b.border=a.border.value;
b.hspace=a.hspace.value;
b.vspace=a.vspace.value
}}function changeMouseMove(){var a=document.forms[0];
setSwapImageDisabled(!a.onmousemovecheck.checked)
}function updateStyle(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
if(tinyMCE.getParam("inline_styles",false)){b.width=a.width.value==""?"":a.width.value+"px";
b.height=a.height.value==""?"":a.height.value+"px";
b["border-width"]=a.border.value==""?"":a.border.value+"px";
b["margin-top"]=a.vspace.value==""?"":a.vspace.value+"px";
b["margin-bottom"]=a.vspace.value==""?"":a.vspace.value+"px";
b["margin-left"]=a.hspace.value==""?"":a.hspace.value+"px";
b["margin-right"]=a.hspace.value==""?"":a.hspace.value+"px"
}else{b.width=b.height=b["border-width"]=null;
if(b["margin-top"]==b["margin-bottom"]){b["margin-top"]=b["margin-bottom"]=null
}if(b["margin-left"]==b["margin-right"]){b["margin-left"]=b["margin-right"]=null
}}a.style.value=tinyMCE.serializeStyle(b)
}function styleUpdated(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
if(b.width){a.width.value=b.width.replace("px","")
}if(b.height){a.height.value=b.height.replace("px","")
}if(b["margin-top"]&&b["margin-top"]==b["margin-bottom"]){a.vspace.value=b["margin-top"].replace("px","")
}if(b["margin-left"]&&b["margin-left"]==b["margin-right"]){a.hspace.value=b["margin-left"].replace("px","")
}if(b["border-width"]){a.border.value=b["border-width"].replace("px","")
}}function changeHeight(){var a=document.forms[0];
if(!a.constrain.checked||!preloadImg){updateStyle();
return
}if(a.width.value==""||a.height.value==""){return
}var b=(a.width.value/preloadImg.width)*preloadImg.height;
a.height.value=b.toFixed(0);
updateStyle()
}function changeWidth(){var a=document.forms[0];
if(!a.constrain.checked||!preloadImg){updateStyle();
return
}if(a.width.value==""||a.height.value==""){return
}var b=(a.height.value/preloadImg.height)*preloadImg.width;
a.width.value=b.toFixed(0);
updateStyle()
}function onSelectMainImage(c,b,d){var a=document.forms[0];
a.alt.value=b;
a.title.value=b;
resetImageData();
showPreviewImage(a.elements[c].value,false)
}function showPreviewImage(b,d){var a=document.forms[0];
selectByValue(document.forms[0],"imagelistsrc",b);
var c=document.getElementById("prev");
var b=b==""?b:tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,b);
if(!d&&tinyMCE.getParam("advimage_update_dimensions_onchange",true)){resetImageData()
}if(b==""){c.innerHTML=""
}else{c.innerHTML='<img src="'+b+'" border="0" />'
}getImageData(b)
}function getImageData(a){preloadImg=new Image();
tinyMCE.addEvent(preloadImg,"load",updateImageData);
tinyMCE.addEvent(preloadImg,"error",resetImageData);
preloadImg.src=a
}function updateImageData(){var a=document.forms[0];
if(a.width.value==""){a.width.value=preloadImg.width
}if(a.height.value==""){a.height.value=preloadImg.height
}updateStyle()
}function resetImageData(){var a=document.forms[0];
a.width.value=a.height.value=""
}function getSelectValue(a,b){var c=a.elements[b];
if(c==null||c.options==null){return""
}return c.options[c.selectedIndex].value
}function getImageListHTML(d,c,e){if(typeof(tinyMCEImageList)=="undefined"||tinyMCEImageList.length==0){return""
}var b="";
b+='<select id="'+d+'" name="'+d+'"';
b+=' class="mceImageList" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="this.form.'+c+".value=";
b+="this.options[this.selectedIndex].value;";
if(typeof(e)!="undefined"){b+=e+"('"+c+"',this.options[this.selectedIndex].text,this.options[this.selectedIndex].value);"
}b+='"><option value="">---</option>';
for(var a=0;
a<tinyMCEImageList.length;
a++){b+='<option value="'+tinyMCEImageList[a][1]+'">'+tinyMCEImageList[a][0]+"</option>"
}b+="</select>";
return b
}preinit();