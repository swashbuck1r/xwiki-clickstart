var tinyMCE=null,tinyMCELang=null;
function TinyMCE_Popup(){}TinyMCE_Popup.prototype.init=function(){var d=window.opener?window.opener:window.dialogArguments;
var b;
if(!d){d=parent.parent;
if(typeof(d.tinyMCE)=="undefined"){d=top
}}window.opener=d;
this.windowOpener=d;
this.onLoadEval="";
tinyMCE=d.tinyMCE;
tinyMCELang=d.tinyMCELang;
if(!tinyMCE){alert("tinyMCE object reference not found from popup.");
return
}b=tinyMCE.selectedInstance;
this.isWindow=tinyMCE.getWindowArg("mce_inside_iframe",false)==false;
this.storeSelection=(tinyMCE.isMSIE&&!tinyMCE.isOpera)&&!this.isWindow&&tinyMCE.getWindowArg("mce_store_selection",true);
if(this.isWindow){window.focus()
}if(this.storeSelection){b.selectionBookmark=b.selection.getBookmark(true)
}if(tinyMCELang.lang_dir){document.dir=tinyMCELang.lang_dir
}var a=new RegExp("{|\\$|}","g");
var e=document.title.replace(a,"");
if(typeof tinyMCELang[e]!="undefined"){var c=document.createElement("div");
c.innerHTML=tinyMCELang[e];
document.title=c.innerHTML;
if(tinyMCE.setWindowTitle!=null){tinyMCE.setWindowTitle(window,c.innerHTML)
}}document.write('<link href="'+tinyMCE.getParam("popups_css")+'" rel="stylesheet" type="text/css">');
tinyMCE.addEvent(window,"load",this.onLoad)
};
TinyMCE_Popup.prototype.onLoad=function(){var dir,i,elms,body=document.body;
if(tinyMCE.getWindowArg("mce_replacevariables",true)){body.innerHTML=tinyMCE.applyTemplate(body.innerHTML,tinyMCE.windowArgs)
}dir=tinyMCE.selectedInstance.settings.directionality;
if(dir=="rtl"&&document.forms&&document.forms.length>0){elms=document.forms[0].elements;
for(i=0;
i<elms.length;
i++){if((elms[i].type=="text"||elms[i].type=="textarea")&&elms[i].getAttribute("dir")!="ltr"){elms[i].dir=dir
}}}if(body.style.display=="none"){body.style.display="block"
}if(tinyMCEPopup.onLoadEval!=""){eval(tinyMCEPopup.onLoadEval)
}};
TinyMCE_Popup.prototype.executeOnLoad=function(str){if(tinyMCE.isOpera){this.onLoadEval=str
}else{eval(str)
}};
TinyMCE_Popup.prototype.resizeToInnerSize=function(){if(this.isWindow&&tinyMCE.isNS71){window.resizeBy(0,10);
return
}if(this.isWindow){var g=document;
var f=g.body;
var c,a,d,b,j,h;
if(f.style.display=="none"){f.style.display="block"
}c=f.style.margin;
f.style.margin="0";
a=g.createElement("div");
a.id="mcBodyWrapper";
a.style.display="none";
a.style.margin="0";
b=g.body.childNodes;
for(var e=b.length-1;
e>=0;
e--){if(a.hasChildNodes()){a.insertBefore(b[e].cloneNode(true),a.firstChild)
}else{a.appendChild(b[e].cloneNode(true))
}b[e].parentNode.removeChild(b[e])
}g.body.appendChild(a);
d=document.createElement("iframe");
d.id="mcWinIframe";
d.src=document.location.href.toLowerCase().indexOf("https")==-1?"about:blank":tinyMCE.settings.default_document;
d.width="100%";
d.height="100%";
d.style.margin="0";
g.body.appendChild(d);
d=document.getElementById("mcWinIframe");
j=tinyMCE.getWindowArg("mce_width")-d.clientWidth;
h=tinyMCE.getWindowArg("mce_height")-d.clientHeight;
window.resizeBy(j,h);
f.style.margin=c;
d.style.display="none";
a.style.display="block"
}};
TinyMCE_Popup.prototype.resizeToContent=function(){var h=(navigator.appName=="Microsoft Internet Explorer");
var b=(navigator.userAgent.indexOf("Opera")!=-1);
if(b){return
}if(h){try{window.resizeTo(10,10)
}catch(c){}var d=document.body;
var a=d.offsetWidth;
var i=d.offsetHeight;
var k=(d.scrollWidth-a)+4;
var j=d.scrollHeight-i;
try{window.resizeBy(k,j)
}catch(c){}}else{window.scrollBy(1000,1000);
if(window.scrollX>0||window.scrollY>0){window.resizeBy(window.innerWidth*2,window.innerHeight*2);
window.sizeToContent();
window.scrollTo(0,0);
var g=parseInt(screen.width/2)-(window.outerWidth/2);
var f=parseInt(screen.height/2)-(window.outerHeight/2);
window.moveTo(g,f)
}}};
TinyMCE_Popup.prototype.getWindowArg=function(b,a){return tinyMCE.getWindowArg(b,a)
};
TinyMCE_Popup.prototype.restoreSelection=function(){if(this.storeSelection){var a=tinyMCE.selectedInstance;
a.getWin().focus();
if(a.selectionBookmark){a.selection.moveToBookmark(a.selectionBookmark)
}}};
TinyMCE_Popup.prototype.execCommand=function(c,d,b){var a=tinyMCE.selectedInstance;
this.restoreSelection();
a.execCommand(c,d,b);
if(this.storeSelection){a.selectionBookmark=a.selection.getBookmark(true)
}};
TinyMCE_Popup.prototype.close=function(){tinyMCE.closeWindow(window)
};
TinyMCE_Popup.prototype.pickColor=function(b,a){tinyMCE.selectedInstance.execCommand("mceColorPicker",true,{element_id:a,document:document,window:window,store_selection:false})
};
TinyMCE_Popup.prototype.openBrowser=function(element_id,type,option){var cb=tinyMCE.getParam(option,tinyMCE.getParam("file_browser_callback"));
var url=document.getElementById(element_id).value;
tinyMCE.setWindowArg("window",window);
tinyMCE.setWindowArg("document",document);
if(eval("typeof(tinyMCEPopup.windowOpener."+cb+")")=="undefined"){alert("Callback function: "+cb+" could not be found.")
}else{eval("tinyMCEPopup.windowOpener."+cb+"(element_id, url, type, window);")
}};
TinyMCE_Popup.prototype.importClass=function(b){window[b]=function(){};
for(var a in window.opener[b].prototype){window[b].prototype[a]=window.opener[b].prototype[a]
}window[b].constructor=window.opener[b].constructor
};
var tinyMCEPopup=new TinyMCE_Popup();
tinyMCEPopup.init();