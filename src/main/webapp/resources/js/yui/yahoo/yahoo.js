if(typeof YAHOO=="undefined"){YAHOO={}
}YAHOO.namespace=function(c){if(!c||!c.length){return null
}var d=c.split(".");
var b=YAHOO;
for(var a=(d[0]=="YAHOO")?1:0;
a<d.length;
++a){b[d[a]]=b[d[a]]||{};
b=b[d[a]]
}return b
};
YAHOO.log=function(c,d,a){var b=YAHOO.widget.Logger;
if(b&&b.log){return b.log(c,d,a)
}else{return false
}};
YAHOO.extend=function(a,c){var b=function(){};
b.prototype=c.prototype;
a.prototype=new b();
a.prototype.constructor=a;
a.superclass=c.prototype;
if(c.prototype.constructor==Object.prototype.constructor){c.prototype.constructor=c
}};
YAHOO.namespace("util");
YAHOO.namespace("widget");
YAHOO.namespace("example");