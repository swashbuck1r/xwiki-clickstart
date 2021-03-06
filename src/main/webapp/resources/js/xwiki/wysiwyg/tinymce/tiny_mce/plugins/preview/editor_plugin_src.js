tinyMCE.importPluginLanguagePack("preview","en,tr,cs,de,el,fr_ca,it,ko,pt,sv,zh_cn,fa,fr,pl,pt_br,nl,da,he,nb,hu,ru,ru_KOI8-R,ru_UTF-8,nn,es,cy,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_PreviewPlugin={getInfo:function(){return{longname:"Preview",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_preview.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"preview":return tinyMCE.getButtonHTML(a,"lang_preview_desc","{$pluginurl}/images/preview.gif","mcePreview")
}return""
},execCommand:function(m,e,d,a,n){switch(d){case"mcePreview":var i=tinyMCE.getParam("plugin_preview_pageurl",null);
var b=tinyMCE.getParam("plugin_preview_width","550");
var h=tinyMCE.getParam("plugin_preview_height","600");
if(i){var o=new Array();
o.file=i;
o.width=b;
o.height=h;
tinyMCE.openWindow(o,{editor_id:m,resizable:"yes",scrollbars:"yes",inline:"yes",content:tinyMCE.getContent(),content_css:tinyMCE.getParam("content_css")})
}else{var g=window.open("","mcePreview","menubar=no,toolbar=no,scrollbars=yes,resizable=yes,left=20,top=20,width="+b+",height="+h);
var f="";
var j=tinyMCE.getContent();
var l=j.indexOf("<body"),k;
if(l!=-1){l=j.indexOf(">",l);
k=j.lastIndexOf("</body>");
j=j.substring(l+1,k)
}f+=tinyMCE.getParam("doctype");
f+='<html xmlns="http://www.w3.org/1999/xhtml">';
f+="<head>";
f+="<title>"+tinyMCE.getLang("lang_preview_desc")+"</title>";
f+='<base href="'+tinyMCE.settings.base_href+'" />';
f+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
f+='<link href="'+tinyMCE.getParam("content_css")+'" rel="stylesheet" type="text/css" />';
f+="</head>";
f+='<body dir="'+tinyMCE.getParam("directionality")+'">';
f+=j;
f+="</body>";
f+="</html>";
g.document.write(f);
g.document.close()
}return true
}return false
}};
tinyMCE.addPlugin("preview",TinyMCE_PreviewPlugin);