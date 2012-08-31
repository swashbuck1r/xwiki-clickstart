var XWiki=(function(b){b.Gallery=Class.create({initialize:function(c){this.images=this._collectImages(c);
this.container=c.update('<input type="text" tabindex="-1" class="focusCatcher"/><div class="currentImageWrapper"><img class="currentImage" alt="${escapetool.xml($msg.get("core.widgets.gallery.currentImage"))}"/><span class="currentImagePinPoint"></span></div><div class="previous" title="${escapetool.xml($msg.get("core.widgets.gallery.previousImage"))}">&lt;</div><div class="next" title="${escapetool.xml($msg.get("core.widgets.gallery.nextImage"))}">&gt;</div><div class="index">0 / 0</div><div class="maximize" title="${escapetool.xml($msg.get("core.widgets.gallery.maximize"))}"></div>');
this.container.addClassName("xGallery");
this.focusCatcher=this.container.down(".focusCatcher");
this.focusCatcher.observe("keydown",this._onKeyDown.bindAsEventListener(this));
this.container.observe("click",function(){this.focusCatcher.focus()
}.bind(this));
this.container.down(".previous").observe("click",this._onPreviousImage.bind(this));
this.container.down(".next").observe("click",this._onNextImage.bind(this));
this.currentImage=this.container.down(".currentImage");
this.currentImage.observe("load",this._onLoadImage.bind(this));
this.currentImage.observe("error",this._onErrorImage.bind(this));
this.currentImage.observe("abort",this._onAbortImage.bind(this));
this.indexDisplay=this.container.down(".index");
this.maximizeToggle=this.container.down(".maximize");
this.maximizeToggle.observe("click",this._onToggleMaximize.bind(this));
this.show(0)
},_collectImages:function(d){var c=[];
var f=d.select("img");
for(var e=0;
e<f.length;
e++){var g=f[e];
c.push({url:g.getAttribute("src"),title:g.title});
g.removeAttribute("src")
}return c
},_onPreviousImage:function(){this.show(this.index>0?this.index-1:this.images.length-1)
},_onNextImage:function(){this.show(this.index<this.images.length-1?this.index+1:0)
},_onLoadImage:function(){this._maybeLimitImageSize();
Element.removeClassName(this.currentImage.parentNode,"loading");
this.currentImage.style.visibility="visible"
},_maybeLimitImageSize:function(){this.currentImage.style.height=this.currentImage.style.width="";
var d=this.currentImage.offsetHeight;
var e=this.currentImage.offsetWidth;
var h=this.currentImage.parentNode.offsetHeight;
var g=this.currentImage.parentNode.offsetWidth-128;
if(d>h||e>g){var f=e/d;
var c=g/f;
if(c>h){this.currentImage.style.height=h+"px"
}else{this.currentImage.style.width=g+"px"
}}},_onErrorImage:function(){},_onAbortImage:function(){},_onKeyDown:function(d){var c=true;
switch(d.keyCode){case Event.KEY_LEFT:this._onPreviousImage();
break;
case Event.KEY_RIGHT:this._onNextImage();
break;
case Event.KEY_HOME:this.show(0);
break;
case Event.KEY_END:this.show(this.images.length-1);
break;
case Event.KEY_ESC:if(this.container.hasClassName("maximized")){this._onToggleMaximize()
}break;
case 70:this._onToggleMaximize();
break;
default:c=false;
break
}if(c){Event.stop(d)
}},_onToggleMaximize:function(){this.maximizeToggle.toggleClassName("maximize");
this.maximizeToggle.toggleClassName("minimize");
this.maximizeToggle.title=this.maximizeToggle.hasClassName("maximize")?'${escapetool.javascript($msg.get("core.widgets.gallery.maximize"))}':'${escapetool.javascript($msg.get("core.widgets.gallery.minimize"))}';
this.container.toggleClassName("maximized");
$(document.documentElement).toggleClassName("maximized");
if(this.container.hasClassName("maximized")){this._maybeUpdatePosition();
this._updateSize()
}else{this._resetSize();
this._maybeResetPosition()
}},_isIE6:function(){return Prototype.Browser.IE&&navigator.appVersion.indexOf("MSIE 6")>-1
},_maybeUpdatePosition:function(){if(this._isIE6()){this.placeHolder=this.placeHolder||new Element("div",{"class":"xGalleryPlaceHolder"});
this.container.parentNode.replaceChild(this.placeHolder,this.container);
document.body.appendChild(this.container);
setTimeout(function(){this.focusCatcher.focus()
}.bind(this),0)
}},_maybeResetPosition:function(){if(this._isIE6()){this.placeHolder.parentNode.replaceChild(this.container,this.placeHolder);
setTimeout(function(){this.focusCatcher.focus()
}.bind(this),0)
}},_updateSize:function(){var e=document.viewport.getDimensions();
if(e.width<=0){e.width=document.body.clientWidth
}if(e.height<=0){e.height=document.body.clientHeight
}var d=e.width-20;
var c=e.height-20;
if(!this._isIE6()){this.container.setStyle({width:d+"px",height:c+"px"})
}this.currentImage.up().setStyle({height:c+"px",lineHeight:c+"px"});
this.currentImage.setStyle({maxHeight:c+"px",maxWidth:(d-128)+"px"});
this._maybeLimitImageSize()
},_resetSize:function(){this.container.style.cssText="";
this.container.removeAttribute("style");
this.currentImage.parentNode.style.cssText="";
this.currentImage.parentNode.removeAttribute("style");
this.currentImage.style.cssText="";
this.currentImage.removeAttribute("style");
this._maybeLimitImageSize()
},show:function(c){if(c<0||c>=this.images.length||c==this.index){return
}this.currentImage.style.visibility="hidden";
Element.addClassName(this.currentImage.parentNode,"loading");
this.currentImage.title=this.images[c].title;
this.currentImage.src=this.images[c].url;
this.index=c;
this.indexDisplay.update((c+1)+" / "+this.images.length)
}});
function a(){$$(".gallery").each(function(c){new b.Gallery(c)
})
}(b.isInitialized&&a())||document.observe("xwiki:dom:loading",a);
return b
}(XWiki||{}));