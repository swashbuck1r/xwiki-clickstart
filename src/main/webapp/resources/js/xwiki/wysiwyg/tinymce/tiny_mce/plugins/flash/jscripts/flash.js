var url=tinyMCE.getParam("flash_external_list_url");
if(url!=null){if(url.charAt(0)!="/"&&url.indexOf("://")==-1){url=tinyMCE.documentBasePath+"/"+url
}document.write('<script language="javascript" type="text/javascript" src="'+url+'"><\/script>')
}function init(){tinyMCEPopup.resizeToInnerSize();
document.getElementById("filebrowsercontainer").innerHTML=getBrowserHTML("filebrowser","file","flash","flash");
var e=getFlashListHTML("filebrowser","file","flash","flash");
if(e==""){document.getElementById("linklistrow").style.display="none"
}else{document.getElementById("linklistcontainer").innerHTML=e
}var c=document.forms[0];
var b=tinyMCE.getWindowArg("swffile");
var f=""+tinyMCE.getWindowArg("swfwidth");
var a=""+tinyMCE.getWindowArg("swfheight");
if(f.indexOf("%")!=-1){c.width2.value="%";
c.width.value=f.substring(0,f.length-1)
}else{c.width2.value="px";
c.width.value=f
}if(a.indexOf("%")!=-1){c.height2.value="%";
c.height.value=a.substring(0,a.length-1)
}else{c.height2.value="px";
c.height.value=a
}c.file.value=b;
c.insert.value=tinyMCE.getLang("lang_"+tinyMCE.getWindowArg("action"),"Insert",true);
selectByValue(c,"linklist",b);
if(isVisible("filebrowser")){document.getElementById("file").style.width="230px"
}if(typeof(tinyMCEFlashList)!="undefined"&&tinyMCEFlashList.length>0){for(var d=0;
d<c.linklist.length;
d++){if(c.linklist.options[d].value==tinyMCE.getWindowArg("swffile")){c.linklist.options[d].selected=true
}}}}function getFlashListHTML(){if(typeof(tinyMCEFlashList)!="undefined"&&tinyMCEFlashList.length>0){var b="";
b+='<select id="linklist" name="linklist" style="width: 250px" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="this.form.file.value=this.options[this.selectedIndex].value;">';
b+='<option value="">---</option>';
for(var a=0;
a<tinyMCEFlashList.length;
a++){b+='<option value="'+tinyMCEFlashList[a][1]+'">'+tinyMCEFlashList[a][0]+"</option>"
}b+="</select>";
return b
}return""
}function insertFlash(){var b=document.forms[0];
var d="";
var c=b.file.value;
var e=b.width.value;
var a=b.height.value;
if(b.width2.value=="%"){e=e+"%"
}if(b.height2.value=="%"){a=a+"%"
}if(e==""){e=100
}if(a==""){a=100
}d+='<img src="'+(tinyMCE.getParam("theme_href")+"/images/spacer.gif")+'" mce_src="'+(tinyMCE.getParam("theme_href")+"/images/spacer.gif")+'" width="'+e+'" height="'+a+'" border="0" alt="'+c+'" title="'+c+'" class="mceItemFlash" />';
tinyMCEPopup.execCommand("mceInsertContent",true,d);
tinyMCE.selectedInstance.repaint();
tinyMCEPopup.close()
};