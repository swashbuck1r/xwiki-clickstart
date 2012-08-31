if(browser.isMozilla){extendEventObject();
emulateAttachEvent();
emulateEventHandlers(["click","dblclick","mouseover","mouseout","mousedown","mouseup","mousemove","keydown","keypress","keyup"]);
emulateCurrentStyle();
emulateHTMLModel();
Event.LEFT=0;
Event.MIDDLE=1;
Event.RIGHT=2
}else{Event.LEFT=1;
Event.MIDDLE=4;
Event.RIGHT=2
}function extendEventObject(){Event.prototype.__defineSetter__("returnValue",function(a){if(!a){this.preventDefault()
}return a
});
Event.prototype.__defineSetter__("cancelBubble",function(a){if(a){this.stopPropagation()
}return a
});
Event.prototype.__defineGetter__("srcElement",function(){var a=this.target;
while(a.nodeType!=1){a=a.parentNode
}return a
});
Event.prototype.__defineGetter__("fromElement",function(){var a;
if(this.type=="mouseover"){a=this.relatedTarget
}else{if(this.type=="mouseout"){a=this.target
}}if(!a){return
}while(a.nodeType!=1){a=a.parentNode
}return a
});
Event.prototype.__defineGetter__("toElement",function(){var a;
if(this.type=="mouseout"){a=this.relatedTarget
}else{if(this.type=="mouseover"){a=this.target
}}if(!a){return
}while(a.nodeType!=1){a=a.parentNode
}return a
});
Event.prototype.__defineGetter__("offsetX",function(){return this.layerX
});
Event.prototype.__defineGetter__("offsetY",function(){return this.layerY
})
}function emulateAttachEvent(){HTMLDocument.prototype.attachEvent=HTMLElement.prototype.attachEvent=function(c,b){var a=c.replace(/on/,"");
b._ieEmuEventHandler=function(d){window.event=d;
return b()
};
this.addEventListener(a,b._ieEmuEventHandler,false)
};
HTMLDocument.prototype.detachEvent=HTMLElement.prototype.detachEvent=function(c,b){var a=c.replace(/on/,"");
if(typeof b._ieEmuEventHandler=="function"){this.removeEventListener(a,b._ieEmuEventHandler,false)
}else{this.removeEventListener(a,b,true)
}}
}function emulateEventHandlers(b){for(var a=0;
a<b.length;
a++){document.addEventListener(b[a],function(c){window.event=c
},true)
}}function emulateAllModel(){var a=function(){var b=this.getElementsByTagName("*");
var c=this;
b.tags=function(d){return c.getElementsByTagName(d)
};
return b
};
HTMLDocument.prototype.__defineGetter__("all",a);
HTMLElement.prototype.__defineGetter__("all",a)
}function extendElementModel(){HTMLElement.prototype.__defineGetter__("parentElement",function(){if(this.parentNode==this.ownerDocument){return null
}return this.parentNode
});
HTMLElement.prototype.__defineGetter__("children",function(){var c=[];
var a=0;
var d;
for(var b=0;
b<this.childNodes.length;
b++){d=this.childNodes[b];
if(d.nodeType==1){c[a++]=d;
if(d.name){if(!c[d.name]){c[d.name]=[]
}c[d.name][c[d.name].length]=d
}if(d.id){c[d.id]=d
}}}return c
});
HTMLElement.prototype.contains=function(a){if(a==this){return true
}if(a==null){return false
}return this.contains(a.parentNode)
}
}function emulateCurrentStyle(){HTMLElement.prototype.__defineGetter__("currentStyle",function(){return this.ownerDocument.defaultView.getComputedStyle(this,null)
})
}function emulateHTMLModel(){function b(c){c=c.replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<BR>");
while(/\s\s/.test(c)){c=c.replace(/\s\s/,"&nbsp; ")
}return c.replace(/\s/g," ")
}HTMLElement.prototype.insertAdjacentHTML=function(e,d){var f;
var c=this.ownerDocument.createRange();
switch(String(e).toLowerCase()){case"beforebegin":c.setStartBefore(this);
f=c.createContextualFragment(d);
this.parentNode.insertBefore(f,this);
break;
case"afterbegin":c.selectNodeContents(this);
c.collapse(true);
f=c.createContextualFragment(d);
this.insertBefore(f,this.firstChild);
break;
case"beforeend":c.selectNodeContents(this);
c.collapse(false);
f=c.createContextualFragment(d);
this.appendChild(f);
break;
case"afterend":c.setStartAfter(this);
f=c.createContextualFragment(d);
this.parentNode.insertBefore(f,this.nextSibling);
break
}};
HTMLElement.prototype.__defineSetter__("outerHTML",function(d){var c=this.ownerDocument.createRange();
c.setStartBefore(this);
var e=c.createContextualFragment(d);
this.parentNode.replaceChild(e,this);
return d
});
HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){switch(this.tagName){case"AREA":case"BASE":case"BASEFONT":case"COL":case"FRAME":case"HR":case"IMG":case"BR":case"INPUT":case"ISINDEX":case"LINK":case"META":case"PARAM":return false
}return true
});
HTMLElement.prototype.__defineGetter__("outerHTML",function(){var c,d=this.attributes;
var f="<"+this.tagName;
for(var e=0;
e<d.length;
e++){c=d[e];
if(c.specified){f+=" "+c.name+'="'+c.value+'"'
}}if(!this.canHaveChildren){return f+">"
}return f+">"+this.innerHTML+"</"+this.tagName+">"
});
HTMLElement.prototype.__defineSetter__("innerText",function(c){this.innerHTML=b(c);
return c
});
var a;
HTMLElement.prototype.__defineGetter__("innerText",a=function(){var c=this.ownerDocument.createRange();
c.selectNodeContents(this);
return c.toString()
});
HTMLElement.prototype.__defineSetter__("outerText",function(c){this.outerHTML=b(c);
return c
});
HTMLElement.prototype.__defineGetter__("outerText",a);
HTMLElement.prototype.insertAdjacentText=function(d,c){this.insertAdjacentHTML(d,b(c))
}
};