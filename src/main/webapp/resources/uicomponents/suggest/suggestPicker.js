var XWiki=(function(b){var a=b.widgets=b.widgets||{};
a.SuggestPicker=Class.create({options:{showKey:false,showTooltip:false,showDeleteTool:true,enableSort:true,showClearTool:true,inputType:"hidden",listInsertionElement:null,listInsertionPosition:"after",acceptFreeText:false,onItemAdded:Prototype.emptyFunction},initialize:function(d,f,c){this.removeItem=this.removeItem.bindAsEventListener(this);
this.checkboxChanged=this.checkboxChanged.bindAsEventListener(this);
this.options=Object.extend(Object.clone(this.options),c||{});
this.input=d;
this.suggest=f;
this.inputName=this.input.name;
if(!this.options.acceptFreeText){this.input.name=this.input.name+"__suggested"
}else{this.input.addClassName("accept-value")
}this.suggest.options.callback=this.acceptSuggestion.bind(this);
this.list=new Element("ul",{"class":"accepted-suggestions"});
var g;
if(this.options.listInsertionElement){if(typeof(this.options.listInsertionElement)==="string"){g=this.input.up().down(this.options.listInsertionElement)
}else{g=this.options.listInsertionElement
}}if(!g){g=this.input
}var e={};
e[this.options.listInsertionPosition]=this.list;
g.insert(e);
if(this.options.showClearTool){this.clearTool=new Element("span",{"class":"clear-tool delete-tool invisible",title:"$msg.get('core.widgets.suggestPicker.deleteAll.tooltip')"}).update("$msg.get('core.widgets.suggestPicker.deleteAll')");
this.clearTool.observe("click",this.clearAcceptedList.bindAsEventListener(this));
this.list.insert({after:this.clearTool})
}},acceptSuggestion:function(c){if(!this.acceptAlreadyAddedItem(c.id||c.value)){this.addItem(c)
}this.input.value="";
return false
},removeItem:function(d){var c=d.findElement("li");
c.remove();
this.notifySelectionChange(c);
this.updateListTools()
},clearAcceptedList:function(){this.list.update("");
this.notifySelectionChange();
this.updateListTools()
},checkboxChanged:function(d){var c=d.findElement("li");
this.notifySelectionChange(c)
},acceptAlreadyAddedItem:function(d){var c=$(this.getInputId(d));
if(c){c.checked=true;
this.notifySelectionChange(c.up("li")||c);
return true
}return false
},addItem:function(e){if(!e){return
}var g=e.id||e.value;
var j=this.getInputId(g);
var h=new Element("li");
var c=new Element("label",{"class":"accepted-suggestion","for":j});
var i={type:this.options.inputType,name:this.inputName,id:j,value:g};
if(this.options.inputType=="checkbox"){i.checked="checked"
}var f=new Element("input",i);
c.insert({bottom:f});
if(this.options.showKey){c.insert({bottom:new Element("span",{"class":"key"}).update("["+g.escapeHTML()+"]")});
c.insert({bottom:new Element("span",{"class":"sep"}).update(" ")})
}c.insert({bottom:new Element("span",{"class":"value"}).update(e.value.escapeHTML())});
h.insert(c);
if(this.options.showDeleteTool){var d=new Element("span",{"class":"delete-tool",title:"$msg.get('core.widgets.suggestPicker.delete.tooltip')"}).update("$msg.get('core.widgets.suggestPicker.delete')");
d.observe("click",this.removeItem);
h.appendChild(d)
}if(this.options.showTooltip&&e.info){h.appendChild(new Element("div",{"class":"tooltip"}).update(e.info))
}this.list.insert(h);
f.observe("change",this.checkboxChanged);
this.options.onItemAdded(f);
this.notifySelectionChange(h);
this.updateListTools();
return f
},updateListTools:function(){if(this.clearTool){if(this.list.select("li .accepted-suggestion").length>0){this.clearTool.removeClassName("invisible")
}else{this.clearTool.addClassName("invisible")
}}if(this.options.enableSort&&this.list.select("li .accepted-suggestion").length>0&&typeof(Sortable)!="undefined"){Sortable.create(this.list)
}},notifySelectionChange:function(c){Event.fire(document,"xwiki:multisuggestpicker:selectionchanged",{trigger:this.input,fieldName:this.inputName,changedElement:c})
},getInputId:function(c){return this.inputName+"_"+c
}});
return b
}(XWiki||{}));