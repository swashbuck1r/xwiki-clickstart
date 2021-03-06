tinyMCE.importPluginLanguagePack("layer","en");
var TinyMCE_LayerPlugin={getInfo:function(){return{longname:"Layer",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_layer.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){if(tinyMCE.isMSIE&&!tinyMCE.isOpera){a.getDoc().execCommand("2D-Position")
}},handleEvent:function(f){var d=tinyMCE.selectedInstance,b=TinyMCE_LayerPlugin;
var a=d.getWin(),c=d._lastStyleElm,f;
if(tinyMCE.isGecko){f=b._getParentLayer(d.getFocusElement());
if(f){if(!d._lastStyleElm){f.style.overflow="auto";
d._lastStyleElm=f
}}else{if(c){c=d._lastStyleElm;
c.style.width=c.scrollWidth+"px";
c.style.height=c.scrollHeight+"px";
c.style.overflow="";
d._lastStyleElm=null
}}}return true
},handleVisualAid:function(d,b,f,e){var a=e.getDoc().getElementsByTagName("div"),c;
for(c=0;
c<a.length;
c++){if(new RegExp("absolute|relative|static","gi").test(a[c].style.position)){if(f){tinyMCE.addCSSClass(a[c],"mceVisualAid")
}else{tinyMCE.removeCSSClass(a[c],"mceVisualAid")
}}}},getControlHTML:function(a){switch(a){case"moveforward":return tinyMCE.getButtonHTML(a,"lang_layer_forward_desc","{$pluginurl}/images/forward.gif","mceMoveForward",true);
case"movebackward":return tinyMCE.getButtonHTML(a,"lang_layer_backward_desc","{$pluginurl}/images/backward.gif","mceMoveBackward",true);
case"absolute":return tinyMCE.getButtonHTML(a,"lang_layer_absolute_desc","{$pluginurl}/images/absolute.gif","mceMakeAbsolute",true);
case"insertlayer":return tinyMCE.getButtonHTML(a,"lang_layer_insertlayer_desc","{$pluginurl}/images/insert_layer.gif","mceInsertLayer",true)
}return""
},execCommand:function(e,b,d,f,c){var a=TinyMCE_LayerPlugin;
switch(d){case"mceInsertLayer":a._insertLayer();
return true;
case"mceMoveForward":a._move(1);
return true;
case"mceMoveBackward":a._move(-1);
return true;
case"mceMakeAbsolute":a._toggleAbsolute();
return true
}return false
},handleNodeChange:function(i,c,h,d,f,e){var g=tinyMCE.getInstanceById(i),j=TinyMCE_LayerPlugin;
var a=j._getParentLayer(g.getFocusElement());
var b=tinyMCE.getParentElement(g.getFocusElement(),"div,p,img");
tinyMCE.switchClass(i+"_absolute","mceButtonDisabled");
tinyMCE.switchClass(i+"_moveforward","mceButtonDisabled");
tinyMCE.switchClass(i+"_movebackward","mceButtonDisabled");
if(b){tinyMCE.switchClass(i+"_absolute","mceButtonNormal")
}if(a&&a.style.position.toLowerCase()=="absolute"){tinyMCE.switchClass(i+"_absolute","mceButtonSelected");
tinyMCE.switchClass(i+"_moveforward","mceButtonNormal");
tinyMCE.switchClass(i+"_movebackward","mceButtonNormal")
}},_move:function(f){var e=tinyMCE.selectedInstance,j=TinyMCE_LayerPlugin,c,g=new Array();
var b=j._getParentLayer(e.getFocusElement()),k=-1,h=-1;
var a=tinyMCE.selectNodes(e.getBody(),function(d){return d.nodeType==1&&new RegExp("absolute|relative|static","gi").test(d.style.position)
});
for(c=0;
c<a.length;
c++){g[c]=a[c].style.zIndex?parseInt(a[c].style.zIndex):0;
if(k<0&&a[c]==b){k=c
}}if(f<0){for(c=0;
c<g.length;
c++){if(g[c]<g[k]){h=c;
break
}}if(h>-1){a[k].style.zIndex=g[h];
a[h].style.zIndex=g[k]
}else{if(g[k]>0){a[k].style.zIndex=g[k]-1
}}}else{for(c=0;
c<g.length;
c++){if(g[c]>g[k]){h=c;
break
}}if(h>-1){a[k].style.zIndex=g[h];
a[h].style.zIndex=g[k]
}else{a[k].style.zIndex=g[k]+1
}}e.repaint()
},_getParentLayer:function(a){return tinyMCE.getParentNode(a,function(b){return b.nodeType==1&&new RegExp("absolute|relative|static","gi").test(b.style.position)
})
},_insertLayer:function(){var b=tinyMCE.selectedInstance;
var g=tinyMCE.getParentElement(b.getFocusElement());
var f=tinyMCE.getAbsPosition(g);
var i=b.getDoc();
var c=i.createElement("div");
var a=b.selection.getSelectedHTML();
c.style.position="absolute";
c.style.left=f.absLeft+"px";
c.style.top=(f.absTop>20?f.absTop:20)+"px";
c.style.width="100px";
c.style.height="100px";
c.className="mceVisualAid";
if(!a){a=tinyMCE.getLang("lang_layer_content")
}c.innerHTML=a;
i.body.appendChild(c)
},_toggleAbsolute:function(){var c=tinyMCE.selectedInstance,a=TinyMCE_LayerPlugin;
var b=a._getParentLayer(c.getFocusElement());
if(b==null){b=tinyMCE.getParentElement(c.getFocusElement(),"div,p,img")
}if(b){if(b.style.position.toLowerCase()=="absolute"){b.style.position="";
b.style.left="";
b.style.top=""
}else{b.style.position="absolute";
if(b.style.left==""){b.style.left=20+"px"
}if(b.style.top==""){b.style.top=20+"px"
}if(b.style.width==""){b.style.width=b.width?(b.width+"px"):"100px"
}if(b.style.height==""){b.style.height=b.height?(b.height+"px"):"100px"
}tinyMCE.handleVisualAid(c.getBody(),true,c.visualAid,c)
}c.repaint();
tinyMCE.triggerNodeChange()
}}};
tinyMCE.addPlugin("layer",TinyMCE_LayerPlugin);