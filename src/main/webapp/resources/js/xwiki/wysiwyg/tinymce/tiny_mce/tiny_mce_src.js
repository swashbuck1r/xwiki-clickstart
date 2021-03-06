function TinyMCE_Engine(){this.majorVersion="2";
this.minorVersion="0.6.1";
this.releaseDate="2006-05-04";
this.instances=new Array();
this.switchClassCache=new Array();
this.windowArgs=new Array();
this.loadedFiles=new Array();
this.pendingFiles=new Array();
this.loadingIndex=0;
this.configs=new Array();
this.currentConfig=0;
this.eventHandlers=new Array();
var a=navigator.userAgent;
this.isMSIE=(navigator.appName=="Microsoft Internet Explorer");
this.isMSIE5=this.isMSIE&&(a.indexOf("MSIE 5")!=-1);
this.isMSIE5_0=this.isMSIE&&(a.indexOf("MSIE 5.0")!=-1);
this.isGecko=a.indexOf("Gecko")!=-1;
this.isSafari=a.indexOf("Safari")!=-1;
this.isOpera=a.indexOf("Opera")!=-1;
this.isMac=a.indexOf("Mac")!=-1;
this.isNS7=a.indexOf("Netscape/7")!=-1;
this.isNS71=a.indexOf("Netscape/7.1")!=-1;
this.dialogCounter=0;
this.plugins=new Array();
this.themes=new Array();
this.menus=new Array();
this.loadedPlugins=new Array();
this.buttonMap=new Array();
this.isLoaded=false;
if(this.isOpera){this.isMSIE=true;
this.isGecko=false;
this.isSafari=false
}this.idCounter=0
}TinyMCE_Engine.prototype={init:function(j){var l;
this.settings=j;
if(typeof(document.execCommand)=="undefined"){return
}if(!tinyMCE.baseURL){var d=document.getElementsByTagName("script");
for(var m=0;
m<d.length;
m++){if(d[m].src&&(d[m].src.indexOf("tiny_mce.js")!=-1||d[m].src.indexOf("tiny_mce_dev.js")!=-1||d[m].src.indexOf("tiny_mce_src.js")!=-1||d[m].src.indexOf("tiny_mce_gzip")!=-1)){var a=d[m].src;
tinyMCE.srcMode=(a.indexOf("_src")!=-1||a.indexOf("_dev")!=-1)?"_src":"";
tinyMCE.gzipMode=a.indexOf("_gzip")!=-1;
a=a.substring(0,a.lastIndexOf("/"));
if(j.exec_mode=="src"||j.exec_mode=="normal"){tinyMCE.srcMode=j.exec_mode=="src"?"_src":""
}tinyMCE.baseURL=a;
break
}}}this.documentBasePath=document.location.href;
if(this.documentBasePath.indexOf("?")!=-1){this.documentBasePath=this.documentBasePath.substring(0,this.documentBasePath.indexOf("?"))
}this.documentURL=this.documentBasePath;
this.documentBasePath=this.documentBasePath.substring(0,this.documentBasePath.lastIndexOf("/"));
if(tinyMCE.baseURL.indexOf("://")==-1&&tinyMCE.baseURL.charAt(0)!="/"){tinyMCE.baseURL=this.documentBasePath+"/"+tinyMCE.baseURL
}this._def("mode","none");
this._def("theme","advanced");
this._def("plugins","",true);
this._def("language","en");
this._def("docs_language",this.settings.language);
this._def("elements","");
this._def("textarea_trigger","mce_editable");
this._def("editor_selector","");
this._def("editor_deselector","mceNoEditor");
this._def("valid_elements","+a[id|style|rel|rev|charset|hreflang|dir|lang|tabindex|accesskey|type|name|href|target|title|class|onfocus|onblur|onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup],-strong/-b[class|style],-em/-i[class|style],-strike[class|style],-u[class|style],#p[id|style|dir|class|align],-ol[class|style],-ul[class|style],-li[class|style],br,img[id|dir|lang|longdesc|usemap|style|class|src|onmouseover|onmouseout|border|alt=|title|hspace|vspace|width|height|align],-sub[style|class],-sup[style|class],-blockquote[dir|style],-table[border=0|cellspacing|cellpadding|width|height|class|align|summary|style|dir|id|lang|bgcolor|background|bordercolor],-tr[id|lang|dir|class|rowspan|width|height|align|valign|style|bgcolor|background|bordercolor],tbody[id|class],thead[id|class],tfoot[id|class],-td[id|lang|dir|class|colspan|rowspan|width|height|align|valign|style|bgcolor|background|bordercolor|scope],-th[id|lang|dir|class|colspan|rowspan|width|height|align|valign|style|scope],caption[id|lang|dir|class|style],-div[id|dir|class|align|style],-span[style|class|align],-pre[class|align|style],address[class|align|style],-h1[id|style|dir|class|align],-h2[id|style|dir|class|align],-h3[id|style|dir|class|align],-h4[id|style|dir|class|align],-h5[id|style|dir|class|align],-h6[id|style|dir|class|align],hr[class|style],-font[face|size|style|id|class|dir|color],dd[id|class|title|style|dir|lang],dl[id|class|title|style|dir|lang],dt[id|class|title|style|dir|lang]");
this._def("extended_valid_elements","");
this._def("invalid_elements","");
this._def("encoding","");
this._def("urlconverter_callback",tinyMCE.getParam("urlconvertor_callback","TinyMCE_Engine.prototype.convertURL"));
this._def("save_callback","");
this._def("debug",false);
this._def("force_br_newlines",false);
this._def("force_p_newlines",true);
this._def("add_form_submit_trigger",true);
this._def("relative_urls",true);
this._def("remove_script_host",true);
this._def("focus_alert",true);
this._def("document_base_url",this.documentURL);
this._def("visual",true);
this._def("visual_table_class","mceVisualAid");
this._def("setupcontent_callback","");
this._def("fix_content_duplication",true);
this._def("custom_undo_redo",true);
this._def("custom_undo_redo_levels",-1);
this._def("custom_undo_redo_keyboard_shortcuts",true);
this._def("custom_undo_redo_restore_selection",true);
this._def("verify_html",true);
this._def("apply_source_formatting",false);
this._def("directionality","ltr");
this._def("cleanup_on_startup",false);
this._def("inline_styles",false);
this._def("convert_newlines_to_brs",false);
this._def("auto_reset_designmode",true);
this._def("entities","38,amp,34,quot,162,cent,8364,euro,163,pound,165,yen,169,copy,174,reg,8482,trade,8240,permil,181,micro,183,middot,8226,bull,8230,hellip,8242,prime,8243,Prime,167,sect,182,para,223,szlig,8249,lsaquo,8250,rsaquo,171,laquo,187,raquo,8216,lsquo,8217,rsquo,8220,ldquo,8221,rdquo,8218,sbquo,8222,bdquo,60,lt,62,gt,8804,le,8805,ge,8211,ndash,8212,mdash,175,macr,8254,oline,164,curren,166,brvbar,168,uml,161,iexcl,191,iquest,710,circ,732,tilde,176,deg,8722,minus,177,plusmn,247,divide,8260,frasl,215,times,185,sup1,178,sup2,179,sup3,188,frac14,189,frac12,190,frac34,402,fnof,8747,int,8721,sum,8734,infin,8730,radic,8764,sim,8773,cong,8776,asymp,8800,ne,8801,equiv,8712,isin,8713,notin,8715,ni,8719,prod,8743,and,8744,or,172,not,8745,cap,8746,cup,8706,part,8704,forall,8707,exist,8709,empty,8711,nabla,8727,lowast,8733,prop,8736,ang,180,acute,184,cedil,170,ordf,186,ordm,8224,dagger,8225,Dagger,192,Agrave,194,Acirc,195,Atilde,196,Auml,197,Aring,198,AElig,199,Ccedil,200,Egrave,202,Ecirc,203,Euml,204,Igrave,206,Icirc,207,Iuml,208,ETH,209,Ntilde,210,Ograve,212,Ocirc,213,Otilde,214,Ouml,216,Oslash,338,OElig,217,Ugrave,219,Ucirc,220,Uuml,376,Yuml,222,THORN,224,agrave,226,acirc,227,atilde,228,auml,229,aring,230,aelig,231,ccedil,232,egrave,234,ecirc,235,euml,236,igrave,238,icirc,239,iuml,240,eth,241,ntilde,242,ograve,244,ocirc,245,otilde,246,ouml,248,oslash,339,oelig,249,ugrave,251,ucirc,252,uuml,254,thorn,255,yuml,914,Beta,915,Gamma,916,Delta,917,Epsilon,918,Zeta,919,Eta,920,Theta,921,Iota,922,Kappa,923,Lambda,924,Mu,925,Nu,926,Xi,927,Omicron,928,Pi,929,Rho,931,Sigma,932,Tau,933,Upsilon,934,Phi,935,Chi,936,Psi,937,Omega,945,alpha,946,beta,947,gamma,948,delta,949,epsilon,950,zeta,951,eta,952,theta,953,iota,954,kappa,955,lambda,956,mu,957,nu,958,xi,959,omicron,960,pi,961,rho,962,sigmaf,963,sigma,964,tau,965,upsilon,966,phi,967,chi,968,psi,969,omega,8501,alefsym,982,piv,8476,real,977,thetasym,978,upsih,8472,weierp,8465,image,8592,larr,8593,uarr,8594,rarr,8595,darr,8596,harr,8629,crarr,8656,lArr,8657,uArr,8658,rArr,8659,dArr,8660,hArr,8756,there4,8834,sub,8835,sup,8836,nsub,8838,sube,8839,supe,8853,oplus,8855,otimes,8869,perp,8901,sdot,8968,lceil,8969,rceil,8970,lfloor,8971,rfloor,9001,lang,9002,rang,9674,loz,9824,spades,9827,clubs,9829,hearts,9830,diams,8194,ensp,8195,emsp,8201,thinsp,8204,zwnj,8205,zwj,8206,lrm,8207,rlm,173,shy,233,eacute,237,iacute,243,oacute,250,uacute,193,Aacute,225,aacute,201,Eacute,205,Iacute,211,Oacute,218,Uacute,221,Yacute,253,yacute",true);
this._def("cleanup_callback","");
this._def("add_unload_trigger",true);
this._def("ask",false);
this._def("nowrap",false);
this._def("auto_resize",false);
this._def("auto_focus",false);
this._def("cleanup",true);
this._def("remove_linebreaks",true);
this._def("button_tile_map",false);
this._def("submit_patch",true);
this._def("browsers","msie, safari, gecko,opera",true);
this._def("dialog_type","window");
this._def("accessibility_warnings",true);
this._def("accessibility_focus",true);
this._def("merge_styles_invalid_parents","");
this._def("force_hex_style_colors",true);
this._def("trim_span_elements",true);
this._def("convert_fonts_to_spans",true);
this._def("doctype",'<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">');
this._def("font_size_classes","");
this._def("font_size_style_values","8px,10px,12px,14px,18px,24px,36px",true);
this._def("event_elements","a,img",true);
this._def("convert_urls",true);
this._def("table_inline_editing",false);
this._def("object_resizing",true);
this._def("custom_shortcuts",true);
this._def("convert_on_click",false);
this._def("content_css","");
this._def("fix_list_elements",false);
this._def("fix_table_elements",false);
this._def("strict_loading_mode",document.contentType=="application/xhtml+xml");
this._def("hidden_tab_class","");
this._def("display_tab_class","");
if(this.isMSIE&&!this.isOpera){this.settings.strict_loading_mode=false
}if(this.isMSIE&&this.settings.browsers.indexOf("msie")==-1){return
}if(this.isGecko&&this.settings.browsers.indexOf("gecko")==-1){return
}if(this.isSafari&&this.settings.browsers.indexOf("safari")==-1){return
}if(this.isOpera&&this.settings.browsers.indexOf("opera")==-1){return
}var s=tinyMCE.settings.document_base_url;
var o=document.location.href;
var e=o.indexOf("://");
if(e>0&&document.location.protocol!="file:"){e=o.indexOf("/",e+3);
o=o.substring(0,e);
if(s.indexOf("://")==-1){s=o+s
}tinyMCE.settings.document_base_url=s;
tinyMCE.settings.document_base_prefix=o
}if(s.indexOf("?")!=-1){s=s.substring(0,s.indexOf("?"))
}this.settings.base_href=s.substring(0,s.lastIndexOf("/"))+"/";
l=this.settings.theme;
this.blockRegExp=new RegExp("^(h[1-6]|p|div|address|pre|form|table|li|ol|ul|td|blockquote|center|dl|dt|dd|dir|fieldset|form|noscript|noframes|menu|isindex|samp)$","i");
this.posKeyCodes=new Array(13,45,36,35,33,34,37,38,39,40);
this.uniqueURL="javascript:TINYMCE_UNIQUEURL();";
this.uniqueTag='<div id="mceTMPElement" style="display: none">TMP</div>';
this.callbacks=new Array("onInit","getInfo","getEditorTemplate","setupContent","onChange","onPageLoad","handleNodeChange","initInstance","execCommand","getControlHTML","handleEvent","cleanup");
this.settings.theme_href=tinyMCE.baseURL+"/themes/"+l;
if(!tinyMCE.isMSIE){this.settings.force_br_newlines=false
}if(tinyMCE.getParam("popups_css",false)){var k=tinyMCE.getParam("popups_css","");
if(k.indexOf("://")==-1&&k.charAt(0)!="/"){this.settings.popups_css=this.documentBasePath+"/"+k
}else{this.settings.popups_css=k
}}else{this.settings.popups_css=tinyMCE.baseURL+"/themes/"+l+"/css/editor_popup.css"
}if(tinyMCE.getParam("editor_css",false)){var k=tinyMCE.getParam("editor_css","");
if(k.indexOf("://")==-1&&k.charAt(0)!="/"){this.settings.editor_css=this.documentBasePath+"/"+k
}else{this.settings.editor_css=k
}}else{this.settings.editor_css=tinyMCE.baseURL+"/themes/"+l+"/css/editor_ui.css"
}if(tinyMCE.settings.debug){var f="Debug: \n";
f+="baseURL: "+this.baseURL+"\n";
f+="documentBasePath: "+this.documentBasePath+"\n";
f+="content_css: "+this.settings.content_css+"\n";
f+="popups_css: "+this.settings.popups_css+"\n";
f+="editor_css: "+this.settings.editor_css+"\n";
alert(f)
}if(this.configs.length==0){if(this.isSafari&&this.getParam("safari_warning",false)){alert("Safari support is very limited and should be considered experimental.\nSo there is no need to even submit bugreports on this early version.\nYou can disable this message by setting: safari_warning option to false")
}if(typeof(TinyMCECompressed)=="undefined"){tinyMCE.addEvent(window,"DOMContentLoaded",TinyMCE_Engine.prototype.onLoad);
if(tinyMCE.isMSIE&&!tinyMCE.isOpera){if(document.body){tinyMCE.addEvent(document.body,"readystatechange",TinyMCE_Engine.prototype.onLoad)
}else{tinyMCE.addEvent(document,"readystatechange",TinyMCE_Engine.prototype.onLoad)
}}tinyMCE.addEvent(window,"load",TinyMCE_Engine.prototype.onLoad);
tinyMCE._addUnloadEvents()
}}this.loadScript(tinyMCE.baseURL+"/themes/"+this.settings.theme+"/editor_template"+tinyMCE.srcMode+".js");
this.loadScript(tinyMCE.baseURL+"/langs/"+this.settings.language+".js");
this.loadCSS(this.settings.editor_css);
var e=tinyMCE.getParam("plugins","",true,",");
if(e.length>0){for(var m=0;
m<e.length;
m++){if(e[m].charAt(0)!="-"){this.loadScript(tinyMCE.baseURL+"/plugins/"+e[m]+"/editor_plugin"+tinyMCE.srcMode+".js")
}}}j.cleanup_entities=new Array();
var q=tinyMCE.getParam("entities","",true,",");
for(var m=0;
m<q.length;
m+=2){j.cleanup_entities["c"+q[m]]=q[m+1]
}j.index=this.configs.length;
this.configs[this.configs.length]=j;
this.loadNextScript()
},_addUnloadEvents:function(){if(tinyMCE.isMSIE){if(tinyMCE.settings.add_unload_trigger){tinyMCE.addEvent(window,"unload",TinyMCE_Engine.prototype.unloadHandler);
tinyMCE.addEvent(window.document,"beforeunload",TinyMCE_Engine.prototype.unloadHandler)
}}else{if(tinyMCE.settings.add_unload_trigger){tinyMCE.addEvent(window,"unload",function(){tinyMCE.triggerSave(true,true)
})
}}},_def:function(f,d,e){var a=tinyMCE.getParam(f,d);
a=e?a.replace(/\s+/g,""):a;
this.settings[f]=a
},hasPlugin:function(a){return typeof(this.plugins[a])!="undefined"&&this.plugins[a]!=null
},addPlugin:function(e,a){var d=this.plugins[e];
a.baseURL=d?d.baseURL:tinyMCE.baseURL+"/plugins/"+e;
this.plugins[e]=a;
this.loadNextScript()
},setPluginBaseURL:function(e,a){var d=this.plugins[e];
if(d){d.baseURL=a
}else{this.plugins[e]={baseURL:a}
}},loadPlugin:function(d,a){a=a.indexOf(".js")!=-1?a.substring(0,a.lastIndexOf("/")):a;
a=a.charAt(a.length-1)=="/"?a.substring(0,a.length-1):a;
this.plugins[d]={baseURL:a};
this.loadScript(a+"/editor_plugin"+(tinyMCE.srcMode?"_src":"")+".js")
},hasTheme:function(a){return typeof(this.themes[a])!="undefined"&&this.themes[a]!=null
},addTheme:function(d,a){this.themes[d]=a;
this.loadNextScript()
},addMenu:function(d,a){this.menus[d]=a
},hasMenu:function(a){return typeof(this.plugins[a])!="undefined"&&this.plugins[a]!=null
},loadScript:function(a){var d;
for(d=0;
d<this.loadedFiles.length;
d++){if(this.loadedFiles[d]==a){return
}}if(tinyMCE.settings.strict_loading_mode){this.pendingFiles[this.pendingFiles.length]=a
}else{document.write('<script language="javascript" type="text/javascript" src="'+a+'"><\/script>')
}this.loadedFiles[this.loadedFiles.length]=a
},loadNextScript:function(){var e=document,a;
if(!tinyMCE.settings.strict_loading_mode){return
}if(this.loadingIndex<this.pendingFiles.length){a=e.createElementNS("http://www.w3.org/1999/xhtml","script");
a.setAttribute("language","javascript");
a.setAttribute("type","text/javascript");
a.setAttribute("src",this.pendingFiles[this.loadingIndex++]);
e.getElementsByTagName("head")[0].appendChild(a)
}else{this.loadingIndex=-1
}},loadCSS:function(e){var f=e.replace(/\s+/,"").split(",");
var j=0,m=0;
var l=false;
var k=0,h=0,d,a;
for(k=0,m=f.length;
k<m;
k++){ignore_css=false;
if(f[k]!=null&&f[k]!="null"&&f[k].length>0){for(h=0,j=this.loadedFiles.length;
h<j;
h++){if(this.loadedFiles[h]==f[k]){l=true;
break
}}if(!l){if(tinyMCE.settings.strict_loading_mode){d=document.getElementsByTagName("head");
a=document.createElement("link");
a.setAttribute("href",f[k]);
a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");
d[0].appendChild(a)
}else{document.write('<link href="'+f[k]+'" rel="stylesheet" type="text/css" />')
}this.loadedFiles[this.loadedFiles.length]=f[k]
}}}},importCSS:function(j,h){var f=h.replace(/\s+/,"").split(",");
var i,k,d,a,e;
for(a=0,i=f.length;
a<i;
a++){e=f[a];
if(e!=null&&e!="null"&&e.length>0){if(e.indexOf("://")==-1&&e.charAt(0)!="/"){e=this.documentBasePath+"/"+e
}if(typeof(j.createStyleSheet)=="undefined"){k=j.createElement("link");
k.rel="stylesheet";
k.href=e;
if((d=j.getElementsByTagName("head"))!=null&&d.length>0){d[0].appendChild(k)
}}else{j.createStyleSheet(e)
}}}},confirmAdd:function(f,d){var h=tinyMCE.isMSIE?event.srcElement:f.target;
var a=h.name?h.name:h.id;
tinyMCE.settings=d;
if(tinyMCE.settings.convert_on_click||(!h.getAttribute("mce_noask")&&confirm(tinyMCELang.lang_edit_confirm))){tinyMCE.addMCEControl(h,a)
}h.setAttribute("mce_noask","true")
},updateContent:function(a){var d=document.getElementById(a);
for(var h in tinyMCE.instances){var e=tinyMCE.instances[h];
if(!tinyMCE.isInstance(e)){continue
}e.switchSettings();
if(e.formElement==d){var f=e.getDoc();
tinyMCE._setHTML(f,e.formElement.value);
if(!tinyMCE.isMSIE){f.body.innerHTML=tinyMCE._cleanupHTML(e,f,this.settings,f.body,e.visualAid)
}}}},addMCEControl:function(f,a,d){var h="mce_editor_"+tinyMCE.idCounter++;
var e=new TinyMCE_Control(tinyMCE.settings);
e.editorId=h;
this.instances[h]=e;
e._onAdd(f,a,d)
},removeMCEControl:function(j){var f=tinyMCE.getInstanceById(j);
if(f){f.switchSettings();
j=f.editorId;
var h=tinyMCE.getContent(j);
var a=new Array();
for(var k in tinyMCE.instances){var l=tinyMCE.instances[k];
if(!tinyMCE.isInstance(l)){continue
}if(k!=j){a[k]=l
}}tinyMCE.instances=a;
tinyMCE.selectedElement=null;
tinyMCE.selectedInstance=null;
var d=document.getElementById(j+"_parent");
var i=f.oldTargetElement;
var e=i.nodeName.toLowerCase();
if(e=="textarea"||e=="input"){d.parentNode.removeChild(d);
i.style.display="inline";
i.value=h
}else{i.innerHTML=h;
i.style.display="block";
d.parentNode.insertBefore(i,d);
d.parentNode.removeChild(d)
}}},triggerSave:function(d,a){var e,f;
if(typeof(d)=="undefined"){d=false
}if(typeof(a)=="undefined"){a=false
}for(f in tinyMCE.instances){e=tinyMCE.instances[f];
if(!tinyMCE.isInstance(e)){continue
}e.triggerSave(d,a)
}},resetForm:function(f){var d,e,h,a=document.forms[f];
for(h in tinyMCE.instances){e=tinyMCE.instances[h];
if(!tinyMCE.isInstance(e)){continue
}e.switchSettings();
for(d=0;
d<a.elements.length;
d++){if(e.formTargetElementId==a.elements[d].name){e.getBody().innerHTML=e.startContent
}}}},execInstanceCommand:function(h,f,i,e,a){var d=tinyMCE.getInstanceById(h);
if(d){if(typeof(a)=="undefined"){a=true
}if(a){d.contentWindow.focus()
}d.autoResetDesignMode();
this.selectedElement=d.getFocusElement();
this.selectedInstance=d;
tinyMCE.execCommand(f,i,e);
if(tinyMCE.isMSIE&&window.event!=null){tinyMCE.cancelEvent(window.event)
}}},execCommand:function(h,j,d){j=j?j:false;
d=d?d:null;
if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.switchSettings()
}switch(h){case"mceHelp":tinyMCE.openWindow({file:"about.htm",width:480,height:380},{tinymce_version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion,tinymce_releasedate:tinyMCE.releaseDate,inline:"yes"});
return;
case"mceFocus":var a=tinyMCE.getInstanceById(d);
if(a){a.contentWindow.focus()
}return;
case"mceAddControl":case"mceAddEditor":tinyMCE.addMCEControl(tinyMCE._getElementById(d),d);
return;
case"mceAddFrameControl":tinyMCE.addMCEControl(tinyMCE._getElementById(d.element,d.document),d.element,d.document);
return;
case"mceRemoveControl":case"mceRemoveEditor":tinyMCE.removeMCEControl(d);
return;
case"mceResetDesignMode":if(!tinyMCE.isMSIE){for(var i in tinyMCE.instances){if(!tinyMCE.isInstance(tinyMCE.instances[i])){continue
}try{tinyMCE.instances[i].getDoc().designMode="on"
}catch(f){}}}return
}if(this.selectedInstance){this.selectedInstance.execCommand(h,j,d)
}else{if(tinyMCE.settings.focus_alert){alert(tinyMCELang.lang_focus_alert)
}}},_createIFrame:function(i,h,f){var d,j=i.getAttribute("id");
var e,a;
if(typeof(h)=="undefined"){h=document
}if(typeof(f)=="undefined"){f=window
}d=h.createElement("iframe");
e=""+tinyMCE.settings.area_width;
a=""+tinyMCE.settings.area_height;
if(e.indexOf("%")==-1){e=parseInt(e);
e=e<0?300:e;
e=e+"px"
}if(a.indexOf("%")==-1){a=parseInt(a);
a=a<0?245:a;
a=a+"px"
}d.setAttribute("id",j);
d.setAttribute("class","mceEditorIframe");
d.setAttribute("border","0");
d.setAttribute("frameBorder","0");
d.setAttribute("marginWidth","0");
d.setAttribute("marginHeight","0");
d.setAttribute("leftMargin","0");
d.setAttribute("topMargin","0");
d.setAttribute("width",e);
d.setAttribute("height",a);
d.setAttribute("allowtransparency","true");
d.className="mceEditorIframe";
if(tinyMCE.settings.auto_resize){d.setAttribute("scrolling","no")
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera){d.setAttribute("src",this.settings.default_document)
}d.style.width=e;
d.style.height=a;
if(tinyMCE.settings.strict_loading_mode){d.style.marginBottom="-5px"
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera){i.outerHTML=d.outerHTML
}else{i.parentNode.replaceChild(d,i)
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera){return f.frames[j]
}else{return d
}},setupContent:function(editor_id){var inst=tinyMCE.instances[editor_id];
var doc=inst.getDoc();
var head=doc.getElementsByTagName("head").item(0);
var content=inst.startContent;
if(tinyMCE.settings.strict_loading_mode){content=content.replace(/&lt;/g,"<");
content=content.replace(/&gt;/g,">");
content=content.replace(/&quot;/g,'"');
content=content.replace(/&amp;/g,"&")
}inst.switchSettings();
if(!tinyMCE.isMSIE&&tinyMCE.getParam("setupcontent_reload",false)&&doc.title!="blank_page"){try{doc.location.href=tinyMCE.baseURL+"/blank.htm"
}catch(ex){}window.setTimeout("tinyMCE.setupContent('"+editor_id+"');",1000);
return
}if(!head){window.setTimeout("tinyMCE.setupContent('"+editor_id+"');",10);
return
}tinyMCE.importCSS(inst.getDoc(),tinyMCE.baseURL+"/themes/"+inst.settings.theme+"/css/editor_content.css");
tinyMCE.importCSS(inst.getDoc(),inst.settings.content_css);
tinyMCE.dispatchCallback(inst,"init_instance_callback","initInstance",inst);
if(tinyMCE.getParam("custom_undo_redo_keyboard_shortcuts")){inst.addShortcut("ctrl","z","lang_undo_desc","Undo");
inst.addShortcut("ctrl","y","lang_redo_desc","Redo")
}if(tinyMCE.isGecko){inst.addShortcut("ctrl","b","lang_bold_desc","Bold");
inst.addShortcut("ctrl","i","lang_italic_desc","Italic");
inst.addShortcut("ctrl","u","lang_underline_desc","Underline")
}if(tinyMCE.getParam("convert_fonts_to_spans")){inst.getDoc().body.setAttribute("id","mceSpanFonts")
}if(tinyMCE.settings.nowrap){doc.body.style.whiteSpace="nowrap"
}doc.body.dir=this.settings.directionality;
doc.editorId=editor_id;
if(!tinyMCE.isMSIE){doc.documentElement.editorId=editor_id
}inst.setBaseHREF(tinyMCE.settings.base_href);
if(tinyMCE.settings.convert_newlines_to_brs){content=tinyMCE.regexpReplace(content,"\r\n","<br />","gi");
content=tinyMCE.regexpReplace(content,"\r","<br />","gi");
content=tinyMCE.regexpReplace(content,"\n","<br />","gi")
}content=tinyMCE.storeAwayURLs(content);
content=tinyMCE._customCleanup(inst,"insert_to_editor",content);
if(tinyMCE.isMSIE){window.setInterval('try{tinyMCE.getCSSClasses(tinyMCE.instances["'+editor_id+'"].getDoc(), "'+editor_id+'");}catch(e){}',500);
if(tinyMCE.settings.force_br_newlines){doc.styleSheets[0].addRule("p","margin: 0;")
}var body=inst.getBody();
body.editorId=editor_id
}content=tinyMCE.cleanupHTMLCode(content);
if(!tinyMCE.isMSIE){var contentElement=inst.getDoc().createElement("body");
var doc=inst.getDoc();
contentElement.innerHTML=content;
if(tinyMCE.isGecko&&tinyMCE.settings.remove_lt_gt){content=content.replace(new RegExp("&lt;&gt;","g"),"")
}if(tinyMCE.settings.cleanup_on_startup){tinyMCE.setInnerHTML(inst.getBody(),tinyMCE._cleanupHTML(inst,doc,this.settings,contentElement))
}else{content=tinyMCE.regexpReplace(content,"<strong","<b","gi");
content=tinyMCE.regexpReplace(content,"<em(/?)>","<i$1>","gi");
content=tinyMCE.regexpReplace(content,"<em ","<i ","gi");
content=tinyMCE.regexpReplace(content,"</strong>","</b>","gi");
content=tinyMCE.regexpReplace(content,"</em>","</i>","gi");
tinyMCE.setInnerHTML(inst.getBody(),content)
}tinyMCE.convertAllRelativeURLs(inst.getBody())
}else{if(tinyMCE.settings.cleanup_on_startup){tinyMCE._setHTML(inst.getDoc(),content);
eval("try {tinyMCE.setInnerHTML(inst.getBody(), tinyMCE._cleanupHTML(inst, inst.contentDocument, this.settings, inst.getBody()));} catch(e) {}")
}else{tinyMCE._setHTML(inst.getDoc(),content)
}}var parentElm=inst.targetDoc.getElementById(inst.editorId+"_parent");
inst.formElement=tinyMCE.isGecko?parentElm.previousSibling:parentElm.nextSibling;
tinyMCE.handleVisualAid(inst.getBody(),true,tinyMCE.settings.visual,inst);
tinyMCE.dispatchCallback(inst,"setupcontent_callback","setupContent",editor_id,inst.getBody(),inst.getDoc());
if(!tinyMCE.isMSIE){tinyMCE.addEventHandlers(inst)
}if(tinyMCE.isMSIE){tinyMCE.addEvent(inst.getBody(),"blur",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(inst.getBody(),"beforedeactivate",TinyMCE_Engine.prototype._eventPatch);
if(!tinyMCE.isOpera){tinyMCE.addEvent(doc.body,"mousemove",TinyMCE_Engine.prototype.onMouseMove);
tinyMCE.addEvent(doc.body,"beforepaste",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(doc.body,"drop",TinyMCE_Engine.prototype._eventPatch)
}}tinyMCE.selectedInstance=inst;
tinyMCE.selectedElement=inst.contentWindow.document.body;
tinyMCE._customCleanup(inst,"insert_to_editor_dom",inst.getBody());
tinyMCE._customCleanup(inst,"setup_content_dom",inst.getBody());
tinyMCE._setEventsEnabled(inst.getBody(),false);
tinyMCE.cleanupAnchors(inst.getDoc());
if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertSpansToFonts(inst.getDoc())
}inst.startContent=tinyMCE.trim(inst.getBody().innerHTML);
inst.undoRedo.add({content:inst.startContent});
if(tinyMCE.isGecko){tinyMCE.selectNodes(inst.getBody(),function(n){if(n.nodeType==3||n.nodeType==8){n.nodeValue=n.nodeValue.replace(new RegExp('\\smce_src="[^"]*"',"gi"),"");
n.nodeValue=n.nodeValue.replace(new RegExp('\\smce_href="[^"]*"',"gi"),"")
}return false
})
}tinyMCE._removeInternal(inst.getBody());
tinyMCE.selectedInstance=inst;
tinyMCE.triggerNodeChange(false,true)
},storeAwayURLs:function(a){if(!a.match(/(mce_src|mce_href)/gi,a)){a=a.replace(new RegExp('src\\s*=\\s*"([^ >"]*)"',"gi"),'src="$1" mce_src="$1"');
a=a.replace(new RegExp('href\\s*=\\s*"([^ >"]*)"',"gi"),'href="$1" mce_href="$1"')
}return a
},_removeInternal:function(a){if(tinyMCE.isGecko){tinyMCE.selectNodes(a,function(d){if(d.nodeType==3||d.nodeType==8){d.nodeValue=d.nodeValue.replace(new RegExp('\\smce_src="[^"]*"',"gi"),"");
d.nodeValue=d.nodeValue.replace(new RegExp('\\smce_href="[^"]*"',"gi"),"")
}return false
})
}},removeTinyMCEFormElements:function(d){if(typeof(d)=="undefined"||d==null){return
}if(d.nodeName!="FORM"){if(d.form){d=d.form
}else{d=tinyMCE.getParentElement(d,"form")
}}if(d==null){return
}for(var e=0;
e<d.elements.length;
e++){var a=d.elements[e].name?d.elements[e].name:d.elements[e].id;
if(a.indexOf("mce_editor_")==0){d.elements[e].disabled=true
}}},handleEvent:function(m){var h=tinyMCE.selectedInstance;
if(typeof(tinyMCE)=="undefined"){return true
}if(tinyMCE.executeCallback(tinyMCE.selectedInstance,"handle_event_callback","handleEvent",m)){return false
}switch(m.type){case"beforedeactivate":case"blur":if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.execCommand("mceEndTyping")
}tinyMCE.hideMenus();
return;
case"drop":case"beforepaste":if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.setBaseHREF(null)
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera){var v=tinyMCE.selectedInstance.iframeElement;
if(v.style.height.indexOf("%")!=-1){v._oldHeight=v.style.height;
v.style.height=v.clientHeight
}}window.setTimeout("tinyMCE.selectedInstance.setBaseHREF(tinyMCE.settings['base_href']);tinyMCE._resetIframeHeight();",1);
return;
case"submit":tinyMCE.removeTinyMCEFormElements(tinyMCE.isMSIE?window.event.srcElement:m.target);
tinyMCE.triggerSave();
tinyMCE.isNotDirty=true;
return;
case"reset":var j=tinyMCE.isMSIE?window.event.srcElement:m.target;
for(var f=0;
f<document.forms.length;
f++){if(document.forms[f]==j){window.setTimeout("tinyMCE.resetForm("+f+");",10)
}}return;
case"keypress":if(h&&h.handleShortcut(m)){return false
}if(m.target.editorId){tinyMCE.selectedInstance=tinyMCE.instances[m.target.editorId]
}else{if(m.target.ownerDocument.editorId){tinyMCE.selectedInstance=tinyMCE.instances[m.target.ownerDocument.editorId]
}}if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.switchSettings()
}if(tinyMCE.isGecko&&tinyMCE.settings.force_p_newlines&&m.keyCode==13&&!m.shiftKey){if(TinyMCE_ForceParagraphs._insertPara(tinyMCE.selectedInstance,m)){tinyMCE.execCommand("mceAddUndoLevel");
tinyMCE.cancelEvent(m);
return false
}}if(tinyMCE.isGecko&&tinyMCE.settings.force_p_newlines&&(m.keyCode==8||m.keyCode==46)&&!m.shiftKey){if(TinyMCE_ForceParagraphs._handleBackSpace(tinyMCE.selectedInstance,m.type)){tinyMCE.execCommand("mceAddUndoLevel");
tinyMCE.cancelEvent(m);
return false
}}if(tinyMCE.isMSIE&&tinyMCE.settings.force_br_newlines&&m.keyCode==13){if(m.target.editorId){tinyMCE.selectedInstance=tinyMCE.instances[m.target.editorId]
}if(tinyMCE.selectedInstance){var d=tinyMCE.selectedInstance.getDoc().selection;
var a=d.createRange();
if(tinyMCE.getParentElement(a.parentElement(),"li")!=null){return false
}m.returnValue=false;
m.cancelBubble=true;
a.pasteHTML("<br />");
a.collapse(false);
a.select();
tinyMCE.execCommand("mceAddUndoLevel");
tinyMCE.triggerNodeChange(false);
return false
}}if(m.keyCode==8||m.keyCode==46){tinyMCE.selectedElement=m.target;
tinyMCE.linkElement=tinyMCE.getParentElement(m.target,"a");
tinyMCE.imgElement=tinyMCE.getParentElement(m.target,"img");
tinyMCE.triggerNodeChange(false)
}return false;
break;
case"keyup":case"keydown":tinyMCE.hideMenus();
tinyMCE.hasMouseMoved=false;
if(h&&h.handleShortcut(m)){return false
}if(m.target.editorId){tinyMCE.selectedInstance=tinyMCE.instances[m.target.editorId]
}else{return
}if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.switchSettings()
}var h=tinyMCE.selectedInstance;
if(tinyMCE.isGecko&&tinyMCE.settings.force_p_newlines&&(m.keyCode==8||m.keyCode==46)&&!m.shiftKey){if(TinyMCE_ForceParagraphs._handleBackSpace(tinyMCE.selectedInstance,m.type)){tinyMCE.execCommand("mceAddUndoLevel");
m.preventDefault();
return false
}}tinyMCE.selectedElement=null;
tinyMCE.selectedNode=null;
var o=tinyMCE.selectedInstance.getFocusElement();
tinyMCE.linkElement=tinyMCE.getParentElement(o,"a");
tinyMCE.imgElement=tinyMCE.getParentElement(o,"img");
tinyMCE.selectedElement=o;
if(tinyMCE.isGecko&&m.type=="keyup"&&m.keyCode==9){tinyMCE.handleVisualAid(tinyMCE.selectedInstance.getBody(),true,tinyMCE.settings.visual,tinyMCE.selectedInstance)
}if(tinyMCE.isMSIE&&m.type=="keydown"&&m.keyCode==13){tinyMCE.enterKeyElement=tinyMCE.selectedInstance.getFocusElement()
}if(tinyMCE.isMSIE&&m.type=="keyup"&&m.keyCode==13){var o=tinyMCE.enterKeyElement;
if(o){var u=new RegExp("^HR|IMG|BR$","g");
var p=new RegExp("^H[1-6]$","g");
if(!o.hasChildNodes()&&!u.test(o.nodeName)){if(p.test(o.nodeName)){o.innerHTML="&nbsp;&nbsp;"
}else{o.innerHTML="&nbsp;"
}}}}var t=tinyMCE.posKeyCodes;
var l=false;
for(var f=0;
f<t.length;
f++){if(t[f]==m.keyCode){l=true;
break
}}if(tinyMCE.isMSIE&&tinyMCE.settings.custom_undo_redo){var t=new Array(8,46);
for(var f=0;
f<t.length;
f++){if(t[f]==m.keyCode){if(m.type=="keyup"){tinyMCE.triggerNodeChange(false)
}}}}if(m.keyCode==17){return true
}if(!l&&m.type=="keyup"){tinyMCE.execCommand("mceStartTyping")
}if(m.type=="keydown"&&(l||m.ctrlKey)&&h){h.undoBookmark=h.selection.getBookmark()
}if(m.type=="keyup"&&(l||m.ctrlKey)){tinyMCE.execCommand("mceEndTyping")
}if(l&&m.type=="keyup"){tinyMCE.triggerNodeChange(false)
}if(tinyMCE.isMSIE&&m.ctrlKey){window.setTimeout("tinyMCE.triggerNodeChange(false);",1)
}break;
case"mousedown":case"mouseup":case"click":case"focus":tinyMCE.hideMenus();
if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.switchSettings();
tinyMCE.selectedInstance.isFocused=true
}var s=tinyMCE.getParentElement(m.target,"body");
for(var q in tinyMCE.instances){if(!tinyMCE.isInstance(tinyMCE.instances[q])){continue
}var h=tinyMCE.instances[q];
h.autoResetDesignMode();
if(h.getBody()==s){tinyMCE.selectedInstance=h;
tinyMCE.selectedElement=m.target;
tinyMCE.linkElement=tinyMCE.getParentElement(tinyMCE.selectedElement,"a");
tinyMCE.imgElement=tinyMCE.getParentElement(tinyMCE.selectedElement,"img");
break
}}if(!tinyMCE.selectedInstance.undoRedo.undoLevels[0].bookmark){tinyMCE.selectedInstance.undoRedo.undoLevels[0].bookmark=tinyMCE.selectedInstance.selection.getBookmark()
}if(tinyMCE.isSafari){tinyMCE.selectedInstance.lastSafariSelection=tinyMCE.selectedInstance.selection.getBookmark();
tinyMCE.selectedInstance.lastSafariSelectedElement=tinyMCE.selectedElement;
var k=tinyMCE.getParentElement(tinyMCE.selectedElement,"a");
if(k&&m.type=="mousedown"){k.setAttribute("mce_real_href",k.getAttribute("href"));
k.setAttribute("href","javascript:void(0);")
}if(k&&m.type=="click"){window.setTimeout(function(){k.setAttribute("href",k.getAttribute("mce_real_href"));
k.removeAttribute("mce_real_href")
},10)
}}if(m.type!="focus"){tinyMCE.selectedNode=null
}tinyMCE.triggerNodeChange(false);
tinyMCE.execCommand("mceEndTyping");
if(m.type=="mouseup"){tinyMCE.execCommand("mceAddUndoLevel")
}if(!tinyMCE.selectedInstance&&m.target.editorId){tinyMCE.selectedInstance=tinyMCE.instances[m.target.editorId]
}return false;
break
}},getButtonHTML:function(a,d,j,f,l,e){var k="",i,o;
f="tinyMCE.execInstanceCommand('{$editor_id}','"+f+"'";
if(typeof(l)!="undefined"&&l!=null){f+=","+l
}if(typeof(e)!="undefined"&&e!=null){f+=",'"+e+"'"
}f+=");";
if(tinyMCE.getParam("button_tile_map")&&(!tinyMCE.isMSIE||tinyMCE.isOpera)&&(i=this.buttonMap[a])!=null&&(tinyMCE.getParam("language")=="en"||j.indexOf("$lang")==-1)){o=0-(i*20)==0?"0":0-(i*20);
k+='<a id="{$editor_id}_'+a+'" href="javascript:'+f+'" onclick="'+f+'return false;" onmousedown="return false;" class="mceTiledButton mceButtonNormal" target="_self">';
k+='<img src="{$themeurl}/images/spacer.gif" style="background-position: '+o+'px 0" title="{$'+d+'}" />';
k+="</a>"
}else{k+='<a id="{$editor_id}_'+a+'" href="javascript:'+f+'" onclick="'+f+'return false;" onmousedown="return false;" class="mceButtonNormal" target="_self">';
k+='<img src="'+j+'" title="{$'+d+'}" />';
k+="</a>"
}return k
},addButtonMap:function(d){var f,e=d.replace(/\s+/,"").split(",");
for(f=0;
f<e.length;
f++){this.buttonMap[e[f]]=f
}},submitPatch:function(){tinyMCE.removeTinyMCEFormElements(this);
tinyMCE.triggerSave();
this.mceOldSubmit();
tinyMCE.isNotDirty=true
},onLoad:function(){if(tinyMCE.settings.strict_loading_mode&&this.loadingIndex!=-1){window.setTimeout("tinyMCE.onLoad();",1);
return
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera&&window.event.type=="readystatechange"&&document.readyState!="complete"){return true
}if(tinyMCE.isLoaded){return true
}tinyMCE.isLoaded=true;
tinyMCE.dispatchCallback(null,"onpageload","onPageLoad");
for(var u=0;
u<tinyMCE.configs.length;
u++){tinyMCE.settings=tinyMCE.configs[u];
var l=tinyMCE.getParam("editor_selector");
var f=tinyMCE.getParam("editor_deselector");
var v=new Array();
if(document.forms&&tinyMCE.settings.add_form_submit_trigger&&!tinyMCE.submitTriggers){for(var p=0;
p<document.forms.length;
p++){var d=document.forms[p];
tinyMCE.addEvent(d,"submit",TinyMCE_Engine.prototype.handleEvent);
tinyMCE.addEvent(d,"reset",TinyMCE_Engine.prototype.handleEvent);
tinyMCE.submitTriggers=true;
if(tinyMCE.settings.submit_patch){try{d.mceOldSubmit=d.submit;
d.submit=TinyMCE_Engine.prototype.submitPatch
}catch(s){}}}}var q=tinyMCE.settings.mode;
switch(q){case"exact":var a=tinyMCE.getParam("elements","",true,",");
for(var p=0;
p<a.length;
p++){var o=tinyMCE._getElementById(a[p]);
var h=o?o.getAttribute(tinyMCE.settings.textarea_trigger):"";
if(tinyMCE.getAttrib(o,"class").indexOf(f)!=-1){continue
}if(h=="false"){continue
}if((tinyMCE.settings.ask||tinyMCE.settings.convert_on_click)&&o){v[v.length]=o;
continue
}if(o){tinyMCE.addMCEControl(o,a[p])
}else{if(tinyMCE.settings.debug){alert("Error: Could not find element by id or name: "+a[p])
}}}break;
case"specific_textareas":case"textareas":var k=document.getElementsByTagName("textarea");
for(var p=0;
p<k.length;
p++){var t=k.item(p);
var h=t.getAttribute(tinyMCE.settings.textarea_trigger);
if(l!=""&&tinyMCE.getAttrib(t,"class").indexOf(l)==-1){continue
}if(l!=""){h=l!=""?"true":""
}if(tinyMCE.getAttrib(t,"class").indexOf(f)!=-1){continue
}if((q=="specific_textareas"&&h=="true")||(q=="textareas"&&h!="false")){v[v.length]=t
}}break
}for(var p=0;
p<v.length;
p++){var o=v[p];
var m=o.name?o.name:o.id;
if(tinyMCE.settings.ask||tinyMCE.settings.convert_on_click){if(tinyMCE.isGecko){var j=tinyMCE.settings;
tinyMCE.addEvent(o,"focus",function(i){window.setTimeout(function(){TinyMCE_Engine.prototype.confirmAdd(i,j)
},10)
});
if(o.nodeName!="TEXTAREA"&&o.nodeName!="INPUT"){tinyMCE.addEvent(o,"click",function(i){window.setTimeout(function(){TinyMCE_Engine.prototype.confirmAdd(i,j)
},10)
})
}}else{var j=tinyMCE.settings;
tinyMCE.addEvent(o,"focus",function(){TinyMCE_Engine.prototype.confirmAdd(null,j)
});
tinyMCE.addEvent(o,"click",function(){TinyMCE_Engine.prototype.confirmAdd(null,j)
})
}}else{tinyMCE.addMCEControl(o,m)
}}if(tinyMCE.settings.auto_focus){window.setTimeout(function(){var e=tinyMCE.getInstanceById(tinyMCE.settings.auto_focus);
e.selection.selectNode(e.getBody(),true,true);
e.contentWindow.focus()
},10)
}tinyMCE.dispatchCallback(null,"oninit","onInit")
}},isInstance:function(a){return a!=null&&typeof(a)=="object"&&a.isTinyMCE_Control
},getParam:function(e,a,k,d){var j=(typeof(this.settings[e])=="undefined")?a:this.settings[e];
if(j=="true"||j=="false"){return(j=="true")
}if(k){j=tinyMCE.regexpReplace(j,"[ \t\r\n]","")
}if(typeof(d)!="undefined"&&d!=null){j=j.split(d);
var h=new Array();
for(var f=0;
f<j.length;
f++){if(j[f]&&j[f]!=""){h[h.length]=j[f]
}}j=h
}return j
},getLang:function(f,a,e,h){var d=(typeof(tinyMCELang[f])=="undefined")?a:tinyMCELang[f],i;
if(e){d=tinyMCE.entityDecode(d)
}if(h){for(i in h){d=this.replaceVar(d,i,h[i])
}}return d
},entityDecode:function(a){var d=document.createElement("div");
d.innerHTML=a;
return d.innerHTML
},addToLang:function(e,a){for(var d in a){if(typeof(a[d])=="function"){continue
}tinyMCELang[(d.indexOf("lang_")==-1?"lang_":"")+(e!=""?(e+"_"):"")+d]=a[d]
}this.loadNextScript()
},triggerNodeChange:function(m,k){if(tinyMCE.selectedInstance){var e=tinyMCE.selectedInstance;
var d=e.editorId;
var i=(typeof(k)!="undefined"&&k)?tinyMCE.selectedElement:e.getFocusElement();
var f=-1;
var l=-1;
var h=false;
var a=e.selection.getSelectedText();
if(k&&tinyMCE.isGecko&&e.isHidden()){i=e.getBody()
}e.switchSettings();
if(tinyMCE.settings.auto_resize){var j=e.getDoc();
e.iframeElement.style.width=j.body.offsetWidth+"px";
e.iframeElement.style.height=j.body.offsetHeight+"px"
}if(tinyMCE.selectedElement){h=(tinyMCE.selectedElement.nodeName.toLowerCase()=="img")||(a&&a.length>0)
}if(tinyMCE.settings.custom_undo_redo){f=e.undoRedo.undoIndex;
l=e.undoRedo.undoLevels.length
}tinyMCE.dispatchCallback(e,"handle_node_change_callback","handleNodeChange",d,i,f,l,e.visualAid,h,k)
}if(this.selectedInstance&&(typeof(m)=="undefined"||m)){this.selectedInstance.contentWindow.focus()
}},_customCleanup:function(inst,type,content){var pl,po,i;
var customCleanup=tinyMCE.settings.cleanup_callback;
if(customCleanup!=""&&eval("typeof("+customCleanup+")")!="undefined"){content=eval(customCleanup+"(type, content, inst);")
}pl=inst.plugins;
for(i=0;
i<pl.length;
i++){po=tinyMCE.plugins[pl[i]];
if(po&&po.cleanup){content=po.cleanup(type,content,inst)
}}return content
},setContent:function(a){if(tinyMCE.selectedInstance){tinyMCE.selectedInstance.execCommand("mceSetContent",false,a);
tinyMCE.selectedInstance.repaint()
}},importThemeLanguagePack:function(a){if(typeof(a)=="undefined"){a=tinyMCE.settings.theme
}tinyMCE.loadScript(tinyMCE.baseURL+"/themes/"+a+"/langs/"+tinyMCE.settings.language+".js")
},importPluginLanguagePack:function(d,f){var h="en",a=tinyMCE.baseURL+"/plugins/"+d;
f=f.split(",");
for(var e=0;
e<f.length;
e++){if(tinyMCE.settings.language==f[e]){h=tinyMCE.settings.language
}}if(this.plugins[d]){a=this.plugins[d].baseURL
}tinyMCE.loadScript(a+"/langs/"+h+".js")
},applyTemplate:function(j,a){var e,f,d=j.match(new RegExp("\\{\\$[a-z0-9_]+\\}","gi"));
if(d&&d.length>0){for(e=d.length-1;
e>=0;
e--){f=d[e].substring(2,d[e].length-1);
if(f.indexOf("lang_")==0&&tinyMCELang[f]){j=tinyMCE.replaceVar(j,f,tinyMCELang[f])
}else{if(a&&a[f]){j=tinyMCE.replaceVar(j,f,a[f])
}else{if(tinyMCE.settings[f]){j=tinyMCE.replaceVar(j,f,tinyMCE.settings[f])
}}}}}j=tinyMCE.replaceVar(j,"themeurl",tinyMCE.themeURL);
return j
},replaceVar:function(d,e,a){return d.replace(new RegExp("{\\$"+e+"}","g"),a)
},openWindow:function(template,args){var html,width,height,x,y,resizable,scrollbars,url;
args.mce_template_file=template.file;
args.mce_width=template.width;
args.mce_height=template.height;
tinyMCE.windowArgs=args;
html=template.html;
if(!(width=parseInt(template.width))){width=320
}if(!(height=parseInt(template.height))){height=200
}if(tinyMCE.isMSIE){height+=40
}else{height+=20
}x=parseInt(screen.width/2)-(width/2);
y=parseInt(screen.height/2)-(height/2);
resizable=(args&&args.resizable)?args.resizable:"no";
scrollbars=(args&&args.scrollbars)?args.scrollbars:"no";
if(template.file.charAt(0)!="/"&&template.file.indexOf("://")==-1){url=tinyMCE.baseURL+"/themes/"+tinyMCE.getParam("theme")+"/"+template.file
}else{url=template.file
}for(var name in args){if(typeof(args[name])=="function"){continue
}url=tinyMCE.replaceVar(url,name,escape(args[name]))
}if(html){html=tinyMCE.replaceVar(html,"css",this.settings.popups_css);
html=tinyMCE.applyTemplate(html,args);
var win=window.open("","mcePopup"+new Date().getTime(),"top="+y+",left="+x+",scrollbars="+scrollbars+",dialog=yes,minimizable="+resizable+",modal=yes,width="+width+",height="+height+",resizable="+resizable);
if(win==null){alert(tinyMCELang.lang_popup_blocked);
return
}win.document.write(html);
win.document.close();
win.resizeTo(width,height);
win.focus()
}else{if((tinyMCE.isMSIE&&!tinyMCE.isOpera)&&resizable!="yes"&&tinyMCE.settings.dialog_type=="modal"){height+=10;
var features="resizable:"+resizable+";scroll:"+scrollbars+";status:yes;center:yes;help:no;dialogWidth:"+width+"px;dialogHeight:"+height+"px;";
window.showModalDialog(url,window,features)
}else{var modal=(resizable=="yes")?"no":"yes";
if(tinyMCE.isGecko&&tinyMCE.isMac){modal="no"
}if(template.close_previous!="no"){try{tinyMCE.lastWindow.close()
}catch(ex){}}var win=window.open(url,"mcePopup"+new Date().getTime(),"top="+y+",left="+x+",scrollbars="+scrollbars+",dialog="+modal+",minimizable="+resizable+",modal="+modal+",width="+width+",height="+height+",resizable="+resizable);
if(win==null){alert(tinyMCELang.lang_popup_blocked);
return
}if(template.close_previous!="no"){tinyMCE.lastWindow=win
}eval("try { win.resizeTo(width, height); } catch(e) { }");
if(tinyMCE.isGecko){if(win.document.defaultView.statusbar.visible){win.resizeBy(0,tinyMCE.isMac?10:24)
}}win.focus()
}}},closeWindow:function(a){a.close()
},getVisualAidClass:function(h,f){var k="";
if(typeof(f)=="undefined"){f=tinyMCE.settings.visual
}var j=new Array();
var a=h.split(" ");
for(var d=0;
d<a.length;
d++){if(a[d]==k){a[d]=""
}if(a[d]!=""){j[j.length]=a[d]
}}if(f){j[j.length]=k
}var e="";
for(var d=0;
d<j.length;
d++){if(d>0){e+=""
}e+=j[d]
}return e
},handleVisualAid:function(f,p,e,j,m){if(!f){return
}if(!m){tinyMCE.dispatchCallback(j,"handle_visual_aid_callback","handleVisualAid",f,p,e,j)
}var a=null;
switch(f.nodeName){case"TABLE":var q=f.style.width;
var k=f.style.height;
var d=tinyMCE.getAttrib(f,"border");
d=d==""||d=="0"?true:false;
tinyMCE.setAttrib(f,"class",tinyMCE.getVisualAidClass(tinyMCE.getAttrib(f,"class"),e&&d));
f.style.width=q;
f.style.height=k;
if(f.className=="wiki-table"){for(var o=0;
o<f.rows.length;
o++){if(o==0){f.rows[o].className="table-head"
}else{if((o%2)==1){f.rows[o].className="table-odd"
}else{f.rows[o].className="table-even"
}}}}break;
case"A":var l=tinyMCE.getAttrib(f,"name");
if(l!=""&&e){f.title=l;
f.className="mceItemAnchor"
}else{if(l!=""&&!e){f.className=""
}}break
}if(p&&f.hasChildNodes()){for(var h=0;
h<f.childNodes.length;
h++){tinyMCE.handleVisualAid(f.childNodes[h],p,e,j,true)
}}},fixGeckoBaseHREFBug:function(k,p,o){var d,l,t,j,s,q,f;
if(tinyMCE.isGecko){if(k==1){o=o.replace(/\ssrc=/gi," mce_tsrc=");
o=o.replace(/\shref=/gi," mce_thref=");
return o
}else{f=new Array("a","img","select","area","iframe","base","input","script","embed","object","link");
for(t=0;
t<f.length;
t++){j=p.getElementsByTagName(f[t]);
for(l=0;
l<j.length;
l++){s=tinyMCE.getAttrib(j[l],"mce_tsrc");
q=tinyMCE.getAttrib(j[l],"mce_thref");
if(s!=""){try{j[l].src=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,s)
}catch(p){}j[l].removeAttribute("mce_tsrc")
}if(q!=""){try{j[l].href=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,q)
}catch(p){}j[l].removeAttribute("mce_thref")
}}}f=tinyMCE.selectNodes(p,function(a){if(a.nodeType==3||a.nodeType==8){a.nodeValue=a.nodeValue.replace(/\smce_tsrc=/gi," src=");
a.nodeValue=a.nodeValue.replace(/\smce_thref=/gi," href=")
}return false
})
}}return o
},_setHTML:function(l,j){j=tinyMCE.cleanupHTMLCode(j);
try{tinyMCE.setInnerHTML(l.body,j)
}catch(k){if(this.isMSIE){l.body.createTextRange().pasteHTML(j)
}}if(tinyMCE.isMSIE&&tinyMCE.settings.fix_content_duplication){var a=l.getElementsByTagName("P");
for(var f=0;
f<a.length;
f++){var h=a[f];
while((h=h.parentNode)!=null){if(h.nodeName=="P"){h.outerHTML=h.innerHTML
}}}var d=l.body.innerHTML;
tinyMCE.setInnerHTML(l.body,d)
}tinyMCE.cleanupAnchors(l);
if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertSpansToFonts(l)
}},getEditorId:function(a){var d=this.getInstanceById(a);
if(!d){return null
}return d.editorId
},getInstanceById:function(e){var d=this.instances[e];
if(!d){for(var f in tinyMCE.instances){var a=tinyMCE.instances[f];
if(!tinyMCE.isInstance(a)){continue
}if(a.formTargetElementId==e){d=a;
break
}}}return d
},queryInstanceCommandValue:function(e,d){var a=tinyMCE.getInstanceById(e);
if(a){return a.queryCommandValue(d)
}return false
},queryInstanceCommandState:function(e,d){var a=tinyMCE.getInstanceById(e);
if(a){return a.queryCommandState(d)
}return null
},setWindowArg:function(d,a){this.windowArgs[d]=a
},getWindowArg:function(e,a){return(typeof(this.windowArgs[e])=="undefined")?a:this.windowArgs[e]
},getCSSClasses:function(editor_id,doc){var output=new Array();
if(typeof(tinyMCE.cssClasses)!="undefined"){return tinyMCE.cssClasses
}if(typeof(editor_id)=="undefined"&&typeof(doc)=="undefined"){var instance;
for(var instanceName in tinyMCE.instances){instance=tinyMCE.instances[instanceName];
if(!tinyMCE.isInstance(instance)){continue
}break
}doc=instance.getDoc()
}if(typeof(doc)=="undefined"){var instance=tinyMCE.getInstanceById(editor_id);
doc=instance.getDoc()
}if(doc){var styles=doc.styleSheets;
if(styles&&styles.length>0){for(var x=0;
x<styles.length;
x++){var csses=null;
eval("try {var csses = tinyMCE.isMSIE ? doc.styleSheets("+x+").rules : styles["+x+"].cssRules;} catch(e) {}");
if(!csses){return new Array()
}for(var i=0;
i<csses.length;
i++){var selectorText=csses[i].selectorText;
if(selectorText){var rules=selectorText.split(",");
for(var c=0;
c<rules.length;
c++){var rule=rules[c];
while(rule.indexOf(" ")==0){rule=rule.substring(1)
}if(rule.indexOf(" ")!=-1||rule.indexOf(":")!=-1||rule.indexOf("mceItem")!=-1){continue
}if(rule.indexOf(tinyMCE.settings.visual_table_class)!=-1||rule.indexOf("mceEditable")!=-1||rule.indexOf("mceNonEditable")!=-1){continue
}if(rule.indexOf(".")!=-1){var cssClass=rule.substring(rule.indexOf(".")+1);
var addClass=true;
for(var p=0;
p<output.length&&addClass;
p++){if(output[p]==cssClass){addClass=false
}}if(addClass){output[output.length]=cssClass
}}}}}}}}if(output.length>0){tinyMCE.cssClasses=output
}return output
},regexpReplace:function(h,a,e,f){if(h==null){return h
}if(typeof(f)=="undefined"){f="g"
}var d=new RegExp(a,f);
return h.replace(d,e)
},trim:function(a){return a.replace(/^\s*|\s*$/g,"")
},cleanupEventStr:function(a){a=""+a;
a=a.replace("function anonymous()\n{\n","");
a=a.replace("\n}","");
a=a.replace(/^return true;/gi,"");
return a
},getControlHTML:function(j){var e,a,h,f,d;
a=tinyMCE.plugins;
for(h in a){f=a[h];
if(f.getControlHTML&&(d=f.getControlHTML(j))!=""){return tinyMCE.replaceVar(d,"pluginurl",f.baseURL)
}}f=tinyMCE.themes[tinyMCE.settings.theme];
if(f.getControlHTML&&(d=f.getControlHTML(j))!=""){return d
}return""
},evalFunc:function(f,idx,a){var s="(",i;
for(i=idx;
i<a.length;
i++){s+="a["+i+"]";
if(i<a.length-1){s+=","
}}s+=");";
return eval("f"+s)
},dispatchCallback:function(a,d,e){return this.callFunc(a,d,e,0,this.dispatchCallback.arguments)
},executeCallback:function(a,d,e){return this.callFunc(a,d,e,1,this.executeCallback.arguments)
},execCommandCallback:function(a,d,e){return this.callFunc(a,d,e,2,this.execCommandCallback.arguments)
},callFunc:function(ins,p,n,m,a){var l,i,on,o,s,v;
s=m==2;
l=tinyMCE.getParam(p,"");
if(l!=""&&(v=tinyMCE.evalFunc(typeof(l)=="function"?l:eval(l),3,a))==s&&m>0){return true
}if(ins!=null){for(i=0,l=ins.plugins;
i<l.length;
i++){o=tinyMCE.plugins[l[i]];
if(o[n]&&(v=tinyMCE.evalFunc(o[n],3,a))==s&&m>0){return true
}}}l=tinyMCE.themes;
for(on in l){o=l[on];
if(o[n]&&(v=tinyMCE.evalFunc(o[n],3,a))==s&&m>0){return true
}}return false
},xmlEncode:function(a){a=""+a;
a=a.replace(/&/g,"&amp;");
a=a.replace(new RegExp('"',"g"),"&quot;");
a=a.replace(/\'/g,"&#39;");
a=a.replace(/</g,"&lt;");
a=a.replace(/>/g,"&gt;");
return a
},extend:function(d,a){var e={};
e.parent=d;
for(n in d){e[n]=d[n]
}for(n in a){e[n]=a[n]
}return e
},hideMenus:function(){var a=tinyMCE.lastSelectedMenuBtn;
if(tinyMCE.lastMenu){tinyMCE.lastMenu.hide();
tinyMCE.lastMenu=null
}if(a){tinyMCE.switchClass(a,tinyMCE.lastMenuBtnClass);
tinyMCE.lastSelectedMenuBtn=null
}},explode:function(j,f){var a=f.split(j),h=new Array(),e;
for(e=0;
e<a.length;
e++){if(a[e]!=""){h[h.length]=a[e]
}}return h
}};
var TinyMCE=TinyMCE_Engine;
var tinyMCE=new TinyMCE_Engine();
var tinyMCELang={};
function TinyMCE_Control(e){var m,h,l,f,a,k,j,f,d,o=e;
this.undoRedoLevel=true;
this.isTinyMCE_Control=true;
this.settings=o;
this.settings.theme=tinyMCE.getParam("theme","default");
this.settings.width=tinyMCE.getParam("width",-1);
this.settings.height=tinyMCE.getParam("height",-1);
this.selection=new TinyMCE_Selection(this);
this.undoRedo=new TinyMCE_UndoRedo(this);
this.cleanup=new TinyMCE_Cleanup();
this.shortcuts=new Array();
this.hasMouseMoved=false;
this.cleanup.init({valid_elements:o.valid_elements,extended_valid_elements:o.extended_valid_elements,entities:o.entities,entity_encoding:o.entity_encoding,debug:o.cleanup_debug,url_converter:"TinyMCE_Cleanup.prototype._urlConverter",indent:o.apply_source_formatting,invalid_elements:o.invalid_elements,verify_html:o.verify_html,fix_content_duplication:o.fix_content_duplication});
m=this.settings.theme;
if(!tinyMCE.hasTheme(m)){j=tinyMCE.callbacks;
l={};
for(h=0;
h<j.length;
h++){if((f=window["TinyMCE_"+m+"_"+j[h]])){l[j[h]]=f
}}tinyMCE.addTheme(m,l)
}this.plugins=new Array();
a=tinyMCE.getParam("plugins","",true,",");
if(a.length>0){for(h=0;
h<a.length;
h++){d=a[h];
if(d.charAt(0)=="-"){d=d.substring(1)
}if(!tinyMCE.hasPlugin(d)){j=tinyMCE.callbacks;
l={};
for(k=0;
k<j.length;
k++){if((f=window["TinyMCE_"+d+"_"+j[k]])){l[j[k]]=f
}}tinyMCE.addPlugin(d,l)
}this.plugins[this.plugins.length]=d
}}}TinyMCE_Control.prototype={hasPlugin:function(d){var a;
for(a=0;
a<this.plugins.length;
a++){if(this.plugins[a]==d){return true
}}return false
},addPlugin:function(d,a){if(!this.hasPlugin(d)){tinyMCE.addPlugin(d,a);
this.plugins[this.plugins.length]=d
}},repaint:function(){if(tinyMCE.isMSIE&&!tinyMCE.isOpera){return
}try{var e=this.selection;
var a=e.getBookmark(true);
this.getBody().style.display="none";
this.getDoc().execCommand("selectall",false,null);
this.getSel().collapseToStart();
this.getBody().style.display="block";
e.moveToBookmark(a)
}catch(d){}},switchSettings:function(){if(tinyMCE.configs.length>1&&tinyMCE.currentConfig!=this.settings.index){tinyMCE.settings=this.settings;
tinyMCE.currentConfig=this.settings.index
}},getBody:function(){return this.getDoc().body
},getDoc:function(){return this.contentWindow.document
},getWin:function(){return this.contentWindow
},addShortcut:function(h,j,o,f,s,t){var e=typeof(j)=="number",a=tinyMCE.isMSIE,q,p,l;
var u=this.shortcuts;
if(!tinyMCE.getParam("custom_shortcuts")){return false
}h=h.toLowerCase();
j=a&&!e?j.toUpperCase():j;
q=e?null:j.charCodeAt(0);
o=o&&o.indexOf("lang_")==0?tinyMCE.getLang(o):o;
p={alt:h.indexOf("alt")!=-1,ctrl:h.indexOf("ctrl")!=-1,shift:h.indexOf("shift")!=-1,charCode:q,keyCode:e?j:(a?q:null),desc:o,cmd:f,ui:s,val:t};
for(l=0;
l<u.length;
l++){if(p.alt==u[l].alt&&p.ctrl==u[l].ctrl&&p.shift==u[l].shift&&p.charCode==u[l].charCode&&p.keyCode==u[l].keyCode){return false
}}u[u.length]=p;
return true
},handleShortcut:function(f){var a,d=this.shortcuts,h;
for(a=0;
a<d.length;
a++){h=d[a];
if(h.alt==f.altKey&&h.ctrl==f.ctrlKey&&(h.keyCode==f.keyCode||h.charCode==f.charCode)){if(h.cmd&&(f.type=="keydown"||(f.type=="keypress"&&!tinyMCE.isOpera))){tinyMCE.execCommand(h.cmd,h.ui,h.val)
}tinyMCE.cancelEvent(f);
return true
}}return false
},autoResetDesignMode:function(){if(!tinyMCE.isMSIE&&this.isHidden()&&tinyMCE.getParam("auto_reset_designmode")){eval('try { this.getDoc().designMode = "On"; } catch(e) {}')
}},isHidden:function(){if(tinyMCE.isMSIE){return false
}var a=this.getSel();
return(!a||!a.rangeCount||a.rangeCount==0)
},isDirty:function(){return this.startContent!=tinyMCE.trim(this.getBody().innerHTML)&&!tinyMCE.isNotDirty
},_mergeElements:function(e,j,i,f){if(e=="removeformat"){j.className="";
j.style.cssText="";
i.className="";
i.style.cssText="";
return
}var d=tinyMCE.parseStyle(tinyMCE.getAttrib(j,"style"));
var a=tinyMCE.parseStyle(tinyMCE.getAttrib(i,"style"));
var h=tinyMCE.getAttrib(j,"class");
h+=" "+tinyMCE.getAttrib(i,"class");
if(f){for(var k in d){if(typeof(d[k])=="function"){continue
}a[k]=d[k]
}}else{for(var k in a){if(typeof(a[k])=="function"){continue
}d[k]=a[k]
}}tinyMCE.setAttrib(j,"style",tinyMCE.serializeStyle(d));
tinyMCE.setAttrib(j,"class",tinyMCE.trim(h));
i.className="";
i.style.cssText="";
i.removeAttribute("class");
i.removeAttribute("style")
},_setUseCSS:function(a){var f=this.getDoc();
try{f.execCommand("useCSS",false,!a)
}catch(e){}try{f.execCommand("styleWithCSS",false,a)
}catch(e){}if(!tinyMCE.getParam("table_inline_editing")){try{f.execCommand("enableInlineTableEditing",false,"false")
}catch(e){}}if(!tinyMCE.getParam("object_resizing")){try{f.execCommand("enableObjectResizing",false,"false")
}catch(e){}}},execCommand:function(command,user_interface,value){var doc=this.getDoc();
var win=this.getWin();
var focusElm=this.getFocusElement();
if(!new RegExp("mceStartTyping|mceEndTyping|mceBeginUndoLevel|mceEndUndoLevel|mceAddUndoLevel","gi").test(command)){this.undoBookmark=null
}if(this.lastSafariSelection&&!new RegExp("mceStartTyping|mceEndTyping|mceBeginUndoLevel|mceEndUndoLevel|mceAddUndoLevel","gi").test(command)){this.selection.moveToBookmark(this.lastSafariSelection);
tinyMCE.selectedElement=this.lastSafariSelectedElement
}if(!tinyMCE.isMSIE&&!this.useCSS){this._setUseCSS(false);
this.useCSS=true
}this.contentDocument=doc;
if(tinyMCE.execCommandCallback(this,"execcommand_callback","execCommand",this.editorId,this.getBody(),command,user_interface,value)){return
}if(focusElm&&focusElm.nodeName=="IMG"){var align=focusElm.getAttribute("align");
var img=command=="JustifyCenter"?focusElm.cloneNode(false):focusElm;
switch(command){case"JustifyLeft":if(align=="left"){img.removeAttribute("align")
}else{img.setAttribute("align","left")
}var div=focusElm.parentNode;
if(div&&div.nodeName=="DIV"&&div.childNodes.length==1&&div.parentNode){div.parentNode.replaceChild(img,div)
}this.selection.selectNode(img);
this.repaint();
tinyMCE.triggerNodeChange();
return;
case"JustifyCenter":img.removeAttribute("align");
var div=tinyMCE.getParentElement(focusElm,"div");
if(div&&div.style.textAlign=="center"){if(div.nodeName=="DIV"&&div.childNodes.length==1&&div.parentNode){div.parentNode.replaceChild(img,div)
}}else{var div=this.getDoc().createElement("div");
div.style.textAlign="center";
div.appendChild(img);
focusElm.parentNode.replaceChild(div,focusElm)
}this.selection.selectNode(img);
this.repaint();
tinyMCE.triggerNodeChange();
return;
case"JustifyRight":if(align=="right"){img.removeAttribute("align")
}else{img.setAttribute("align","right")
}var div=focusElm.parentNode;
if(div&&div.nodeName=="DIV"&&div.childNodes.length==1&&div.parentNode){div.parentNode.replaceChild(img,div)
}this.selection.selectNode(img);
this.repaint();
tinyMCE.triggerNodeChange();
return
}}if(tinyMCE.settings.force_br_newlines){var alignValue="";
if(doc.selection.type!="Control"){switch(command){case"JustifyLeft":alignValue="left";
break;
case"JustifyCenter":alignValue="center";
break;
case"JustifyFull":alignValue="justify";
break;
case"JustifyRight":alignValue="right";
break
}if(alignValue!=""){var rng=doc.selection.createRange();
if((divElm=tinyMCE.getParentElement(rng.parentElement(),"div"))!=null){divElm.setAttribute("align",alignValue)
}else{if(rng.pasteHTML&&rng.htmlText.length>0){rng.pasteHTML('<div align="'+alignValue+'">'+rng.htmlText+"</div>")
}}tinyMCE.triggerNodeChange();
return
}}}switch(command){case"mceRepaint":this.repaint();
return true;
case"InsertUnorderedList":case"InsertOrderedList":var tag=(command=="InsertUnorderedList")?"ul":"ol";
if(tinyMCE.isSafari){this.execCommand("mceInsertContent",false,"<"+tag+"><li>&nbsp;</li><"+tag+">")
}else{this.getDoc().execCommand(command,user_interface,value)
}tinyMCE.triggerNodeChange();
break;
case"Strikethrough":if(tinyMCE.isSafari){this.execCommand("mceInsertContent",false,"<strike>"+this.selection.getSelectedHTML()+"</strike>")
}else{this.getDoc().execCommand(command,user_interface,value)
}tinyMCE.triggerNodeChange();
break;
case"mceSelectNode":this.selection.selectNode(value);
tinyMCE.triggerNodeChange();
tinyMCE.selectedNode=value;
break;
case"FormatBlock":if(value==null||value==""){var elm=tinyMCE.getParentElement(this.getFocusElement(),"p,div,h1,h2,h3,h4,h5,h6,pre,address,blockquote,dt,dl,dd,samp");
if(elm){this.execCommand("mceRemoveNode",false,elm)
}}else{if(tinyMCE.isGecko&&new RegExp("<(div|blockquote|code|dt|dd|dl|samp)>","gi").test(value)){value=value.replace(/[^a-z]/gi,"")
}if(tinyMCE.isMSIE&&new RegExp("blockquote|code|samp","gi").test(value)){var b=this.selection.getBookmark();
this.getDoc().execCommand("FormatBlock",false,"<p>");
tinyMCE.renameElement(tinyMCE.getParentBlockElement(this.getFocusElement()),value);
this.selection.moveToBookmark(b)
}else{this.getDoc().execCommand("FormatBlock",false,value)
}}tinyMCE.triggerNodeChange();
break;
case"mceRemoveNode":if(!value){value=tinyMCE.getParentElement(this.getFocusElement())
}if(tinyMCE.isMSIE){value.outerHTML=value.innerHTML
}else{var rng=value.ownerDocument.createRange();
rng.setStartBefore(value);
rng.setEndAfter(value);
rng.deleteContents();
rng.insertNode(rng.createContextualFragment(value.innerHTML))
}tinyMCE.triggerNodeChange();
break;
case"mceSelectNodeDepth":var parentNode=this.getFocusElement();
for(var i=0;
parentNode;
i++){if(parentNode.nodeName.toLowerCase()=="body"){break
}if(parentNode.nodeName.toLowerCase()=="#text"){i--;
parentNode=parentNode.parentNode;
continue
}if(i==value){this.selection.selectNode(parentNode,false);
tinyMCE.triggerNodeChange();
tinyMCE.selectedNode=parentNode;
return
}parentNode=parentNode.parentNode
}break;
case"SetStyleInfo":var rng=this.getRng();
var sel=this.getSel();
var scmd=value.command;
var sname=value.name;
var svalue=value.value==null?"":value.value;
var wrapper=value.wrapper?value.wrapper:"span";
var parentElm=null;
var invalidRe=new RegExp("^BODY|HTML$","g");
var invalidParentsRe=tinyMCE.settings.merge_styles_invalid_parents!=""?new RegExp(tinyMCE.settings.merge_styles_invalid_parents,"gi"):null;
if(tinyMCE.isMSIE){if(rng.item){parentElm=rng.item(0)
}else{var pelm=rng.parentElement();
var prng=doc.selection.createRange();
prng.moveToElementText(pelm);
if(rng.htmlText==prng.htmlText||rng.boundingWidth==0){if(invalidParentsRe==null||!invalidParentsRe.test(pelm.nodeName)){parentElm=pelm
}}}}else{var felm=this.getFocusElement();
if(sel.isCollapsed||(new RegExp("td|tr|tbody|table","gi").test(felm.nodeName)&&sel.anchorNode==felm.parentNode)){parentElm=felm
}}if(parentElm&&!invalidRe.test(parentElm.nodeName)){if(scmd=="setstyle"){tinyMCE.setStyleAttrib(parentElm,sname,svalue)
}if(scmd=="setattrib"){tinyMCE.setAttrib(parentElm,sname,svalue)
}if(scmd=="removeformat"){parentElm.style.cssText="";
tinyMCE.setAttrib(parentElm,"class","")
}var ch=tinyMCE.getNodeTree(parentElm,new Array(),1);
for(var z=0;
z<ch.length;
z++){if(ch[z]==parentElm){continue
}if(scmd=="setstyle"){tinyMCE.setStyleAttrib(ch[z],sname,"")
}if(scmd=="setattrib"){tinyMCE.setAttrib(ch[z],sname,"")
}if(scmd=="removeformat"){ch[z].style.cssText="";
tinyMCE.setAttrib(ch[z],"class","")
}}}else{this._setUseCSS(false);
doc.execCommand("FontName",false,"#mce_temp_font#");
var elementArray=tinyMCE.getElementsByAttributeValue(this.getBody(),"font","face","#mce_temp_font#");
for(var x=0;
x<elementArray.length;
x++){elm=elementArray[x];
if(elm){var spanElm=doc.createElement(wrapper);
if(scmd=="setstyle"){tinyMCE.setStyleAttrib(spanElm,sname,svalue)
}if(scmd=="setattrib"){tinyMCE.setAttrib(spanElm,sname,svalue)
}if(scmd=="removeformat"){spanElm.style.cssText="";
tinyMCE.setAttrib(spanElm,"class","")
}if(elm.hasChildNodes()){for(var i=0;
i<elm.childNodes.length;
i++){spanElm.appendChild(elm.childNodes[i].cloneNode(true))
}}spanElm.setAttribute("mce_new","true");
elm.parentNode.replaceChild(spanElm,elm);
var ch=tinyMCE.getNodeTree(spanElm,new Array(),1);
for(var z=0;
z<ch.length;
z++){if(ch[z]==spanElm){continue
}if(scmd=="setstyle"){tinyMCE.setStyleAttrib(ch[z],sname,"")
}if(scmd=="setattrib"){tinyMCE.setAttrib(ch[z],sname,"")
}if(scmd=="removeformat"){ch[z].style.cssText="";
tinyMCE.setAttrib(ch[z],"class","")
}}}}}var nodes=doc.getElementsByTagName(wrapper);
for(var i=nodes.length-1;
i>=0;
i--){var elm=nodes[i];
var isNew=tinyMCE.getAttrib(elm,"mce_new")=="true";
elm.removeAttribute("mce_new");
if(elm.childNodes&&elm.childNodes.length==1&&elm.childNodes[0].nodeType==1){this._mergeElements(scmd,elm,elm.childNodes[0],isNew);
continue
}if(elm.parentNode.childNodes.length==1&&!invalidRe.test(elm.nodeName)&&!invalidRe.test(elm.parentNode.nodeName)){if(invalidParentsRe==null||!invalidParentsRe.test(elm.parentNode.nodeName)){this._mergeElements(scmd,elm.parentNode,elm,false)
}}}var nodes=doc.getElementsByTagName(wrapper);
for(var i=nodes.length-1;
i>=0;
i--){var elm=nodes[i];
var isEmpty=true;
var tmp=doc.createElement("body");
tmp.appendChild(elm.cloneNode(false));
tmp.innerHTML=tmp.innerHTML.replace(new RegExp('style=""|class=""',"gi"),"");
if(new RegExp("<span>","gi").test(tmp.innerHTML)){for(var x=0;
x<elm.childNodes.length;
x++){if(elm.parentNode!=null){elm.parentNode.insertBefore(elm.childNodes[x].cloneNode(true),elm)
}}elm.parentNode.removeChild(elm)
}}if(scmd=="removeformat"){tinyMCE.handleVisualAid(this.getBody(),true,this.visualAid,this)
}tinyMCE.triggerNodeChange();
break;
case"FontName":if(value==null){var s=this.getSel();
if(tinyMCE.isGecko&&s.isCollapsed){var f=tinyMCE.getParentElement(this.getFocusElement(),"font");
if(f!=null){this.selection.selectNode(f,false)
}}this.getDoc().execCommand("RemoveFormat",false,null);
if(f!=null&&tinyMCE.isGecko){var r=this.getRng().cloneRange();
r.collapse(true);
s.removeAllRanges();
s.addRange(r)
}}else{this.getDoc().execCommand("FontName",false,value)
}if(tinyMCE.isGecko){window.setTimeout("tinyMCE.triggerNodeChange(false);",1)
}return;
case"FontSize":this.getDoc().execCommand("FontSize",false,value);
if(tinyMCE.isGecko){window.setTimeout("tinyMCE.triggerNodeChange(false);",1)
}return;
case"forecolor":this.getDoc().execCommand("forecolor",false,value);
break;
case"HiliteColor":if(tinyMCE.isGecko){this._setUseCSS(true);
this.getDoc().execCommand("hilitecolor",false,value);
this._setUseCSS(false)
}else{this.getDoc().execCommand("BackColor",false,value)
}break;
case"Cut":case"Copy":case"Paste":var cmdFailed=false;
eval("try {this.getDoc().execCommand(command, user_interface, value);} catch (e) {cmdFailed = true;}");
if(tinyMCE.isOpera&&cmdFailed){alert("Currently not supported by your browser, use keyboard shortcuts instead.")
}if(tinyMCE.isGecko&&cmdFailed){if(confirm(tinyMCE.entityDecode(tinyMCE.getLang("lang_clipboard_msg")))){window.open("http://www.mozilla.org/editor/midasdemo/securityprefs.html","mceExternal")
}return
}else{tinyMCE.triggerNodeChange()
}break;
case"mceSetContent":if(!value){value=""
}value=tinyMCE.storeAwayURLs(value);
value=tinyMCE._customCleanup(this,"insert_to_editor",value);
tinyMCE._setHTML(doc,value);
tinyMCE.setInnerHTML(doc.body,tinyMCE._cleanupHTML(this,doc,tinyMCE.settings,doc.body));
tinyMCE.convertAllRelativeURLs(doc.body);
tinyMCE._removeInternal(this.getBody());
if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertSpansToFonts(doc)
}tinyMCE.handleVisualAid(doc.body,true,this.visualAid,this);
tinyMCE._setEventsEnabled(doc.body,false);
return true;
case"mceCleanup":var b=this.selection.getBookmark();
tinyMCE._setHTML(this.contentDocument,this.getBody().innerHTML);
tinyMCE.setInnerHTML(this.getBody(),tinyMCE._cleanupHTML(this,this.contentDocument,this.settings,this.getBody(),this.visualAid));
tinyMCE.convertAllRelativeURLs(doc.body);
if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertSpansToFonts(doc)
}tinyMCE.handleVisualAid(this.getBody(),true,this.visualAid,this);
tinyMCE._setEventsEnabled(this.getBody(),false);
this.repaint();
this.selection.moveToBookmark(b);
tinyMCE.triggerNodeChange();
break;
case"mceReplaceContent":if(!value){value=""
}this.getWin().focus();
var selectedText="";
if(tinyMCE.isMSIE){var rng=doc.selection.createRange();
selectedText=rng.text
}else{selectedText=this.getSel().toString()
}if(selectedText.length>0){value=tinyMCE.replaceVar(value,"selection",selectedText);
tinyMCE.execCommand("mceInsertContent",false,value)
}tinyMCE.triggerNodeChange();
break;
case"mceSetAttribute":if(typeof(value)=="object"){var targetElms=(typeof(value.targets)=="undefined")?"p,img,span,div,td,h1,h2,h3,h4,h5,h6,pre,address":value.targets;
var targetNode=tinyMCE.getParentElement(this.getFocusElement(),targetElms);
if(targetNode){targetNode.setAttribute(value.name,value.value);
tinyMCE.triggerNodeChange()
}}break;
case"mceSetCSSClass":this.execCommand("SetStyleInfo",false,{command:"setattrib",name:"class",value:value});
break;
case"mceInsertRawHTML":var key="tiny_mce_marker";
this.execCommand("mceBeginUndoLevel");
this.execCommand("mceInsertContent",false,key);
var scrollX=this.getDoc().body.scrollLeft+this.getDoc().documentElement.scrollLeft;
var scrollY=this.getDoc().body.scrollTop+this.getDoc().documentElement.scrollTop;
var html=this.getBody().innerHTML;
if((pos=html.indexOf(key))!=-1){tinyMCE.setInnerHTML(this.getBody(),html.substring(0,pos)+value+html.substring(pos+key.length))
}this.contentWindow.scrollTo(scrollX,scrollY);
this.execCommand("mceEndUndoLevel");
break;
case"mceInsertContent":if(!value){value=""
}var insertHTMLFailed=false;
this.getWin().focus();
if(tinyMCE.isGecko||tinyMCE.isOpera){try{if(value.indexOf("<")==-1&&!value.match(/(&#38;|&#160;|&#60;|&#62;)/g)){var r=this.getRng();
var n=this.getDoc().createTextNode(tinyMCE.entityDecode(value));
var s=this.getSel();
var r2=r.cloneRange();
s.removeAllRanges();
r.deleteContents();
r.insertNode(n);
r2.selectNode(n);
r2.collapse(false);
s.removeAllRanges();
s.addRange(r2)
}else{value=tinyMCE.fixGeckoBaseHREFBug(1,this.getDoc(),value);
this.getDoc().execCommand("inserthtml",false,value);
tinyMCE.fixGeckoBaseHREFBug(2,this.getDoc(),value)
}}catch(ex){insertHTMLFailed=true
}if(!insertHTMLFailed){tinyMCE.triggerNodeChange();
return
}}if(tinyMCE.isOpera&&insertHTMLFailed){this.getDoc().execCommand("insertimage",false,tinyMCE.uniqueURL);
var ar=tinyMCE.getElementsByAttributeValue(this.getBody(),"img","src",tinyMCE.uniqueURL);
ar[0].outerHTML=value;
return
}if(!tinyMCE.isMSIE){var isHTML=value.indexOf("<")!=-1;
var sel=this.getSel();
var rng=this.getRng();
if(isHTML){if(tinyMCE.isSafari){var tmpRng=this.getDoc().createRange();
tmpRng.setStart(this.getBody(),0);
tmpRng.setEnd(this.getBody(),0);
value=tmpRng.createContextualFragment(value)
}else{value=rng.createContextualFragment(value)
}}else{var el=document.createElement("div");
el.innerHTML=value;
value=el.firstChild.nodeValue;
value=doc.createTextNode(value)
}if(tinyMCE.isSafari&&!isHTML){this.execCommand("InsertText",false,value.nodeValue);
tinyMCE.triggerNodeChange();
return true
}else{if(tinyMCE.isSafari&&isHTML){rng.deleteContents();
rng.insertNode(value);
tinyMCE.triggerNodeChange();
return true
}}rng.deleteContents();
if(rng.startContainer.nodeType==3){var node=rng.startContainer.splitText(rng.startOffset);
node.parentNode.insertBefore(value,node)
}else{rng.insertNode(value)
}if(!isHTML){sel.selectAllChildren(doc.body);
sel.removeAllRanges();
var rng=doc.createRange();
rng.selectNode(value);
rng.collapse(false);
sel.addRange(rng)
}else{rng.collapse(false)
}tinyMCE.fixGeckoBaseHREFBug(2,this.getDoc(),value)
}else{var rng=doc.selection.createRange();
var c=value.indexOf("<!--")!=-1;
if(c){value=tinyMCE.uniqueTag+value
}if(rng.item){rng.item(0).outerHTML=value
}else{rng.pasteHTML(value)
}if(c){var e=this.getDoc().getElementById("mceTMPElement");
e.parentNode.removeChild(e)
}}tinyMCE.triggerNodeChange();
break;
case"mceStartTyping":if(tinyMCE.settings.custom_undo_redo&&this.undoRedo.typingUndoIndex==-1){this.undoRedo.typingUndoIndex=this.undoRedo.undoIndex;
this.execCommand("mceAddUndoLevel")
}break;
case"mceEndTyping":if(tinyMCE.settings.custom_undo_redo&&this.undoRedo.typingUndoIndex!=-1){this.execCommand("mceAddUndoLevel");
this.undoRedo.typingUndoIndex=-1
}break;
case"mceBeginUndoLevel":this.undoRedoLevel=false;
break;
case"mceEndUndoLevel":this.undoRedoLevel=true;
this.execCommand("mceAddUndoLevel");
break;
case"mceAddUndoLevel":if(tinyMCE.settings.custom_undo_redo&&this.undoRedoLevel){if(this.undoRedo.add()){tinyMCE.triggerNodeChange(false)
}}break;
case"Undo":if(tinyMCE.settings.custom_undo_redo){tinyMCE.execCommand("mceEndTyping");
this.undoRedo.undo();
tinyMCE.triggerNodeChange()
}else{this.getDoc().execCommand(command,user_interface,value)
}break;
case"Redo":if(tinyMCE.settings.custom_undo_redo){tinyMCE.execCommand("mceEndTyping");
this.undoRedo.redo();
tinyMCE.triggerNodeChange()
}else{this.getDoc().execCommand(command,user_interface,value)
}break;
case"mceToggleVisualAid":this.visualAid=!this.visualAid;
tinyMCE.handleVisualAid(this.getBody(),true,this.visualAid,this);
tinyMCE.triggerNodeChange();
break;
case"Indent":this.getDoc().execCommand(command,user_interface,value);
tinyMCE.triggerNodeChange();
if(tinyMCE.isMSIE){var n=tinyMCE.getParentElement(this.getFocusElement(),"blockquote");
do{if(n&&n.nodeName=="BLOCKQUOTE"){n.removeAttribute("dir");
n.removeAttribute("style")
}}while(n!=null&&(n=n.parentNode)!=null)
}break;
case"removeformat":var text=this.selection.getSelectedText();
if(tinyMCE.isOpera){this.getDoc().execCommand("RemoveFormat",false,null);
return
}if(tinyMCE.isMSIE){try{var rng=doc.selection.createRange();
rng.execCommand("RemoveFormat",false,null)
}catch(e){}this.execCommand("SetStyleInfo",false,{command:"removeformat"})
}else{this.getDoc().execCommand(command,user_interface,value);
this.execCommand("SetStyleInfo",false,{command:"removeformat"})
}if(text.length==0){this.execCommand("mceSetCSSClass",false,"")
}tinyMCE.triggerNodeChange();
break;
default:this.getDoc().execCommand(command,user_interface,value);
if(tinyMCE.isGecko){window.setTimeout("tinyMCE.triggerNodeChange(false);",1)
}else{tinyMCE.triggerNodeChange()
}}if(command!="mceAddUndoLevel"&&command!="Undo"&&command!="Redo"&&command!="mceStartTyping"&&command!="mceEndTyping"){tinyMCE.execCommand("mceAddUndoLevel")
}},queryCommandValue:function(d){try{return this.getDoc().queryCommandValue(d)
}catch(a){return null
}},queryCommandState:function(a){return this.getDoc().queryCommandState(a)
},_onAdd:function(u,f,v){var k,d,p,h;
d=this.settings.theme;
p=tinyMCE.themes[d];
var w=v?v:document;
this.targetDoc=w;
tinyMCE.themeURL=tinyMCE.baseURL+"/themes/"+this.settings.theme;
this.settings.themeurl=tinyMCE.themeURL;
if(!u){alert("Error: Could not find the target element.");
return false
}if(p.getEditorTemplate){h=p.getEditorTemplate(this.settings,this.editorId)
}var t=h.delta_width?h.delta_width:0;
var s=h.delta_height?h.delta_height:0;
var j='<span id="'+this.editorId+'_parent" class="mceEditorContainer">'+h.html;
j=tinyMCE.replaceVar(j,"editor_id",this.editorId);
this.settings.default_document=tinyMCE.baseURL+"/blank.htm";
this.settings.old_width=this.settings.width;
this.settings.old_height=this.settings.height;
if(this.settings.width==-1){this.settings.width=u.offsetWidth
}if(this.settings.height==-1){this.settings.height=u.offsetHeight
}if(this.settings.width==0){this.settings.width=u.style.width
}if(this.settings.height==0){this.settings.height=u.style.height
}if(this.settings.width==0){this.settings.width=320
}if(this.settings.height==0){this.settings.height=240
}this.settings.area_width=parseInt(this.settings.width);
this.settings.area_height=parseInt(this.settings.height);
this.settings.area_width+=t;
this.settings.area_height+=s;
if((""+this.settings.width).indexOf("%")!=-1){this.settings.area_width="100%"
}if((""+this.settings.height).indexOf("%")!=-1){this.settings.area_height="100%"
}if((""+u.style.width).indexOf("%")!=-1){this.settings.width=u.style.width;
this.settings.area_width="100%"
}if((""+u.style.height).indexOf("%")!=-1){this.settings.height=u.style.height;
this.settings.area_height="100%"
}j=tinyMCE.applyTemplate(j);
this.settings.width=this.settings.old_width;
this.settings.height=this.settings.old_height;
this.visualAid=this.settings.visual;
this.formTargetElementId=f;
if(u.nodeName=="TEXTAREA"||u.nodeName=="INPUT"){this.startContent=u.value
}else{this.startContent=u.innerHTML
}if(u.nodeName!="TEXTAREA"&&u.nodeName!="INPUT"){this.oldTargetElement=u;
if(tinyMCE.settings.debug){k='<textarea wrap="off" id="'+f+'" name="'+f+'" cols="100" rows="15"></textarea>'
}else{k='<input type="hidden" id="'+f+'" name="'+f+'" />';
this.oldTargetElement.style.display="none"
}j+="</span>";
if(tinyMCE.isGecko){j=k+j
}else{j+=k
}if(tinyMCE.isGecko){var a=u.ownerDocument.createRange();
a.setStartBefore(u);
var m=a.createContextualFragment(j);
tinyMCE.insertAfter(m,u)
}else{u.insertAdjacentHTML("beforeBegin",j)
}}else{j+="</span>";
this.oldTargetElement=u;
if(!tinyMCE.settings.debug){this.oldTargetElement.style.display="none"
}if(tinyMCE.isGecko){var a=u.ownerDocument.createRange();
a.setStartBefore(u);
var m=a.createContextualFragment(j);
tinyMCE.insertAfter(m,u)
}else{u.insertAdjacentHTML("beforeBegin",j)
}}var q=false;
var i=w.getElementById(this.editorId);
if(!tinyMCE.isMSIE){if(i&&(i.nodeName=="SPAN"||i.nodeName=="span")){i=tinyMCE._createIFrame(i,w);
q=true
}this.targetElement=i;
this.iframeElement=i;
this.contentDocument=i.contentDocument;
this.contentWindow=i.contentWindow
}else{if(i&&i.nodeName=="SPAN"){i=tinyMCE._createIFrame(i,w,w.parentWindow)
}else{i=w.frames[this.editorId]
}this.targetElement=i;
this.iframeElement=w.getElementById(this.editorId);
if(tinyMCE.isOpera){this.contentDocument=this.iframeElement.contentDocument;
this.contentWindow=this.iframeElement.contentWindow;
q=true
}else{this.contentDocument=i.window.document;
this.contentWindow=i.window
}this.getDoc().designMode="on"
}var o=this.contentDocument;
if(q){var j=tinyMCE.getParam("doctype")+'<html><head xmlns="http://www.w3.org/1999/xhtml"><base href="'+tinyMCE.settings.base_href+'" /><title>blank_page</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body class="mceContentBody"></body></html>';
try{if(!this.isHidden()){this.getDoc().designMode="on"
}o.open();
o.write(j);
o.close()
}catch(l){this.getDoc().location.href=tinyMCE.baseURL+"/blank.htm"
}}if(tinyMCE.isMSIE){window.setTimeout('tinyMCE.addEventHandlers(tinyMCE.instances["'+this.editorId+'"]);',1)
}tinyMCE.setupContent(this.editorId,true);
return true
},setBaseHREF:function(f){var i,a,j,e;
j=this.getDoc();
e=j.getElementsByTagName("base");
a=e.length>0?e[0]:null;
if(!a){e=j.getElementsByTagName("head");
i=e.length>0?e[0]:null;
a=j.createElement("base");
a.setAttribute("href",f);
i.appendChild(a)
}else{if(f==""||f==null){a.parentNode.removeChild(a)
}else{a.setAttribute("href",f)
}}},getFocusElement:function(){return this.selection.getFocusElement()
},getSel:function(){return this.selection.getSel()
},getRng:function(){return this.selection.getRng()
},triggerSave:function(skip_cleanup,skip_callback){var e,nl=new Array(),i,s;
this.switchSettings();
s=tinyMCE.settings;
if(tinyMCE.isMSIE&&!tinyMCE.isOpera){e=this.iframeElement;
do{if(e.style&&e.style.display=="none"){e.style.display="block";
nl[nl.length]={elm:e,type:"style"}
}if(e.style&&s.hidden_tab_class.length>0&&e.className.indexOf(s.hidden_tab_class)!=-1){e.className=s.display_tab_class;
nl[nl.length]={elm:e,type:"class"}
}}while((e=e.parentNode)!=null)
}tinyMCE.settings.preformatted=false;
if(typeof(skip_cleanup)=="undefined"){skip_cleanup=false
}if(typeof(skip_callback)=="undefined"){skip_callback=false
}tinyMCE._setHTML(this.getDoc(),this.getBody().innerHTML);
if(this.settings.cleanup==false){tinyMCE.handleVisualAid(this.getBody(),true,false,this);
tinyMCE._setEventsEnabled(this.getBody(),true)
}tinyMCE._customCleanup(this,"submit_content_dom",this.contentWindow.document.body);
var htm=skip_cleanup?this.getBody().innerHTML:tinyMCE._cleanupHTML(this,this.getDoc(),this.settings,this.getBody(),tinyMCE.visualAid,true,true);
htm=tinyMCE._customCleanup(this,"submit_content",htm);
if(!skip_callback&&tinyMCE.settings.save_callback!=""){var content=eval(tinyMCE.settings.save_callback+"(this.formTargetElementId,htm,this.getBody());")
}if((typeof(content)!="undefined")&&content!=null){htm=content
}htm=tinyMCE.regexpReplace(htm,"&#40;","(","gi");
htm=tinyMCE.regexpReplace(htm,"&#41;",")","gi");
htm=tinyMCE.regexpReplace(htm,"&#59;",";","gi");
htm=tinyMCE.regexpReplace(htm,"&#34;","&quot;","gi");
htm=tinyMCE.regexpReplace(htm,"&#94;","^","gi");
if(this.formElement){this.formElement.value=htm
}if(tinyMCE.isSafari&&this.formElement){this.formElement.innerText=htm
}for(i=0;
i<nl.length;
i++){if(nl[i].type=="style"){nl[i].elm.style.display="none"
}else{nl[i].elm.className=s.hidden_tab_class
}}}};
TinyMCE_Engine.prototype.cleanupHTMLCode=function(a){a=a.replace(new RegExp("<p \\/>","gi"),"<p>&nbsp;</p>");
a=a.replace(new RegExp("<p>\\s*<\\/p>","gi"),"<p>&nbsp;</p>");
a=a.replace(new RegExp("<br>\\s*<\\/br>","gi"),"<br />");
a=a.replace(new RegExp("<(h[1-6]|p|div|address|pre|form|table|li|ol|ul|td|b|font|em|strong|i|strike|u|span|a|ul|ol|li|blockquote)([a-z]*)([^\\\\|>]*)\\/>","gi"),"<$1$2$3></$1$2>");
a=a.replace(new RegExp("\\s+></","gi"),"></");
a=a.replace(new RegExp("<(img|br|hr)([^>]*)><\\/(img|br|hr)>","gi"),"<$1$2 />");
if(tinyMCE.isMSIE){a=a.replace(new RegExp("<p><hr \\/><\\/p>","gi"),"<hr>")
}if(tinyMCE.getParam("convert_urls")){a=a.replace(new RegExp('(href="{0,1})(\\s*#)',"gi"),"$1"+tinyMCE.settings.document_base_url+"#")
}return a
};
TinyMCE_Engine.prototype.parseStyle=function(j){var a=new Array();
if(j==null){return a
}var d=j.split(";");
tinyMCE.clearArray(a);
for(var e=0;
e<d.length;
e++){if(d[e]==""){continue
}var h=new RegExp("^\\s*([^:]*):\\s*(.*)\\s*$");
var f=d[e].replace(h,"$1||$2").split("||");
if(f.length==2){a[f[0].toLowerCase()]=f[1]
}}return a
};
TinyMCE_Engine.prototype.compressStyle=function(e,l,k,h){var j=new Array();
j[0]=e[l+"-top"+k];
j[1]=e[l+"-left"+k];
j[2]=e[l+"-right"+k];
j[3]=e[l+"-bottom"+k];
for(var f=0;
f<j.length;
f++){if(j[f]==null){return
}for(var d=0;
d<j.length;
d++){if(j[d]!=j[f]){return
}}}e[h]=j[0];
e[l+"-top"+k]=null;
e[l+"-left"+k]=null;
e[l+"-right"+k]=null;
e[l+"-bottom"+k]=null
};
TinyMCE_Engine.prototype.serializeStyle=function(ar){var str="";
tinyMCE.compressStyle(ar,"border","","border");
tinyMCE.compressStyle(ar,"border","-width","border-width");
tinyMCE.compressStyle(ar,"border","-color","border-color");
tinyMCE.compressStyle(ar,"border","-style","border-style");
tinyMCE.compressStyle(ar,"padding","","padding");
tinyMCE.compressStyle(ar,"margin","","margin");
for(var key in ar){var val=ar[key];
if(typeof(val)=="function"){continue
}if(key.indexOf("mso-")==0){continue
}if(val!=null&&val!=""){val=""+val;
val=val.replace(new RegExp("url\\(\\'?([^\\']*)\\'?\\)","gi"),"url('$1')");
if(val.indexOf("url(")!=-1&&tinyMCE.getParam("convert_urls")){var m=new RegExp("url\\('(.*?)'\\)").exec(val);
if(m.length>1){val="url('"+eval(tinyMCE.getParam("urlconverter_callback")+"(m[1], null, true);")+"')"
}}if(tinyMCE.getParam("force_hex_style_colors")){val=tinyMCE.convertRGBToHex(val,true)
}if(val!="url('')"){str+=key.toLowerCase()+": "+val+"; "
}}}if(new RegExp("; $").test(str)){str=str.substring(0,str.length-2)
}return str
};
TinyMCE_Engine.prototype.convertRGBToHex=function(f,a){if(f.toLowerCase().indexOf("rgb")!=-1){var e=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");
var d=f.replace(e,"$1,$2,$3,$4,$5").split(",");
if(d.length==5){r=parseInt(d[1]).toString(16);
g=parseInt(d[2]).toString(16);
b=parseInt(d[3]).toString(16);
r=r.length==1?"0"+r:r;
g=g.length==1?"0"+g:g;
b=b.length==1?"0"+b:b;
f="#"+r+g+b;
if(a){f=d[0]+f+d[4]
}}}return f
};
TinyMCE_Engine.prototype.convertHexToRGB=function(a){if(a.indexOf("#")!=-1){a=a.replace(new RegExp("[^0-9A-F]","gi"),"");
return"rgb("+parseInt(a.substring(0,2),16)+","+parseInt(a.substring(2,4),16)+","+parseInt(a.substring(4,6),16)+")"
}return a
};
TinyMCE_Engine.prototype.convertSpansToFonts=function(l){var m=tinyMCE.getParam("font_size_style_values").replace(/\s+/,"").split(",");
var j=l.body.innerHTML;
j=j.replace(/<span/gi,"<font");
j=j.replace(/<\/span/gi,"</font");
l.body.innerHTML=j;
var o=l.getElementsByTagName("font");
for(var e=0;
e<o.length;
e++){var p=tinyMCE.trim(o[e].style.fontSize).toLowerCase();
var f=0;
for(var k=0;
k<m.length;
k++){if(m[k]==p){f=k+1;
break
}}if(f>0){tinyMCE.setAttrib(o[e],"size",f);
o[e].style.fontSize=""
}var a=o[e].style.fontFamily;
if(a!=null&&a!=""){tinyMCE.setAttrib(o[e],"face",a);
o[e].style.fontFamily=""
}var d=o[e].style.color;
if(d!=null&&d!=""){tinyMCE.setAttrib(o[e],"color",tinyMCE.convertRGBToHex(d));
o[e].style.color=""
}}};
TinyMCE_Engine.prototype.convertFontsToSpans=function(l){var m=tinyMCE.getParam("font_size_style_values").replace(/\s+/,"").split(",");
var k=l.body.innerHTML;
k=k.replace(/<font/gi,"<span");
k=k.replace(/<\/font/gi,"</span");
l.body.innerHTML=k;
var d=tinyMCE.getParam("font_size_classes");
if(d!=""){d=d.replace(/\s+/,"").split(",")
}else{d=null
}var o=l.getElementsByTagName("span");
for(var f=0;
f<o.length;
f++){var j,a,e;
j=tinyMCE.getAttrib(o[f],"size");
a=tinyMCE.getAttrib(o[f],"face");
e=tinyMCE.getAttrib(o[f],"color");
if(j!=""){j=parseInt(j);
if(j>0&&j<8){if(d!=null){tinyMCE.setAttrib(o[f],"class",d[j-1])
}else{o[f].style.fontSize=m[j-1]
}}o[f].removeAttribute("size")
}if(a!=""){o[f].style.fontFamily=a;
o[f].removeAttribute("face")
}if(e!=""){o[f].style.color=e;
o[f].removeAttribute("color")
}}this.splitOverlapSpans(l)
};
TinyMCE_Engine.prototype.splitOverlapSpans=function(p){var v=p.getElementsByTagName("span");
for(var l=v.length-1;
l>=0;
l--){var d=v[l];
var u=d.childNodes;
var q=d.parentNode;
var t=d.cloneNode(false);
var o=v[l].style;
for(var h=0;
h<u.length;
h++){if(u[h].nodeName.toLowerCase()!="span"){t.appendChild(u[h].cloneNode(true));
q.insertBefore(t,d)
}else{var f=u[h].style;
t=u[h].cloneNode(true);
if(o!=null){for(var e=0;
e<o.length;
e++){var m=new Boolean("true");
if(f!=null){for(var a=0;
a<f.length;
a++){if(this.trim(o[e])==this.trim(f[a])){m=false
}}}else{m=false
}if(m){switch(o[e]){case"color":t.style.color=v[l].style.color;
break;
case"background-color":t.style.backgroundColor=v[l].style.backgroundColor;
break;
case"font-family":t.style.fontFamily=v[l].style.fontFamily;
break;
case"font-size":t.style.fontSize=v[l].style.fontSize;
break
}}}}q.insertBefore(t,d);
t=d.cloneNode(false)
}q.insertBefore(t,d)
}q.removeChild(d)
}};
TinyMCE_Engine.prototype.cleanupAnchors=function(f){var d,h,a,e=f.getElementsByTagName("a");
for(d=e.length-1;
d>=0;
d--){if(tinyMCE.getAttrib(e[d],"name")!=""&&tinyMCE.getAttrib(e[d],"href")==""){h=e[d].childNodes;
for(a=h.length-1;
a>=0;
a--){tinyMCE.insertAfter(h[a],e[d])
}}}};
TinyMCE_Engine.prototype.getContent=function(d){var a;
if(typeof(d)!="undefined"){tinyMCE.selectedInstance=tinyMCE.getInstanceById(d)
}if(tinyMCE.selectedInstance){a=tinyMCE._cleanupHTML(this.selectedInstance,this.selectedInstance.getDoc(),tinyMCE.settings,this.selectedInstance.getBody(),false,true);
if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertSpansToFonts(this.selectedInstance.getDoc())
}return a
}return null
};
TinyMCE_Engine.prototype._fixListElements=function(l){var f,o,m=["ol","ul"],k,j,h,e=new RegExp("^(OL|UL)$"),q;
for(o=0;
o<m.length;
o++){f=l.getElementsByTagName(m[o]);
for(k=0;
k<f.length;
k++){j=f[k];
h=j.parentNode;
if(e.test(h.nodeName)){q=tinyMCE.prevNode(j,"LI");
if(!q){q=l.createElement("li");
q.innerHTML="&nbsp;";
q.appendChild(j);
h.insertBefore(q,h.firstChild)
}else{q.appendChild(j)
}}}}};
TinyMCE_Engine.prototype._fixTables=function(l){var e,h,m,k,j,a,f;
e=l.getElementsByTagName("table");
for(h=0;
h<e.length;
h++){m=e[h];
if((k=tinyMCE.getParentElement(m,"p,div,h1,h2,h3,h4,h5,h6"))!=null){j=k.cloneNode(false);
j.removeAttribute("id");
f=m;
while((m=m.nextSibling)){j.appendChild(m)
}tinyMCE.insertAfter(j,k);
tinyMCE.insertAfter(f,k)
}}};
TinyMCE_Engine.prototype._cleanupHTML=function(o,w,e,u,a,j,l){var p,t,q,m,k,i,f,v,x;
if(!tinyMCE.getParam("cleanup")){return u.innerHTML
}j=typeof(j)=="undefined"?false:j;
v=o.cleanup;
x=o.settings;
t=v.settings.debug;
if(t){q=new Date().getTime()
}if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertFontsToSpans(w)
}if(tinyMCE.getParam("fix_list_elements")){tinyMCE._fixListElements(w)
}if(tinyMCE.getParam("fix_table_elements")){tinyMCE._fixTables(w)
}tinyMCE._customCleanup(o,j?"get_from_editor_dom":"insert_to_editor_dom",w.body);
if(t){m=new Date().getTime()
}v.settings.on_save=j;
v.idCount=0;
v.serializationId++;
v.serializedNodes=new Array();
v.sourceIndex=-1;
if(x.cleanup_serializer=="xml"){p=v.serializeNodeAsXML(u)
}else{p=v.serializeNodeAsHTML(u)
}if(t){k=new Date().getTime()
}p=p.replace(/<\/?(body|head|html)[^>]*>/gi,"");
p=p.replace(new RegExp(' (rowspan="1"|colspan="1")',"g"),"");
p=p.replace(/<p><hr \/><\/p>/g,"<hr />");
p=p.replace(/<p>(&nbsp;|&#160;)<\/p><hr \/><p>(&nbsp;|&#160;)<\/p>/g,"<hr />");
p=p.replace(/<td>\s*<br \/>\s*<\/td>/g,"<td>&nbsp;</td>");
p=p.replace(/<p>\s*<br \/>\s*<\/p>/g,"<p>&nbsp;</p>");
p=p.replace(/<p>\s*(&nbsp;|&#160;)\s*<br \/>\s*(&nbsp;|&#160;)\s*<\/p>/g,"<p>&nbsp;</p>");
p=p.replace(/<p>\s*(&nbsp;|&#160;)\s*<br \/>\s*<\/p>/g,"<p>&nbsp;</p>");
p=p.replace(/<p>\s*<br \/>\s*&nbsp;\s*<\/p>/g,"<p>&nbsp;</p>");
p=p.replace(new RegExp("<a>(.*?)<\\/a>","g"),"$1");
p=p.replace(/<p([^>]*)>\s*<\/p>/g,"<p$1>&nbsp;</p>");
if(/^\s*(<br \/>|<p>&nbsp;<\/p>|<p>&#160;<\/p>|<p><\/p>)\s*$/.test(p)){p=""
}if(x.preformatted){p=p.replace(/^<pre>/,"");
p=p.replace(/<\/pre>$/,"");
p="<pre>"+p+"</pre>"
}if(tinyMCE.isGecko){p=p.replace(/<o:p _moz-userdefined="" \/>/g,"");
p=p.replace(/<td([^>]*)>\s*<br \/>\s*<\/td>/g,"<td$1>&nbsp;</td>")
}if(x.force_br_newlines){p=p.replace(/<p>(&nbsp;|&#160;)<\/p>/g,"<br />")
}p=tinyMCE._customCleanup(o,j?"get_from_editor":"insert_to_editor",p);
if(j){p=p.replace(new RegExp(" ?(mceItem[a-zA-Z0-9]*|"+x.visual_table_class+")","g"),"");
p=p.replace(new RegExp(' ?class=""',"g"),"")
}if(x.remove_linebreaks&&!v.settings.indent){p=p.replace(/\n|\r/g," ")
}if(t){i=new Date().getTime()
}if(j&&v.settings.indent){p=v.formatHTML(p)
}if(l&&(x.encoding=="xml"||x.encoding=="html")){p=v.xmlEncode(p)
}if(t){f=new Date().getTime()
}if(v.settings.debug){tinyMCE.debug("Cleanup in ms: Pre="+(m-q)+", Serialize: "+(k-m)+", Post: "+(i-k)+", Format: "+(f-i)+", Sum: "+(f-q)+".")
}return p
};
function TinyMCE_Cleanup(){this.isMSIE=(navigator.appName=="Microsoft Internet Explorer");
this.rules=tinyMCE.clearArray(new Array());
this.settings={indent_elements:"head,table,tbody,thead,tfoot,form,tr,ul,ol,blockquote,object",newline_before_elements:"h1,h2,h3,h4,h5,h6,pre,address,div,ul,ol,li,meta,option,area,title,link,base,script,td",newline_after_elements:"br,hr,p,pre,address,div,ul,ol,meta,option,area,link,base,script",newline_before_after_elements:"html,head,body,table,thead,tbody,tfoot,tr,form,ul,ol,blockquote,p,object,param,hr,div",indent_char:"\t",indent_levels:1,entity_encoding:"raw",valid_elements:"*[*]",entities:"",url_converter:"",invalid_elements:"",verify_html:false};
this.vElements=tinyMCE.clearArray(new Array());
this.vElementsRe="";
this.closeElementsRe=/^(IMG|BR|HR|LINK|META|BASE|INPUT|BUTTON|AREA)$/;
this.codeElementsRe=/^(SCRIPT|STYLE)$/;
this.serializationId=0;
this.mceAttribs={href:"mce_href",src:"mce_src",type:"mce_type"}
}TinyMCE_Cleanup.prototype={init:function(h){var l,d,f,j,k,e;
for(l in h){this.settings[l]=h[l]
}h=this.settings;
this.inRe=this._arrayToRe(h.indent_elements.split(","),"","^<(",")[^>]*");
this.ouRe=this._arrayToRe(h.indent_elements.split(","),"","^<\\/(",")[^>]*");
this.nlBeforeRe=this._arrayToRe(h.newline_before_elements.split(","),"gi","<(",")([^>]*)>");
this.nlAfterRe=this._arrayToRe(h.newline_after_elements.split(","),"gi","<(",")([^>]*)>");
this.nlBeforeAfterRe=this._arrayToRe(h.newline_before_after_elements.split(","),"gi","<(\\/?)(",")([^>]*)>");
if(h.invalid_elements!=""){this.iveRe=this._arrayToRe(h.invalid_elements.toUpperCase().split(","),"g","^(",")$")
}else{this.iveRe=null
}e="";
for(f=0;
f<h.indent_levels;
f++){e+=h.indent_char
}this.inStr=e;
if(!h.verify_html){h.valid_elements="*[*]";
h.extended_valid_elements=""
}this.fillStr=h.entity_encoding=="named"?"&nbsp;":"&nbsp;";
this.idCount=0
},addRuleStr:function(a){var d=this.parseRuleStr(a);
var e;
for(e in d){if(d[e]){this.rules[e]=d[e]
}}this.vElements=tinyMCE.clearArray(new Array());
for(e in this.rules){if(this.rules[e]){this.vElements[this.vElements.length]=this.rules[e].tag
}}this.vElementsRe=this._arrayToRe(this.vElements,"")
},parseRuleStr:function(z){var l,h,d,o,k,q,u,w,v,m,f,j=tinyMCE.clearArray(new Array()),e;
if(z==null||z.length==0){return j
}l=z.split(",");
for(q=0;
q<l.length;
q++){z=l[q];
if(z.length==0){continue
}h=this.split(/\[|\]/,z);
if(h==null||h.length<1){w=z.toUpperCase()
}else{w=h[0].toUpperCase()
}v=this.split("/",w);
for(m=0;
m<v.length;
m++){d={};
d.tag=v[m];
d.forceAttribs=null;
d.defaultAttribs=null;
d.validAttribValues=null;
u=d.tag.charAt(0);
d.forceOpen=u=="+";
d.removeEmpty=u=="-";
d.fill=u=="#";
d.tag=d.tag.replace(/\+|-|#/g,"");
d.oTagName=v[0].replace(/\+|-|#/g,"").toLowerCase();
d.isWild=new RegExp("\\*|\\?|\\+","g").test(d.tag);
d.validRe=new RegExp(this._wildcardToRe("^"+d.tag+"$"));
if(h.length>1){d.vAttribsRe="^(";
o=this.split(/\|/,h[1]);
for(k=0;
k<o.length;
k++){w=o[k];
f=new RegExp("(=|:|<)(.*?)$").exec(w);
w=w.replace(new RegExp("(=|:|<).*?$"),"");
if(f&&f.length>0){if(f[0].charAt(0)==":"){if(!d.forceAttribs){d.forceAttribs=tinyMCE.clearArray(new Array())
}d.forceAttribs[w.toLowerCase()]=f[0].substring(1)
}else{if(f[0].charAt(0)=="="){if(!d.defaultAttribs){d.defaultAttribs=tinyMCE.clearArray(new Array())
}e=f[0].substring(1);
d.defaultAttribs[w.toLowerCase()]=e==""?"mce_empty":e
}else{if(f[0].charAt(0)=="<"){if(!d.validAttribValues){d.validAttribValues=tinyMCE.clearArray(new Array())
}d.validAttribValues[w.toLowerCase()]=this._arrayToRe(this.split("?",f[0].substring(1)),"")
}}}}d.vAttribsRe+=""+w.toLowerCase()+(k!=o.length-1?"|":"");
o[k]=w.toLowerCase()
}d.vAttribsRe+=")$";
d.vAttribsRe=this._wildcardToRe(d.vAttribsRe);
d.vAttribsReIsWild=new RegExp("\\*|\\?|\\+","g").test(d.vAttribsRe);
d.vAttribsRe=new RegExp(d.vAttribsRe);
d.vAttribs=o.reverse()
}else{d.vAttribsRe="";
d.vAttribs=tinyMCE.clearArray(new Array());
d.vAttribsReIsWild=false
}j[d.tag]=d
}}return j
},serializeNodeAsXML:function(h){var d,a;
if(!this.xmlDoc){if(this.isMSIE){try{this.xmlDoc=new ActiveXObject("MSXML2.DOMDocument")
}catch(f){}if(!this.xmlDoc){try{this.xmlDoc=new ActiveXObject("Microsoft.XmlDom")
}catch(f){}}}else{this.xmlDoc=document.implementation.createDocument("","",null)
}if(!this.xmlDoc){alert("Error XML Parser could not be found.")
}}if(this.xmlDoc.firstChild){this.xmlDoc.removeChild(this.xmlDoc.firstChild)
}a=this.xmlDoc.createElement("html");
a=this.xmlDoc.appendChild(a);
this._convertToXML(h,a);
if(this.isMSIE){return this.xmlDoc.xml
}else{return new XMLSerializer().serializeToString(this.xmlDoc)
}},_convertToXML:function(d,j){var p,a,h,f,m,e,o,k=false;
if(this._isDuplicate(d)){return
}p=this.xmlDoc;
switch(d.nodeType){case 1:k=d.hasChildNodes();
a=p.createElement(d.nodeName.toLowerCase());
e=d.attributes;
for(h=e.length-1;
h>-1;
h--){o=e[h];
if(o.specified&&o.nodeValue){a.setAttribute(o.nodeName.toLowerCase(),o.nodeValue)
}}if(!k&&!this.closeElementsRe.test(d.nodeName)){a.appendChild(p.createTextNode(""))
}j=j.appendChild(a);
break;
case 3:j.appendChild(p.createTextNode(d.nodeValue));
return;
case 8:j.appendChild(p.createComment(d.nodeValue));
return
}if(k){m=d.childNodes;
for(h=0,f=m.length;
h<f;
h++){this._convertToXML(m[h],j)
}}},serializeNodeAsHTML:function(j){var d,u,o="",m,k,a,t,s=false,q=false,e,p;
this._setupRules();
if(this._isDuplicate(j)){return""
}switch(j.nodeType){case 1:p=j.hasChildNodes();
if((tinyMCE.isMSIE&&!tinyMCE.isOpera)&&j.nodeName.indexOf("/")!=-1){break
}if(this.vElementsRe.test(j.nodeName)&&(!this.iveRe||!this.iveRe.test(j.nodeName))){s=true;
a=this.rules[j.nodeName];
if(!a){e=this.rules;
for(u in e){if(e[u]&&e[u].validRe.test(j.nodeName)){a=e[u];
break
}}}d=a.isWild?j.nodeName.toLowerCase():a.oTagName;
q=a.fill;
if(a.removeEmpty&&!p){return""
}o+="<"+d;
if(a.vAttribsReIsWild){e=j.attributes;
for(m=e.length-1;
m>-1;
m--){u=e[m];
if(u.specified&&a.vAttribsRe.test(u.nodeName)){o+=this._serializeAttribute(j,a,u.nodeName)
}}}else{for(m=a.vAttribs.length-1;
m>-1;
m--){o+=this._serializeAttribute(j,a,a.vAttribs[m])
}}if(!this.settings.on_save){e=this.mceAttribs;
for(u in e){if(e[u]){o+=this._serializeAttribute(j,a,e[u])
}}}if(this.closeElementsRe.test(j.nodeName)){return o+" />"
}o+=">";
if(this.isMSIE&&this.codeElementsRe.test(j.nodeName)){o+=j.innerHTML
}}break;
case 3:if(j.parentNode&&this.codeElementsRe.test(j.parentNode.nodeName)){return this.isMSIE?"":j.nodeValue
}return this.xmlEncode(j.nodeValue);
case 8:return"<!--"+this._trimComment(j.nodeValue)+"-->"
}if(p){t=j.childNodes;
for(m=0,k=t.length;
m<k;
m++){o+=this.serializeNodeAsHTML(t[m])
}}if(q&&!p){o+=this.fillStr
}if(s){o+="</"+d+">"
}return o
},_serializeAttribute:function(n,r,an){var av="",t,os=this.settings.on_save;
if(os&&(an.indexOf("mce_")==0||an.indexOf("_moz")==0)){return""
}if(os&&this.mceAttribs[an]){av=this._getAttrib(n,this.mceAttribs[an])
}if(av.length==0){av=this._getAttrib(n,an)
}if(av.length==0&&r.defaultAttribs&&(t=r.defaultAttribs[an])){av=t;
if(av=="mce_empty"){return" "+an+'=""'
}}if(r.forceAttribs&&(t=r.forceAttribs[an])){av=t
}if(os&&av.length!=0&&this.settings.url_converter.length!=0&&/^(src|href|longdesc)$/.test(an)){av=eval(this.settings.url_converter+"(this, n, av)")
}if(av.length!=0&&r.validAttribValues&&r.validAttribValues[an]&&!r.validAttribValues[an].test(av)){return""
}if(av.length!=0&&av=="{$uid}"){av="uid_"+(this.idCount++)
}if(av.length!=0){return" "+an+'="'+this.xmlEncode(av)+'"'
}return""
},formatHTML:function(j){var f=this.settings,k="",e=0,a=0,m="",d;
j=j.replace(/\r/g,"");
j="\n"+j;
j=j.replace(new RegExp("\\n\\s+","gi"),"\n");
j=j.replace(this.nlBeforeRe,"\n<$1$2>");
j=j.replace(this.nlAfterRe,"<$1$2>\n");
j=j.replace(this.nlBeforeAfterRe,"\n<$1$2$3>\n");
j+="\n";
while((e=j.indexOf("\n",e+1))!=-1){if((d=j.substring(a+1,e)).length!=0){if(this.ouRe.test(d)&&k.length>=f.indent_levels){k=k.substring(f.indent_levels)
}m+=k+d+"\n";
if(this.inRe.test(d)){k+=this.inStr
}}a=e
}return m
},xmlEncode:function(f){var d,a,h,j="",k;
this._setupEntities();
switch(this.settings.entity_encoding){case"raw":return tinyMCE.xmlEncode(f);
case"named":for(d=0,a=f.length;
d<a;
d++){k=f.charCodeAt(d);
h=this.entities[k];
if(h&&h!=""){j+="&"+h+";"
}else{j+=String.fromCharCode(k)
}}return j;
case"numeric":for(d=0,a=f.length;
d<a;
d++){k=f.charCodeAt(d);
if(k>127||k==60||k==62||k==38||k==39||k==34){j+="&#"+k+";"
}else{j+=String.fromCharCode(k)
}}return j
}return f
},split:function(f,e){var j=e.split(f);
var d,a,h=new Array();
for(d=0,a=j.length;
d<a;
d++){if(j[d]!=""){h[d]=j[d]
}}return h
},_trimComment:function(a){a=a.replace(new RegExp('\\smce_src="[^"]*"',"gi"),"");
a=a.replace(new RegExp('\\smce_href="[^"]*"',"gi"),"");
return a
},_getAttrib:function(f,i,h){if(typeof(h)=="undefined"){h=""
}if(!f||f.nodeType!=1){return h
}var a=f.getAttribute(i,0);
if(i=="class"&&!a){a=f.className
}if(this.isMSIE&&i=="http-equiv"){a=f.httpEquiv
}if(this.isMSIE&&f.nodeName=="FORM"&&i=="enctype"&&a=="application/x-www-form-urlencoded"){a=""
}if(this.isMSIE&&f.nodeName=="INPUT"&&i=="size"&&a=="20"){a=""
}if(this.isMSIE&&f.nodeName=="INPUT"&&i=="maxlength"&&a=="2147483647"){a=""
}if(i=="style"&&!tinyMCE.isOpera){a=f.style.cssText
}if(i=="style"){a=tinyMCE.serializeStyle(tinyMCE.parseStyle(a))
}if(this.settings.on_save&&i.indexOf("on")!=-1&&this.settings.on_save&&a&&a!=""){a=tinyMCE.cleanupEventStr(a)
}return(a&&a!="")?""+a:h
},_urlConverter:function(c,n,v){if(!c.settings.on_save){return tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,v)
}else{if(tinyMCE.getParam("convert_urls")){return eval(tinyMCE.settings.urlconverter_callback+"(v, n, true);")
}}return v
},_arrayToRe:function(d,k,j,e){var f,h;
k=typeof(k)=="undefined"?"gi":k;
j=typeof(j)=="undefined"?"^(":j;
e=typeof(e)=="undefined"?")$":e;
h=j;
for(f=0;
f<d.length;
f++){h+=this._wildcardToRe(d[f])+(f!=d.length-1?"|":"")
}h+=e;
return new RegExp(h,k)
},_wildcardToRe:function(a){a=a.replace(/\?/g,"(\\S?)");
a=a.replace(/\+/g,"(\\S+)");
a=a.replace(/\*/g,"(\\S*)");
return a
},_setupEntities:function(){var h,d,e,f=this.settings;
if(!this.entitiesDone){if(f.entity_encoding=="named"){h=tinyMCE.clearArray(new Array());
d=this.split(",",f.entities);
for(e=0;
e<d.length;
e+=2){h[d[e]]=d[e+1]
}this.entities=h
}this.entitiesDone=true
}},_setupRules:function(){var a=this.settings;
if(!this.rulesDone){this.addRuleStr(a.valid_elements);
this.addRuleStr(a.extended_valid_elements);
this.rulesDone=true
}},_isDuplicate:function(d){var a;
if(!this.settings.fix_content_duplication){return false
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera&&d.nodeType==1){if(d.mce_serialized==this.serializationId){return true
}d.setAttribute("mce_serialized",this.serializationId)
}else{for(a=0;
a<this.serializedNodes.length;
a++){if(this.serializedNodes[a]==d){return true
}}this.serializedNodes[this.serializedNodes.length]=d
}return false
}};
TinyMCE_Engine.prototype.getElementByAttributeValue=function(i,h,d,f){return(i=this.getElementsByAttributeValue(i,h,d,f)).length==0?null:i[0]
};
TinyMCE_Engine.prototype.getElementsByAttributeValue=function(m,k,f,h){var j,d=m.getElementsByTagName(k),l=new Array();
for(j=0;
j<d.length;
j++){if(tinyMCE.getAttrib(d[j],f).indexOf(h)!=-1){l[l.length]=d[j]
}}return l
};
TinyMCE_Engine.prototype.isBlockElement=function(a){return a!=null&&a.nodeType==1&&this.blockRegExp.test(a.nodeName)
};
TinyMCE_Engine.prototype.getParentBlockElement=function(a){while(a){if(this.isBlockElement(a)){return a
}a=a.parentNode
}return null
};
TinyMCE_Engine.prototype.insertAfter=function(d,a){if(a.nextSibling){a.parentNode.insertBefore(d,a.nextSibling)
}else{a.parentNode.appendChild(d)
}};
TinyMCE_Engine.prototype.setInnerHTML=function(j,f){var d,a,k;
if(tinyMCE.isMSIE&&!tinyMCE.isOpera){f=f.replace(/\s\/>/g,">");
f=f.replace(/<p([^>]*)>\u00A0?<\/p>/gi,'<p$1 mce_keep="true">&nbsp;</p>');
f=f.replace(/<p([^>]*)>\s*&nbsp;\s*<\/p>/gi,'<p$1 mce_keep="true">&nbsp;</p>');
f=f.replace(/<p([^>]*)>\s+<\/p>/gi,'<p$1 mce_keep="true">&nbsp;</p>');
j.innerHTML=tinyMCE.uniqueTag+f;
j.firstChild.removeNode(true);
a=j.getElementsByTagName("p");
for(d=a.length-1;
d>=0;
d--){k=a[d];
if(k.nodeName=="P"&&!k.hasChildNodes()&&!k.mce_keep){k.parentNode.removeChild(k)
}}}else{f=this.fixGeckoBaseHREFBug(1,j,f);
j.innerHTML=f;
this.fixGeckoBaseHREFBug(2,j,f)
}};
TinyMCE_Engine.prototype.getOuterHTML=function(a){if(tinyMCE.isMSIE){return a.outerHTML
}var f=a.ownerDocument.createElement("body");
f.appendChild(a);
return f.innerHTML
};
TinyMCE_Engine.prototype.setOuterHTML=function(f,a){if(tinyMCE.isMSIE){f.outerHTML=a;
return
}var i=f.ownerDocument.createElement("body");
i.innerHTML=a;
f.parentNode.replaceChild(i.firstChild,f)
};
TinyMCE_Engine.prototype._getElementById=function(o,m){var l,h,a,k;
if(typeof(m)=="undefined"){m=document
}l=m.getElementById(o);
if(!l){k=m.forms;
for(h=0;
h<k.length;
h++){for(a=0;
a<k[h].elements.length;
a++){if(k[h].elements[a].name==o){l=k[h].elements[a];
break
}}}}return l
};
TinyMCE_Engine.prototype.getNodeTree=function(h,a,e,f){var d;
if(typeof(e)=="undefined"||h.nodeType==e&&(typeof(f)=="undefined"||h.nodeName==f)){a[a.length]=h
}if(h.hasChildNodes()){for(d=0;
d<h.childNodes.length;
d++){tinyMCE.getNodeTree(h.childNodes[d],a,e,f)
}}return a
};
TinyMCE_Engine.prototype.getParentElement=function(f,j,d,h){if(typeof(j)=="undefined"){if(f.nodeType==1){return f
}while((f=f.parentNode)!=null&&f.nodeType!=1){}return f
}if(f==null){return null
}var a=j.toUpperCase().split(",");
do{for(var e=0;
e<a.length;
e++){if(f.nodeName==a[e]||j=="*"){if(typeof(d)=="undefined"){return f
}else{if(f.getAttribute(d)){if(typeof(h)=="undefined"){if(f.getAttribute(d)!=""){return f
}}else{if(f.getAttribute(d)==h){return f
}}}}}}}while((f=f.parentNode)!=null);
return null
};
TinyMCE_Engine.prototype.getParentNode=function(d,a){while(d){if(a(d)){return d
}d=d.parentNode
}return null
};
TinyMCE_Engine.prototype.getAttrib=function(f,e,a){if(typeof(a)=="undefined"){a=""
}if(!f||f.nodeType!=1){return a
}var d=f.getAttribute(e);
if(e=="class"&&!d){d=f.className
}if(tinyMCE.isGecko&&e=="src"&&f.src!=null&&f.src!=""){d=f.src
}if(tinyMCE.isGecko&&e=="href"&&f.href!=null&&f.href!=""){d=f.href
}if(e=="http-equiv"&&tinyMCE.isMSIE){d=f.httpEquiv
}if(e=="style"&&!tinyMCE.isOpera){d=f.style.cssText
}return(d&&d!="")?d:a
};
TinyMCE_Engine.prototype.setAttrib=function(e,d,h,a){if(typeof(h)=="number"&&h!=null){h=""+h
}if(a){if(h==null){h=""
}var f=new RegExp("[^0-9%]","g");
h=h.replace(f,"")
}if(d=="style"){e.style.cssText=h
}if(d=="class"){e.className=h
}if(h!=null&&h!=""&&h!=-1){e.setAttribute(d,h)
}else{e.removeAttribute(d)
}};
TinyMCE_Engine.prototype.setStyleAttrib=function(elm,name,value){eval("elm.style."+name+"=value;");
if(tinyMCE.isMSIE&&value==null||value==""){var str=tinyMCE.serializeStyle(tinyMCE.parseStyle(elm.style.cssText));
elm.style.cssText=str;
elm.setAttribute("style",str)
}};
TinyMCE_Engine.prototype.switchClass=function(d,f){var a;
if(tinyMCE.switchClassCache[d]){a=tinyMCE.switchClassCache[d]
}else{a=tinyMCE.switchClassCache[d]=document.getElementById(d)
}if(a){if(tinyMCE.settings.button_tile_map&&a.className&&a.className.indexOf("mceTiledButton")==0){f="mceTiledButton "+f
}a.className=f
}};
TinyMCE_Engine.prototype.getAbsPosition=function(d){var a={absLeft:0,absTop:0};
while(d){a.absLeft+=d.offsetLeft;
a.absTop+=d.offsetTop;
d=d.offsetParent
}return a
};
TinyMCE_Engine.prototype.prevNode=function(h,j){var d=j.split(","),f;
while((h=h.previousSibling)!=null){for(f=0;
f<d.length;
f++){if(h.nodeName==d[f]){return h
}}}return null
};
TinyMCE_Engine.prototype.nextNode=function(h,j){var d=j.split(","),f;
while((h=h.nextSibling)!=null){for(f=0;
f<d.length;
f++){if(h.nodeName==d[f]){return h
}}}return null
};
TinyMCE_Engine.prototype.selectNodes=function(j,h,d){var e;
if(!d){d=new Array()
}if(h(j)){d[d.length]=j
}if(j.hasChildNodes()){for(e=0;
e<j.childNodes.length;
e++){tinyMCE.selectNodes(j.childNodes[e],h,d)
}}return d
};
TinyMCE_Engine.prototype.addCSSClass=function(d,h,a){var f=this.removeCSSClass(d,h);
return d.className=a?h+(f!=""?(" "+f):""):(f!=""?(f+" "):"")+h
};
TinyMCE_Engine.prototype.removeCSSClass=function(h,j){var d=this.explode(" ",h.className),f;
for(f=0;
f<d.length;
f++){if(d[f]==j){d[f]=""
}}return h.className=d.join(" ")
};
TinyMCE_Engine.prototype.renameElement=function(j,l,k){var h,f,a;
k=typeof(k)=="undefined"?tinyMCE.selectedInstance.getDoc():k;
if(j){h=k.createElement(l);
a=j.attributes;
for(f=a.length-1;
f>-1;
f--){if(a[f].specified&&a[f].nodeValue){h.setAttribute(a[f].nodeName.toLowerCase(),a[f].nodeValue)
}}a=j.childNodes;
for(f=0;
f<a.length;
f++){h.appendChild(a[f].cloneNode(true))
}j.parentNode.replaceChild(h,j)
}};
TinyMCE_Engine.prototype.parseURL=function(f){var j=new Array();
if(f){var h,e;
h=f.indexOf("://");
if(h!=-1){j.protocol=f.substring(0,h);
e=h+3
}for(var a=e;
a<f.length;
a++){var d=f.charAt(a);
if(d==":"){break
}if(d=="/"){break
}}h=a;
j.host=f.substring(e,h);
j.port="";
e=h;
if(f.charAt(h)==":"){h=f.indexOf("/",e);
j.port=f.substring(e+1,h)
}e=h;
h=f.indexOf("?",e);
if(h==-1){h=f.indexOf("#",e)
}if(h==-1){h=f.length
}j.path=f.substring(e,h);
e=h;
if(f.charAt(h)=="?"){h=f.indexOf("#");
h=(h==-1)?f.length:h;
j.query=f.substring(e+1,h)
}e=h;
if(f.charAt(h)=="#"){h=f.length;
j.anchor=f.substring(e+1,h)
}}return j
};
TinyMCE_Engine.prototype.serializeURL=function(a){var d="";
if(a.protocol){d+=a.protocol+"://"
}if(a.host){d+=a.host
}if(a.port){d+=":"+a.port
}if(a.path){d+=a.path
}if(a.query){d+="?"+a.query
}if(a.anchor){d+="#"+a.anchor
}return d
};
TinyMCE_Engine.prototype.convertAbsoluteURLToRelativeURL=function(p,e){var d=this.parseURL(p);
var o=this.parseURL(e);
var a;
var q;
var l=0;
var h="";
var k=false;
if(o.path==""){o.path="/"
}else{k=true
}p=d.path.substring(0,d.path.lastIndexOf("/"));
a=p.split("/");
q=o.path.split("/");
if(a.length>=q.length){for(var j=0;
j<a.length;
j++){if(j>=q.length||a[j]!=q[j]){l=j+1;
break
}}}if(a.length<q.length){for(var j=0;
j<q.length;
j++){if(j>=a.length||a[j]!=q[j]){l=j+1;
break
}}}if(l==1){return o.path
}for(var j=0;
j<(a.length-(l-1));
j++){h+="../"
}for(var j=l-1;
j<q.length;
j++){if(j!=(l-1)){h+="/"+q[j]
}else{h+=q[j]
}}o.protocol=null;
o.host=null;
o.port=null;
o.path=h==""&&k?"/":h;
var f=d.path;
var m;
if((m=f.lastIndexOf("/"))!=-1){f=f.substring(m+1)
}if(f==o.path&&o.anchor!=""){o.path=""
}if(o.path==""&&!o.anchor){o.path=f!=""?f:"/"
}return this.serializeURL(o)
};
TinyMCE_Engine.prototype.convertRelativeToAbsoluteURL=function(p,l){var e=this.parseURL(p);
var m=this.parseURL(l);
if(l==""||l.charAt(0)=="/"||l.indexOf("://")!=-1||l.indexOf("mailto:")!=-1||l.indexOf("javascript:")!=-1){return l
}baseURLParts=e.path.split("/");
relURLParts=m.path.split("/");
var j=new Array();
for(var h=baseURLParts.length-1;
h>=0;
h--){if(baseURLParts[h].length==0){continue
}j[j.length]=baseURLParts[h]
}baseURLParts=j.reverse();
var o=new Array();
var q=0;
for(var h=relURLParts.length-1;
h>=0;
h--){if(relURLParts[h].length==0||relURLParts[h]=="."){continue
}if(relURLParts[h]==".."){q++;
continue
}if(q>0){q--;
continue
}o[o.length]=relURLParts[h]
}relURLParts=o.reverse();
var k=baseURLParts.length-q;
var a=(k<=0?"":"/")+baseURLParts.slice(0,k).join("/")+"/"+relURLParts.join("/");
var d="",f="";
m.protocol=e.protocol;
m.host=e.host;
m.port=e.port;
if(m.path.charAt(m.path.length-1)=="/"){a+="/"
}m.path=a;
return this.serializeURL(m)
};
TinyMCE_Engine.prototype.convertURL=function(a,i,k){var o=document.location.protocol;
var p=document.location.hostname;
var h=document.location.port;
if(o=="file:"){return a
}a=tinyMCE.regexpReplace(a,"(http|https):///","/");
if(a.indexOf("mailto:")!=-1||a.indexOf("javascript:")!=-1||tinyMCE.regexpReplace(a,"[ \t\r\n+]|%20","").charAt(0)=="#"){return a
}if(!tinyMCE.isMSIE&&!k&&a.indexOf("://")==-1&&a.charAt(0)!="/"){return tinyMCE.settings.base_href+a
}if(k&&tinyMCE.getParam("relative_urls")){var j=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,a);
if(j.charAt(0)=="/"){j=tinyMCE.settings.document_base_prefix+j
}var f=tinyMCE.parseURL(j);
var m=tinyMCE.parseURL(tinyMCE.settings.document_base_url);
if(f.host==m.host&&(f.port==m.port)){return tinyMCE.convertAbsoluteURLToRelativeURL(tinyMCE.settings.document_base_url,j)
}}if(!tinyMCE.getParam("relative_urls")){var f=tinyMCE.parseURL(a);
var e=tinyMCE.parseURL(tinyMCE.settings.base_href);
a=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,a);
if(f.anchor&&f.path==e.path){return"#"+f.anchor
}}if(tinyMCE.getParam("remove_script_host")){var d="",l="";
if(h!=""){l=":"+h
}d=o+"//"+p+l+"/";
if(a.indexOf(d)==0){a=a.substring(d.length-1)
}}return a
};
TinyMCE_Engine.prototype.convertAllRelativeURLs=function(a){var h=a.getElementsByTagName("img");
for(var f=0;
f<h.length;
f++){var k=tinyMCE.getAttrib(h[f],"src");
var d=tinyMCE.getAttrib(h[f],"mce_src");
if(d!=""){k=d
}if(k!=""){k=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,k);
h[f].setAttribute("src",k)
}}var h=a.getElementsByTagName("a");
for(var f=0;
f<h.length;
f++){var e=tinyMCE.getAttrib(h[f],"href");
var j=tinyMCE.getAttrib(h[f],"mce_href");
if(j!=""){e=j
}if(e&&e!=""){e=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,e);
h[f].setAttribute("href",e)
}}};
TinyMCE_Engine.prototype.clearArray=function(d){for(var e in d){d[e]=null
}return d
};
TinyMCE_Engine.prototype._setEventsEnabled=function(f,a){var m=new Array("onfocus","onblur","onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onkeypress","onkeydown","onkeydown","onkeyup");
var l=tinyMCE.settings.event_elements.split(",");
for(var j=0;
j<l.length;
j++){var e=f.getElementsByTagName(l[j]);
for(var h=0;
h<e.length;
h++){var d="";
for(var k=0;
k<m.length;
k++){if((d=tinyMCE.getAttrib(e[h],m[k]))!=""){d=tinyMCE.cleanupEventStr(""+d);
if(!a){d="return true;"+d
}else{d=d.replace(/^return true;/gi,"")
}e[h].removeAttribute(m[k]);
e[h].setAttribute(m[k],d)
}}}}};
TinyMCE_Engine.prototype._eventPatch=function(i){var j,d,h,f;
if(typeof(tinyMCE)=="undefined"){return true
}try{if(tinyMCE.selectedInstance){h=tinyMCE.selectedInstance.getWin();
if(h&&h.event){f=h.event;
if(!f.target){f.target=f.srcElement
}TinyMCE_Engine.prototype.handleEvent(f);
return
}}for(j in tinyMCE.instances){d=tinyMCE.instances[j];
if(!tinyMCE.isInstance(d)){continue
}tinyMCE.selectedInstance=d;
h=d.getWin();
if(h&&h.event){f=h.event;
if(!f.target){f.target=f.srcElement
}TinyMCE_Engine.prototype.handleEvent(f);
return
}}}catch(a){}};
TinyMCE_Engine.prototype.unloadHandler=function(){tinyMCE.triggerSave(true,true)
};
TinyMCE_Engine.prototype.addEventHandlers=function(inst){var doc=inst.getDoc();
inst.switchSettings();
if(tinyMCE.isMSIE){tinyMCE.addEvent(doc,"keypress",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(doc,"keyup",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(doc,"keydown",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(doc,"mouseup",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(doc,"mousedown",TinyMCE_Engine.prototype._eventPatch);
tinyMCE.addEvent(doc,"click",TinyMCE_Engine.prototype._eventPatch)
}else{tinyMCE.addEvent(doc,"keypress",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"keydown",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"keyup",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"click",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"mouseup",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"mousedown",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"focus",tinyMCE.handleEvent);
tinyMCE.addEvent(doc,"blur",tinyMCE.handleEvent);
eval('try { doc.designMode = "On"; } catch(e) {}')
}};
TinyMCE_Engine.prototype.onMouseMove=function(){var a;
if(!tinyMCE.hasMouseMoved){a=tinyMCE.selectedInstance;
if(a.isFocused){a.undoBookmark=a.selection.getBookmark();
tinyMCE.hasMouseMoved=true
}}};
TinyMCE_Engine.prototype.cancelEvent=function(a){if(tinyMCE.isMSIE){a.returnValue=false;
a.cancelBubble=true
}else{a.preventDefault()
}};
TinyMCE_Engine.prototype.addEvent=function(d,e,a){if(d.attachEvent){d.attachEvent("on"+e,a)
}else{d.addEventListener(e,a,false)
}};
TinyMCE_Engine.prototype.addSelectAccessibility=function(f,d,a){if(!d._isAccessible){d.onkeydown=tinyMCE.accessibleEventHandler;
d.onblur=tinyMCE.accessibleEventHandler;
d._isAccessible=true;
d._win=a
}return false
};
TinyMCE_Engine.prototype.accessibleEventHandler=function(d){var a=this._win;
d=tinyMCE.isMSIE?a.event:d;
var f=tinyMCE.isMSIE?d.srcElement:d.target;
if(d.type=="blur"){if(f.oldonchange){f.onchange=f.oldonchange;
f.oldonchange=null
}return true
}if(f.nodeName=="SELECT"&&!f.oldonchange){f.oldonchange=f.onchange;
f.onchange=null
}if(d.keyCode==13||d.keyCode==32){f.onchange=f.oldonchange;
f.onchange();
f.oldonchange=null;
tinyMCE.cancelEvent(d);
return false
}return true
};
TinyMCE_Engine.prototype._resetIframeHeight=function(){var a;
if(tinyMCE.isMSIE&&!tinyMCE.isOpera){a=tinyMCE.selectedInstance.iframeElement;
if(a._oldHeight){a.style.height=a._oldHeight;
a.height=a._oldHeight
}}};
function TinyMCE_Selection(a){this.instance=a
}TinyMCE_Selection.prototype={getSelectedHTML:function(){var f=this.instance;
var i,d=this.getRng(),a;
if(tinyMCE.isSafari){return d.toString()
}i=document.createElement("body");
if(tinyMCE.isGecko){i.appendChild(d.cloneContents())
}else{i.innerHTML=d.item?d.item(0).outerHTML:d.htmlText
}a=tinyMCE._cleanupHTML(f,f.contentDocument,f.settings,i,i,false,true,false);
if(tinyMCE.getParam("convert_fonts_to_spans")){tinyMCE.convertSpansToFonts(f.getDoc())
}return a
},getSelectedText:function(){var h=this.instance;
var i,f,e,a;
if(tinyMCE.isMSIE){i=h.getDoc();
if(i.selection.type=="Text"){f=i.selection.createRange();
a=f.text
}else{a=""
}}else{e=this.getSel();
if(e&&e.toString){a=e.toString()
}else{a=""
}}return a
},getBookmark:function(j){var f=this.getRng();
var v=this.instance.getDoc();
var k,d,w,p,h,o,m,l;
var u,t,q,a=-999999999;
if(tinyMCE.isOpera){return null
}t=v.body.scrollLeft+v.documentElement.scrollLeft;
q=v.body.scrollTop+v.documentElement.scrollTop;
if(tinyMCE.isSafari||tinyMCE.isGecko){return{rng:f,scrollX:t,scrollY:q}
}if(tinyMCE.isMSIE){if(j){return{rng:f}
}if(f.item){p=f.item(0);
h=v.getElementsByTagName(p.nodeName);
for(o=0;
o<h.length;
o++){if(p==h[o]){k=o;
break
}}return{tag:p.nodeName,index:k,scrollX:t,scrollY:q}
}else{u=f.duplicate();
u.collapse(true);
k=Math.abs(u.move("character",a));
u=f.duplicate();
u.collapse(false);
d=Math.abs(u.move("character",a))-k;
return{start:k,length:d,scrollX:t,scrollY:q}
}}if(tinyMCE.isGecko){w=tinyMCE.getParentElement(f.startContainer);
for(m=0;
m<w.childNodes.length&&w.childNodes[m]!=f.startContainer;
m++){}h=v.getElementsByTagName(w.nodeName);
for(o=0;
o<h.length;
o++){if(w==h[o]){k=o;
break
}}p=tinyMCE.getParentElement(f.endContainer);
for(l=0;
l<p.childNodes.length&&p.childNodes[l]!=f.endContainer;
l++){}h=v.getElementsByTagName(p.nodeName);
for(o=0;
o<h.length;
o++){if(p==h[o]){d=o;
break
}}return{startTag:w.nodeName,start:k,startIndex:m,endTag:p.nodeName,end:d,endIndex:l,startOffset:f.startOffset,endOffset:f.endOffset,scrollX:t,scrollY:q}
}return null
},moveToBookmark:function(k){var a,d,f;
var h=this.instance;
var m=h.getDoc();
var j=h.getWin();
var e=this.getSel();
if(!k){return false
}if(tinyMCE.isSafari){e.setBaseAndExtent(k.startContainer,k.startOffset,k.endContainer,k.endOffset);
return true
}if(tinyMCE.isMSIE){if(k.rng){k.rng.select();
return true
}j.focus();
if(k.tag){a=h.getBody().createControlRange();
d=m.getElementsByTagName(k.tag);
if(d.length>k.index){try{a.addElement(d[k.index])
}catch(l){}}}else{a=h.getSel().createRange();
a.moveToElementText(h.getBody());
a.collapse(true);
a.moveStart("character",k.start);
a.moveEnd("character",k.length)
}a.select();
j.scrollTo(k.scrollX,k.scrollY);
return true
}if(tinyMCE.isGecko&&k.rng){e.removeAllRanges();
e.addRange(k.rng);
j.scrollTo(k.scrollX,k.scrollY);
return true
}if(tinyMCE.isGecko){a=m.createRange();
d=m.getElementsByTagName(k.startTag);
if(d.length>k.start){a.setStart(d[k.start].childNodes[k.startIndex],k.startOffset)
}d=m.getElementsByTagName(k.endTag);
if(d.length>k.end){a.setEnd(d[k.end].childNodes[k.endIndex],k.endOffset)
}e.removeAllRanges();
e.addRange(a);
j.scrollTo(k.scrollX,k.scrollY);
return true
}return false
},selectNode:function(h,m,k,l){var i=this.instance,f,a,d;
if(!h){return
}if(typeof(m)=="undefined"){m=true
}if(typeof(k)=="undefined"){k=false
}if(typeof(l)=="undefined"){l=true
}if(tinyMCE.isMSIE){a=i.getBody().createTextRange();
try{a.moveToElementText(h);
if(m){a.collapse(l)
}a.select()
}catch(j){}}else{f=this.getSel();
if(!f){return
}if(tinyMCE.isSafari){f.setBaseAndExtent(h,0,h,h.innerText.length);
if(m){if(l){f.collapseToStart()
}else{f.collapseToEnd()
}}this.scrollToNode(h);
return
}a=i.getDoc().createRange();
if(k){d=tinyMCE.getNodeTree(h,new Array(),3);
if(d.length>0){a.selectNodeContents(d[0])
}else{a.selectNodeContents(h)
}}else{a.selectNode(h)
}if(m){if(!l&&h.nodeType==3){a.setStart(h,h.nodeValue.length);
a.setEnd(h,h.nodeValue.length)
}else{a.collapse(l)
}}f.removeAllRanges();
f.addRange(a)
}this.scrollToNode(h);
tinyMCE.selectedElement=null;
if(h.nodeType==1){tinyMCE.selectedElement=h
}},scrollToNode:function(d){var e=this.instance;
var j,h,i,f,a;
j=tinyMCE.getAbsPosition(d);
h=e.getDoc();
i=h.body.scrollLeft+h.documentElement.scrollLeft;
f=h.body.scrollTop+h.documentElement.scrollTop;
a=tinyMCE.isMSIE?document.getElementById(e.editorId).style.pixelHeight:e.targetElement.clientHeight;
if(!tinyMCE.settings.auto_resize&&!(j.absTop>f&&j.absTop<(f-25+a))){e.contentWindow.scrollTo(j.absLeft,j.absTop-a+25)
}},getSel:function(){var a=this.instance;
if(tinyMCE.isMSIE&&!tinyMCE.isOpera){return a.getDoc().selection
}return a.contentWindow.getSelection()
},getRng:function(){var d=this.instance;
var a=this.getSel();
if(a==null){return null
}if(tinyMCE.isMSIE&&!tinyMCE.isOpera){return a.createRange()
}if(tinyMCE.isSafari&&!a.getRangeAt){return""+window.getSelection()
}return a.getRangeAt(0)
},getFocusElement:function(){var e=this.instance;
if(tinyMCE.isMSIE&&!tinyMCE.isOpera){var f=e.getDoc();
var a=f.selection.createRange();
var h=a.item?a.item(0):a.parentElement()
}else{if(e.isHidden()){return e.getBody()
}var d=this.getSel();
var a=this.getRng();
if(!d||!a){return null
}var h=a.commonAncestorContainer;
if(!a.collapsed){if(a.startContainer==a.endContainer){if(a.startOffset-a.endOffset<2){if(a.startContainer.hasChildNodes()){h=a.startContainer.childNodes[a.startOffset]
}}}}h=tinyMCE.getParentElement(h)
}return h
}};
function TinyMCE_UndoRedo(a){this.instance=a;
this.undoLevels=new Array();
this.undoIndex=0;
this.typingUndoIndex=-1;
this.undoRedo=true
}TinyMCE_UndoRedo.prototype={add:function(e){var d;
if(e){this.undoLevels[this.undoLevels.length]=e;
return true
}var h=this.instance;
if(this.typingUndoIndex!=-1){this.undoIndex=this.typingUndoIndex
}var j=tinyMCE.trim(h.getBody().innerHTML);
if(this.undoLevels[this.undoIndex]&&j!=this.undoLevels[this.undoIndex].content){tinyMCE.dispatchCallback(h,"onchange_callback","onChange",h);
var a=tinyMCE.settings.custom_undo_redo_levels;
if(a!=-1&&this.undoLevels.length>a){for(var f=0;
f<this.undoLevels.length-1;
f++){this.undoLevels[f]=this.undoLevels[f+1]
}this.undoLevels.length--;
this.undoIndex--
}d=h.undoBookmark;
if(!d){d=h.selection.getBookmark()
}this.undoIndex++;
this.undoLevels[this.undoIndex]={content:j,bookmark:d};
this.undoLevels.length=this.undoIndex+1;
return true
}return false
},undo:function(){var a=this.instance;
if(this.undoIndex>0){this.undoIndex--;
tinyMCE.setInnerHTML(a.getBody(),this.undoLevels[this.undoIndex].content);
a.repaint();
if(a.settings.custom_undo_redo_restore_selection){a.selection.moveToBookmark(this.undoLevels[this.undoIndex].bookmark)
}}},redo:function(){var a=this.instance;
tinyMCE.execCommand("mceEndTyping");
if(this.undoIndex<(this.undoLevels.length-1)){this.undoIndex++;
tinyMCE.setInnerHTML(a.getBody(),this.undoLevels[this.undoIndex].content);
a.repaint();
if(a.settings.custom_undo_redo_restore_selection){a.selection.moveToBookmark(this.undoLevels[this.undoIndex].bookmark)
}}tinyMCE.triggerNodeChange()
}};
var TinyMCE_ForceParagraphs={_insertPara:function(i,A){function s(e){function G(H){return H.replace(new RegExp("[ \t\r\n]+","g"),"").toLowerCase()==""
}if(e.getElementsByTagName("img").length>0){return false
}if(e.getElementsByTagName("table").length>0){return false
}if(e.getElementsByTagName("hr").length>0){return false
}var E=tinyMCE.getNodeTree(e,new Array(),3);
for(var F=0;
F<E.length;
F++){if(!G(E[F].nodeValue)){return false
}}return true
}var D=i.getDoc();
var v=i.getSel();
var l=i.contentWindow;
var p=v.getRangeAt(0);
var q=D.body;
var h=D.documentElement;
var w="P";
var d=D.createRange();
d.setStart(v.anchorNode,v.anchorOffset);
d.collapse(true);
var z=D.createRange();
z.setStart(v.focusNode,v.focusOffset);
z.collapse(true);
var a=d.compareBoundaryPoints(d.START_TO_END,z)<0;
var C=a?v.anchorNode:v.focusNode;
var x=a?v.anchorOffset:v.focusOffset;
var u=a?v.focusNode:v.anchorNode;
var m=a?v.focusOffset:v.anchorOffset;
C=C.nodeName=="BODY"?C.firstChild:C;
u=u.nodeName=="BODY"?u.firstChild:u;
var o=tinyMCE.getParentBlockElement(C);
var j=tinyMCE.getParentBlockElement(u);
if(o&&new RegExp("absolute|relative|static","gi").test(o.style.position)){o=null
}if(j&&new RegExp("absolute|relative|static","gi").test(j.style.position)){j=null
}if(o!=null){w=o.nodeName;
if(w=="TD"||w=="TABLE"||(w=="DIV"&&new RegExp("left|right","gi").test(o.style.cssFloat))){w="P"
}}if(tinyMCE.getParentElement(o,"OL,UL")!=null){return false
}if((o!=null&&o.nodeName=="TABLE")||(j!=null&&j.nodeName=="TABLE")){o=j=null
}var f=(o!=null&&o.nodeName==w)?o.cloneNode(false):D.createElement(w);
var k=(j!=null&&j.nodeName==w)?j.cloneNode(false):D.createElement(w);
if(/^(H[1-6])$/.test(w)){k=D.createElement("p")
}var B=C;
var t=u;
node=B;
do{if(node==q||node.nodeType==9||tinyMCE.isBlockElement(node)){break
}B=node
}while((node=node.previousSibling?node.previousSibling:node.parentNode));
node=t;
do{if(node==q||node.nodeType==9||tinyMCE.isBlockElement(node)){break
}t=node
}while((node=node.nextSibling?node.nextSibling:node.parentNode));
if(B.nodeName=="TD"){B=B.firstChild
}if(t.nodeName=="TD"){t=t.lastChild
}if(o==null){p.deleteContents();
v.removeAllRanges();
if(B!=h&&t!=h){d=p.cloneRange();
if(B==q){d.setStart(B,0)
}else{d.setStartBefore(B)
}f.appendChild(d.cloneContents());
if(t.parentNode.nodeName==w){t=t.parentNode
}p.setEndAfter(t);
if(t.nodeName!="#text"&&t.nodeName!="BODY"){d.setEndAfter(t)
}var y=p.cloneContents();
if(y.firstChild&&(y.firstChild.nodeName==w||y.firstChild.nodeName=="BODY")){k.innerHTML=y.firstChild.innerHTML
}else{k.appendChild(y)
}if(s(f)){f.innerHTML="&nbsp;"
}if(s(k)){k.innerHTML="&nbsp;"
}p.deleteContents();
z.deleteContents();
d.deleteContents();
k.normalize();
d.insertNode(k);
f.normalize();
d.insertNode(f)
}else{q.innerHTML="<"+w+">&nbsp;</"+w+"><"+w+">&nbsp;</"+w+">";
k=q.childNodes[1]
}i.selection.selectNode(k,true,true);
return true
}if(B.nodeName==w){d.setStart(B,0)
}else{d.setStartBefore(B)
}d.setEnd(C,x);
f.appendChild(d.cloneContents());
z.setEndAfter(t);
z.setStart(u,m);
var y=z.cloneContents();
if(y.firstChild&&y.firstChild.nodeName==w){k.innerHTML=y.firstChild.innerHTML
}else{k.appendChild(y)
}if(s(f)){f.innerHTML="&nbsp;"
}if(s(k)){k.innerHTML="&nbsp;"
}var p=D.createRange();
if(!B.previousSibling&&B.parentNode.nodeName.toUpperCase()==w){p.setStartBefore(B.parentNode)
}else{if(d.startContainer.nodeName.toUpperCase()==w&&d.startOffset==0){p.setStartBefore(d.startContainer)
}else{p.setStart(d.startContainer,d.startOffset)
}}if(!t.nextSibling&&t.parentNode.nodeName.toUpperCase()==w){p.setEndAfter(t.parentNode)
}else{p.setEnd(z.endContainer,z.endOffset)
}p.deleteContents();
p.insertNode(k);
p.insertNode(f);
k.normalize();
f.normalize();
i.selection.selectNode(k,true,true);
return true
},_handleBackSpace:function(f){var e=f.getRng(),h=e.startContainer,a,d=false;
if(h&&h.nextSibling&&h.nextSibling.nodeName=="BR"){a=h.nodeValue;
if(a!=null&&a.length>=e.startOffset&&a.charAt(e.startOffset-1)==" "){d=true
}if(a!=null&&e.startOffset==a.length){h.nextSibling.parentNode.removeChild(h.nextSibling)
}}return d
}};
function TinyMCE_Layer(d,a){this.id=d;
this.blockerElement=null;
this.events=false;
this.element=null;
this.blockMode=typeof(a)!="undefined"?a:true;
this.doc=document
}TinyMCE_Layer.prototype={moveRelativeTo:function(q,a){var m=this.getAbsPosition(q);
var o=parseInt(q.offsetWidth);
var f=parseInt(q.offsetHeight);
var i=this.getElement();
var j=parseInt(i.offsetWidth);
var d=parseInt(i.offsetHeight);
var l,k;
switch(a){case"tl":l=m.absLeft;
k=m.absTop;
break;
case"tr":l=m.absLeft+o;
k=m.absTop;
break;
case"bl":l=m.absLeft;
k=m.absTop+f;
break;
case"br":l=m.absLeft+o;
k=m.absTop+f;
break;
case"cc":l=m.absLeft+(o/2)-(j/2);
k=m.absTop+(f/2)-(d/2);
break
}this.moveTo(l,k)
},moveBy:function(a,f){var d=this.getElement();
this.moveTo(parseInt(d.style.left)+a,parseInt(d.style.top)+f)
},moveTo:function(a,f){var d=this.getElement();
d.style.left=a+"px";
d.style.top=f+"px";
this.updateBlocker()
},resizeBy:function(a,d){var f=this.getElement();
this.resizeTo(parseInt(f.style.width)+a,parseInt(f.style.height)+d)
},resizeTo:function(a,d){var f=this.getElement();
if(a!=null){f.style.width=a+"px"
}if(d!=null){f.style.height=d+"px"
}this.updateBlocker()
},show:function(){this.getElement().style.display="block";
this.updateBlocker()
},hide:function(){this.getElement().style.display="none";
this.updateBlocker()
},isVisible:function(){return this.getElement().style.display=="block"
},getElement:function(){if(!this.element){this.element=this.doc.getElementById(this.id)
}return this.element
},setBlockMode:function(a){this.blockMode=a
},updateBlocker:function(){var j,d,a,k,f,i;
d=this.getBlocker();
if(d){if(this.blockMode){j=this.getElement();
a=this.parseInt(j.style.left);
k=this.parseInt(j.style.top);
f=this.parseInt(j.offsetWidth);
i=this.parseInt(j.offsetHeight);
d.style.left=a+"px";
d.style.top=k+"px";
d.style.width=f+"px";
d.style.height=i+"px";
d.style.display=j.style.display
}else{d.style.display="none"
}}},getBlocker:function(){var e,a;
if(!this.blockerElement&&this.blockMode){e=this.doc;
a=e.createElement("iframe");
a.style.cssText="display: none; position: absolute; left: 0; top: 0";
a.src="javascript:false;";
a.frameBorder="0";
a.scrolling="no";
e.body.appendChild(a);
this.blockerElement=a
}return this.blockerElement
},getAbsPosition:function(d){var a={absLeft:0,absTop:0};
while(d){a.absLeft+=d.offsetLeft;
a.absTop+=d.offsetTop;
d=d.offsetParent
}return a
},create:function(j,i,f){var h=this.doc,a=h.createElement(j);
a.setAttribute("id",this.id);
if(i){a.className=i
}if(!f){f=h.body
}f.appendChild(a);
return this.element=a
},parseInt:function(a){if(a==null||a==""){return 0
}return parseInt(a)
}};
function TinyMCE_Menu(){var a;
if(typeof(tinyMCE.menuCounter)=="undefined"){tinyMCE.menuCounter=0
}a="mc_menu_"+tinyMCE.menuCounter++;
TinyMCE_Layer.call(this,a,true);
this.id=a;
this.items=new Array();
this.needsUpdate=true
}TinyMCE_Menu.prototype=tinyMCE.extend(TinyMCE_Layer.prototype,{init:function(a){var d;
this.settings={separator_class:"mceMenuSeparator",title_class:"mceMenuTitle",disabled_class:"mceMenuDisabled",menu_class:"mceMenu",drop_menu:true};
for(d in a){this.settings[d]=a[d]
}this.create("div",this.settings.menu_class)
},clear:function(){this.items=new Array()
},addTitle:function(a){this.add({type:"title",text:a})
},addDisabled:function(a){this.add({type:"disabled",text:a})
},addSeparator:function(){this.add({type:"separator"})
},addItem:function(a,d){this.add({text:a,js:d})
},add:function(a){this.items[this.items.length]=a;
this.needsUpdate=true
},update:function(){var l=this.getElement(),k="",f,d,a=this.items,j=this.settings;
if(this.settings.drop_menu){k+='<span class="mceMenuLine"></span>'
}k+='<table border="0" cellpadding="0" cellspacing="0">';
for(f=0;
f<a.length;
f++){d=tinyMCE.xmlEncode(a[f].text);
c=a[f].class_name?' class="'+a[f].class_name+'"':"";
switch(a[f].type){case"separator":k+='<tr class="'+j.separator_class+'"><td>';
break;
case"title":k+='<tr class="'+j.title_class+'"><td><span'+c+">"+d+"</span>";
break;
case"disabled":k+='<tr class="'+j.disabled_class+'"><td><span'+c+">"+d+"</span>";
break;
default:k+='<tr><td><a href="javascript:void(0);" onmousedown="'+tinyMCE.xmlEncode(a[f].js)+';return false;"><span'+c+">"+d+"</span></a>"
}k+="</td></tr>"
}k+="</table>";
l.innerHTML=k;
this.needsUpdate=false;
this.updateBlocker()
},show:function(){var a,d;
if(tinyMCE.lastMenu==this){return
}if(this.needsUpdate){this.update()
}if(tinyMCE.lastMenu&&tinyMCE.lastMenu!=this){tinyMCE.lastMenu.hide()
}TinyMCE_Layer.prototype.show.call(this);
if(!tinyMCE.isOpera){}tinyMCE.lastMenu=this
}});
TinyMCE_Engine.prototype.debug=function(){var f="",k,h,j;
k=document.getElementById("tinymce_debug");
if(!k){var l=document.createElement("div");
l.setAttribute("className","debugger");
l.className="debugger";
l.innerHTML='Debug output:<textarea id="tinymce_debug" style="width: 100%; height: 300px" wrap="nowrap" mce_editable="false"></textarea>';
document.body.appendChild(l);
k=document.getElementById("tinymce_debug")
}h=this.debug.arguments;
for(j=0;
j<h.length;
j++){f+=h[j];
f+=h[j];
if(j<h.length-1){f+=", "
}}k.value+=f+"\n"
};