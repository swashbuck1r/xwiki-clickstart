function init(){tinyMCEPopup.resizeToInnerSize()
}function insertEmotion(c,b){b=tinyMCE.getLang(b);
if(b==null){b=""
}b=b.replace(/&/g,"&amp;");
b=b.replace(/\"/g,"&quot;");
b=b.replace(/</g,"&lt;");
b=b.replace(/>/g,"&gt;");
var a='<img src="'+tinyMCE.baseURL+"/plugins/emotions/images/"+c+'" mce_src="'+tinyMCE.baseURL+"/plugins/emotions/images/"+c+'" border="0" alt="'+b+'" title="'+b+'" />';
tinyMCE.execCommand("mceInsertContent",false,a);
tinyMCEPopup.close()
};