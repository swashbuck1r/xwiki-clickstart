function saveContent(){var a=document.getElementById("frmData").contentWindow.document.body.innerHTML;
if(a==""){tinyMCEPopup.close();
return false
}tinyMCEPopup.execCommand("mcePasteWord",false,a);
tinyMCEPopup.close()
}function onLoadInit(){tinyMCEPopup.resizeToInnerSize();
window.setTimeout("createIFrame();",10)
}function createIFrame(){document.getElementById("iframecontainer").innerHTML='<iframe id="frmData" name="frmData" class="sourceIframe" src="blank.htm" height="280" width="400" frameborder="0" style="background-color:#FFFFFF; width:100%;" dir="ltr" wrap="soft"></iframe>'
}var wHeight=0,wWidth=0,owHeight=0,owWidth=0;
function initIframe(b){var a=tinyMCE.selectedInstance.settings.directionality;
b.body.dir=a;
resizeInputs()
}function resizeInputs(){if(!tinyMCE.isMSIE){wHeight=self.innerHeight-80;
wWidth=self.innerWidth-18
}else{wHeight=document.body.clientHeight-80;
wWidth=document.body.clientWidth-18
}var a=document.getElementById("frmData");
if(a){a.style.height=Math.abs(wHeight)+"px";
a.style.width=Math.abs(wWidth)+"px"
}};