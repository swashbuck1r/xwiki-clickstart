function init(){tinyMCEPopup.resizeToInnerSize();
var a=document.forms[0];
a.searchstring.value=tinyMCE.getWindowArg("searchstring");
a.replacestring.value=tinyMCE.getWindowArg("replacestring");
a.casesensitivebox.checked=tinyMCE.getWindowArg("casesensitive");
tinyMCEPopup.execCommand("mceResetSearch",false,{dummy:""},false)
}function searchNext(b){var a=document.forms[0];
if(a.searchstring.value==""||a.searchstring.value==a.replacestring.value){return
}tinyMCEPopup.execCommand("mceSearch",false,{string:a.searchstring.value,replacestring:a.replacestring.value,replacemode:b,casesensitive:a.casesensitivebox.checked,backwards:false},false);
window.focus()
}function cancelAction(){tinyMCEPopup.close()
};