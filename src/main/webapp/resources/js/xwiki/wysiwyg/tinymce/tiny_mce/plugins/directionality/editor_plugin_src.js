tinyMCE.importPluginLanguagePack("directionality","en,tr,sv,fr_ca,zh_cn,cs,da,he,nb,de,hu,ru,ru_KOI8-R,ru_UTF-8,nn,es,cy,is,pl,nl,fr,pt_br");
var TinyMCE_DirectionalityPlugin={getInfo:function(){return{longname:"Directionality",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_directionality.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"ltr":return tinyMCE.getButtonHTML(a,"lang_directionality_ltr_desc","{$pluginurl}/images/ltr.gif","mceDirectionLTR");
case"rtl":return tinyMCE.getButtonHTML(a,"lang_directionality_rtl_desc","{$pluginurl}/images/rtl.gif","mceDirectionRTL")
}return""
},execCommand:function(e,a,d,g,c){switch(d){case"mceDirectionLTR":var b=tinyMCE.getInstanceById(e);
var f=tinyMCE.getParentElement(b.getFocusElement(),"p,div,td,h1,h2,h3,h4,h5,h6,pre,address");
if(f){f.setAttribute("dir","ltr")
}tinyMCE.triggerNodeChange(false);
return true;
case"mceDirectionRTL":var b=tinyMCE.getInstanceById(e);
var f=tinyMCE.getParentElement(b.getFocusElement(),"p,div,td,h1,h2,h3,h4,h5,h6,pre,address");
if(f){f.setAttribute("dir","rtl")
}tinyMCE.triggerNodeChange(false);
return true
}return false
},handleNodeChange:function(h,b,g,c,e,d){function i(k,j){return k.getAttribute(j)?k.getAttribute(j):""
}if(b==null){return
}var f=tinyMCE.getParentElement(b,"p,div,td,h1,h2,h3,h4,h5,h6,pre,address");
if(!f){tinyMCE.switchClass(h+"_ltr","mceButtonDisabled");
tinyMCE.switchClass(h+"_rtl","mceButtonDisabled");
return true
}tinyMCE.switchClass(h+"_ltr","mceButtonNormal");
tinyMCE.switchClass(h+"_rtl","mceButtonNormal");
var a=i(f,"dir");
if(a=="ltr"||a==""){tinyMCE.switchClass(h+"_ltr","mceButtonSelected")
}else{tinyMCE.switchClass(h+"_rtl","mceButtonSelected")
}return true
}};
tinyMCE.addPlugin("directionality",TinyMCE_DirectionalityPlugin);