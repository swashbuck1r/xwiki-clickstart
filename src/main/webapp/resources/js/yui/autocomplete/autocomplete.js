YAHOO.widget.AutoComplete=function(h,f,a,g){if(h&&f&&a){if(a&&(a instanceof YAHOO.widget.DataSource)){this.dataSource=a
}else{return
}if(YAHOO.util.Dom.inDocument(h)){if(typeof h=="string"){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+h;
this._oTextbox=document.getElementById(h)
}else{this._sName=(h.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+h.id:"instance"+YAHOO.widget.AutoComplete._nIndex;
this._oTextbox=h
}}else{return
}if(YAHOO.util.Dom.inDocument(f)){if(typeof f=="string"){this._oContainer=document.getElementById(f)
}else{this._oContainer=f
}if(this._oContainer.style.display=="none"){}}else{return
}if(typeof g=="object"){for(var e in g){if(e){this[e]=g[e]
}}}this._initContainer();
this._initProps();
this._initList();
this._initContainerHelpers();
var c=this;
var b=this._oTextbox;
var d=this._oContainer._oContent;
YAHOO.util.Event.addListener(b,"keyup",c._onTextboxKeyUp,c);
YAHOO.util.Event.addListener(b,"keydown",c._onTextboxKeyDown,c);
YAHOO.util.Event.addListener(b,"keypress",c._onTextboxKeyPress,c);
YAHOO.util.Event.addListener(b,"focus",c._onTextboxFocus,c);
YAHOO.util.Event.addListener(b,"blur",c._onTextboxBlur,c);
YAHOO.util.Event.addListener(d,"mouseover",c._onContainerMouseover,c);
YAHOO.util.Event.addListener(d,"mouseout",c._onContainerMouseout,c);
YAHOO.util.Event.addListener(d,"scroll",c._onContainerScroll,c);
YAHOO.util.Event.addListener(d,"resize",c._onContainerResize,c);
if(b.form){YAHOO.util.Event.addListener(b.form,"submit",c._onFormSubmit,c)
}this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);
this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);
this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);
this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);
this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);
this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);
this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);
this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);
this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);
this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);
this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);
this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);
this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);
this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);
this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);
this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);
b.setAttribute("autocomplete","off");
YAHOO.widget.AutoComplete._nIndex++
}else{}};
YAHOO.widget.AutoComplete.prototype.dataSource=null;
YAHOO.widget.AutoComplete.prototype.minQueryLength=1;
YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;
YAHOO.widget.AutoComplete.prototype.queryDelay=0.5;
YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";
YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;
YAHOO.widget.AutoComplete.prototype.delimChar=null;
YAHOO.widget.AutoComplete.prototype.autoHighlight=true;
YAHOO.widget.AutoComplete.prototype.typeAhead=false;
YAHOO.widget.AutoComplete.prototype.animHoriz=false;
YAHOO.widget.AutoComplete.prototype.animVert=true;
YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;
YAHOO.widget.AutoComplete.prototype.forceSelection=false;
YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;
YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;
YAHOO.widget.AutoComplete.prototype.useIFrame=false;
YAHOO.widget.AutoComplete.prototype.useShadow=false;
YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName
};
YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems
};
YAHOO.widget.AutoComplete.prototype.getListItemData=function(a){if(a._oResultData){return a._oResultData
}else{return false
}};
YAHOO.widget.AutoComplete.prototype.setHeader=function(a){if(a){if(this._oContainer._oContent._oHeader){this._oContainer._oContent._oHeader.innerHTML=a;
this._oContainer._oContent._oHeader.style.display="block"
}}else{this._oContainer._oContent._oHeader.innerHTML="";
this._oContainer._oContent._oHeader.style.display="none"
}};
YAHOO.widget.AutoComplete.prototype.setFooter=function(a){if(a){if(this._oContainer._oContent._oFooter){this._oContainer._oContent._oFooter.innerHTML=a;
this._oContainer._oContent._oFooter.style.display="block"
}}else{this._oContainer._oContent._oFooter.innerHTML="";
this._oContainer._oContent._oFooter.style.display="none"
}};
YAHOO.widget.AutoComplete.prototype.setBody=function(a){if(a){if(this._oContainer._oContent._oBody){this._oContainer._oContent._oBody.innerHTML=a;
this._oContainer._oContent._oBody.style.display="block";
this._oContainer._oContent.style.display="block"
}}else{this._oContainer._oContent._oBody.innerHTML="";
this._oContainer._oContent.style.display="none"
}this._maxResultsDisplayed=0
};
YAHOO.widget.AutoComplete.prototype.formatResult=function(b,c){var a=b[0];
if(a){return a
}else{return""
}};
YAHOO.widget.AutoComplete.prototype.sendQuery=function(a){if(a){this._sendQuery(a)
}else{return
}};
YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;
YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;
YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;
YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;
YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;
YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;
YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;
YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;
YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;
YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;
YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;
YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;
YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;
YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;
YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;
YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;
YAHOO.widget.AutoComplete._nIndex=0;
YAHOO.widget.AutoComplete.prototype._sName=null;
YAHOO.widget.AutoComplete.prototype._oTextbox=null;
YAHOO.widget.AutoComplete.prototype._bFocused=true;
YAHOO.widget.AutoComplete.prototype._oAnim=null;
YAHOO.widget.AutoComplete.prototype._oContainer=null;
YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;
YAHOO.widget.AutoComplete.prototype._bOverContainer=false;
YAHOO.widget.AutoComplete.prototype._aListItems=null;
YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;
YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;
YAHOO.widget.AutoComplete.prototype._sCurQuery=null;
YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;
YAHOO.widget.AutoComplete.prototype._oCurItem=null;
YAHOO.widget.AutoComplete.prototype._bItemSelected=false;
YAHOO.widget.AutoComplete.prototype._nKeyCode=null;
YAHOO.widget.AutoComplete.prototype._nDelayID=-1;
YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";
YAHOO.widget.AutoComplete.prototype._initProps=function(){var a=this.minQueryLength;
if(isNaN(a)||(a<1)){a=1
}var d=this.maxResultsDisplayed;
if(isNaN(this.maxResultsDisplayed)||(this.maxResultsDisplayed<1)){this.maxResultsDisplayed=10
}var e=this.queryDelay;
if(isNaN(this.queryDelay)||(this.queryDelay<0)){this.queryDelay=0.5
}var b=(this.delimChar)?this.delimChar:null;
if(b){if(typeof b=="string"){this.delimChar=[b]
}else{if(b.constructor!=Array){this.delimChar=null
}}}var c=this.animSpeed;
if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(isNaN(c)||(c<0)){c=0.3
}if(!this._oAnim){oAnim=new YAHOO.util.Anim(this._oContainer._oContent,{},this.animSpeed);
this._oAnim=oAnim
}else{this._oAnim.duration=c
}}if(this.forceSelection&&this.delimChar){}if(this.alwaysShowContainer&&(this.useShadow||this.useIFrame)){}if(this.alwaysShowContainer){this._bContainerOpen=true
}};
YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._oContainer._oShadow){var b=document.createElement("div");
b.className="yui-ac-shadow";
this._oContainer._oShadow=this._oContainer.appendChild(b)
}if(this.useIFrame&&!this._oContainer._oIFrame){var a=document.createElement("iframe");
a.src=this._iFrameSrc;
a.frameBorder=0;
a.scrolling="no";
a.style.position="absolute";
a.style.width="100%";
a.style.height="100%";
this._oContainer._oIFrame=this._oContainer.appendChild(a)
}};
YAHOO.widget.AutoComplete.prototype._initContainer=function(){if(!this._oContainer._oContent){var d=document.createElement("div");
d.className="yui-ac-content";
d.style.display="none";
this._oContainer._oContent=this._oContainer.appendChild(d);
var b=document.createElement("div");
b.className="yui-ac-hd";
b.style.display="none";
this._oContainer._oContent._oHeader=this._oContainer._oContent.appendChild(b);
var c=document.createElement("div");
c.className="yui-ac-bd";
this._oContainer._oContent._oBody=this._oContainer._oContent.appendChild(c);
var a=document.createElement("div");
a.className="yui-ac-ft";
a.style.display="none";
this._oContainer._oContent._oFooter=this._oContainer._oContent.appendChild(a)
}else{}};
YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];
while(this._oContainer._oContent._oBody.hasChildNodes()){var b=this.getListItems();
if(b){for(var a=b.length-1;
a>=0;
c--){b[a]=null
}}this._oContainer._oContent._oBody.innerHTML=""
}var e=document.createElement("ul");
e=this._oContainer._oContent._oBody.appendChild(e);
for(var c=0;
c<this.maxResultsDisplayed;
c++){var d=document.createElement("li");
d=e.appendChild(d);
this._aListItems[c]=d;
this._initListItem(d,c)
}this._maxResultsDisplayed=this.maxResultsDisplayed
};
YAHOO.widget.AutoComplete.prototype._initListItem=function(c,b){var a=this;
c.style.display="none";
c._nItemIndex=b;
c.mouseover=c.mouseout=c.onclick=null;
YAHOO.util.Event.addListener(c,"mouseover",a._onItemMouseover,a);
YAHOO.util.Event.addListener(c,"mouseout",a._onItemMouseout,a);
YAHOO.util.Event.addListener(c,"click",a._onItemMouseclick,a)
};
YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(a,b){if(b.prehighlightClassName){b._togglePrehighlight(this,"mouseover")
}else{b._toggleHighlight(this,"to")
}b.itemMouseOverEvent.fire(b,this)
};
YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(a,b){if(b.prehighlightClassName){b._togglePrehighlight(this,"mouseout")
}else{b._toggleHighlight(this,"from")
}b.itemMouseOutEvent.fire(b,this)
};
YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(a,b){b._toggleHighlight(this,"to");
b._selectItem(this)
};
YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(a,b){b._bOverContainer=true
};
YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(a,b){b._bOverContainer=false;
if(b._oCurItem){b._toggleHighlight(b._oCurItem,"to")
}};
YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(a,b){b._oTextbox.focus()
};
YAHOO.widget.AutoComplete.prototype._onContainerResize=function(a,b){b._toggleContainerHelpers(b._bContainerOpen)
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(a,b){var c=a.keyCode;
switch(c){case 9:if(b.delimChar&&(b._nKeyCode!=c)){if(b._bContainerOpen){YAHOO.util.Event.stopEvent(a)
}}if(b._oCurItem){b._selectItem(b._oCurItem)
}else{b._clearList()
}break;
case 13:if(b._nKeyCode!=c){if(b._bContainerOpen){YAHOO.util.Event.stopEvent(a)
}}if(b._oCurItem){b._selectItem(b._oCurItem)
}else{b._clearList()
}break;
case 27:b._clearList();
return;
case 39:b._jumpSelection();
break;
case 38:YAHOO.util.Event.stopEvent(a);
b._moveSelection(c);
break;
case 40:YAHOO.util.Event.stopEvent(a);
b._moveSelection(c);
break;
default:break
}};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(a,b){var c=a.keyCode;
switch(c){case 9:case 13:if((b._nKeyCode!=c)){YAHOO.util.Event.stopEvent(a)
}break;
case 38:case 40:YAHOO.util.Event.stopEvent(a);
break;
default:break
}};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(b,d){d._initProps();
var e=b.keyCode;
d._nKeyCode=e;
var f=String.fromCharCode(e);
var c=this.value;
if(d._isIgnoreKey(e)||(c.toLowerCase()==d._sCurQuery)){return
}else{d.textboxKeyEvent.fire(d,e)
}if(d.queryDelay>0){var a=setTimeout(function(){d._sendQuery(c)
},(d.queryDelay*1000));
if(d._nDelayID!=-1){clearTimeout(d._nDelayID)
}d._nDelayID=a
}else{d._sendQuery(c)
}};
YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(a){if((a==9)||(a==13)||(a==16)||(a==17)||(a>=18&&a<=20)||(a==27)||(a>=33&&a<=35)||(a>=36&&a<=38)||(a==40)||(a>=44&&a<=45)){return true
}return false
};
YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(a,b){b._oTextbox.setAttribute("autocomplete","off");
b._bFocused=true;
b.textboxFocusEvent.fire(b)
};
YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(a,b){if(!b._bOverContainer||(b._nKeyCode==9)){if(!b._bItemSelected){if(!b._bContainerOpen||(b._bContainerOpen&&!b._textMatchesOption())){if(b.forceSelection){b._clearSelection()
}else{b.unmatchedItemSelectEvent.fire(b,b._sCurQuery)
}}}if(b._bContainerOpen){b._clearList()
}b._bFocused=false;
b.textboxBlurEvent.fire(b)
}};
YAHOO.widget.AutoComplete.prototype._onFormSubmit=function(a,b){if(b.allowBrowserAutocomplete){b._oTextbox.setAttribute("autocomplete","on")
}else{b._oTextbox.setAttribute("autocomplete","off")
}};
YAHOO.widget.AutoComplete.prototype._sendQuery=function(g){var c=(this.delimChar)?this.delimChar:null;
if(c){var e=-1;
for(var b=c.length-1;
b>=0;
b--){var f=g.lastIndexOf(c[b]);
if(f>e){e=f
}}if(c[b]==" "){for(var a=c.length-1;
a>=0;
a--){if(g[e-1]==c[a]){e--;
break
}}}if(e>-1){var d=e+1;
while(g.charAt(d)==" "){d+=1
}this._sSavedQuery=g.substring(0,d);
g=g.substr(d)
}else{if(g.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null
}}}if(g.length<this.minQueryLength){if(this._nDelayID!=-1){clearTimeout(this._nDelayID)
}this._clearList();
return
}g=encodeURIComponent(g);
this._nDelayID=-1;
this.dataRequestEvent.fire(this,g);
this.dataSource.getResults(this._populateList,g,this)
};
YAHOO.widget.AutoComplete.prototype._clearList=function(){this._oContainer._oContent.scrollTop=0;
var a=this._aListItems;
if(a&&(a.length>0)){for(var b=a.length-1;
b>=0;
b--){a[b].style.display="none"
}}if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from")
}this._oCurItem=null;
this._nDisplayedItems=0;
this._sCurQuery=null;
this._toggleContainer(false)
};
YAHOO.widget.AutoComplete.prototype._populateList=function(l,m,k){if(m===null){k.dataErrorEvent.fire(k,l)
}if(!k._bFocused||!m){return
}var a=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
var p=k._oContainer._oContent.style;
p.width=(!a)?null:"";
p.height=(!a)?null:"";
var h=decodeURIComponent(l);
k._sCurQuery=h;
k._bItemSelected=false;
if(k._maxResultsDisplayed!=k.maxResultsDisplayed){k._initList()
}var c=Math.min(m.length,k.maxResultsDisplayed);
k._nDisplayedItems=c;
if(c>0){k._initContainerHelpers();
var d=k._aListItems;
for(var g=c-1;
g>=0;
g--){var o=d[g];
var b=m[g];
o.innerHTML=k.formatResult(b,h);
o.style.display="list-item";
o._sResultKey=b[0];
o._oResultData=b
}for(var f=d.length-1;
f>=c;
f--){var n=d[f];
n.innerHTML=null;
n.style.display="none";
n._sResultKey=null;
n._oResultData=null
}if(k.autoHighlight){var e=d[0];
k._toggleHighlight(e,"to");
k.itemArrowToEvent.fire(k,e);
k._typeAhead(e,l)
}else{k._oCurItem=null
}k._toggleContainer(true)
}else{k._clearList()
}k.dataReturnEvent.fire(k,l,m)
};
YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var c=this._oTextbox.value;
var b=(this.delimChar)?this.delimChar[0]:null;
var a=(b)?c.lastIndexOf(b,c.length-2):-1;
if(a>-1){this._oTextbox.value=c.substring(0,a)
}else{this._oTextbox.value=""
}this._sSavedQuery=this._oTextbox.value;
this.selectionEnforceEvent.fire(this)
};
YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var d=false;
for(var a=this._nDisplayedItems-1;
a>=0;
a--){var c=this._aListItems[a];
var b=c._sResultKey.toLowerCase();
if(b==this._sCurQuery.toLowerCase()){d=true;
break
}}return(d)
};
YAHOO.widget.AutoComplete.prototype._typeAhead=function(e,g){if(!this.typeAhead){return
}var b=this._oTextbox;
var f=this._oTextbox.value;
if(!b.setSelectionRange&&!b.createTextRange){return
}var c=f.length;
this._updateValue(e);
var d=b.value.length;
this._selectText(b,c,d);
var a=b.value.substr(c,d);
this.typeAheadEvent.fire(this,g,a)
};
YAHOO.widget.AutoComplete.prototype._selectText=function(a,b,c){if(a.setSelectionRange){a.setSelectionRange(b,c)
}else{if(a.createTextRange){var d=a.createTextRange();
d.moveStart("character",b);
d.moveEnd("character",c-a.value.length);
d.select()
}else{a.select()
}}};
YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(b){var d=false;
var c=this._oContainer._oContent.offsetWidth+"px";
var a=this._oContainer._oContent.offsetHeight+"px";
if(this.useIFrame&&this._oContainer._oIFrame){d=true;
if(this.alwaysShowContainer||b){this._oContainer._oIFrame.style.width=c;
this._oContainer._oIFrame.style.height=a
}else{this._oContainer._oIFrame.style.width=0;
this._oContainer._oIFrame.style.height=0
}}if(this.useShadow&&this._oContainer._oShadow){d=true;
if(this.alwaysShowContainer||b){this._oContainer._oShadow.style.width=c;
this._oContainer._oShadow.style.height=a
}else{this._oContainer._oShadow.style.width=0;
this._oContainer._oShadow.style.height=0
}}};
YAHOO.widget.AutoComplete.prototype._toggleContainer=function(h){if(this.alwaysShowContainer){if(h){this.containerExpandEvent.fire(this)
}else{this.containerCollapseEvent.fire(this)
}this._bContainerOpen=h;
return
}var j=this._oContainer;
if(!h&&!this._bContainerOpen){j._oContent.style.display="none";
return
}var a=this._oAnim;
if(a&&a.getEl()&&(this.animHoriz||this.animVert)){if(!h){this._toggleContainerHelpers(h)
}if(a.isAnimated()){a.stop()
}var f=j._oContent.cloneNode(true);
j.appendChild(f);
f.style.top="-9000px";
f.style.display="block";
var e=f.offsetWidth;
var c=f.offsetHeight;
var b=(this.animHoriz)?0:e;
var d=(this.animVert)?0:c;
a.attributes=(h)?{width:{to:e},height:{to:c}}:{width:{to:b},height:{to:d}};
if(h&&!this._bContainerOpen){j._oContent.style.width=b+"px";
j._oContent.style.height=d+"px"
}else{j._oContent.style.width=e+"px";
j._oContent.style.height=c+"px"
}j.removeChild(f);
f=null;
var g=this;
var i=function(){a.onComplete.unsubscribeAll();
if(h){g.containerExpandEvent.fire(g)
}else{j._oContent.style.display="none";
g.containerCollapseEvent.fire(g)
}g._toggleContainerHelpers(h)
};
j._oContent.style.display="block";
a.onComplete.subscribe(i);
a.animate();
this._bContainerOpen=h
}else{if(h){j._oContent.style.display="block";
this.containerExpandEvent.fire(this)
}else{j._oContent.style.display="none";
this.containerCollapseEvent.fire(this)
}this._toggleContainerHelpers(h);
this._bContainerOpen=h
}};
YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(a,c){var b=this.highlightClassName;
if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,b)
}if((c=="to")&&b){YAHOO.util.Dom.addClass(a,b);
this._oCurItem=a
}};
YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(a,c){if(a==this._oCurItem){return
}var b=this.prehighlightClassName;
if((c=="mouseover")&&b){YAHOO.util.Dom.addClass(a,b)
}else{YAHOO.util.Dom.removeClass(a,b)
}};
YAHOO.widget.AutoComplete.prototype._updateValue=function(f){var c=this._oTextbox;
var e=(this.delimChar)?this.delimChar[0]:null;
var b=this._sSavedQuery;
var d=f._sResultKey;
c.focus();
c.value="";
if(e){if(b){c.value=b
}c.value+=d+e;
if(e!=" "){c.value+=" "
}}else{c.value=d
}if(c.type=="textarea"){c.scrollTop=c.scrollHeight
}var a=c.value.length;
this._selectText(c,a,a);
this._oCurItem=f
};
YAHOO.widget.AutoComplete.prototype._selectItem=function(a){this._bItemSelected=true;
this._updateValue(a);
this.itemSelectEvent.fire(this,a,a._oResultData);
this._clearList()
};
YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(!this.typeAhead){return
}else{this._clearList()
}};
YAHOO.widget.AutoComplete.prototype._moveSelection=function(g){if(this._bContainerOpen){var d=this._oCurItem;
var f=-1;
if(d){f=d._nItemIndex
}var c=(g==40)?(f+1):(f-1);
if(c<-2||c>=this._nDisplayedItems){return
}if(d){this._toggleHighlight(d,"from");
this.itemArrowFromEvent.fire(this,d)
}if(c==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._oTextbox.value=this._sSavedQuery
}else{this._oTextbox.value=this._sSavedQuery+this._sCurQuery
}}else{this._oTextbox.value=this._sCurQuery
}this._oCurItem=null;
return
}if(c==-2){this._clearList();
return
}var b=this._aListItems[c];
var e=this._oContainer._oContent;
var a=((YAHOO.util.Dom.getStyle(e,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(e,"overflowY")=="auto"));
if(a&&(c>-1)&&(c<this._nDisplayedItems)){if(g==40){if((b.offsetTop+b.offsetHeight)>(e.scrollTop+e.offsetHeight)){e.scrollTop=(b.offsetTop+b.offsetHeight)-e.offsetHeight
}else{if((b.offsetTop+b.offsetHeight)<e.scrollTop){e.scrollTop=b.offsetTop
}}}else{if(b.offsetTop<e.scrollTop){this._oContainer._oContent.scrollTop=b.offsetTop
}else{if(b.offsetTop>(e.scrollTop+e.offsetHeight)){this._oContainer._oContent.scrollTop=(b.offsetTop+b.offsetHeight)-e.offsetHeight
}}}}this._toggleHighlight(b,"to");
this.itemArrowToEvent.fire(this,b);
if(this.typeAhead){this._updateValue(b)
}}};
YAHOO.widget.DataSource=function(){};
YAHOO.widget.DataSource.prototype.ERROR_DATANULL="Response data was null";
YAHOO.widget.DataSource.prototype.ERROR_DATAPARSE="Response data could not be parsed";
YAHOO.widget.DataSource.prototype.maxCacheEntries=15;
YAHOO.widget.DataSource.prototype.queryMatchContains=false;
YAHOO.widget.DataSource.prototype.queryMatchSubset=false;
YAHOO.widget.DataSource.prototype.queryMatchCase=false;
YAHOO.widget.DataSource.prototype.getName=function(){return this._sName
};
YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName
};
YAHOO.widget.DataSource.prototype.getResults=function(a,d,b){var c=this._doQueryCache(a,d,b);
if(c.length===0){this.queryEvent.fire(this,b,d);
this.doQuery(a,d,b)
}};
YAHOO.widget.DataSource.prototype.doQuery=function(a,c,b){};
YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[]
}if(this._aCacheHelper){this._aCacheHelper=[]
}this.cacheFlushEvent.fire(this)
};
YAHOO.widget.DataSource.prototype.queryEvent=null;
YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;
YAHOO.widget.DataSource.prototype.getResultsEvent=null;
YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;
YAHOO.widget.DataSource.prototype.dataErrorEvent=null;
YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;
YAHOO.widget.DataSource._nIndex=0;
YAHOO.widget.DataSource.prototype._sName=null;
YAHOO.widget.DataSource.prototype._aCache=null;
YAHOO.widget.DataSource.prototype._init=function(){var a=this.maxCacheEntries;
if(isNaN(a)||(a<0)){a=0
}if(a>0&&!this._aCache){this._aCache=[]
}this._sName="instance"+YAHOO.widget.DataSource._nIndex;
YAHOO.widget.DataSource._nIndex++;
this.queryEvent=new YAHOO.util.CustomEvent("query",this);
this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);
this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);
this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);
this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);
this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this)
};
YAHOO.widget.DataSource.prototype._addCacheElem=function(b){var a=this._aCache;
if(!a||!b||!b.query||!b.results){return
}if(a.length>=this.maxCacheEntries){a.shift()
}a.push(b)
};
YAHOO.widget.DataSource.prototype._doQueryCache=function(a,l,q){var h=[];
var g=false;
var m=this._aCache;
var f=(m)?m.length:0;
var n=this.queryMatchContains;
if((this.maxCacheEntries>0)&&m&&(f>0)){this.cacheQueryEvent.fire(this,q,l);
if(!this.queryMatchCase){var d=l;
l=l.toLowerCase()
}for(var s=f-1;
s>=0;
s--){var e=m[s];
var b=e.results;
var c=(!this.queryMatchCase)?encodeURIComponent(e.query.toLowerCase()):encodeURIComponent(e.query);
if(c==l){g=true;
h=b;
if(s!=f-1){m.splice(s,1);
this._addCacheElem(e)
}break
}else{if(this.queryMatchSubset){for(var r=l.length-1;
r>=0;
r--){var u=l.substr(0,r);
if(c==u){g=true;
for(var p=b.length-1;
p>=0;
p--){var t=b[p];
var o=(this.queryMatchCase)?encodeURIComponent(t[0]).indexOf(l):encodeURIComponent(t[0]).toLowerCase().indexOf(l);
if((!n&&(o===0))||(n&&(o>-1))){h.unshift(t)
}}e={};
e.query=l;
e.results=h;
this._addCacheElem(e);
break
}}if(g){break
}}}}if(g){this.getCachedResultsEvent.fire(this,q,d,h);
a(d,h,q)
}}return h
};
YAHOO.widget.DS_XHR=function(c,a,d){if(typeof d=="object"){for(var b in d){this[b]=d[b]
}}if(!a||(a.constructor!=Array)){return
}else{this.schema=a
}this.scriptURI=c;
this._init()
};
YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();
YAHOO.widget.DS_XHR.prototype.TYPE_JSON=0;
YAHOO.widget.DS_XHR.prototype.TYPE_XML=1;
YAHOO.widget.DS_XHR.prototype.TYPE_FLAT=2;
YAHOO.widget.DS_XHR.prototype.ERROR_DATAXHR="XHR response failed";
YAHOO.widget.DS_XHR.prototype.connTimeout=0;
YAHOO.widget.DS_XHR.prototype.scriptURI=null;
YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";
YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";
YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.prototype.TYPE_JSON;
YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!--";
YAHOO.widget.DS_XHR.prototype.doQuery=function(e,g,b){var j=(this.responseType==this.TYPE_XML);
var d=this.scriptURI+"?"+this.scriptQueryParam+"="+g;
if(this.scriptQueryAppend.length>0){d+="&"+this.scriptQueryAppend
}var c=null;
var f=this;
var i=function(k){if(!f._oConn||(k.tId!=f._oConn.tId)){f.dataErrorEvent.fire(f,b,g,f.ERROR_DATANULL);
return
}for(var n in k){}if(!j){k=k.responseText
}else{k=k.responseXML
}if(k===null){f.dataErrorEvent.fire(f,b,g,f.ERROR_DATANULL);
return
}var m=f.parseResponse(g,k,b);
var l={};
l.query=decodeURIComponent(g);
l.results=m;
if(m===null){f.dataErrorEvent.fire(f,b,g,f.ERROR_DATAPARSE);
return
}else{f.getResultsEvent.fire(f,b,g,m);
f._addCacheElem(l);
e(g,m,b)
}};
var a=function(k){f.dataErrorEvent.fire(f,b,g,f.ERROR_DATAXHR);
return
};
var h={success:i,failure:a};
if(!isNaN(this.connTimeout)&&this.connTimeout>0){h.timeout=this.connTimeout
}if(this._oConn){YAHOO.util.Connect.abort(this._oConn)
}f._oConn=YAHOO.util.Connect.asyncRequest("GET",d,h,null)
};
YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;
var aResults=[];
var bError=false;
var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;
if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd)
}switch(this.responseType){case this.TYPE_JSON:var jsonList;
if(window.JSON&&(navigator.userAgent.toLowerCase().indexOf("khtml")==-1)){var jsonObjParsed=JSON.parse(oResponse);
if(!jsonObjParsed){bError=true;
break
}else{jsonList=eval("jsonObjParsed."+aSchema[0])
}}else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length)
}if(oResponse.indexOf("{")<0){bError=true;
break
}if(oResponse.indexOf("{}")===0){break
}var jsonObjRaw=eval("("+oResponse+")");
if(!jsonObjRaw){bError=true;
break
}jsonList=eval("(jsonObjRaw."+aSchema[0]+")")
}catch(e){bError=true;
break
}}if(!jsonList){bError=true;
break
}if(jsonList.constructor!=Array){jsonList=[jsonList]
}for(var i=jsonList.length-1;
i>=0;
i--){var aResultItem=[];
var jsonResult=jsonList[i];
for(var j=aSchema.length-1;
j>=1;
j--){var dataFieldValue=jsonResult[aSchema[j]];
if(!dataFieldValue){dataFieldValue=""
}aResultItem.unshift(dataFieldValue)
}aResults.unshift(aResultItem)
}break;
case this.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);
if(!xmlList){bError=true;
break
}for(var k=xmlList.length-1;
k>=0;
k--){var result=xmlList.item(k);
var aFieldSet=[];
for(var m=aSchema.length-1;
m>=1;
m--){var sValue=null;
var xmlAttr=result.attributes.getNamedItem(aSchema[m]);
if(xmlAttr){sValue=xmlAttr.value
}else{var xmlNode=result.getElementsByTagName(aSchema[m]);
if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue
}else{sValue=""
}}aFieldSet.unshift(sValue)
}aResults.unshift(aFieldSet)
}break;
case this.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;
if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength)
}var aRecords=oResponse.split(aSchema[0]);
for(var n=aRecords.length-1;
n>=0;
n--){aResults[n]=aRecords[n].split(aSchema[1])
}}break;
default:break
}sQuery=null;
oResponse=null;
oParent=null;
if(bError){return null
}else{return aResults
}};
YAHOO.widget.DS_XHR.prototype._oConn=null;
YAHOO.widget.DS_JSFunction=function(a,c){if(typeof c=="object"){for(var b in c){this[b]=c[b]
}}if(!a||(a.constructor!=Function)){return
}else{this.dataFunction=a;
this._init()
}};
YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();
YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;
YAHOO.widget.DS_JSFunction.prototype.doQuery=function(c,f,d){var b=this.dataFunction;
var e=[];
e=b(f);
if(e===null){this.dataErrorEvent.fire(this,d,f,this.ERROR_DATANULL);
return
}var a={};
a.query=decodeURIComponent(f);
a.results=e;
this._addCacheElem(a);
this.getResultsEvent.fire(this,d,f,e);
c(f,e,d);
return
};
YAHOO.widget.DS_JSArray=function(a,c){if(typeof c=="object"){for(var b in c){this[b]=c[b]
}}if(!a||(a.constructor!=Array)){return
}else{this.data=a;
this._init()
}};
YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();
YAHOO.widget.DS_JSArray.prototype.data=null;
YAHOO.widget.DS_JSArray.prototype.doQuery=function(e,j,a){var c=this.data;
var k=[];
var d=false;
var b=this.queryMatchContains;
if(!this.queryMatchCase){j=j.toLowerCase()
}for(var f=c.length-1;
f>=0;
f--){var h=[];
if(c[f]){if(c[f].constructor==String){h[0]=c[f]
}else{if(c[f].constructor==Array){h=c[f]
}}}if(h[0]&&(h[0].constructor==String)){var g=(this.queryMatchCase)?encodeURIComponent(h[0]).indexOf(j):encodeURIComponent(h[0]).toLowerCase().indexOf(j);
if((!b&&(g===0))||(b&&(g>-1))){k.unshift(h)
}}}this.getResultsEvent.fire(this,a,j,k);
e(j,k,a)
};