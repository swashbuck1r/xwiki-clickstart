tinyMCE.importPluginLanguagePack("advimage","en,tr,de,sv,zh_cn,cs,fa,fr_ca,fr,pl,pt_br,nl,he,nb,ru,ru_KOI8-R,ru_UTF-8,nn,cy,es,is,zh_tw,zh_tw_utf8,sk,da");
var TinyMCE_AdvancedImagePlugin={getInfo:function(){return{longname:"Advanced image",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_advimage.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"image":return tinyMCE.getButtonHTML(a,"lang_image_desc","{$themeurl}/images/image.gif","mceAdvImage")
}return""
},execCommand:function(f,a,e,h,d){switch(e){case"mceAdvImage":var b=new Array();
b.file="../../plugins/advimage/image.htm";
b.width=480;
b.height=380;
b.width+=tinyMCE.getLang("lang_advimage_delta_width",0);
b.height+=tinyMCE.getLang("lang_advimage_delta_height",0);
var c=tinyMCE.getInstanceById(f);
var g=c.getFocusElement();
if(g!=null&&tinyMCE.getAttrib(g,"class").indexOf("mceItem")!=-1){return true
}tinyMCE.openWindow(b,{editor_id:f,inline:"yes"});
return true
}return false
},cleanup:function(type,content){switch(type){case"insert_to_editor_dom":var imgs=content.getElementsByTagName("img");
for(var i=0;
i<imgs.length;
i++){var onmouseover=tinyMCE.cleanupEventStr(tinyMCE.getAttrib(imgs[i],"onmouseover"));
var onmouseout=tinyMCE.cleanupEventStr(tinyMCE.getAttrib(imgs[i],"onmouseout"));
if((src=this._getImageSrc(onmouseover))!=""){if(tinyMCE.getParam("convert_urls")){src=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,src)
}imgs[i].setAttribute("onmouseover","this.src='"+src+"';")
}if((src=this._getImageSrc(onmouseout))!=""){if(tinyMCE.getParam("convert_urls")){src=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,src)
}imgs[i].setAttribute("onmouseout","this.src='"+src+"';")
}}break;
case"get_from_editor_dom":var imgs=content.getElementsByTagName("img");
for(var i=0;
i<imgs.length;
i++){var onmouseover=tinyMCE.cleanupEventStr(tinyMCE.getAttrib(imgs[i],"onmouseover"));
var onmouseout=tinyMCE.cleanupEventStr(tinyMCE.getAttrib(imgs[i],"onmouseout"));
if((src=this._getImageSrc(onmouseover))!=""){if(tinyMCE.getParam("convert_urls")){src=eval(tinyMCE.settings.urlconverter_callback+"(src, null, true);")
}imgs[i].setAttribute("onmouseover","this.src='"+src+"';")
}if((src=this._getImageSrc(onmouseout))!=""){if(tinyMCE.getParam("convert_urls")){src=eval(tinyMCE.settings.urlconverter_callback+"(src, null, true);")
}imgs[i].setAttribute("onmouseout","this.src='"+src+"';")
}}break
}return content
},handleNodeChange:function(f,d,e,c,a,b){if(d==null){return
}do{if(d.nodeName=="IMG"&&tinyMCE.getAttrib(d,"class").indexOf("mceItem")==-1){tinyMCE.switchClass(f+"_advimage","mceButtonSelected");
return true
}}while((d=d.parentNode));
tinyMCE.switchClass(f+"_advimage","mceButtonNormal");
return true
},_getImageSrc:function(b){var a,c=-1;
if(!b){return""
}if((c=b.indexOf("this.src="))!=-1){a=b.substring(c+10);
a=a.substring(0,a.indexOf("'"));
return a
}return""
}};
tinyMCE.addPlugin("advimage",TinyMCE_AdvancedImagePlugin);