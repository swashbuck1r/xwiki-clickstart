var image_path="";
var image_up="$xwiki.getSkinFile('js/xwiki/table/img/arrow-up.gif')";
var image_down="$xwiki.getSkinFile('js/xwiki/table/img/arrow-down.gif')";
var image_none="$xwiki.getSkinFile('js/xwiki/table/img/arrow-none.gif')";
var TblId,StartRow,SearchFlt,ModFn,ModFnId;
TblId=new Array(),StartRow=new Array();
ModFn=new Array(),ModFnId=new Array();
addEvent(window,"load",init_sortnfilter);
var SORT_COLUMN_INDEX;
function init_sortnfilter(){sortables_init();
filterable_init()
}function sortables_init(){if(!document.getElementsByTagName){return
}var c=document.getElementsByTagName("table");
for(var a=0;
a<c.length;
a++){var b=c[a];
if(((" "+b.className+" ").indexOf("sortable")!=-1)&&(b.id)){ts_makeSortable(b)
}}}function filterable_init(){if(!document.getElementsByTagName){return
}var c=document.getElementsByTagName("table");
for(var a=0;
a<c.length;
++a){var b=c[a];
if(((" "+b.className+" ").indexOf("filterable")!=-1)&&(b.id)){setFilterGrid(b.id,(getHeaderRow(b)))
}}}function ts_resortTable(t){var p,n;
for(var h=0;
h<t.childNodes.length;
++h){if(t.childNodes[h].tagName&&t.childNodes[h].tagName.toLowerCase()=="span"){p=t.childNodes[h]
}}var k=ts_getInnerText(p);
var g=t.parentNode;
var d=g.cellIndex;
var r=getParent(g,"TABLE");
if(r.rows.length<=1){return
}var e=ts_getInnerText(r.rows[getHeaderRow(r)+1].cells[d]);
var m=getHeaderRow(r)+2;
while(!e){e=ts_getInnerText(r.rows[m].cells[d]);
++m
}if(!e){e=""
}var c=ts_sort_caseinsensitive;
if(e.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){c=ts_sort_date
}if(e.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){c=ts_sort_date
}if(e.match(/^[�$�?��]/)){c=ts_sort_currency
}if(e.match(/^[\d\.]+$/)){c=ts_sort_numeric
}SORT_COLUMN_INDEX=d;
var b=new Array();
var s=new Array();
var l=new Array();
var f=null!=getSortBottomRow(r)?(getSortBottomRow(r)+1):r.rows.length;
for(var o=f;
o<r.rows.length;
++o){l[l.length]=r.rows[o]
}for(var o=getHeaderRow(r)+1;
o<r.rows.length;
++o){s[s.length]=r.rows[o]
}s.sort(c);
if(p.getAttribute("sortdir")=="down"){n='<img border="0" src="'+image_path+image_up+'" alt="&#x2191;"/>';
s.reverse();
p.setAttribute("sortdir","up")
}else{n='<img border="0" src="'+image_path+image_down+'" alt="&#x2193;"/>';
p.setAttribute("sortdir","down")
}for(var q=0;
q<s.length;
++q){if(!s[q].className||(s[q].className&&(s[q].className.indexOf("sortBottom")==-1))){r.tBodies[0].appendChild(s[q])
}}for(var q=0;
q<s.length;
q++){if(s[q].className&&(s[q].className.indexOf("sortBottom")!=-1)){r.tBodies[0].appendChild(s[q])
}}for(var q=0;
q<l.length;
++q){r.tBodies[0].appendChild(l[q])
}var a=document.getElementsByTagName("span");
for(var h=0;
h<a.length;
++h){if(a[h].className=="sortarrow"){if(getParent(a[h],"table")==getParent(t,"table")){a[h].innerHTML='<img border="0" src="'+image_path+image_none+'" alt="&#x21F5;"/>'
}}}p.innerHTML=n;
alternate(r)
}function Filter(m){getFilters(m);
var h=document.getElementById(m);
var r=new Array();
var p=getCellsNb(m);
var o=1;
for(var v=0;
v<SearchFlt.length;
++v){r.push((document.getElementById(SearchFlt[v]).value).toLowerCase())
}var f=getStartRow(m);
var d=h.getElementsByTagName("tr");
var c=null!=getSortBottomRow(h)?getSortBottomRow(h):h.rows.length;
for(var q=f;
q<d.length;
++q){var a=true;
if(d[q].style.display=="none"){d[q].style.display=""
}var b=getChildElms(d[q]).childNodes;
var n=b.length;
if(n==p){var x=new Array();
var l=new Array();
for(var s=0;
s<n;
s++){var e=getCellText(b[s]).toLowerCase();
x.push(e);
if(r[s]!=""){var w=parseFloat(e);
if(/<=/.test(r[s])&&!isNaN(w)){w<=parseFloat(r[s].replace(/<=/,""))?l[s]=3:l[s]=1
}else{if(/>=/.test(r[s])&&!isNaN(w)){w>=parseFloat(r[s].replace(/>=/,""))?l[s]=3:l[s]=1
}else{if(/</.test(r[s])&&!isNaN(w)){w<parseFloat(r[s].replace(/</,""))?l[s]=3:l[s]=1
}else{if(/>/.test(r[s])&&!isNaN(w)){w>parseFloat(r[s].replace(/>/,""))?l[s]=3:l[s]=1
}else{l[s]=e.split(r[s]).length
}}}}}}for(var g=0;
g<p;
g++){if(r[g]!=""&&l[g]<2){a=false
}}}if(a==false&&q<c){d[q].style.display="none"
}else{d[q].style.display=""
}}alternate(h)
}function getHeaderRow(b){for(var a=0;
a<b.rows.length-1;
++a){if(b.rows[a].className.indexOf("sortHeader")>-1){return a
}}return 0
}function getSortBottomRow(b){for(var a=0;
a<b.rows.length;
++a){if(b.rows[a].className.indexOf("sortBottom")>-1){return a
}}return null
}function ts_getInnerText(d){if(typeof d=="string"){return d
}if(typeof d=="undefined"){return""
}if(typeof d=="object"&&d.tagName.toLowerCase()=="img"){return d.alt
}if(d.innerText){return d.innerText
}var e="";
var c=d.childNodes;
var a=c.length;
for(var b=0;
b<a;
b++){switch(c[b].nodeType){case 1:e+=ts_getInnerText(c[b]);
break;
case 3:e+=c[b].nodeValue;
break
}}return e
}function ts_makeSortable(d){var e;
if(d.rows&&d.rows.length>0){e=d.rows[getHeaderRow(d)]
}if(!e){return
}for(var c=0;
c<e.cells.length;
++c){var b=e.cells[c];
var a=ts_getInnerText(b);
if(b.className!="unsortable"&&b.className.indexOf("unsortable")==-1){b.innerHTML='<a href="#" class="sortHeader" onclick="ts_resortTable(this);return false;">'+a+'<span class="sortarrow"><img border="0" src="'+image_path+image_none+'" alt="&#x21F5;"/></span></a>'
}}alternate(d)
}function alternate(f){if(f.className.indexOf("doOddEven")>-1){var g=1;
var a=null!=getSortBottomRow(f)?getSortBottomRow(f):f.rows.length;
var d=f.getElementsByTagName("tbody");
for(var c=0;
c<d.length;
c++){var e=d[c].getElementsByTagName("tr");
for(var b=getHeaderRow(f)+1;
b<a;
++b){if(e[b].style.display==""){g++;
swapOddEven(e[b],g)
}}}}}function getParent(b,a){if(b==null){return null
}else{if(b.nodeType==1&&b.tagName.toLowerCase()==a.toLowerCase()){return b
}else{return getParent(b.parentNode,a)
}}}function addEvent(e,d,b,a){if(e.addEventListener){e.addEventListener(d,b,a);
return true
}else{if(e.attachEvent){var c=e.attachEvent("on"+d,b);
return c
}else{alert("Handler could not be removed")
}}}function replace(d,c,a){var b=d.indexOf(c);
var e="";
if(b==-1){return d
}e+=d.substring(0,b)+a;
if(b+c.length<d.length){e+=replace(d.substring(b+c.length,d.length),c,a)
}return e
}function setFilterGrid(g){var e=document.getElementById(g);
var f,d;
if(e!=null&&e.nodeName.toLowerCase()=="table"){TblId.push(g);
if(arguments.length>1){for(var b=0;
b<arguments.length;
b++){var a=typeof arguments[b];
switch(a.toLowerCase()){case"number":f=arguments[b];
break;
case"object":d=arguments[b];
break
}}}f==undefined?StartRow.push(2):StartRow.push(f+2);
var c=getCellsNb(g,f);
AddRow(g,c,d)
}}function AddRow(c,h,l){var s=document.getElementById(c);
var p=s.insertRow(0);
var a=s.rows[getHeaderRow(s)];
var m,u,g,o,r;
l!=undefined&&l.btn==false?u=false:u=true;
l!=undefined&&l.btn_text!=undefined?g=l.btn_text:g="Filter";
l!=undefined&&l.enter_key==false?o=false:o=true;
l!=undefined&&l.mod_filter_fn?r=true:r=false;
if(r){ModFnId.push(c);
ModFn.push(l.mod_filter_fn)
}for(var k=0;
k<h;
++k){var e=p.insertCell(k);
var j=a.cells[k];
k==h-1&&u==true?m="flt_s":m="flt";
if((l==undefined||l["col_"+k]==undefined||l["col_"+k]=="none")&&j.className.indexOf("selectFilter")==-1){var q=document.createElement("input");
q.setAttribute("id","flt"+k+"_"+c);
q.setAttribute("size","5");
if(j.className.indexOf("noFilter")==-1){q.setAttribute("type","text")
}else{q.setAttribute("type","hidden")
}q.className=m;
e.appendChild(q);
if(o){q.onkeypress=DetectKey
}}else{if(j.className.indexOf("selectFilter")!=-1){var b=document.createElement("select");
b.setAttribute("id","flt"+k+"_"+c);
b.className=m;
e.appendChild(b);
PopulateOptions(c,k,h);
if(o){b.onkeypress=DetectKey
}}}if(k==h-1&&u==true){var d=document.createElement("input");
d.setAttribute("id","btn"+k+"_"+c);
d.setAttribute("type","button");
d.setAttribute("value",g);
d.className="btnflt";
e.appendChild(d);
(!r)?d.onclick=function(){Filter(c)
}:d.onclick=l.mod_filter_fn
}}}function PopulateOptions(b,l,i){var o=document.getElementById(b);
var m=getStartRow(b);
var p=o.getElementsByTagName("tr");
var f=new Array();
var h=0;
for(var d=m;
d<p.length;
++d){var n=getChildElms(p[d]).childNodes;
var c=n.length;
if(c==i){for(var e=0;
e<c;
++e){if(l==e){var g=getCellText(n[e]);
if(f.toString().toUpperCase().search(g.toUpperCase())==-1){h++;
f.push(g);
var a=new Option(g,g,false,false);
document.getElementById("flt"+l+"_"+b).options[h]=a
}}}}}}function getCellsNb(e,c){var a=document.getElementById(e);
var b;
if(c==undefined){b=a.getElementsByTagName("tr")[0]
}else{b=a.getElementsByTagName("tr")[c]
}var d=getChildElms(b);
return d.childNodes.length
}function getFilters(e){SearchFlt=new Array();
var b=document.getElementById(e);
var c=b.getElementsByTagName("tr")[0];
var d=c.childNodes;
for(var a=0;
a<d.length;
++a){SearchFlt.push(d[a].firstChild.getAttribute("id"))
}}function getStartRow(c){var b;
for(var a in TblId){if(TblId[a]==c){b=StartRow[a]
}}return b
}function getChildElms(d){if(d.nodeType==1){var c=d.childNodes;
for(var a=0;
a<c.length;
++a){var b=c[a];
if(b.nodeType==3){d.removeChild(b)
}}return d
}}function getCellText(e){var b="";
var d=e.childNodes;
for(var a=0;
a<d.length;
++a){var c=d[a];
if(c.nodeType==3){b+=c.data
}else{b+=getCellText(c)
}}return b
}function DetectKey(h){var a=(h)?h:(window.event)?window.event:null;
if(a){var d=(a.charCode)?a.charCode:((a.keyCode)?a.keyCode:((a.which)?a.which:0));
if(d=="13"){var j,f,b,g;
j=this.getAttribute("id");
f=this.getAttribute("id").split("_")[0];
b=j.substring(f.length+1,j.length);
for(var c in ModFn){ModFnId[c]==b?g=true:g=false
}(g)?ModFn[c].call():Filter(b)
}}}function swapOddEven(b,a){if((a%2)==0){if((b.className.indexOf("odd")>-1)){b.className=replace(b.className,"odd","even")
}else{b.className=b.className.indexOf("even")>-1?b.className:b.className+" even"
}}else{if((b.className.indexOf("even")>-1)){b.className=replace(b.className,"even","odd")
}b.className=b.className.indexOf("odd")>-1?b.className:b.className+" odd"
}}function ts_sort_date(e,c){var h=ts_getInnerText(e.cells[SORT_COLUMN_INDEX]);
var i=ts_getInnerText(c.cells[SORT_COLUMN_INDEX]);
var f,g,d;
if(h.length==10){f=h.substr(6,4)+h.substr(3,2)+h.substr(0,2)
}else{g=h.substr(6,2);
if(parseInt(g)<50){g="20"+g
}else{g="19"+g
}f=g+h.substr(3,2)+h.substr(0,2)
}if(i.length==10){d=i.substr(6,4)+i.substr(3,2)+i.substr(0,2)
}else{g=i.substr(6,2);
if(parseInt(g)<50){g="20"+g
}else{g="19"+g
}d=g+i.substr(3,2)+i.substr(0,2)
}if(f==d){return 0
}if(f<d){return -1
}return 1
}function ts_sort_currency(d,c){var e=ts_getInnerText(d.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,"");
var f=ts_getInnerText(c.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,"");
return isNaN(parseFloat(e)-parseFloat(f))?-1:parseFloat(e)-parseFloat(f)
}function ts_sort_numeric(d,c){var e=parseFloat(ts_getInnerText(d.cells[SORT_COLUMN_INDEX]));
var f=parseFloat(ts_getInnerText(c.cells[SORT_COLUMN_INDEX]));
if(isNaN(e)){e=0
}if(isNaN(f)){f=0
}return e-f
}function ts_sort_caseinsensitive(d,c){var e=ts_getInnerText(d.cells[SORT_COLUMN_INDEX]).toLowerCase();
var f=ts_getInnerText(c.cells[SORT_COLUMN_INDEX]).toLowerCase();
if(e==f){return 0
}if(e<f){return -1
}return 1
}function ts_sort_default(d,c){var e=ts_getInnerText(d.cells[SORT_COLUMN_INDEX]);
var f=ts_getInnerText(c.cells[SORT_COLUMN_INDEX]);
if(e==f){return 0
}if(e<f){return -1
}return 1
};