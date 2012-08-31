tinyMCE.importPluginLanguagePack("style","en");
var TinyMCE_StylePlugin={getInfo:function(){return{longname:"Style",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_style.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"styleprops":return tinyMCE.getButtonHTML(a,"lang_style_styleinfo_desc","{$pluginurl}/images/style_info.gif","mceStyleProps",true)
}return""
},execCommand:function(g,a,f,h,c){var d,b;
switch(f){case"mceStyleProps":TinyMCE_StylePlugin._styleProps();
return true;
case"mceSetElementStyle":b=tinyMCE.getInstanceById(g);
d=b.selection.getFocusElement();
if(d){d.style.cssText=c;
b.repaint()
}return true
}return false
},handleNodeChange:function(f,d,e,c,a,b){},_styleProps:function(){var a=tinyMCE.selectedInstance.selection.getFocusElement();
if(!a){return
}tinyMCE.openWindow({file:"../../plugins/style/props.htm",width:480+tinyMCE.getLang("lang_style_props_delta_width",0),height:320+tinyMCE.getLang("lang_style_props_delta_height",0)},{editor_id:tinyMCE.selectedInstance.editorId,inline:"yes",style_text:a.style.cssText})
}};
tinyMCE.addPlugin("style",TinyMCE_StylePlugin);