if(typeof XWiki=="undefined"){alert("ERROR: xwikiexplorer.js depends on xwiki.js")
}XWiki.constants.rest={baseRestURI:XWiki.contextPath+"/rest/",restChildrenRel:"http://www.xwiki.org/rel/children",restParentRel:"http://www.xwiki.org/rel/parent",restAttachmentsRel:"http://www.xwiki.org/rel/attachments",restHomeRel:"http://www.xwiki.org/rel/home"};
isc.ClassFactory.defineClass("XWEResultTree",isc.ResultTree);
isc.XWEResultTree.addClassProperties({constants:{addNodeSuffix:"..new",pageHint:"$msg.get('xwikiexplorer.page.hint')",attachmentsTitle:"$msg.get('xwikiexplorer.attachments.title')",attachmentsHint:"$msg.get('xwikiexplorer.attachments.hint')",attachmentHint:"$msg.get('xwikiexplorer.attachment.hint')",addPageTitle:"$msg.get('xwikiexplorer.addpage.title')",addPageHint:"$msg.get('xwikiexplorer.addpage.hint')",addAttachmentTitle:"$msg.get('xwikiexplorer.addattachment.title')",addAttachmentHint:"$msg.get('xwikiexplorer.addattachment.hint')"}});
isc.XWEResultTree.addClassMethods({formatPath:function(){return Array.prototype.slice.call(arguments,0).join(" \u00BB ")
},formatTitle:function(c,b,a){c=(c||"").escapeHTML();
b=(b||"").escapeHTML();
if(a){return'<a href="'+a+'" title="'+b+'">'+c+"</a>"
}else{return'<span title="'+b+'">'+c+"</span>"
}}});
isc.XWEResultTree.addProperties({multiDSTree:true,callbacks:{dataArrived:new Array()},parentMap:{},displayLinks:true,displayAddPage:false,displayAddPageOnTop:true,displayAttachments:true,displayAttachmentsOnTop:false,displayAttachmentsWhenEmpty:false,displayAddAttachment:false,displayAddAttachmentOnTop:true});
isc.XWEResultTree.addMethods({getChildDataSource:function(e,d){var c=e[this.childTypeProperty];
if(c!=null){return isc.DS.get(c)
}var d=d||this.getNodeDataSource(e);
if(d==null||!this.isMultiDSTree()){return this.getRootDataSource()
}var b=this.treeRelations,a=d.getChildDataSources();
if(d.Class=="XWEDataSource"){c=isc.XWEWikiDataSource.getOrCreate(e.name).getID()
}else{if(d.Class=="XWEWikiDataSource"){c=isc.XWESpaceDataSource.getOrCreate(e.wiki,e.name).getID()
}else{if(d.Class=="XWESpaceDataSource"){if(e.isXWikiAttachment){c=isc.XWEAttachmentsDataSource.getOrCreate(e.wiki,e.space,e.name).getID()
}else{c=isc.XWESpaceDataSource.getOrCreate(e.wiki,e.space).getID()
}}else{if(b){c=b[d.ID]
}}}}if(c!=null){return isc.DS.get(c)
}if(a!=null){return a[0]
}},dataArrived:function(g){var l=this.getNodeDataSource(g)||this.getDataSource();
var e="";
var b=this.getChildren(g);
for(var f=0;
f<b.length;
f++){var a=this.getNodeDataSource(b[f]);
var j=b[f].title||b[f].name;
var d=a.getHint(b[f],g);
var h=true;
if(this.displayLinks==true&&b[f].xwikiRelativeUrl!=null){j=isc.XWEResultTree.formatTitle(j,d,b[f].xwikiRelativeUrl)
}else{j=isc.XWEResultTree.formatTitle(j,d)
}var c=a.getReference(b[f],this.getEntityReference(g));
isc.addProperties(b[f],{icon:a.icon,reference:c,resource:XWiki.resource.fromEntityReference(c),plainTitle:b[f].title,title:j,isNewPage:false,isNewAttachment:false});
if(f==0){e=a.Class
}}if(e=="XWESpaceDataSource"&&l.Class=="XWEWikiDataSource"&&this.displayAddPage==true){this.addAddPageNode(g)
}if(l.Class=="XWESpaceDataSource"&&this.displayAttachments==true&&!g.isXWikiAttachment){this.addAttachmentsNode(g)
}if(g.isXWikiAttachment&&this.displayAddAttachment==true){this.addAddAttachmentsNode(g)
}if(this.callbacks.dataArrived.length>0){var k=this.callbacks.dataArrived.shift();
k.callback()
}},isFolder:function(d){var c=this.getNodeDataSource(d);
if(c!=null){if(c.Class=="XWEDataSource"){return true
}else{if(c.Class=="XWEWikiDataSource"){return true
}else{if(c.Class=="XWESpaceDataSource"){if(d.isXWikiAttachment==true){return true
}var a=(d.link!=null)?d.link:new Array();
for(var b=0;
b<a.length;
b++){if(a[b].rel==XWiki.constants.rest.restChildrenRel||a[b].rel==XWiki.constants.rest.restAttachmentsRel||this.displayAttachmentsWhenEmpty||this.displayAddAttachment){return true
}}return false
}else{if(c.Class=="XWEAttachmentsDataSource"){return false
}}}}}return true
},getChildNodeByName:function(d,a){var c=this.getChildren(d);
if(c!=null){for(var b=0;
b<c.length;
b++){if(c[b].name==a){return c[b]
}}}return null
},addAddPageNode:function(c){var d=isc.XWEResultTree.constants.addPageHint+" "+isc.XWEResultTree.formatPath(c.wiki,c.name);
var b={id:c.id+isc.XWEResultTree.constants.addNodeSuffix,wiki:c.wiki,name:c.name,title:isc.XWEResultTree.formatTitle(isc.XWEResultTree.constants.addPageTitle,d),parentId:c.id,icon:"$xwiki.getSkinFile('icons/silk/bullet_add.png')",resource:c.resource,isNewPage:true,isNewAttachment:false,clickCallback:function(g,e,f){g.input.value=""
}};
var a;
if(this.displayAddPageOnTop==true){a=0
}else{a=null
}this.add(b,c,a)
},addAddAttachmentsNode:function(c){var d=isc.XWEResultTree.constants.addAttachmentHint+" "+isc.XWEResultTree.formatPath(c.wiki,c.space,c.name);
var b={id:c.id+isc.XWEResultTree.constants.addNodeSuffix,wiki:c.wiki,space:c.space,name:c.name,title:isc.XWEResultTree.formatTitle(isc.XWEResultTree.constants.addAttachmentTitle,d),parentId:c.id,icon:"$xwiki.getSkinFile('icons/silk/bullet_add.png')",resource:c.resource,isNewPage:false,isNewAttachment:true,clickCallback:function(g,e,f){g.input.value=""
}};
var a;
if(this.displayAddAttachmentsOnTop==true){a=0
}else{a=null
}this.add(b,c,a)
},addAttachmentsNode:function(a){var d=false;
var g=this.getNodeDataSource(a);
if(this.displayAttachmentsWhenEmpty==true||this.displayAddAttachment){d=true
}else{var k=(a.link!=null)?a.link:new Array();
var d=false;
for(var c=0;
c<k.length;
c++){if(k[c].rel==XWiki.constants.rest.restAttachmentsRel){d=true;
break
}}}if(d==true){var b=isc.XWEResultTree.constants.attachmentsHint+" "+isc.XWEResultTree.formatPath(a.wiki,a.space,a.name);
var f=isc.XWEResultTree.constants.attachmentsTitle+" ("+a.plainTitle+")";
if(this.displayLinks==true){var h=isc.XWEResultTree.formatTitle(f,b,a.xwikiRelativeUrl+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor)
}else{var h=isc.XWEResultTree.formatTitle(f,b)
}var j={id:a.id+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor,wiki:a.wiki,space:a.space,name:a.name,anchor:XWiki.constants.docextraAttachmentsAnchor,title:h,parentId:a.id,xwikiRelativeURL:a.xwikiRelativeURL+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor,icon:"$xwiki.getSkinFile('icons/silk/page_white_zip.png')",resource:XWiki.resource.fromEntityReference(this.getEntityReference(a),XWiki.constants.docextraAttachmentsAnchor),isXWikiAttachment:true,isNewPage:false,isNewAttachment:false};
var e;
if(this.displayAttachmentsOnTop==true){e=0
}else{e=null
}this.add(j,a,e)
}},getEntityReference:function(a){while(a&&!a.reference){a=this.getParent(a)
}return a?a.reference:null
}});
isc.ClassFactory.defineClass("XWEDataSource",isc.DataSource);
isc.XWEDataSource.addClassProperties({sep:"_"});
isc.XWEDataSource.addProperties({dataFormat:"xml",xmlNamespaces:{xwiki:"http://www.xwiki.org"},resultTreeClass:"XWEResultTree",transformResponse:function(b,a,d){if(this.callbacks.transformResponse.length>0){var c=this.callbacks.transformResponse.shift();
c.callback(b,a,d)
}return b
},dataURL:XWiki.constants.rest.baseRestURI+"wikis/",recordXPath:"/xwiki:wikis/xwiki:wiki",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"name",type:"text"},{name:"title",type:"text"}],icon:"$xwiki.getSkinFile('icons/silk/database.png')",requestProperties:{promptStyle:"cursor",willHandleError:true},callbacks:{transformResponse:new Array()}});
isc.XWEDataSource.addMethods({transformRequest:function(a){a.httpHeaders={Accept:"application/xml"};
if(a.originalData){a.originalData.r=""+Math.floor(Math.random()*1000000)
}return a.data
},getHint:function(a){return""
},getReference:function(a){return new XWiki.WikiReference(a.name)
}});
isc.ClassFactory.defineClass("XWEWikiDataSource",isc.XWEDataSource);
isc.XWEWikiDataSource.addClassMethods({getOrCreate:function(a){var c="XWEWikiDataSource_"+a;
var b=this.get(c);
if(b==null){b=this.create({ID:c,wiki:a})
}return b
}});
isc.XWEWikiDataSource.addProperties({wiki:XWiki.currentWiki,recordXPath:"/xwiki:spaces/xwiki:space",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"wiki",required:true,type:"text"},{name:"name",required:true,type:"text"},{name:"title",type:"text"},{name:"xwikiRelativeUrl",type:"text"}],icon:"$xwiki.getSkinFile('icons/silk/folder.png')"});
isc.XWEWikiDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces";
this.Super("init",arguments)
},getHint:function(a){return isc.XWEResultTree.constants.pageHint+" "+isc.XWEResultTree.formatPath(a.wiki,a.name)
},getReference:function(a){return new XWiki.SpaceReference(a.wiki,a.name)
}});
isc.ClassFactory.defineClass("XWESpaceDataSource",isc.XWEDataSource);
isc.XWESpaceDataSource.addClassMethods({getOrCreate:function(a,c){var d="XWESpaceDataSource_"+a+isc.XWEDataSource.sep+c;
var b=this.get(d);
if(b==null){b=this.create({ID:d,wiki:a,space:c})
}return b
}});
isc.XWESpaceDataSource.addProperties({wiki:"xwiki",space:"Main",recordXPath:"/xwiki:pages/xwiki:pageSummary",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"wiki",required:true,type:"text"},{name:"space",required:true,type:"text"},{name:"name",required:true,type:"text"},{name:"title",required:true,type:"text"},{name:"parentId",required:true,type:"text",foreignKey:"id"},{name:"xwikiRelativeUrl",type:"text"},{name:"link",propertiesOnly:true}],icon:"$xwiki.getSkinFile('icons/silk/page_white_text.png')"});
isc.XWESpaceDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces/"+this.space+"/pages";
this.transformRequest=function(a){var b=this.wiki+XWiki.constants.wikiSpaceSeparator+this.space;
if(a.originalData.parentId==b||a.originalData.parentId==null){a.originalData.parentId="^(?!"+b+".).*$"
}return this.Super("transformRequest",arguments)
};
this.Super("init",arguments)
},getHint:function(a){return isc.XWEResultTree.constants.pageHint+" "+isc.XWEResultTree.formatPath(a.wiki,a.space,a.name)
},getReference:function(a){return new XWiki.DocumentReference(a.wiki,a.space,a.name)
}});
isc.ClassFactory.defineClass("XWEPageDataSource",isc.XWEDataSource);
isc.XWEPageDataSource.addClassMethods({getOrCreate:function(a,d,c){var e="XWEPageDataSource_"+a+isc.XWEDataSource.sep+d+isc.XWEDataSource.sep+c;
var b=this.get(e);
if(b==null){b=this.create({ID:e,wiki:a,space:d,page:c})
}return b
}});
isc.XWEPageDataSource.addProperties({wiki:"xwiki",space:"Main",page:"WebHome",recordXPath:"/xwiki:page",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"wiki",required:true,type:"text"},{name:"space",required:true,type:"text"},{name:"name",required:true,type:"text"},{name:"parentId",required:true,type:"text"},{name:"link",propertiesOnly:true}],icon:"$xwiki.getSkinFile('icons/silk/page_white_text.png')"});
isc.XWEPageDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces/"+this.space+"/pages/"+this.page;
this.Super("init",arguments)
}});
isc.ClassFactory.defineClass("XWEAttachmentsDataSource",isc.XWEDataSource);
isc.XWEAttachmentsDataSource.addClassMethods({getOrCreate:function(a,d,c){var e="XWEAttachmentsDataSource_"+a+isc.XWEDataSource.sep+d+isc.XWEDataSource.sep+c;
var b=this.get(e);
if(b==null){b=this.create({ID:e,wiki:a,space:d,page:c})
}return b
}});
isc.XWEAttachmentsDataSource.addProperties({wiki:"xwiki",space:"Main",page:"WebHome",recordXPath:"/xwiki:attachments/xwiki:attachment",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"name",required:true,type:"text"},{name:"title",type:"text"},{name:"xwikiRelativeUrl",type:"text"}],icon:"$xwiki.getSkinFile('icons/silk/attach.png')"});
isc.XWEAttachmentsDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces/"+this.space+"/pages/"+this.page+"/attachments";
this.Super("init",arguments)
},getHint:function(b,a){return isc.XWEResultTree.constants.attachmentHint+" "+isc.XWEResultTree.formatPath(a.wiki,a.space,a.name)
},getReference:function(a,b){return new XWiki.AttachmentReference(a.name,b)
}});
isc.ClassFactory.defineClass("XWETreeGrid",isc.TreeGrid);
isc.XWETreeGrid.addProperties({autoDraw:false,autoFetchData:true,nodeClick:function(c,a,b){this.nodeClickCallback(c,a,b)
},showHeader:false,folderIcon:"$xwiki.getSkinFile('icons/silk/database.png')",position:"relative",dropIconSuffix:"",openIconSuffix:"",closedIconSuffix:"",animateFolders:false,wiki:XWiki.currentWiki,space:null,displaySuggest:true,defaultValue:"Main.WebHome",inputValueCache:""});
isc.XWETreeGrid.addMethods({draw:function(){if(this.Super("draw",arguments)!=null){return this
}if(typeof this.input=="undefined"&&this.input==null){this.drawInput()
}for(member in this){if(typeof member!="function"&&member.startsWith("display")){this.data[member]=this[member]
}}var a="div.listGrid td, div.listGrid table {margin:0;padding:0;} div.listGrid td {border:0;color:#333;} #actionmenu {z-index: 999999;}";
var c=document.getElementsByTagName("head")[0];
var b=document.createElement("style");
b.type="text/css";
b.media="screen";
if(b.styleSheet){b.styleSheet.cssText=a
}else{b.appendChild(document.createTextNode(a))
}c.appendChild(b)
},invalidateCache:function(){this.Super("invalidateCache",arguments);
this.inputValueCache=""
},openNode:function(a,e,b){var d={treeId:this.getID(),callback:function(){window[this.treeId].openNodesFromInput()
}};
var c=a.findById(e);
if(c!=null){if(a.isFolder(c)&&!a.isOpen(c)){if(b==true){this.getData().callbacks.dataArrived.push(d)
}a.openFolder(c);
return null
}this.selectNodeAndScroll(c);
return c
}return null
},selectNodeAndScroll:function(a){this.deselectAllRecords();
this.selectRecord(a);
nodeYPos=this.getFocusRow()*this.getRowHeight();
this.body.scrollTo(this.body.getScrollLeft(),nodeYPos)
},openParent:function(b,e,a){a=a||[];
if(e.name!=""&&a.indexOf(e.prefixedFullName)<0){a.push(e.prefixedFullName);
if(b.parentMap[e.prefixedFullName]==null){var f=isc.XWEPageDataSource.getOrCreate(e.wiki,e.space,e.name);
var d=function(j,i,l,h){if(j.httpResponseCode==200){var g=j.data[0].parentId?XWiki.resource.get(j.data[0].parentId):{prefixedFullName:"",name:""};
b.parentMap[e.prefixedFullName]=g;
if(b.findById(g.prefixedFullName)!=null){this.openNode(b,g.prefixedFullName,true)
}else{this.openParent(b,g,a)
}}else{if(this.displayAddPage==true){var k=this.getData().findById(e.prefixedSpace+isc.XWEResultTree.constants.addNodeSuffix);
k.resource=e;
this.selectNodeAndScroll(k)
}}}.bind(this);
f.transformRequest=function(g){g.httpHeaders={Accept:"application/xml"}
};
f.fetchData(null,d,null)
}else{var c=b.parentMap[e.prefixedFullName];
if(b.findById(c.prefixedFullName)!=null){this.openNode(b,c.prefixedFullName,true)
}else{this.openParent(b,c,a)
}}}},openNodesFromInput:function(){var i=this.getDataSource().Class;
var d=XWiki.resource.get(this.input.value);
var b=XWiki.resource.get("");
var e=this.getData();
if(this.getSelectedRecord()!=null){b=this.getSelectedRecord().resource
}if(i=="XWEDataSource"){var j=this.openNode(e,d.wiki,true);
if(j==null){return
}}if(i=="XWEDataSource"||i=="XWEWikiDataSource"){if(d.space!=b.space){this.deselectRecord(this.getSelectedRecord())
}var f=this.openNode(e,d.prefixedSpace,true);
if(f==null){return
}}var k=this.openNode(e,d.prefixedFullName,true);
if(k==null){this.openParent(e,d)
}if(b.attachment!=d.attachment||(b.anchor!=d.anchor&&d.anchor==XWiki.constants.docextraAttachmentsAnchor)){var c=d.prefixedFullName+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor;
var a=this.openNode(e,c,true);
if(a==null){return
}var g=d.prefixedFullName+XWiki.constants.pageAttachmentSeparator+d.attachment;
var h=this.openNode(e,g,false)
}return
},inputObserver:function(){var a=this.input.value;
if(a!=""&&a!=this.inputValueCache){this.openNodesFromInput();
this.inputValueCache=a
}setTimeout(this.inputObserver.bind(this),2000)
},drawInput:function(){var d=(this.displaySuggest==false)?"hidden":"text";
var a=this.width-6;
var b=document.createElement("input");
b.setAttribute("id",this.getID()+"_Input");
b.setAttribute("name",this.getID()+"_Input");
b.setAttribute("style","width:"+a+"px;clear:both");
b.setAttribute("type",d);
if(this.defaultValue){b.setAttribute("value",this.defaultValue)
}this.htmlElement.appendChild(b);
this.input=b;
if(this.displaySuggest){var c=function(){var f=new XWiki.widgets.Suggest(this,{script:"/xwiki/rest/wikis/"+XWiki.currentWiki+"/search?scope=name&",varname:"q"});
f.setSuggestions=function(l){this.aSuggestions=[];
var h=l.responseXML;
var k=h.getElementsByTagName("searchResult");
for(var j=0;
j<k.length;
j++){var n=k[j].getElementsByTagName("id")[0].firstChild.nodeValue;
var m=k[j].getElementsByTagName("space")[0].firstChild.nodeValue;
var g=k[j].getElementsByTagName("pageName")[0].firstChild.nodeValue;
if(k[j].hasChildNodes()){this.aSuggestions.push({id:n,value:m+XWiki.constants.spacePageSeparator+g,info:""})
}}this.idAs="as_"+this.fld.id;
this.createList(this.aSuggestions)
}
};
Event.observe(b,"focus",c);
var e={treeId:this.getID(),callback:function(){window[this.treeId].inputObserver()
}};
this.getData().callbacks.dataArrived.push(e)
}else{var e={treeId:this.getID(),callback:function(){window[this.treeId].openNodesFromInput()
}};
this.getData().callbacks.dataArrived.push(e)
}},nodeClickCallback:function(e,c,d){if(c.clickCallback==null){var a=this.data.getEntityReference(c);
if(a.type==XWiki.EntityType.WIKI){a=new XWiki.DocumentReference(c.name,"Main","WebHome")
}else{if(a.type==XWiki.EntityType.SPACE){a=new XWiki.DocumentReference(c.wiki,c.name,"WebHome")
}}var b=new XWiki.DocumentReference(XWiki.currentWiki,XWiki.currentSpace,XWiki.currentPage);
a=a.relativeTo(b);
this.input.value=XWiki.Model.serialize(a);
if(c.anchor){this.input.value+="#"+c.anchor
}this.inputValueCache=this.input.value
}else{c.clickCallback(e,c,d)
}},setValue:function(a){this.input.value=a
},getValue:function(){return this.input.value
},selectResource:function(a){this.setValue(XWiki.resource.serialize(a))
},getSelectedResourceProperty:function(b){var c=this.getValue();
var a=this.getSelectedRecord();
if(c.length>0){return XWiki.resource.get(c)[b]
}else{if(a!=null){return a.isNewPage&&b=="name"?null:this.getResourceProperty(a,b)
}}return null
},getResourceProperty:function(c,a){if(a=="anchor"){return c.anchor
}else{var d={wiki:XWiki.EntityType.WIKI,space:XWiki.EntityType.SPACE,name:XWiki.EntityType.DOCUMENT,attachment:XWiki.EntityType.ATTACHMENT};
var b=d[a];
if(b){return this.getEntityName(c,b)
}}return null
},getEntityName:function(d,c){var b=this.data.getEntityReference(d);
if(b){var a=b.extractReference(c);
if(a){return a.name
}}return null
},isNewPage:function(){var a=this.getSelectedRecord();
return a==null?this.getValue().length>0:a.isNewPage
},isNewAttachment:function(){return this.getSelectedRecord().isNewAttachment
}});