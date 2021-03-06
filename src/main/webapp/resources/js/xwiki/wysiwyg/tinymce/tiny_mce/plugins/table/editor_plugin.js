tinyMCE.importPluginLanguagePack("table","en,tr,ar,cs,da,de,el,es,fi,fr_ca,hu,it,ja,ko,nl,nb,pl,pt,pt_br,sv,tw,zh_cn,fr,de,he,nb,ru,ru_KOI8-R,ru_UTF-8,nn,cy,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_TablePlugin={getInfo:function(){return{longname:"Tables",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_table.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){if(tinyMCE.isGecko){var b=a.getDoc();
tinyMCE.addEvent(b,"mouseup",TinyMCE_TablePlugin._mouseDownHandler)
}a.tableRowClipboard=null
},getControlHTML:function(f){var b=new Array(["table","table.gif","lang_table_desc","mceInsertTable",true],["delete_col","table_delete_col.gif","lang_table_delete_col_desc","mceTableDeleteCol"],["delete_row","table_delete_row.gif","lang_table_delete_row_desc","mceTableDeleteRow"],["col_after","table_insert_col_after.gif","lang_table_col_after_desc","mceTableInsertColAfter"],["col_before","table_insert_col_before.gif","lang_table_col_before_desc","mceTableInsertColBefore"],["row_after","table_insert_row_after.gif","lang_table_row_after_desc","mceTableInsertRowAfter"],["row_before","table_insert_row_before.gif","lang_table_row_before_desc","mceTableInsertRowBefore"],["row_props","table_row_props.gif","lang_table_row_desc","mceTableRowProps",true],["cell_props","table_cell_props.gif","lang_table_cell_desc","mceTableCellProps",true],["split_cells","table_split_cells.gif","lang_table_split_cells_desc","mceTableSplitCells",true],["merge_cells","table_merge_cells.gif","lang_table_merge_cells_desc","mceTableMergeCells",true]);
for(var d=0;
d<b.length;
d++){var a=b[d];
var e="tinyMCE.execInstanceCommand('{$editor_id}','"+a[3]+"', "+(a.length>4?a[4]:false)+(a.length>5?", '"+a[5]+"'":"")+");return false;";
if(a[0]==f){return tinyMCE.getButtonHTML(f,a[2],"{$pluginurl}/images/"+a[1],a[3],(a.length>4?a[4]:false))
}}if(f=="tablecontrols"){var c="";
c+=tinyMCE.getControlHTML("table");
c+=tinyMCE.getControlHTML("separator");
c+=tinyMCE.getControlHTML("row_props");
c+=tinyMCE.getControlHTML("cell_props");
c+=tinyMCE.getControlHTML("separator");
c+=tinyMCE.getControlHTML("row_before");
c+=tinyMCE.getControlHTML("row_after");
c+=tinyMCE.getControlHTML("delete_row");
c+=tinyMCE.getControlHTML("separator");
c+=tinyMCE.getControlHTML("col_before");
c+=tinyMCE.getControlHTML("col_after");
c+=tinyMCE.getControlHTML("delete_col");
c+=tinyMCE.getControlHTML("separator");
c+=tinyMCE.getControlHTML("split_cells");
c+=tinyMCE.getControlHTML("merge_cells");
return c
}return""
},execCommand:function(e,a,d,f,c){switch(d){case"mceInsertTable":case"mceTableRowProps":case"mceTableCellProps":case"mceTableSplitCells":case"mceTableMergeCells":case"mceTableInsertRowBefore":case"mceTableInsertRowAfter":case"mceTableDeleteRow":case"mceTableInsertColBefore":case"mceTableInsertColAfter":case"mceTableDeleteCol":case"mceTableCutRow":case"mceTableCopyRow":case"mceTablePasteRowBefore":case"mceTablePasteRowAfter":case"mceTableDelete":var b=tinyMCE.getInstanceById(e);
b.execCommand("mceBeginUndoLevel");
TinyMCE_TablePlugin._doExecCommand(e,a,d,f,c);
b.execCommand("mceEndUndoLevel");
return true
}return false
},handleNodeChange:function(i,b,h,d,f,e){var a="1",c="1";
var g=tinyMCE.getInstanceById(i);
tinyMCE.switchClass(i+"_table","mceButtonNormal");
tinyMCE.switchClass(i+"_row_props","mceButtonDisabled");
tinyMCE.switchClass(i+"_cell_props","mceButtonDisabled");
tinyMCE.switchClass(i+"_row_before","mceButtonDisabled");
tinyMCE.switchClass(i+"_row_after","mceButtonDisabled");
tinyMCE.switchClass(i+"_delete_row","mceButtonDisabled");
tinyMCE.switchClass(i+"_col_before","mceButtonDisabled");
tinyMCE.switchClass(i+"_col_after","mceButtonDisabled");
tinyMCE.switchClass(i+"_delete_col","mceButtonDisabled");
tinyMCE.switchClass(i+"_split_cells","mceButtonDisabled");
tinyMCE.switchClass(i+"_merge_cells","mceButtonDisabled");
if(tdElm=tinyMCE.getParentElement(b,"td,th")){tinyMCE.switchClass(i+"_cell_props","mceButtonSelected");
tinyMCE.switchClass(i+"_row_before","mceButtonNormal");
tinyMCE.switchClass(i+"_row_after","mceButtonNormal");
tinyMCE.switchClass(i+"_delete_row","mceButtonNormal");
tinyMCE.switchClass(i+"_col_before","mceButtonNormal");
tinyMCE.switchClass(i+"_col_after","mceButtonNormal");
tinyMCE.switchClass(i+"_delete_col","mceButtonNormal");
a=tinyMCE.getAttrib(tdElm,"colspan");
c=tinyMCE.getAttrib(tdElm,"rowspan");
a=a==""?"1":a;
c=c==""?"1":c;
if(a!="1"||c!="1"){tinyMCE.switchClass(i+"_split_cells","mceButtonNormal")
}}if(tinyMCE.getParentElement(b,"tr")){tinyMCE.switchClass(i+"_row_props","mceButtonSelected")
}if(tinyMCE.getParentElement(b,"table")){tinyMCE.switchClass(i+"_table","mceButtonSelected");
tinyMCE.switchClass(i+"_merge_cells","mceButtonNormal")
}},_mouseDownHandler:function(b){var c=tinyMCE.isMSIE?event.srcElement:b.target;
var a=tinyMCE.selectedInstance.getFocusElement();
if(c.nodeName=="BODY"&&(a.nodeName=="TD"||a.nodeName=="TH"||(a.parentNode&&a.parentNode.nodeName=="TD")||(a.parentNode&&a.parentNode.nodeName=="TH"))){window.setTimeout(function(){var d=tinyMCE.getParentElement(a,"table");
tinyMCE.handleVisualAid(d,true,tinyMCE.settings.visual,tinyMCE.selectedInstance)
},10)
}},_doExecCommand:function(f,v,r,Y,ad){var U=tinyMCE.getInstanceById(f);
var n=U.getFocusElement();
var V=tinyMCE.getParentElement(n,"tr");
var ao=tinyMCE.getParentElement(n,"td,th");
var E=tinyMCE.getParentElement(n,"table");
var k=U.contentWindow.document;
var ar=E?E.getAttribute("border"):"";
if(V&&ao==null){ao=V.cells[0]
}function an(y,x){for(var au=0;
au<y.length;
au++){if(y[au].length>0&&an(y[au],x)){return true
}if(y[au]==x){return true
}}return false
}function ag(){var i=k.createElement("td");
i.innerHTML="&nbsp;"
}function j(y){var x=tinyMCE.getAttrib(y,"colspan");
var i=tinyMCE.getAttrib(y,"rowspan");
x=x==""?1:parseInt(x);
i=i==""?1:parseInt(i);
return{colspan:x,rowspan:i}
}function aj(au,aw){for(var av=0;
av<au.length;
av++){for(var i=0;
i<au[av].length;
i++){if(au[av][i]==aw){return{cellindex:i,rowindex:av}
}}}return null
}function c(x,y,i){if(x[y]&&x[y][i]){return x[y][i]
}return null
}function d(aA){var i=new Array();
var aB=aA.rows;
for(var ax=0;
ax<aB.length;
ax++){for(var az=0;
az<aB[ax].cells.length;
az++){var av=aB[ax].cells[az];
var aw=j(av);
for(xstart=az;
i[ax]&&i[ax][xstart];
xstart++){}for(var ay=ax;
ay<ax+aw.rowspan;
ay++){if(!i[ay]){i[ay]=new Array()
}for(var au=xstart;
au<xstart+aw.colspan;
au++){i[ay][au]=av
}}}}return i
}function m(aD,aA,av,au){var y=d(aD);
var aC=aj(y,av);
if(au.cells.length!=aA.childNodes.length){var aE=aA.childNodes;
var az=null;
for(var aB=0;
av=c(y,aC.rowindex,aB);
aB++){var ax=true;
var ay=j(av);
if(an(aE,av)){au.childNodes[aB]._delete=true
}else{if((az==null||av!=az)&&ay.colspan>1){for(var aw=aB;
aw<aB+av.colSpan;
aw++){au.childNodes[aw]._delete=true
}}}if((az==null||av!=az)&&ay.rowspan>1){av.rowSpan=ay.rowspan+1
}az=av
}B(E)
}}function N(x,i){while((x=x.previousSibling)!=null){if(x.nodeName==i){return x
}}return null
}function ae(au,av){var x=av.split(",");
while((au=au.nextSibling)!=null){for(var y=0;
y<x.length;
y++){if(au.nodeName.toLowerCase()==x[y].toLowerCase()){return au
}}}return null
}function B(au){if(au.rows==0){return
}var y=au.rows[0];
do{var x=ae(y,"TR");
if(y._delete){y.parentNode.removeChild(y);
continue
}var av=y.cells[0];
if(av.cells>1){do{var i=ae(av,"TD,TH");
if(av._delete){av.parentNode.removeChild(av)
}}while((av=i)!=null)
}}while((y=x)!=null)
}function p(au,ax,aw){au.rowSpan=1;
var x=ae(ax,"TR");
for(var av=1;
av<aw&&x;
av++){var y=k.createElement("td");
y.innerHTML="&nbsp;";
if(tinyMCE.isMSIE){x.insertBefore(y,x.cells(au.cellIndex))
}else{x.insertBefore(y,x.cells[au.cellIndex])
}x=ae(x,"TR")
}}function R(aC,aE,ay){var y=d(aE);
var au=ay.cloneNode(false);
var aD=aj(y,ay.cells[0]);
var az=null;
var ax=tinyMCE.getAttrib(aE,"border");
var aw=null;
for(var aB=0;
aw=c(y,aD.rowindex,aB);
aB++){var aA=null;
if(az!=aw){for(var av=0;
av<ay.cells.length;
av++){if(aw==ay.cells[av]){aA=aw.cloneNode(true);
break
}}}if(aA==null){aA=aC.createElement("td");
aA.innerHTML="&nbsp;"
}aA.colSpan=1;
aA.rowSpan=1;
au.appendChild(aA);
az=aw
}return au
}switch(r){case"mceTableRowProps":if(V==null){return true
}if(Y){var g=new Array();
g.file="../../plugins/table/row.htm";
g.width=380;
g.height=295;
g.width+=tinyMCE.getLang("lang_table_rowprops_delta_width",0);
g.height+=tinyMCE.getLang("lang_table_rowprops_delta_height",0);
tinyMCE.openWindow(g,{editor_id:U.editorId,inline:"yes"})
}return true;
case"mceTableCellProps":if(ao==null){return true
}if(Y){var g=new Array();
g.file="../../plugins/table/cell.htm";
g.width=380;
g.height=295;
g.width+=tinyMCE.getLang("lang_table_cellprops_delta_width",0);
g.height+=tinyMCE.getLang("lang_table_cellprops_delta_height",0);
tinyMCE.openWindow(g,{editor_id:U.editorId,inline:"yes"})
}return true;
case"mceInsertTable":if(Y){var g=new Array();
g.file="../../plugins/table/table.htm";
g.width=400;
g.height=250;
g.width+=tinyMCE.getLang("lang_table_table_delta_width",0);
g.height+=tinyMCE.getLang("lang_table_table_delta_height",0);
tinyMCE.openWindow(g,{editor_id:U.editorId,inline:"yes",action:ad})
}return true;
case"mceTableDelete":var F=tinyMCE.getParentElement(U.getFocusElement(),"table");
if(F){F.parentNode.removeChild(F);
U.repaint()
}return true;
case"mceTableSplitCells":case"mceTableMergeCells":case"mceTableInsertRowBefore":case"mceTableInsertRowAfter":case"mceTableDeleteRow":case"mceTableInsertColBefore":case"mceTableInsertColAfter":case"mceTableDeleteCol":case"mceTableCutRow":case"mceTableCopyRow":case"mceTablePasteRowBefore":case"mceTablePasteRowAfter":if(!E){return true
}if(E!=V.parentNode){E=V.parentNode
}if(E&&V){switch(r){case"mceTableInsertRowBefore":if(!V||!ao){return true
}var ac=d(E);
var o=aj(ac,ao);
var w=k.createElement("tr");
var u=null;
o.rowindex--;
if(o.rowindex<0){o.rowindex=0
}for(var ab=0;
ao=c(ac,o.rowindex,ab);
ab++){if(ao!=u){var G=j(ao);
if(G.rowspan==1){var J=k.createElement("td");
J.innerHTML="&nbsp;";
J.colSpan=ao.colSpan;
w.appendChild(J)
}else{ao.rowSpan=G.rowspan+1
}u=ao
}}V.parentNode.insertBefore(w,V);
break;
case"mceTableCutRow":if(!V||!ao){return true
}U.tableRowClipboard=R(k,E,V);
U.execCommand("mceTableDeleteRow");
break;
case"mceTableCopyRow":if(!V||!ao){return true
}U.tableRowClipboard=R(k,E,V);
break;
case"mceTablePasteRowBefore":if(!V||!ao){return true
}var w=U.tableRowClipboard.cloneNode(true);
var h=N(V,"TR");
if(h!=null){m(E,h,h.cells[0],w)
}V.parentNode.insertBefore(w,V);
break;
case"mceTablePasteRowAfter":if(!V||!ao){return true
}var W=ae(V,"TR");
var w=U.tableRowClipboard.cloneNode(true);
m(E,V,ao,w);
if(W==null){V.parentNode.appendChild(w)
}else{W.parentNode.insertBefore(w,W)
}break;
case"mceTableInsertRowAfter":if(!V||!ao){return true
}var ac=d(E);
var o=aj(ac,ao);
var w=k.createElement("tr");
var u=null;
for(var ab=0;
ao=c(ac,o.rowindex,ab);
ab++){if(ao!=u){var G=j(ao);
if(G.rowspan==1){var J=k.createElement("td");
J.innerHTML="&nbsp;";
J.colSpan=ao.colSpan;
w.appendChild(J)
}else{ao.rowSpan=G.rowspan+1
}u=ao
}}if(w.hasChildNodes()){var W=ae(V,"TR");
if(W){W.parentNode.insertBefore(w,W)
}else{E.appendChild(w)
}}break;
case"mceTableDeleteRow":if(!V||!ao){return true
}var ac=d(E);
var o=aj(ac,ao);
if(ac.length==1){E.parentNode.removeChild(E);
return true
}var D=V.cells;
var W=ae(V,"TR");
for(var ab=0;
ab<D.length;
ab++){if(D[ab].rowSpan>1){var J=D[ab].cloneNode(true);
var G=j(D[ab]);
J.rowSpan=G.rowspan-1;
var ai=W.cells[ab];
if(ai==null){W.appendChild(J)
}else{W.insertBefore(J,ai)
}}}var u=null;
for(var ab=0;
ao=c(ac,o.rowindex,ab);
ab++){if(ao!=u){var G=j(ao);
if(G.rowspan>1){ao.rowSpan=G.rowspan-1
}else{V=ao.parentNode;
if(V.parentNode){V._delete=true
}}u=ao
}}B(E);
o.rowindex--;
if(o.rowindex<0){o.rowindex=0
}U.selection.selectNode(c(ac,o.rowindex,0),true,true);
break;
case"mceTableInsertColBefore":if(!V||!ao){return true
}var ac=d(E);
var o=aj(ac,ao);
var u=null;
for(var Z=0;
ao=c(ac,Z,o.cellindex);
Z++){if(ao!=u){var G=j(ao);
if(G.colspan==1){var J=k.createElement(ao.nodeName);
J.innerHTML="&nbsp;";
J.rowSpan=ao.rowSpan;
ao.parentNode.insertBefore(J,ao)
}else{ao.colSpan++
}u=ao
}}break;
case"mceTableInsertColAfter":if(!V||!ao){return true
}var ac=d(E);
var o=aj(ac,ao);
var u=null;
for(var Z=0;
ao=c(ac,Z,o.cellindex);
Z++){if(ao!=u){var G=j(ao);
if(G.colspan==1){var J=k.createElement(ao.nodeName);
J.innerHTML="&nbsp;";
J.rowSpan=ao.rowSpan;
var ai=ae(ao,"TD");
if(ai==null){ao.parentNode.appendChild(J)
}else{ai.parentNode.insertBefore(J,ai)
}}else{ao.colSpan++
}u=ao
}}break;
case"mceTableDeleteCol":if(!V||!ao){return true
}var ac=d(E);
var o=aj(ac,ao);
var u=null;
if(ac.length>1&&ac[0].length<=1){E.parentNode.removeChild(E);
return true
}for(var Z=0;
ao=c(ac,Z,o.cellindex);
Z++){if(ao!=u){var G=j(ao);
if(G.colspan>1){ao.colSpan=G.colspan-1
}else{if(ao.parentNode){ao.parentNode.removeChild(ao)
}}u=ao
}}o.cellindex--;
if(o.cellindex<0){o.cellindex=0
}U.selection.selectNode(c(ac,0,o.cellindex),true,true);
break;
case"mceTableSplitCells":if(!V||!ao){return true
}var l=j(ao);
var C=l.colspan;
var H=l.rowspan;
if(C>1||H>1){ao.colSpan=1;
for(var ak=1;
ak<C;
ak++){var J=k.createElement("td");
J.innerHTML="&nbsp;";
V.insertBefore(J,ae(ao,"TD,TH"));
if(H>1){p(J,V,H)
}}p(ao,V,H)
}E=tinyMCE.getParentElement(U.getFocusElement(),"table");
break;
case"mceTableMergeCells":var am=new Array();
var Q=U.getSel();
var ac=d(E);
if(tinyMCE.isMSIE||Q.rangeCount==1){if(Y){var g=new Array();
var t=j(ao);
g.file="../../plugins/table/merge_cells.htm";
g.width=250;
g.height=105+(tinyMCE.isNS7?25:0);
g.width+=tinyMCE.getLang("lang_table_merge_cells_delta_width",0);
g.height+=tinyMCE.getLang("lang_table_merge_cells_delta_height",0);
tinyMCE.openWindow(g,{editor_id:U.editorId,inline:"yes",action:"update",numcols:t.colspan,numrows:t.rowspan});
return true
}else{var T=parseInt(ad.numrows);
var b=parseInt(ad.numcols);
var o=aj(ac,ao);
if((""+T)=="NaN"){T=1
}if((""+b)=="NaN"){b=1
}var a=E.rows;
for(var Z=o.rowindex;
Z<ac.length;
Z++){var af=new Array();
for(var ab=o.cellindex;
ab<ac[Z].length;
ab++){var e=c(ac,Z,ab);
if(e&&!an(am,e)&&!an(af,e)){var M=aj(ac,e);
if(M.cellindex<o.cellindex+b&&M.rowindex<o.rowindex+T){af[af.length]=e
}}}if(af.length>0){am[am.length]=af
}}}}else{var D=new Array();
var Q=U.getSel();
var X=null;
var al=null;
var A=-1,at=-1,z,aq;
if(Q.rangeCount<2){return true
}for(var ak=0;
ak<Q.rangeCount;
ak++){var ah=Q.getRangeAt(ak);
var ao=ah.startContainer.childNodes[ah.startOffset];
if(!ao){break
}if(ao.nodeName=="TD"){D[D.length]=ao
}}var a=E.rows;
for(var Z=0;
Z<a.length;
Z++){var af=new Array();
for(var ab=0;
ab<a[Z].cells.length;
ab++){var e=a[Z].cells[ab];
for(var ak=0;
ak<D.length;
ak++){if(e==D[ak]){af[af.length]=e
}}}if(af.length>0){am[am.length]=af
}}var al=new Array();
var X=null;
for(var Z=0;
Z<ac.length;
Z++){for(var ab=0;
ab<ac[Z].length;
ab++){ac[Z][ab]._selected=false;
for(var ak=0;
ak<D.length;
ak++){if(ac[Z][ab]==D[ak]){if(A==-1){A=ab;
at=Z
}z=ab;
aq=Z;
ac[Z][ab]._selected=true
}}}}for(var Z=at;
Z<=aq;
Z++){for(var ab=A;
ab<=z;
ab++){if(!ac[Z][ab]._selected){alert("Invalid selection for merge.");
return true
}}}}var s=1,q=1;
var S=-1;
for(var Z=0;
Z<am.length;
Z++){var I=0;
for(var ab=0;
ab<am[Z].length;
ab++){var G=j(am[Z][ab]);
I+=G.colspan;
if(S!=-1&&G.rowspan!=S){alert("Invalid selection for merge.");
return true
}S=G.rowspan
}if(I>q){q=I
}S=-1
}var P=-1;
for(var ab=0;
ab<am[0].length;
ab++){var L=0;
for(var Z=0;
Z<am.length;
Z++){var G=j(am[Z][ab]);
L+=G.rowspan;
if(P!=-1&&G.colspan!=P){alert("Invalid selection for merge.");
return true
}P=G.colspan
}if(L>s){s=L
}P=-1
}ao=am[0][0];
ao.rowSpan=s;
ao.colSpan=q;
for(var Z=0;
Z<am.length;
Z++){for(var ab=0;
ab<am[Z].length;
ab++){var O=am[Z][ab].innerHTML;
var K=tinyMCE.regexpReplace(O,"[ \t\r\n]","");
if(K!="<br/>"&&K!="<br>"&&K!="&nbsp;"&&(ab+Z>0)){ao.innerHTML+=O
}if(am[Z][ab]!=ao&&!am[Z][ab]._deleted){var o=aj(ac,am[Z][ab]);
var ap=am[Z][ab].parentNode;
ap.removeChild(am[Z][ab]);
am[Z][ab]._deleted=true;
if(!ap.hasChildNodes()){ap.parentNode.removeChild(ap);
var aa=null;
for(var ab=0;
cellElm=c(ac,o.rowindex,ab);
ab++){if(cellElm!=aa&&cellElm.rowSpan>1){cellElm.rowSpan--
}aa=cellElm
}if(ao.rowSpan>1){ao.rowSpan--
}}}}}break
}E=tinyMCE.getParentElement(U.getFocusElement(),"table");
tinyMCE.handleVisualAid(E,true,tinyMCE.settings.visual,tinyMCE.selectedInstance);
tinyMCE.triggerNodeChange();
U.repaint()
}return true
}return false
}};
tinyMCE.addPlugin("table",TinyMCE_TablePlugin);