if(typeof ychecknode=="undefined"){ychecknode=1;
YAHOO.widget.CheckNode=function(d,e,c,a,b){if(e){this.init(d,c,a);
this.setUpLabel(e);
if(b&&b===true){this.check()
}}};
YAHOO.widget.CheckNode.prototype=new YAHOO.widget.TextNode();
YAHOO.widget.CheckNode.prototype.checked=false;
YAHOO.widget.CheckNode.prototype.checkState=0;
YAHOO.widget.CheckNode.prototype.getCheckElId=function(){return"ygtvcheck"+this.index
};
YAHOO.widget.CheckNode.prototype.getCheckEl=function(){return document.getElementById(this.getCheckElId())
};
YAHOO.widget.CheckNode.prototype.getCheckStyle=function(){return"ygtvcheck"+this.checkState
};
YAHOO.widget.CheckNode.prototype.getCheckLink=function(){return"YAHOO.widget.TreeView.getNode('"+this.tree.id+"',"+this.index+").checkClick()"
};
YAHOO.widget.CheckNode.prototype.checkClick=function(){if(this.checkState===0){this.check()
}else{this.uncheck()
}this.onCheckClick()
};
YAHOO.widget.CheckNode.prototype.onCheckClick=function(){};
YAHOO.widget.CheckNode.prototype.updateParent=function(){var d=this.parent;
if(!d||!d.updateParent){return
}var a=false;
var c=false;
for(var b=0;
b<d.children.length;
++b){if(d.children[b].checked){a=true;
if(d.children[b].checkState==1){c=true
}}else{c=true
}}if(a){d.setCheckState(2)
}else{}d.updateCheckHtml();
d.updateParent()
};
YAHOO.widget.CheckNode.prototype.updateCheckHtml=function(){if(this.parent&&this.parent.childrenRendered){this.getCheckEl().className=this.getCheckStyle()
}};
YAHOO.widget.CheckNode.prototype.setCheckState=function(a){this.checkState=a;
this.checked=(a>0)
};
YAHOO.widget.CheckNode.prototype.check=function(){this.setCheckState(2);
for(var a=0;
a<this.children.length;
++a){}this.updateCheckHtml();
this.updateParent()
};
YAHOO.widget.CheckNode.prototype.uncheck=function(){this.setCheckState(0);
for(var a=0;
a<this.children.length;
++a){this.children[a].uncheck()
}this.updateCheckHtml();
this.updateParent()
};
YAHOO.widget.CheckNode.prototype.getNodeHtml=function(){var a=new Array();
a[a.length]='<table border="0" cellpadding="0" cellspacing="0">';
a[a.length]="<tr>";
for(i=0;
i<this.depth;
++i){a[a.length]='<td class="'+this.getDepthStyle(i)+'">&#160;</td>'
}a[a.length]="<td";
a[a.length]=' id="'+this.getToggleElId()+'"';
a[a.length]=' class="'+this.getStyle()+'"';
if(this.hasChildren(true)){a[a.length]=' onmouseover="this.className=';
a[a.length]="YAHOO.widget.TreeView.getNode('";
a[a.length]=this.tree.id+"',"+this.index+').getHoverStyle()"';
a[a.length]=' onmouseout="this.className=';
a[a.length]="YAHOO.widget.TreeView.getNode('";
a[a.length]=this.tree.id+"',"+this.index+').getStyle()"'
}a[a.length]=' onclick="javascript:'+this.getToggleLink()+'">&#160;';
a[a.length]="</td>";
a[a.length]="<td";
a[a.length]=' id="'+this.getCheckElId()+'"';
a[a.length]=' class="'+this.getCheckStyle()+'"';
a[a.length]=' onclick="javascript:'+this.getCheckLink()+'">';
a[a.length]="&#160;</td>";
a[a.length]="<td>";
a[a.length]="<a";
a[a.length]=' id="'+this.labelElId+'"';
a[a.length]=' class="'+this.labelStyle+'"';
a[a.length]=' href="'+this.href+'"';
a[a.length]=' target="'+this.target+'"';
if(this.hasChildren(true)){a[a.length]=" onmouseover=\"document.getElementById('";
a[a.length]=this.getToggleElId()+"').className=";
a[a.length]="YAHOO.widget.TreeView.getNode('";
a[a.length]=this.tree.id+"',"+this.index+').getHoverStyle()"';
a[a.length]=" onmouseout=\"document.getElementById('";
a[a.length]=this.getToggleElId()+"').className=";
a[a.length]="YAHOO.widget.TreeView.getNode('";
a[a.length]=this.tree.id+"',"+this.index+').getStyle()"'
}a[a.length]=" >";
a[a.length]=this.label;
a[a.length]="</a>";
a[a.length]="</td>";
a[a.length]="</tr>";
a[a.length]="</table>";
return a.join("")
};
YAHOO.widget.CheckNode.prototype.toString=function(){return"CheckNode ("+this.index+") "+this.label
}
};