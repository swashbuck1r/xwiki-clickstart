WikiEditor.prototype.initCorePlugin=function(){this.addExternalProcessor((/\{code(.*?)\}([\s\S]+?)\{code\}/i),"convertCodeMacroExternal");
this.addInternalProcessor(/<div\s*([^>]*)(class=\"code\")\s*([^>]*)>\s*<pre>([\s\S]+?)<\/pre>\s*<\/div>/i,"convertCodeMacroInternal");
this.addExternalProcessor((/^\s*(1(\.1)*)\s+([^\r\n]*)$/im),"convertHeadingExternal");
this.addInternalProcessor((/<h([1-7])\s*[^>]*?>\s*<span>([\s\S]+?)<\/span><\/h[1-7]>/i),"convertHeadingInternal");
this.addInternalProcessor((/<p[^>]*>&nbsp;?<\/p>/gi),"\\\\\r\n");
this.addExternalProcessor((/\\\\(\r?)(\n?)/gi),"<br />$1$2");
this.addExternalProcessor((/\\\\/gi),"<br />");
this.addExternalProcessor((/----(-*)/i),"convertHRExternal");
this.addInternalProcessor((/<hr(.*?)>/i),"convertHRInternal");
this.addExternalProcessor((/^\s*(\*+)\s+([^\r\n]+)$/im),"convertListExternal");
this.addExternalProcessor((/^\s*(#)\s+([^\r\n]+)$/im),"convertListExternal");
this.addExternalProcessor((/^\s*(1+)\.\s+([^\r\n]+)$/im),"convertListExternal");
this.addExternalProcessor((/^\s*(\-+)\s+([^\r\n]+)$/im),"convertListExternal");
this.addInternalProcessor((/\s*<(ul|ol)\s*([^>]*)>/i),"convertListInternal");
this.addExternalProcessor((/<%([\s\S]+?)%>/ig),"&lt;%$1%&gt;");
this.addExternalProcessor((/((\s|\S)*)/i),"convertParagraphExternal");
this.addInternalProcessor((/<p(.*?)>([\s\S]+?)<\/p>/i),"convertParagraphInternal");
this.addInternalProcessor((/(<br\s*\/>|<br\s*>)(\s*\r*\n*)/gi),"\\\\$2");
this.addExternalProcessor((/\[(.*?)((>|\|)(.*?))?((>|\|)(.*?))?\]/i),"convertLinkExternal");
this.addInternalProcessor((/<a\s*([^>]*)>(.*?)<\/a>/i),"convertLinkInternal");
this.addExternalProcessor((/\{table\}([\s\S]+?)\{table\}/i),"convertTableExternal");
this.addInternalProcessor((/<table\s*([^>]*)class=\"wiki-table\"\s*([^>]*)>([\s\S]+?)<\/table>/i),"convertTableInternal");
this.addExternalProcessor((/\*(\s*)(.+?)(\s*)\*/gi),'$1<strong class="bold">$2</strong>$3');
this.addInternalProcessor((/<strong[^>]*>(\s*)(.*?)(\s*)<\/strong>/i),"convertBoldTextInternal");
this.addInternalProcessor((/<b[^>]*>(\s*)(.*?)(\s*)<\/b>/i),"convertBoldTextInternal");
this.addExternalProcessor((/~~(\s*)(.+?)(\s*)~~/gi),'$1<em class="italic">$2</em>$3');
this.addInternalProcessor((/<em[^>]*>(\s*)(.*?)(\s*)<\/em>/i),"convertItalicTextInternal");
this.addInternalProcessor((/<i[^>]*>(\s*)(.*?)(\s*)<\/i>/i),"convertItalicTextInternal");
this.addExternalProcessor((/__(\s*)(.+?)(\s*)__/gi),"$1<u>$2</u>$3");
this.addInternalProcessor((/<u[^>]*>(\s*)(.*?)(\s*)<\/u>/i),"convertUnderLineTextInternal");
this.addExternalProcessor((/--(\s*)(.+?(\s*))--/gi),'$1<strike class="strike">$2</strike>$3');
this.addInternalProcessor((/<strike[^>]*>(\s*)(.*?)(\s*)<\/strike>/i),"convertStrikeTextInternal");
this.addInternalProcessor((/[#$][a-zA-Z0-9-_.]+\(([^&)]*&quot;[^)]*)+?\)/i),"convertVelocityScriptsInternal");
this.addInternalProcessor((/&lt;%([\s\S]+?)%&gt;/i),"convertGroovyScriptsInternal");
this.addExternalProcessorBefore("convertParagraphExternal",(/##([^\r\n]*)$|(#\*([\s\S]+?)\*#)/im),"convertVelocityCommentExternal");
this.addInternalProcessorBefore("convertStyleInternal",(/<div\s*([^>]*)class=\"vcomment\"\s*([^>]*)>([\s\S]+?)(\r?\n?)<\/div>/i),"convertVelocityCommentInternal");
this.addExternalProcessorBefore("convertLinkExternal",(/\r?\n?\{style:\s*(.*?)\}\r?\n?([\s\S]+?)\r?\n?\{style\}/i),"convertStyleExternal");
this.addInternalProcessorBefore("convertTableInternal",(/<(font|span|div)\s*(.*?)>\r?\n?([\s\S]+?)\r?\n?\<\/(font|span|div)>/i),"convertStyleInternal");
this.setHtmlTagRemover("removeHtmlTags_Groovy");
this.setHtmlTagRemover("removeSpecialHtmlTags");
this.addToolbarHandler("handleTextButtons");
this.addToolbarHandler("handleListButtons");
this.addToolbarHandler("handleIndentButtons");
this.addToolbarHandler("handleUndoButtons");
this.addToolbarHandler("handleTitlesList");
this.addToolbarHandler("handleStylesList");
this.addToolbarHandler("handleLinkButtons");
this.addToolbarHandler("handleHorizontalRuleButtons");
this.addToolbarHandler("handleSupAndSubButons");
this.addToolbarHandler("handleTableButtons");
this.addToolbarHandler("handleAlignButtons");
this.addCommand("Title","titleCommand");
this.addFixCommand("Title","fixTitle");
this.addFixCommand("InsertUnorderedList","fixInsertUnorderedList");
this.addFixCommand("Indent","fixInsertUnorderedList")
};
wikiEditor.initCorePlugin();
WikiEditor.prototype.removeHtmlTags_Groovy=function(b){var a=/<[^%][^>]*>/i;
return b.replace(a,"")
};
WikiEditor.prototype.removeSpecialHtmlTags=function(a){a=a.replace(/<span class="(wikilink|wikiexternallink)">\s*([\s\S]+?)<\/span>/g,"$2");
a=a.replace(/<span class="(bold|italic|underline|strike)">([\s\S]+?)<\/span>/g,"$2");
return a
};
WikiEditor.prototype.convertVelocityScriptsInternal=function(d,a,c){var b=/&quot;/gi;
return c.replace(d,a[0].replace(b,'"'))
};
WikiEditor.prototype.convertGroovyScriptsInternal=function(d,a,c){var b=/&quot;/gi;
var e="<%"+a[1].replace(b,'"')+"%>";
return c.replace(d,e)
};
WikiEditor.prototype.convertBoldTextInternal=function(c,a,b){var d=a[1];
if(a[2]!=""){d+="*"+a[2]+"*"
}d+=a[3];
return b.replace(c,d)
};
WikiEditor.prototype.convertItalicTextInternal=function(c,a,b){var d=a[1];
if(a[2]!=""){d+="~~"+a[2]+"~~"
}d+=a[3];
return b.replace(c,d)
};
WikiEditor.prototype.convertUnderLineTextInternal=function(c,a,b){var d=a[1];
if(a[2]!=""){d+="__"+a[2]+"__"
}d+=a[3];
return b.replace(c,d)
};
WikiEditor.prototype.convertStrikeTextInternal=function(c,a,b){var d=a[1];
if(a[2]!=""){d+="--"+a[2]+"--"
}d+=a[3];
return b.replace(c,d)
};
WikiEditor.prototype.utf8decode=function(a){var b="";
var d=0;
var e=c1=c2=0;
while(d<a.length){e=a.charCodeAt(d);
if(e<128){b+=String.fromCharCode(e);
d++
}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);
b+=String.fromCharCode(((e&31)<<6)|(c2&63));
d+=2
}else{c2=a.charCodeAt(d+1);
c3=a.charCodeAt(d+2);
b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));
d+=3
}}}return b
};
WikiEditor.prototype.convertLinkInternal=function(f,j,e){var b;
var h="";
var a;
var d;
var c=">";
if((b=this.trimString(j[2]))!=""){var g=this.readAttributes(j[1]);
if(g&&g.id){c="|"
}if(g&&g.href){a=this.trimString(g.href);
if(g.title&&g.title!=""){a=this.trimString(g.title)
}a=unescape(a);
a=this.utf8decode(a);
if((a.toLowerCase()==b.toLowerCase())&&(!g.target||(g.target=="_self"))){h="["+b+"]"
}else{if(g.target&&g.target!="_self"){d=this.trimString(g.target);
h="["+b+c+a+c+d+"]"
}else{h="["+b+c+a+"]"
}}}}else{h=j[2]
}return e.replace(f,h)
};
WikiEditor.prototype.convertTableInternal=function(d,m,c){var k=this.trimRNString(m[3]);
var e="";
if(tinyMCE.isMSIE){e+="\r\n"
}e+="{table}";
var l=k.split("</tr>");
for(var b=0;
b<(l.length-1);
b++){var g="";
if(b==0){g=l[0].replace(/(.*?)<tr(.*?)>/g,"")
}else{g=l[b].replace(/<tr(.*?)>/g,"")
}var f=g.split("</td>");
for(var a=0;
a<(f.length-1);
a++){var h=this.trimRNString(f[a].replace(/<td(.*?)>/g,""));
h=h.replace(/\r/gi,"");
h=h.replace(/\n/gi,"");
if((h.lastIndexOf("\\\\")>=0)&&(h.lastIndexOf("\\\\")==(h.length-2))){h+=" "
}if(h==""){h="&nbsp;"
}if(a==0){e+="\r\n"+h
}else{e+="|"+h
}}}e+="\r\n{table}";
if(tinyMCE.isMSIE){e+="\r\n"
}return c.replace(d,e)
};
WikiEditor.prototype.convertHeadingInternal=function(d,b,c){var e="";
var a;
if((a=this.trimString(b[2]))!=""){var f=b[1];
e="\r\n1";
e+=this.buildString(".1",f-1);
e+=" "+a
}e+="\r\n";
return c.replace(d,e)
};
WikiEditor.prototype.fixTitle=function(h,f){var g="";
if(this._titleChangeValue==0){this.core.execInstanceCommand(h,"mceRemoveNode",false,f)
}else{if(this._titleChangeValue==6){this.core.execInstanceCommand(h,"FormatBlock",false,"<div>");
var e=tinyMCE.selectedInstance.selection.getFocusElement();
e.className="code";
var a=tinyMCE.selectedInstance.selection.getBookmark();
var j=tinyMCE.selectedInstance.getDoc().createElement("<pre>");
var c=e.childNodes;
for(var d=0;
d<c.length;
d++){j.appendChild(c[d].cloneNode(true));
e.removeChild(c[d],true)
}e.appendChild(j);
tinyMCE.selectedInstance.selection.moveToBookmark(a)
}else{if(this._titleChangeValue==7){this.core.execInstanceCommand(h,"FormatBlock",false,"<div>");
var e=tinyMCE.selectedInstance.selection.getFocusElement();
e.className="vcomment"
}else{g="<h"+this._titleChangeValue+">";
this.core.execInstanceCommand(h,"FormatBlock",false,g)
}}}tinyMCE.triggerNodeChange()
};
WikiEditor.prototype._substituteNode=function(d,b){var c=d.parentNode;
if(c){for(var a=0;
d.childNodes[a];
a++){b.appendChild(d.childNodes[a])
}if(d.nodeName.toLowerCase()=="body"){d.appendChild(b)
}else{c.insertBefore(b,d);
c.removeChild(d)
}}};
WikiEditor.prototype.titleCommand=function(d,a,c,e,b){this._titleChangeValue=b;
return this.dummyCommand()
};
WikiEditor.prototype.fixInsertUnorderedList=function(b,a){do{switch(a.nodeName.toLowerCase()){case"ul":a.className=this.LIST_NORMAL_CLASS_NAME;
break
}}while((a=a.parentNode))
};
WikiEditor.prototype._cleanNode=function(b,a){do{switch(a.nodeName.toLowerCase()){case"body":return;
case"p":a.className="";
break;
case"h3":if(a.parentNode&&a.parentNode.nodeName.toLowerCase()=="body"){}break
}}while((a=a.parentNode))
};
WikiEditor.prototype._removeBlankParagraphs=function(a){do{if(a.nodeName.toLowerCase()=="body"){break
}}while((a=a.parentNode));
this.__removeBlankParagraphs(a)
};
WikiEditor.prototype.__removeBlankParagraphs=function(b){if(b.nodeName.toLowerCase()=="p"&&this.trimString(b.innerHTML)==""){b.parentNode.innerHTML+="<br />";
b.parentNode.removeChild(b);
return
}for(var a=0;
b.childNodes[a];
a++){this.__removeBlankParagraphs(b.childNodes[a])
}};
WikiEditor.prototype._fixParagraph=function(a){if(a.className||a.className.toLowerCase()!=this.PARAGRAPH_CLASS_NAME.toLowerCase()){a.className=this.PARAGRAPH_CLASS_NAME
}};
WikiEditor.prototype._cleanBR=function(b){if(b.nodeName.toLowerCase()=="br"){b.parentNode.replaceChild(document.createTextNode("\\\\"),b);
return
}for(var a=0;
b.childNodes[a];
a++){this._cleanBR(b.childNodes[a])
}};
WikiEditor.prototype.encodeNode=function(c){function b(d){d=""+d;
d=d.replace(/^(\s*)1/g,"$1&#49;");
d=d.replace(/\*/g,"&#42;");
d=d.replace(/\~/g,"&#126;");
d=d.replace(/\[/g,"&#91;");
d=d.replace(/\]/g,"&#93;");
d=d.replace(/\_/g,"&#95;");
d=d.replace(/\-/g,"&#45;");
return d
}function a(e){for(var d=0;
e.childNodes[d];
d++){a(e.childNodes[d])
}var f=b(e.nodeValue);
if(f!=e.nodeValue){}e.nodeValue=f
}a(c);
return c
};
WikiEditor.prototype.handleSupAndSubButons=function(f,d,e,c,a,b){tinyMCE.switchClass(f+"_sup","mceButtonNormal");
tinyMCE.switchClass(f+"_sub","mceButtonNormal");
switch(d.nodeName.toLowerCase()){case"sup":tinyMCE.switchClass(f+"_sup","mceButtonSelected");
break;
case"sub":tinyMCE.switchClass(f+"_sub","mceButtonSelected");
break
}};
WikiEditor.prototype.handleHorizontalRuleButtons=function(f,d,e,c,a,b){tinyMCE.switchClass(f+"_hr","mceButtonNormal");
if(d.nodeName=="HR"){tinyMCE.switchClass(f+"_hr","mceButtonSelected")
}};
WikiEditor.prototype.handleLinkButtons=function(g,e,f,d,b,c){tinyMCE.switchClass(g+"_link","mceButtonDisabled",true);
tinyMCE.switchClass(g+"_unlink","mceButtonDisabled",true);
var a=tinyMCE.getParentElement(e,"a","href");
if(a||c){tinyMCE.switchClass(g+"_link",a?"mceButtonSelected":"mceButtonNormal",false)
}if(a){tinyMCE.switchClass(g+"_unlink","mceButtonNormal",false)
}};
WikiEditor.prototype.handleTableButtons=function(f,d,e,c,a,b){tinyMCE.switchClass(f+"_table","mceButtonNormal",false)
};
WikiEditor.prototype.handleAlignButtons=function(j,c,h,d,g,e){tinyMCE.switchClass(j+"_justifyleft","mceButtonNormal");
tinyMCE.switchClass(j+"_justifyright","mceButtonNormal");
tinyMCE.switchClass(j+"_justifycenter","mceButtonNormal");
tinyMCE.switchClass(j+"_justifyfull","mceButtonNormal");
var b=c;
var f=false;
do{if(!b.getAttribute||!b.getAttribute("align")){continue
}switch(b.getAttribute("align").toLowerCase()){case"left":tinyMCE.switchClass(j+"_justifyleft","mceButtonSelected");
f=true;
break;
case"right":tinyMCE.switchClass(j+"_justifyright","mceButtonSelected");
f=true;
break;
case"middle":case"center":tinyMCE.switchClass(j+"_justifycenter","mceButtonSelected");
f=true;
break;
case"justify":tinyMCE.switchClass(j+"_justifyfull","mceButtonSelected");
f=true;
break
}}while(!f&&(b=b.parentNode)!=null);
var a=tinyMCE.getParentElement(c,"div");
if(a&&a.style.textAlign=="center"){tinyMCE.switchClass(j+"_justifycenter","mceButtonSelected")
}};
WikiEditor.prototype.handleTitlesList=function(l,b,k,d,f,e){var g=document.getElementById(l+"_titleSelect");
if(g){var h=this.core.getParentElement(b,"h1,h2,h3,h4,h5,h6,");
if(h){var c=h.className;
var a=(c.split("-").length)-1;
this._selectByValue(g,a)
}else{this._selectByValue(g,0)
}var j=this.core.getParentElement(b,"div");
if(j&&(j.className=="code")){this._selectByValue(g,6)
}if(j&&(j.className=="vcomment")){this._selectByValue(g,7)
}}};
WikiEditor.prototype.handleStylesList=function(k,b,j,c,g,d){var a=document.getElementById(k+"_fontSizeSelect");
if(a){var h=tinyMCE.getParentElement(b);
if(h){var m=tinyMCE.getAttrib(h,"size");
if(m==""){var l=new Array("","8px","10px","12px","14px","18px","24px","36px");
m=""+h.style.fontSize;
for(var f=0;
f<l.length;
f++){if((""+l[f])==m){m=f;
break
}}}if(!this._selectByValue(a,m)){this._selectByValue(a,"")
}}else{this._selectByValue(a,"0")
}}a=document.getElementById(k+"_fontNameSelect");
if(a){var h=tinyMCE.getParentElement(b);
if(h){var e=tinyMCE.getAttrib(h,"face");
if(e==""){e=""+h.style.fontFamily
}if(!this._selectByValue(a,e)){this._selectByValue(a,"")
}}else{this._selectByValue(a,"")
}}};
WikiEditor.prototype.handleIndentButtons=function(j,b,h,c,e,d){tinyMCE.switchClass(j+"_outdent","mceButtonDisabled",true);
tinyMCE.switchClass(j+"_indent","mceButtonNormal");
var a=this.core.getParentElement(b,"blockquote");
var f=this.core.getParentElement(b,"ul");
var g=this.core.getParentElement(b,"ol");
if(a||f||g){tinyMCE.switchClass(j+"_outdent","mceButtonNormal",false)
}};
WikiEditor.prototype.handleUndoButtons=function(f,d,e,c,a,b){if(c!=-1){tinyMCE.switchClass(f+"_undo","mceButtonDisabled",true);
tinyMCE.switchClass(f+"_redo","mceButtonDisabled",true)
}if(e!=-1&&(e<c-1&&c>0)){tinyMCE.switchClass(f+"_redo","mceButtonNormal",false)
}if(e!=-1&&(e>0&&c>0)){tinyMCE.switchClass(f+"_undo","mceButtonNormal",false)
}};
WikiEditor.prototype.handleListButtons=function(f,d,e,c,a,b){tinyMCE.switchClass(f+"_bullist","mceButtonNormal");
tinyMCE.switchClass(f+"_numlist","mceButtonNormal");
do{switch(d.nodeName.toLowerCase()){case"ul":tinyMCE.switchClass(f+"_bullist","mceButtonSelected");
tinyMCE.switchClass(f+"_outdent","mceButtonNormal",false);
tinyMCE.switchClass(f+"_indent","mceButtonNormal",false);
break;
case"ol":tinyMCE.switchClass(f+"_numlist","mceButtonSelected");
break
}}while((d=d.parentNode))
};
WikiEditor.prototype._selectByValue=function(a,c){if(a){for(var b=0;
b<a.options.length;
b++){if(a.options[b].value==c){a.selectedIndex=b;
return true
}}}return false
};
WikiEditor.prototype.handleTextButtons=function(f,d,e,c,a,b){this.core.switchClass(f+"_bold","mceButtonNormal");
this.core.switchClass(f+"_italic","mceButtonNormal");
this.core.switchClass(f+"_underline","mceButtonNormal");
this.core.switchClass(f+"_strikethrough","mceButtonNormal");
do{switch(d.nodeName.toLowerCase()){case"b":case"strong":this.core.switchClass(f+"_bold","mceButtonSelected");
break;
case"i":case"em":this.core.switchClass(f+"_italic","mceButtonSelected");
break;
case"u":this.core.switchClass(f+"_underline","mceButtonSelected");
break;
case"strike":this.core.switchClass(f+"_strikethrough","mceButtonSelected");
break
}}while((d=d.parentNode))
};
WikiEditor.prototype.getUndoToolbar=function(){return this.getUndoControls("undo")+this.getUndoControls("redo")
};
WikiEditor.prototype.getUndoControls=function(a){str="";
switch(a){case"undo":str=this.createButtonHTML("undo","undo.gif","lang_undo_desc","Undo");
break;
case"redo":str=this.createButtonHTML("redo","redo.gif","lang_redo_desc","Redo");
break
}return str
};
WikiEditor.prototype.getSymbolToolbar=function(){return this.getSymbolControls("charmap")
};
WikiEditor.prototype.getSymbolControls=function(a){var b="";
switch(a){case"charmap":b=this.createButtonHTML("charmap","charmap.gif","lang_theme_charmap_desc","mceCharMap");
break
}return b
};
WikiEditor.prototype.getJustifyToolbar=function(){return this.getJustifyControls("justifyleft")+this.getJustifyControls("justifycenter")+this.getJustifyControls("justifyright")+this.getJustifyControls("justifyfull")
};
WikiEditor.prototype.getJustifyControls=function(a){var b="";
switch(a){case"justifyleft":b=this.createButtonHTML("justifyleft","justifyleft.gif","lang_justifyleft_desc","JustifyLeft");
break;
case"justifycenter":b=this.createButtonHTML("justifycenter","justifycenter.gif","lang_justifycenter_desc","JustifyCenter");
break;
case"justifyright":b=this.createButtonHTML("justifyright","justifyright.gif","lang_justifyright_desc","JustifyRight");
break;
case"justifyfull":b=this.createButtonHTML("justifyfull","justifyfull.gif","lang_justifyfull_desc","JustifyFull");
break
}return b
};
WikiEditor.prototype.getToggleButton=function(){return this.createButtonHTML("code","switch.gif","lang_theme_switch_desc","mceToggleEditor")
};
WikiEditor.prototype.getSupAndSubToolbar=function(){return this.getSupAndSubControls("sup")+this.getSupAndSubControls("sub")
};
WikiEditor.prototype.getSupAndSubControls=function(a){var b="";
switch(a){case"sup":b=this.createButtonHTML("sup","sup.gif","lang_theme_sup_desc","superscript");
break;
case"sub":b=this.createButtonHTML("sub","sub.gif","lang_theme_sub_desc","subscript");
break
}return b
};
WikiEditor.prototype.getTabToolbar=function(){return this.getTabControls("outdent")+this.getTabControls("indent")
};
WikiEditor.prototype.getTabControls=function(a){var b="";
switch(a){case"outdent":b=this.createButtonHTML("outdent","outdent.gif","lang_outdent_desc","Outdent");
break;
case"indent":b=this.createButtonHTML("indent","indent.gif","lang_indent_desc","Indent");
break
}return b
};
WikiEditor.prototype.getLinkToolbar=function(){return this.getLinkControls("link")+this.getLinkControls("unlink")
};
WikiEditor.prototype.getLinkControls=function(a){var b="";
switch(a){case"link":b=this.createButtonHTML("link","link.gif","lang_link_desc","mceLink",true);
break;
case"unlink":b=this.createButtonHTML("unlink","unlink.gif","lang_unlink_desc","unlink");
break
}return b
};
WikiEditor.prototype.getHorizontalruleControls=function(){var a=this.createButtonHTML("hr","hr.gif","lang_theme_hr_desc","inserthorizontalrule");
return a
};
WikiEditor.prototype.getRemoveformatControls=function(){var a=this.createButtonHTML("removeformat","removeformat.gif","lang_theme_removeformat_desc","removeformat");
return a
};
WikiEditor.prototype.getTableToolbar=function(){return this.getTableControls("table")
};
WikiEditor.prototype.getTableControls=function(a){var b="";
switch(a){case"table":b=this.createButtonHTML("table","table.gif","lang_table_desc","mceInsertTable",true);
break
}return b
};
WikiEditor.prototype.getTableRowToolbar=function(){return this.getTableRowControls("row_before")+this.getTableRowControls("row_after")+this.getTableRowControls("delete_row")
};
WikiEditor.prototype.getTableRowControls=function(a){var b="";
switch(a){case"row_before":b=this.createButtonHTML("row_before","table_insert_row_before.gif","lang_table_row_before_desc","mceTableInsertRowBefore");
break;
case"row_after":b=this.createButtonHTML("row_after","table_insert_row_after.gif","lang_table_row_after_desc","mceTableInsertRowAfter");
break;
case"delete_row":b=this.createButtonHTML("delete_row","table_delete_row.gif","lang_table_delete_row_desc","mceTableDeleteRow");
break
}return b
};
WikiEditor.prototype.getTableColToolbar=function(){return this.getTableColControls("col_before")+this.getTableColControls("col_after")+this.getTableColControls("delete_col")
};
WikiEditor.prototype.getTableColControls=function(a){var b="";
switch(a){case"col_before":b=this.createButtonHTML("col_before","table_insert_col_before.gif","lang_table_col_before_desc","mceTableInsertColBefore");
break;
case"col_after":b=this.createButtonHTML("col_after","table_insert_col_after.gif","lang_table_col_after_desc","mceTableInsertColAfter");
break;
case"delete_col":b=this.createButtonHTML("delete_col","table_delete_col.gif","lang_table_delete_col_desc","mceTableDeleteCol");
break
}return b
};
WikiEditor.prototype.getTitleToolbar=function(){return this.getTitleControl()
};
WikiEditor.prototype.getTitleControl=function(a){return'<select id="{$editor_id}_titleSelect" name="{$editor_id}_titleSelect" class="mceSelectList" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'Title\',false,this.options[this.selectedIndex].value);wikiEditor.executedCommand(\'Title\');"><option value="0">{$lang_wiki_title_menu}</option><option value="1">{$lang_wiki_title_1}</option><option value="2">{$lang_wiki_title_2}</option><option value="3">{$lang_wiki_title_3}</option><option value="4">{$lang_wiki_title_4}</option><option value="5">{$lang_wiki_title_5}</option></select>'
};
WikiEditor.prototype.getStyleToolbar=function(){return this.getStyleControl("fontselect")+" "+this.getStyleControl("fontSizeSelect")+this.getStyleControl("mceForeColor")+this.getStyleControl("mceBackColor")
};
WikiEditor.prototype.getStyleControl=function(a){switch(a){case"mceForeColor":return this.createButtonHTML("forecolor","forecolor.gif","lang_theme_forecolor_desc","mceForeColor",true);
case"fontSizeSelect":return'<select id="{$editor_id}_fontSizeSelect" name="{$editor_id}_fontSizeSelect" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'FontSize\',false,this.options[this.selectedIndex].value);" class="mceSelectList"><option value="0">{$lang_theme_font_size}</option><option value="1">1 (8 pt)</option><option value="2">2 (10 pt)</option><option value="3">3 (12 pt)</option><option value="4">4 (14 pt)</option><option value="5">5 (18 pt)</option><option value="6">6 (24 pt)</option><option value="7">7 (36 pt)</option></select>';
case"fontselect":var c='<select id="{$editor_id}_fontNameSelect" name="{$editor_id}_fontNameSelect" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'FontName\',false,this.options[this.selectedIndex].value);" class="mceSelectList"><option value="">{$lang_theme_fontdefault}</option>';
var b="Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,times new roman,times,serif;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Verdana=verdana,arial,helvetica,sans-serif;Impact=impact;WingDings=wingdings";
var d="Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sand;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats";
var f=tinyMCE.getParam("theme_advanced_fonts",d).split(";");
for(i=0;
i<f.length;
i++){if(f[i]!=""){var e=f[i].split("=");
c+='<option value="'+e[1]+'">'+e[0]+"</option>"
}}c+="</select>";
return c;
case"mceBackColor":return this.createButtonHTML("backcolor","backcolor.gif","lang_theme_backcolor_desc","mceBackColor",true)
}};
WikiEditor.prototype.getListToolbar=function(){return this.getListControls("bullist")+this.getListControls("numlist")
};
WikiEditor.prototype.getListControls=function(a){var b="";
switch(a){case"bullist":b=this.createButtonHTML("bullist","bullist.gif","lang_bullist_desc","InsertUnorderedList");
break;
case"numlist":b=this.createButtonHTML("numlist","numlist.gif","lang_numlist_desc","InsertOrderedList");
break
}return b
};
WikiEditor.prototype.getTextToolbar=function(){return this.getTextControls("bold")+this.getTextControls("italic")+this.getTextControls("underline")+this.getTextControls("strikeout")
};
WikiEditor.prototype.getTextControls=function(a){var b="";
switch(a){case"bold":b=this.createButtonHTML("bold","{$lang_bold_img}","lang_bold_desc","Bold");
break;
case"italic":b=this.createButtonHTML("italic","{$lang_italic_img}","lang_italic_desc","Italic");
break;
case"underline":b=this.createButtonHTML("underline","{$lang_underline_img}","lang_underline_desc","Underline");
break;
case"strikeout":b=this.createButtonHTML("strikethrough","strikethrough.gif","lang_striketrough_desc","Strikethrough");
break
}return b
};
WikiEditor.prototype.convertParagraphInternal=function(c,a,b){var d=this.trimString(a[2]);
if(d.substring(d.length-6)=="<br />"){d=d.substring(0,d.lastIndexOf("<br />"))
}d="\r\n"+d+"\r\n";
return b.replace(c,d)
};
WikiEditor.prototype.PARAGRAPH_CLASS_NAME="paragraph";
WikiEditor.prototype.convertParagraphExternal=function(g,m,f){var k=this._getLines(f);
var h="";
var l="";
var b=false;
var j=false;
var c=false;
if(k==null||k.length==0){return""
}for(var d=0;
d<k.length;
d++){l=k[d];
l=l.replace(/(\r$)|(\n$)|(\r\n$)/gi,"");
var a=this._hasHTML(l);
var e=this._onlyHasBr(l);
if(l!=""&&(!a||e)){if(!b){b=true;
j=true;
h+='<p class="'+this.PARAGRAPH_CLASS_NAME+'" >\r\n'
}h+=l+"\r\n";
j=false;
continue
}else{if(b){b=false;
h+="<br />\r\n</p>\r\n"
}}if(a){h+=l+"\r\n"
}c=e
}if(b){if(c){h+="<br />\r\n"
}h+="</p>\r\n"
}h=h.replace(/<p\s*(.*?)>\s*<\/p>/g,"");
return h
};
WikiEditor.prototype._getLines=function(b){var a;
if(this.core.isMSIE){a="\n"
}else{a="\n"
}return b.split(a)
};
WikiEditor.prototype._hasHTML=function(b){var a=/<[^>]+>/i;
return(a.exec(b)!=null)
};
WikiEditor.prototype._onlyHasBr=function(b){b=b.replace(/<br \/>/g," ");
var a=/<[^>]+>/i;
return(a.exec(b)==null)
};
WikiEditor.prototype.LIST_NORMAL_CLASS_NAME="star";
WikiEditor.prototype.LIST_MINUS_CLASS_NAME="minus";
WikiEditor.prototype.LIST_NUMERIC_CLASS_NAME="";
WikiEditor.prototype.LIST_NUMERIC_CLASS_NAME_1="norder";
WikiEditor.prototype.convertListExternal=function(d,a,c){var b=c.substring(a.index,c.length);
var e="";
switch(a[1].charAt(0)){case"*":e=this._convertRecursiveListExternal(d,b,0,this.LIST_NORMAL_CLASS_NAME);
break;
case"-":e=this._convertRecursiveListExternal(d,b,0,this.LIST_MINUS_CLASS_NAME);
break;
case"#":e=this._convertRecursiveListExternal(d,b,0,this.LIST_NUMERIC_CLASS_NAME);
break;
case"1":e=this._convertRecursiveListExternal(d,b,0,this.LIST_NUMERIC_CLASS_NAME);
break
}return c.substring(0,a.index)+"\r\n"+e
};
WikiEditor.prototype._convertNewLine2BrInList=function(e){var a=this._getLines(e);
var d="";
for(var c=0;
c<a.length;
c++){if((a[c].charAt(0)=="*")||(a[c].charAt(0)=="#")||(a[c].charAt(0)=="1")){d+=a[c];
var b=1;
if(((c+b)<=a.length)){while(((c+b)<a.length)&&((a[c+b].charAt(0)!="*")&&(a[c+b].charAt(0)!="#")&&((a[c+b].charAt(0)!="1")))&&this.trimString(a[c+b])!=""){d+="\r\n"+a[c+b];
b++
}}d+="\r\n";
c=(c+b-1)
}else{d+=a[c]+"\r\n"
}}return d
};
WikiEditor.prototype._convertGenericListExternal=function(e,c,d,f){var g="<"+d+' class="'+f+'">\r\n';
var b;
var a=c;
RegExp.lastIndex=0;
while((b=e.exec(a))&&b.index==0){g+="<li>"+this.trimString(b[2])+"</li>\r\n";
a=a.substring(b[0].length,a.length);
RegExp.lastIndex=0
}g+="</"+d+">\r\n"+a;
return g
};
WikiEditor.prototype._convertRecursiveListExternal=function(j,h,g,d){var k="";
var a=(d==this.LIST_NUMERIC_CLASS_NAME)?"ol":"ul";
RegExp.lastIndex=0;
var b=j.exec(h);
var c=(b!=null&&((b[1].charAt(0)=="*")||(b[1].charAt(0)=="-")||(b[1].charAt(0)=="#")||(b[1].charAt(0)=="1"))&&b.index==0)?b[1].length:0;
var l=(c>0)?b[0].length:0;
var f=h.substring(l,h.length);
var m=c-g;
var n=(m>0)?"<"+a+' class="'+d+'">':"</"+a+">";
for(var e=0;
e<Math.abs(c-g);
e++){k+=n+"\r\n"
}if(c>0){k+="<li>"+this.trimString(b[2])+"</li>\r\n";
k+=this._convertRecursiveListExternal(j,f,c,d)
}else{k+=h
}return k
};
WikiEditor.prototype.LINK_EXTERNAL_CLASS_NAME="wikiexternallink";
WikiEditor.prototype.LINK_INTERNAL_CLASS_NAME="wikilink";
WikiEditor.prototype.convertLinkExternal=function(f,j,e){var h=j[1];
var c=this.trimString(j[3]);
var a=(j[4])?(j[4]):(h);
a=a.replace(/\&/g,"&amp;");
var d=this.trimString(j[7]);
var b;
var g='<a class="'+b+'" href="'+a+'"';
if(this.isExternalLink(a)){b=this.LINK_EXTERNAL_CLASS_NAME;
g+=' title="'+a+'"'
}else{b=this.LINK_INTERNAL_CLASS_NAME
}if(c=="|"){g+=' id="'+a+'"'
}if((d!="undefined")&&(d!="")&&(d!="_self")){g+=' target="'+j[7]+'"'
}g+=">"+h+"</a>";
return e.replace(f,g)
};
WikiEditor.prototype.convertTableExternal=function(g,s,f){var n=this.trimRNString(s[1]);
n=n.replace(/<br \/>\r\n/gi,"<br />");
var a=this._getLines(n);
var h='<table class="wiki-table" cellpadding="0" cellspacing="0" align="center">';
var r=new Array();
var b=0;
for(var e=0;
e<a.length;
e++){a[e]=this.trimRNString(a[e]);
a[e]=a[e].replace(/<\/?p[^>]*>/gi,"");
if(a[e]!=""){r[b]=a[e];
b++
}}var q=new Array();
var o=0;
for(var e=0;
e<r.length;
e++){var p="";
var c=0;
do{p+=r[e+c];
c++
}while((r[e+c]!=null)&&(r[e+c-1].lastIndexOf("\\\\")==(r[e+c-1].length-2))&&(r[e+c-1].lastIndexOf("\\\\")!=-1));
q[o]=p;
o++;
e+=(c-1)
}for(var e=0;
e<q.length;
e++){if(e==0){h+="<tr class='table-head'>"
}else{if((e%2)==1){h+="<tr class='table-odd'>"
}else{h+="<tr class='table-even'>"
}}var m=q[e].split("|");
for(var d=0;
d<m.length;
d++){h+="<td>";
var l=m[d].split("\\\\");
if(l.length==1){h+=l[0]
}else{if(l.length>1){for(var c=0;
c<l.length;
c++){if(l[c]==""){l[c]="&nbsp;"
}h+=(l[c]+"<br />\r\n")
}}}h+="</td>"
}h+="</tr>"
}h+="</table>";
return f.replace(g,h)
};
WikiEditor.prototype.isExternalLink=function(a){var b=/(https?|ftp):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/gi;
return a.search(b)>-1
};
WikiEditor.prototype.convertHeadingExternal=function(c,a,b){var e=a[1].split(".").length;
var d="\r\n<h"+e+"><span>"+this.trimString(a[3])+"</span></h"+e+">";
return b.substring(0,a.index)+d+b.substring(a.index+a[0].length,b.length)
};
WikiEditor.prototype.convertListInternal=function(f,j,e){var a=this.replaceMatchingTag(e,j[1],null);
var d="";
var h="";
var c=this.readAttributes(j[2]);
if(c&&c["class"]){d=c["class"]
}var g="";
if(a&&a.start>-1){g=this._convertListInternal(e.substring(a.start,a.end),d);
h=e.substring(0,a.start)+"\r\n";
var b=e.substring(a.end,e.length);
if(!this.core.isMSIE&&b.substring(0,6)=="<br />"){b="\r\n"+b.substring(6,b.length)
}h+=g+"\r\n"+b;
return h
}return e
};
WikiEditor.prototype._convertListInternal=function(f,b){var e=/<\s*li\s*([^>]*)>\s*(.*?)\s*<\/\s*li\s*>/gi;
var a;
var g="";
while((a=e.exec(f))){var d=this.readAttributes(a[1]);
RegExp.lastIndex=a.index;
var c=a[2];
if(c=="<br />"){c="&nbsp;"
}else{if(this.trimString(c)==""){c="&nbsp;"
}}var h=c.length-6;
if(c.substring(h)=="<br />"){c=c.substring(0,h)
}if(d&&d.wikieditorlisttype&&d.wikieditorlistdepth){switch(d.wikieditorlisttype){case"ul":if((b!=null)&&(b=="minus")){g+=this.buildString("-",parseInt(d.wikieditorlistdepth,10))+" "+c+"\r\n"
}else{g+=this.buildString("*",parseInt(d.wikieditorlistdepth,10))+" "+c+"\r\n"
}g.replace(/<div>([\s\S]+?)<\/div>/g,"$1");
break;
case"ol":g+=this.buildString("1",parseInt(d.wikieditorlistdepth,10))+". "+c+"\r\n";
break
}}else{}}return g
};
WikiEditor.prototype.convertStyleExternal=function(k,p,j){var m="";
var g=p[1].split("|");
var q="font",b="",f="",c="",a="",o="",h="";
var d=false;
for(var e=0;
e<g.length;
e++){var l=this.trimString(g[e].substring(0,g[e].indexOf("=")));
var n=this.trimString(g[e].substring(g[e].indexOf("=")+1,g[e].length));
if(l=="class"){f=n
}else{if(l=="id"){c=n
}else{if(l=="name"){a=n
}else{if(l=="type"){q=n
}else{if(l=="align"){h=n
}else{if(l=="icon"){b+="background-image: url("+n+");";
d=true
}else{b+=l+":"+n+";"
}}}}}}}m+="<"+q;
if(c!=""){m+=' id="'+c+'"'
}if(f!=""){m+=' class="'+f+'"'
}else{if(d){m+=' class="stylemacro"'
}}if(a!=""){m+=' name="'+a+'"'
}if(h!=""){m+=' align="'+h+'"'
}if(b!=""){m+=' style="'+b+'"'
}m+=">";
m+=p[2];
m+="</"+q+">";
return j.replace(k,m)
};
WikiEditor.prototype.convertStyleInternal=function(f,o,e){if(this.trimString(o[3])==""){return e.replace(f,o[3])
}e=e.replace(/<div class="paragraph">([\s\S]+?)<\/div>/g,"$1");
e=e.replace(/<span class="(wikilink|wikiexternallink)">\s*([\s\S]+?)<\/span>/g,"$2");
e=e.replace(/<span class="(bold|italic|underline|strike)">([\s\S]+?)<\/span>/g,"$2");
var k=o[1].toLowerCase();
var h="";
if(k=="span"||k=="div"){var b=this.readAttributes(o[2]);
if(k=="div"){}h+="{style:type="+k;
if(b){if(b.id){h+="|id="+b.id
}if(b.align){h+="|align="+b.align
}if(b["class"]&&b["class"]!="stylemacro"){h+="|class="+b["class"]
}if(b.name){h+="|name="+b.name
}if(b.style){var d=b.style.split(";");
for(var c=0;
c<d.length;
c++){var g=this.trimString(d[c].substring(0,d[c].indexOf(":"))).toLowerCase();
var m=this.trimString(d[c].substring(d[c].indexOf(":")+1,d[c].length));
var l=["font-size","font-family","background-color","color","width","height","float","border"];
for(var a=0;
a<l.length;
a++){if(g==l[a]){h+="|"+g+"="+m;
break
}}if(g=="background-image"){var n;
if(m.indexOf("url")>=0){n=m.substring(m.indexOf("(")+2,m.indexOf(")")-1);
h+="|icon="+n
}}}}}h+="}";
h+=o[3];
h+="{style}";
if(k=="div"){}}return e.replace(f,h)
};
WikiEditor.prototype.VELOCITY_COMMENT_CLASS_NAME="vcomment";
WikiEditor.prototype.convertVelocityCommentExternal=function(c,a,b){var d="";
var e="";
if((a[1]!=null)&&(a[1]!="undefined")&&(a[1]!="")){e=a[1]
}else{if((a[3]!=null)&&(a[3]!="undefined")&&(a[3]!="")){e=a[3]
}}d="<div class='"+this.VELOCITY_COMMENT_CLASS_NAME+"'>"+e+"</div>";
return b.replace(c,d)
};
WikiEditor.prototype.convertVelocityCommentInternal=function(c,a,b){var d="";
var e=a[3];
if(((e.indexOf("<br")>-1)||e.indexOf("\n")>-1)||(e.indexOf("<p")>-1)){d="#*"+e+"*#"
}else{if(this.core.isMSIE){d="\r\n##"+e+"\r\n"
}else{d="##"+e
}}if(a[4]!=null){d+=a[4]
}return b.replace(c,d)
};
WikiEditor.prototype.convertCodeMacroExternal=function(d,a,c){var e="";
var b="";
if(a[1]!=null&&a[1]!=""){b=this.trimString(a[1].substring(a[1].indexOf(":")+1,a[1].length))
}e+="<div";
if(b!=""){e+=' id="'+b+'"'
}e+=' class="code"><pre>';
e+=a[2].toString().replace(/</g,"&#60").replace(/>/g,"&#62");
e+="</pre></div>";
e=this._escapeText(e);
return c.replace(d,e)
};
WikiEditor.prototype.convertCodeMacroInternal=function(e,a,d){var f="";
var c=a[4];
var b=this.readAttributes(a[1]+a[3]);
f+="{code";
if(b&&b.id){f+=":"+this.trimString(b.id.toString())
}f+="}\r\n";
f+=this._escapeText(this.trimString(a[4]).replace(/<br \/>/g,"\r\n"));
f+="\r\n";
f+="{code}";
f="\r\n"+f+"\r\n";
return d.replace(e,f)
};
WikiEditor.prototype.convertHRExternal=function(d,a,c){var e="";
var b=0;
if(a[1]&&a[1]!=""){b=a[1].toString().length
}if(b>0){e='<hr class="line" name="'+b+'"/>'
}else{e='<hr class="line"/>'
}return c.replace(d,e)
};
WikiEditor.prototype.convertHRInternal=function(c,a,b){var d="----";
var e=this.readAttributes(a[1]);
if(e&&e.name){d+=this.buildString("-",e.name)
}if(this.core.isMSIE){d+="\r\n"
}else{if(a[1]==null||a[1]==""||this.trimString(a[1].toString())=="/"){d+="\r\n"
}}return b.replace(c,d)
};