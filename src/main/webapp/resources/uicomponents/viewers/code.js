var XWiki=(function(c){var a=c.viewers=c.viewers||{};
a.Code=Class.create({initialize:function(d){this.showingLineNumbers=d;
this.toggleLink=$("toggleLineNumbers");
this.showText="$msg.get('core.viewers.code.showLineNumbers')";
this.hideText="$msg.get('core.viewers.code.hideLineNumbers')";
if(this.toggleLink){this.textarea=this.toggleLink.up().down("textarea");
if(this.textarea){this.attachToggleListener()
}}},attachToggleListener:function(){this.toggleLink.href="";
this.toggleLink.observe("click",this.toggleLineNumbers.bindAsEventListener(this))
},toggleLineNumbers:function(j){if(j){j.stop()
}var g="\n";
var e=this.textarea.value.split(g);
var k=e.size()-1;
var f=Math.ceil(Math.log(k+1)/Math.LN10);
for(var h=0;
h<k;
++h){if(this.showingLineNumbers){e[h]=e[h].replace(/^\s*[0-9]+:\s/,"")
}else{var d=h+1+"";
e[h]=" ".times(f-d.length)+d+": "+e[h]
}}this.textarea.value=e.join(g);
this.showingLineNumbers=!this.showingLineNumbers;
if(this.showingLineNumbers){this.toggleLink.update(this.hideText)
}else{this.toggleLink.update(this.showText)
}}});
function b(){var d=true;
if(window.location.search.indexOf("showlinenumbers=0")>=0){d=false
}new a.Code(d);
return true
}(c.isInitialized&&b())||document.observe("xwiki:dom:loading",b);
return c
}(XWiki||{}));