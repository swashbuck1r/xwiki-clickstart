Lightbox=Class.create({initialize:function(c,a,b){this.formUrl=c;
this.saveUrl=a;
this.redirectUrl=b;
this.formData="";
this.loadedForms=new Object();
this.lbinit();
this.lbShow();
this.lbLoadForm(c)
},lbShow:function(){this.lbLoading();
toggleClass($("lb-bg"),"hidden");
toggleClass($("lb-align"),"hidden");
this.resizeBackground();
if(browser.isIE6x){$$("select").each(function(a){if(a.up("#lb")){return
}a._x_originalVisibility=a.style.visibility;
a.setStyle({visibility:"hidden"})
})
}},lbHide:function(){toggleClass($("lb-bg"),"hidden");
toggleClass($("lb-align"),"hidden");
if(browser.isIE6x){$$("select").each(function(a){a.setStyle({visibility:a._x_originalVisibility})
})
}},lbLoading:function(){if(this.currentUrl){this.loadedForms[this.currentUrl]=$("lb-content").firstChild.cloneNode(true)
}$("lb-content").innerHTML=this.getWaiting()
},lbLoadForm:function(a){this.currentUrl=a;
if(this.loadedForms[a]){$("lb-content").innerHTML="";
this.lbPlaceContentInDocument(this.loadedForms[a],$("lb-content"));
this.form=$("lb-content").down("form")
}else{new Ajax.Request(a,{onSuccess:this.lbFormDataLoaded.bind(this)})
}},lbFormDataLoaded:function(b){var a=document.createElement("div");
a.innerHTML=b.responseText;
$("lb-content").innerHTML="";
this.lbPlaceContentInDocument(a,$("lb-content"),function(){this.resizeBackground()
}.bind(this));
this.form=$("lb-content").getElementsByTagName("form")[0]
},lbPlaceContentInDocument:function(h,k,b){document.stopObserving("dom:loaded");
var c=Array.from(h.getElementsByTagName("script"));
var n=Array.from(h.getElementsByTagName("link"));
var p=Array.from(h.getElementsByTagName("style"));
var o=n.concat(c,p).flatten();
var m=[];
for(var f=0;
f<o.length;
f++){m[f]=document.createElement(o[f].tagName);
var e=o[f].attributes;
for(var d=0;
d<e.length;
d++){if(e[d].value!=""){m[f].setAttribute(e[d].name,e[d].value)
}}try{var l=o[f].innerHTML;
if(l.startsWith("//<![CDATA[")&&l.endsWith("//]]>")){l=l.substring(11,l.length-5)
}m[f].innerHTML=l;
o[f].parentNode.removeChild(o[f])
}catch(a){if(m[f].tagName.toLowerCase()=="script"){m[f].text=o[f].text;
o[f].parentNode.removeChild(o[f])
}}}k.appendChild(h);
var g=function(s,r,t,j){var q=0;
if(j){q=j
}while(q<s.length){r.appendChild(s[q]);
if(s[q].tagName.toLowerCase()=="script"&&s[q].src!=""){if(browser.isIE==true&&typeof XDomainRequest=="undefined"){Event.observe(s[q],"readystatechange",function(i){if(i.element().readyState=="complete"){g(s,r,t,q+1)
}})
}else{Event.observe(s[q],"load",function(){g(s,r,t,q+1)
})
}return
}q++
}t()
};
g(m,k,function(){if(Object.isFunction(b)){b()
}var i=document.createElement("script");
try{i.innerHTML='document.fire("dom:loaded");'
}catch(j){i.text='document.fire("dom:loaded");'
}k.appendChild(i)
}.bind(this))
},lbSaveForm:function(){this.lbSaveData();
Form.disable(this.form);
this.lbSaveSync(this.saveUrl);
this.lbHide();
window.location=this.redirectUrl
},lbNext:function(a){this.lbSaveData();
this.lbLoading();
this.lbLoadForm(a)
},lbSaveData:function(){this.formData+="&"+Form.serialize(this.form);
this.formData=this.formData.replace("_segmentChief=&","=&");
this.formData=this.formData.replace("_periodicity=&","=&")
},lbSave:function(a){this.lbSaveData();
new Ajax.Request(a+"?ajax=1",{parameters:this.formData,onSuccess:this.lbSaveDone.bind(this)})
},lbSaveSync:function(a){new Ajax.Request(a+"?ajax=1",{parameters:this.formData,asynchronous:false})
},lbSaveDone:function(a){this.lbHide()
},lbClearData:function(){this.formData=""
},lbClose:function(){this.lbHide();
if(this.redirectUrl!==undefined){window.location=this.redirectUrl
}},lbSetNext:function(a){this.nextURL=a
},getWaiting:function(){var a="$xwiki.getSkinFile('icons/xwiki/ajax-loader-large.gif')";
return'<div style="padding: 30px;"><img src="'+a+'"/></div>'
},lbcustominit:function(b,a,e,c){if(!$("lb")){var d=this.insertlbcontent(b,a,e,c);
new Insertion.Top("body",d)
}},lbinit:function(){return this.lbcustominit("#FFF","#FFF","#000","rounded")
},insertlbcontent:function(b,a,e,c){var d='<div id="lb-bg" class="hidden"></div><div id="lb-align" class="hidden"><div id="lb"><div id="lb-top"><div id="close-wrap"><div id="lb-close" onclick="window.lb.lbClose();" title="Cancel and close">&nbsp;</div></div>';
if(c=="lightrounded"){d+=this.roundedlighttop(b,a)
}else{if(c=="rounded"){d+=this.roundedtop(b,a)
}else{d+='<div class="lb-squarred" style="background:'+b+"; border-color:"+a+'"></div></div>'
}}d+='</div><div class="lb-content" style="background:'+b+"; border-color:"+a+"; color:"+e+'" id="lb-content">Lightbox Content</div>';
if(c=="lightrounded"){d+=this.roundedlightbottom(b,a)
}else{if(c=="rounded"){d+=this.roundedbottom(b,a)
}else{d+='<div class="lb-squarred" style="background:'+b+"; border-color:"+a+'"></div></div></div></div>'
}}return d
},resizeBackground:function(){var a=document.body.parentNode.scrollHeight;
if(document.body.scrollHeight>a){a=document.body.scrollHeight
}if(document.body.parentNode.clientHeight>a){a=document.body.parentNode.clientHeight
}$("lb-bg").style.height=a+"px"
},roundedlightbottom:function(a,b){var c='<div class="roundedlight"><b class="top"><b class="b4b" style="background:'+b+';"></b><b class="b3b" style="background:'+a+"; border-color:"+b+';"></b><b class="b3b" style="background:'+a+"; border-color:"+b+';"></b><b class="b1b" style="background:'+a+"; border-color:"+b+';"></b></b> </div>';
return c
},roundedbottom:function(a,b){var c='<div class="rounded"><b class="bottom" style="padding:0px; margin:0px;"><b class="b12b" style="background:'+b+';"></b><b class="b11b" style="background:'+a+"; border-color:"+b+';"></b><b class="b10b" style="background:'+a+"; border-color:"+b+';"></b><b class="b9b" style="background:'+a+"; border-color:"+b+';"></b><b class="b8b" style="background:'+a+"; border-color:"+b+';"></b><b class="b7b" style="background:'+a+"; border-color:"+b+';"></b><b class="b6b" style="background:'+a+"; border-color:"+b+';"></b><b class="b5b" style="background:'+a+"; border-color:"+b+';"></b><b class="b4b" style="background:'+a+"; border-color:"+b+';"></b><b class="b3b" style="background:'+a+"; border-color:"+b+';"></b><b class="b2b" style="background:'+a+"; border-color:"+b+';"></b><b class="b1b" style="background:'+a+"; border-color:"+b+';"></b></b></div>';
return c
},roundedlighttop:function(a,b){var c='<div class="roundedlight"><b class="top"><b class="b1" style="background:'+b+';"></b><b class="b2" style="background:'+a+"; border-color:"+b+';"></b><b class="b3" style="background:'+a+"; border-color:"+b+';"></b><b class="b4" style="background:'+a+"; border-color:"+b+';"></b></b> </div>';
return c
},roundedtop:function(a,b){var c='<div class="rounded"><b class="top"><b class="b1" style="background:'+b+';"></b><b class="b2" style="background:'+a+"; border-color:"+b+';"></b><b class="b3" style="background:'+a+"; border-color:"+b+';"></b><b class="b4" style="background:'+a+"; border-color:"+b+';"></b><b class="b5" style="background:'+a+"; border-color:"+b+';"></b><b class="b6" style="background:'+a+"; border-color:"+b+';"></b><b class="b7" style="background:'+a+"; border-color:"+b+';"></b><b class="b8" style="background:'+a+"; border-color:"+b+';"></b><b class="b9" style="background:'+a+"; border-color:"+b+';"></b><b class="b10" style="background:'+a+"; border-color:"+b+';"></b><b class="b11" style="background:'+a+"; border-color:"+b+';"></b><b class="b12" style="background:'+a+"; border-color:"+b+';"></b></b></div>';
return c
},lightboxlink:function(b,a){var c='<a href="#" onclick="javascript:$(\'lb-content\').innerHTML ='+a+"; toggleClass($('lb-bg'), 'hidden'); toggleClass($('lb-align'), 'hidden');\">"+b+"</a>";
return c
}});