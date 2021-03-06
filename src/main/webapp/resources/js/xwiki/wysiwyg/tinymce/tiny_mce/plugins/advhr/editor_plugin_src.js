tinyMCE.importPluginLanguagePack("advhr","en,tr,de,sv,zh_cn,cs,fa,fr_ca,fr,pl,pt_br,nl,da,he,nb,hu,ru,ru_KOI8-R,ru_UTF-8,nn,fi,es,cy,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_AdvancedHRPlugin={getInfo:function(){return{longname:"Advanced HR",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_advhr.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"advhr":return tinyMCE.getButtonHTML(a,"lang_insert_advhr_desc","{$pluginurl}/images/advhr.gif","mceAdvancedHr")
}return""
},execCommand:function(f,e,c,a,g){switch(c){case"mceAdvancedHr":var h=new Array();
h.file="../../plugins/advhr/rule.htm";
h.width=250;
h.height=160;
h.width+=tinyMCE.getLang("lang_advhr_delta_width",0);
h.height+=tinyMCE.getLang("lang_advhr_delta_height",0);
var i="",b="",d="";
if(tinyMCE.selectedElement!=null&&tinyMCE.selectedElement.nodeName.toLowerCase()=="hr"){tinyMCE.hrElement=tinyMCE.selectedElement;
if(tinyMCE.hrElement){i=tinyMCE.hrElement.getAttribute("size")?tinyMCE.hrElement.getAttribute("size"):"";
b=tinyMCE.hrElement.getAttribute("width")?tinyMCE.hrElement.getAttribute("width"):"";
d=tinyMCE.hrElement.getAttribute("noshade")?tinyMCE.hrElement.getAttribute("noshade"):""
}tinyMCE.openWindow(h,{editor_id:f,size:i,width:b,noshade:d,mceDo:"update"})
}else{if(tinyMCE.isMSIE){tinyMCE.execInstanceCommand(f,"mceInsertContent",false,"<hr />")
}else{tinyMCE.openWindow(h,{editor_id:f,inline:"yes",size:i,width:b,noshade:d,mceDo:"insert"})
}}return true
}return false
},handleNodeChange:function(f,d,e,c,a,b){if(d==null){return
}do{if(d.nodeName=="HR"){tinyMCE.switchClass(f+"_advhr","mceButtonSelected");
return true
}}while((d=d.parentNode));
tinyMCE.switchClass(f+"_advhr","mceButtonNormal");
return true
}};
tinyMCE.addPlugin("advhr",TinyMCE_AdvancedHRPlugin);