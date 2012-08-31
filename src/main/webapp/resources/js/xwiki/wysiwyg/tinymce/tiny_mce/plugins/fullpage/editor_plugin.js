tinyMCE.importPluginLanguagePack("fullpage","en,tr,sv");
var TinyMCE_FullPagePlugin={getInfo:function(){return{longname:"Fullpage",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_fullpage.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"fullpage":return tinyMCE.getButtonHTML(a,"lang_fullpage_desc","{$pluginurl}/images/fullpage.gif","mceFullPageProperties")
}return""
},execCommand:function(e,a,d,f,c){switch(d){case"mceFullPageProperties":var b=new Array();
b.file="../../plugins/fullpage/fullpage.htm";
b.width=430;
b.height=485+(tinyMCE.isOpera?5:0);
b.width+=tinyMCE.getLang("lang_fullpage_delta_width",0);
b.height+=tinyMCE.getLang("lang_fullpage_delta_height",0);
tinyMCE.openWindow(b,{editor_id:e,inline:"yes"});
return true;
case"mceFullPageUpdate":TinyMCE_FullPagePlugin._addToHead(tinyMCE.getInstanceById(e));
return true
}return false
},cleanup:function(l,j,i){switch(l){case"insert_to_editor":var g=j.toLowerCase();
var m=g.indexOf("<body"),n;
if(m!=-1){m=g.indexOf(">",m);
n=g.lastIndexOf("</body>");
i.fullpageTopContent=j.substring(0,m+1);
j=j.substring(m+1,n)
}else{if(!i.fullpageTopContent){var k=tinyMCE.getParam("fullpage_default_doctype",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
var f=tinyMCE.getParam("fullpage_default_encoding","utf-8");
var o=tinyMCE.getParam("fullpage_default_title","Untitled document");
var c=tinyMCE.getParam("fullpage_default_langcode","en");
var h=tinyMCE.getParam("fullpage_default_xml_pi",true);
var b=tinyMCE.getParam("fullpage_default_font_family","");
var e=tinyMCE.getParam("fullpage_default_font_size","");
var d=tinyMCE.getParam("fullpage_default_style","");
var a=tinyMCE.getParam("fullpage_default_text_color","");
o=o.replace(/&/g,"&amp;");
o=o.replace(/\"/g,"&quot;");
o=o.replace(/</g,"&lt;");
o=o.replace(/>/g,"&gt;");
g="";
if(h){g+='<?xml version="1.0" encoding="'+f+'"?>\n'
}g+=k+"\n";
g+='<html xmlns="http://www.w3.org/1999/xhtml" lang="'+c+'" xml:lang="'+c+'">\n';
g+="<head>\n";
g+="\t<title>"+o+"</title>\n";
g+='\t<meta http-equiv="Content-Type" content="text/html; charset='+f+'" />\n';
g+="</head>\n";
g+="<body";
if(b!=""||e!=""){g+=' style="';
if(d!=""){g+=d+";"
}if(b!=""){g+="font-family: "+b+";"
}if(e!=""){g+="font-size: "+e+";"
}g+='"'
}if(a!=""){g+=' text="'+a+'"'
}g+=">\n";
i.fullpageTopContent=g
}}this._addToHead(i);
break;
case"get_from_editor":if(i.fullpageTopContent){j=i.fullpageTopContent+j+"\n</body>\n</html>"
}break
}return j
},_addToHead:function(f){var m=f.getDoc();
var l=m.getElementsByTagName("head")[0];
var j=m.body;
var g=f.fullpageTopContent;
var k=m.createElement("body");
var b,d,a,c;
g=g.replace(/(\r|\n)/gi,"");
g=g.replace(/<\?[^\>]*\>/gi,"");
g=g.replace(/<\/?(!DOCTYPE|head|html)[^\>]*\>/gi,"");
g=g.replace(/<script(.*?)<\/script>/gi,"");
g=g.replace(/<title(.*?)<\/title>/gi,"");
g=g.replace(/<(meta|base)[^>]*>/gi,"");
g=g.replace(/<link([^>]*)\/>/gi,'<pre mce_type="link" $1></pre>');
g=g.replace(/<body/gi,'<div mce_type="body"');
g+="</div>";
k.innerHTML=g;
j.vLink=j.aLink=j.link=j.text="";
j.style.cssText="";
b=l.getElementsByTagName("link");
for(d=0;
d<b.length;
d++){if(tinyMCE.getAttrib(b[d],"mce_head")=="true"){b[d].parentNode.removeChild(b[d])
}}b=k.getElementsByTagName("pre");
for(d=0;
d<b.length;
d++){c=tinyMCE.getAttrib(b[d],"media");
if(tinyMCE.getAttrib(b[d],"mce_type")=="link"&&(c==""||c=="screen"||c=="all")&&tinyMCE.getAttrib(b[d],"rel")=="stylesheet"){a=m.createElement("link");
a.rel="stylesheet";
a.href=tinyMCE.getAttrib(b[d],"href");
a.setAttribute("mce_head","true");
l.appendChild(a)
}}b=k.getElementsByTagName("div");
if(b.length>0){j.style.cssText=tinyMCE.getAttrib(b[0],"style");
if((c=tinyMCE.getAttrib(b[0],"leftmargin"))!=""&&j.style.marginLeft==""){j.style.marginLeft=c+"px"
}if((c=tinyMCE.getAttrib(b[0],"rightmargin"))!=""&&j.style.marginRight==""){j.style.marginRight=c+"px"
}if((c=tinyMCE.getAttrib(b[0],"topmargin"))!=""&&j.style.marginTop==""){j.style.marginTop=c+"px"
}if((c=tinyMCE.getAttrib(b[0],"bottommargin"))!=""&&j.style.marginBottom==""){j.style.marginBottom=c+"px"
}j.dir=tinyMCE.getAttrib(b[0],"dir");
j.vLink=tinyMCE.getAttrib(b[0],"vlink");
j.aLink=tinyMCE.getAttrib(b[0],"alink");
j.link=tinyMCE.getAttrib(b[0],"link");
j.text=tinyMCE.getAttrib(b[0],"text");
if((c=tinyMCE.getAttrib(b[0],"background"))!=""){j.style.backgroundImage=c
}if((c=tinyMCE.getAttrib(b[0],"bgcolor"))!=""){j.style.backgroundColor=c
}}}};
tinyMCE.addPlugin("fullpage",TinyMCE_FullPagePlugin);