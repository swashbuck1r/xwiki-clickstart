tinyMCE.importPluginLanguagePack("insertdatetime","en,tr,cs,el,fr_ca,it,ko,sv,zh_cn,fa,fr,de,pl,pt_br,nl,da,he,nb,ru,ru_KOI8-R,ru_UTF-8,nn,fi,es,cy,is,pl");
var TinyMCE_InsertDateTimePlugin={getInfo:function(){return{longname:"Insert date/time",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_insertdatetime.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"insertdate":return tinyMCE.getButtonHTML(a,"lang_insertdate_desc","{$pluginurl}/images/insertdate.gif","mceInsertDate");
case"inserttime":return tinyMCE.getButtonHTML(a,"lang_inserttime_desc","{$pluginurl}/images/inserttime.gif","mceInsertTime")
}return""
},execCommand:function(f,c,e,g,d){function b(k,h){k=""+k;
if(k.length<h){for(var j=0;
j<(h-k.length);
j++){k="0"+k
}}return k
}function a(h,i){i=tinyMCE.regexpReplace(i,"%D","%m/%d/%y");
i=tinyMCE.regexpReplace(i,"%r","%I:%M:%S %p");
i=tinyMCE.regexpReplace(i,"%Y",""+h.getFullYear());
i=tinyMCE.regexpReplace(i,"%y",""+h.getYear());
i=tinyMCE.regexpReplace(i,"%m",b(h.getMonth()+1,2));
i=tinyMCE.regexpReplace(i,"%d",b(h.getDate(),2));
i=tinyMCE.regexpReplace(i,"%H",""+b(h.getHours(),2));
i=tinyMCE.regexpReplace(i,"%M",""+b(h.getMinutes(),2));
i=tinyMCE.regexpReplace(i,"%S",""+b(h.getSeconds(),2));
i=tinyMCE.regexpReplace(i,"%I",""+((h.getHours()+11)%12+1));
i=tinyMCE.regexpReplace(i,"%p",""+(h.getHours()<12?"AM":"PM"));
i=tinyMCE.regexpReplace(i,"%B",""+tinyMCE.getLang("lang_inserttime_months_long")[h.getMonth()]);
i=tinyMCE.regexpReplace(i,"%b",""+tinyMCE.getLang("lang_inserttime_months_short")[h.getMonth()]);
i=tinyMCE.regexpReplace(i,"%A",""+tinyMCE.getLang("lang_inserttime_day_long")[h.getDay()]);
i=tinyMCE.regexpReplace(i,"%a",""+tinyMCE.getLang("lang_inserttime_day_short")[h.getDay()]);
i=tinyMCE.regexpReplace(i,"%%","%");
return i
}switch(e){case"mceInsertDate":tinyMCE.execInstanceCommand(f,"mceInsertContent",false,a(new Date(),tinyMCE.getParam("plugin_insertdate_dateFormat",tinyMCE.getLang("lang_insertdate_def_fmt"))));
return true;
case"mceInsertTime":tinyMCE.execInstanceCommand(f,"mceInsertContent",false,a(new Date(),tinyMCE.getParam("plugin_insertdate_timeFormat",tinyMCE.getLang("lang_inserttime_def_fmt"))));
return true
}return false
}};
tinyMCE.addPlugin("insertdatetime",TinyMCE_InsertDateTimePlugin);