var XWiki=(function(i){var n=0;
i.EntityType={WIKI:n++,SPACE:n++,DOCUMENT:n++,ATTACHMENT:n++,OBJECT:n++,OBJECT_PROPERTY:n++,CLASS_PROPERTY:n++};
i.EntityReference=Class.create({initialize:function(u,w,v){this.name=u;
this.type=w;
this.parent=v
},extractReference:function(v){var u=this;
while(u&&u.type!=v){u=u.parent
}return u
},relativeTo:function(w){var v=this._extractComponents().reverse();
var x=w?w._extractComponents().reverse():[];
while(v.length>0&&x.length>0&&v[0].type!=x[0].type){v[0].type>x[0].type?x.shift():v.shift()
}while(v.length>0&&x.length>0&&v[0].type==x[0].type&&v[0].name==x[0].name){v.shift();
x.shift()
}if(v.length==0){return new i.EntityReference("",this.type)
}else{v=v.reverse();
for(var u=0;
u<v.length;
u++){v[u]=new i.EntityReference(v[u].name,v[u].type);
if(u>0){v[u-1].parent=v[u]
}}return v[0]
}},_extractComponents:function(){var v=[];
var u=this;
while(u){v.push(u);
u=u.parent
}return v
}});
i.WikiReference=Class.create(i.EntityReference,{initialize:function($super,u){$super(u,i.EntityType.WIKI)
}});
i.SpaceReference=Class.create(i.EntityReference,{initialize:function($super,v,u){$super(u,i.EntityType.SPACE,new i.WikiReference(v))
}});
i.DocumentReference=Class.create(i.EntityReference,{initialize:function($super,w,v,u){$super(u,i.EntityType.DOCUMENT,new i.SpaceReference(w,v))
}});
i.AttachmentReference=Class.create(i.EntityReference,{initialize:function($super,v,u){$super(v,i.EntityType.ATTACHMENT,u)
}});
var m="\\";
var h=m+m;
var j=":";
var r=".";
var f="@";
var b="^";
var s=r;
var l=b;
var k=[[],[r,j,m],[r,m],[f,m],[b,m],[s,m],[l,r,m]];
var o=[[],[m+r,m+j,h],[m+r,h],[m+f,h],[m+b,h],[m+s,h],[m+l,m+r,h]];
var p=[[],[j],[r,j],[f,r,j],[b,r,j],[s,b,r,j],[l,r,j]];
var c=[[i.EntityType.WIKI],[i.EntityType.SPACE,i.EntityType.WIKI],[i.EntityType.DOCUMENT,i.EntityType.SPACE,i.EntityType.WIKI],[i.EntityType.ATTACHMENT,i.EntityType.DOCUMENT,i.EntityType.SPACE,i.EntityType.WIKI],[i.EntityType.OBJECT,i.EntityType.DOCUMENT,i.EntityType.SPACE,i.EntityType.WIKI],[i.EntityType.OBJECT_PROPERTY,i.EntityType.OBJECT,i.EntityType.DOCUMENT,i.EntityType.SPACE,i.EntityType.WIKI],[i.EntityType.CLASS_PROPERTY,i.EntityType.DOCUMENT,i.EntityType.SPACE,i.EntityType.WIKI]];
var t=[h,m];
var d=[m,""];
function g(y,u,v){for(var x=0;
x<v.length;
x++){var w=u+x;
if(w>=y.length||y.charAt(w)!=v.charAt(x)){return false
}}return true
}function a(z,y,x){var u="",w=-1;
while(++w<z.length){for(var v=0;
v<y.length;
v++){if(g(z,w,y[v])){z=z.substr(0,w)+x[v]+z.substr(w+y[v].length);
w+=x[v].length-1;
break
}}}return z
}i.EntityReferenceResolver=Class.create({resolve:function(w,z){w=w||"";
z=parseInt(z);
if(isNaN(z)||z<0||z>=p.length){throw"No parsing definition found for Entity Type ["+z+"]"
}var x;
var v=p[z];
var B=c[z];
for(var A=0;
A<v.length&&w!=null;
A++){var y=this._splitAndUnescape(w,v[A]);
w=y[0];
var C=new i.EntityReference(y[1],B[A]);
x=this._appendParent(x,C)
}if(w!=null){var u=a(w,t,d);
var C=new i.EntityReference(u,B[v.length]);
x=this._appendParent(x,C)
}return x
},_appendParent:function(u,w){if(u){var v=u;
while(v.parent){v=v.parent
}v.parent=w;
return u
}else{return w
}},_splitAndUnescape:function(x,A){var w=[];
var y=x.length;
while(--y>=0){var v=x.charAt(y);
var u=y-1;
var B=0;
if(u>=0){B=x.charAt(u)
}if(v==A){var z=this._getNumberOfCharsBefore(m,x,u);
if(z%2==0){break
}else{--y
}}else{if(B==m){--y
}}w.push(v)
}return[y<0?null:x.substring(0,y),w.reverse().join("")]
},_getNumberOfCharsBefore:function(x,v,w){var u=w;
while(u>=0&&v.charAt(u)==x){--u
}return w-u
}});
i.EntityReferenceSerializer=Class.create({serialize:function(u){return u?this.serialize(u.parent)+this._serializeComponent(u):""
},_serializeComponent:function(w){var u="";
var v=k[w.type];
if(w.parent){u+=w.parent.type==i.EntityType.WIKI?j:v[0]
}if(v.length>0){u+=a(w.name,v,o[w.type])
}else{u+=w.name.replace(m,h)
}return u
}});
var e=new i.EntityReferenceResolver();
var q=new i.EntityReferenceSerializer();
i.Model={serialize:function(u){return q.serialize(u)
},resolve:function(u,v){return e.resolve(u,v)
}};
return i
}(XWiki||{}));