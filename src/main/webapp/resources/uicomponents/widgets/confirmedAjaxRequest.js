if(typeof(XWiki)=="undefined"||typeof(XWiki.widgets)=="undefined"||typeof(XWiki.widgets.ConfirmationBox)=="undefined"){if(typeof console!="undefined"&&typeof console.warn=="function"){console.warn("[MessageBox widget] Required class missing: XWiki.widgets.ModalPopup")
}}else{XWiki.widgets.ConfirmedAjaxRequest=Class.create(XWiki.widgets.ConfirmationBox,{defaultAjaxRequestParameters:{on1223:function(a){a.request.options.onSuccess(a)
},on0:function(a){a.request.options.onFailure(a)
}},initialize:function($super,b,a,c){this.interactionParameters=Object.extend({displayProgressMessage:true,progressMessageText:"$msg.get('core.widgets.confirmationBox.notification.inProgress')",displaySuccessMessage:true,successMessageText:"$msg.get('core.widgets.confirmationBox.notification.done')",displayFailureMessage:true,failureMessageText:"$msg.get('core.widgets.confirmationBox.notification.failed')"},c||{});
this.requestUrl=b;
this.ajaxRequestParameters=Object.extend(Object.clone(this.defaultAjaxRequestParameters),a||{});
Object.extend(this.ajaxRequestParameters,{onSuccess:function(){if(this.interactionParameters.displaySuccessMessage){if(this.progressNotification){this.progressNotification.replace(new XWiki.widgets.Notification(this.interactionParameters.successMessageText,"done"))
}else{new XWiki.widgets.Notification(this.interactionParameters.successMessageText,"done")
}}else{if(this.progressNotification){this.progressNotification.hide()
}}if(a.onSuccess){a.onSuccess.apply(this,arguments)
}}.bind(this),onFailure:function(d){if(this.interactionParameters.displayFailureMessage){var e=d.statusText;
if(d.statusText==""||d.status==12031){e="Server not responding"
}if(this.progressNotification){this.progressNotification.replace(new XWiki.widgets.Notification(this.interactionParameters.failureMessageText+e,"error"))
}else{new XWiki.widgets.Notification(this.interactionParameters.failureMessageText+e,"error")
}}else{if(this.progressNotification){this.progressNotification.hide()
}}if(a.onFailure){a.onFailure.apply(this,arguments)
}}.bind(this)});
$super({onYes:function(){if(this.interactionParameters.displayProgressMessage){this.progressNotification=new XWiki.widgets.Notification(this.interactionParameters.progressMessageText,"inprogress")
}new Ajax.Request(this.requestUrl,this.ajaxRequestParameters)
}.bind(this)},this.interactionParameters)
}})
};