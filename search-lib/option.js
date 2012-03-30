// JavaScript Document
$(document).ready(function(){
	HTML = "";
	var setGroup;
	if(!localStorage.getItem("setGroup")) {
		setGroup = new Array(getGroup.length);
		for (var i=0; i<getGroup.length; i++) {
			setGroup[i] = false;
		}
		localStorage["setGroup"] = setGroup;
	} else {
		setGroup = localStorage.getItem("setGroup");
		setGroup = setGroup.split(',');
		for (var i=0; i<setGroup.length; i++) {
			if (setGroup[i] == "true") {
				setGroup[i] = true;
			} else {
				setGroup[i] = false;
			}
		}
	}
	for (var i=0; i<getGroup.length; i++) {
		if (setGroup[getGroup[i].num-1]) {
			HTML += "<p><input type='checkbox' class='set' num='"+getGroup[i].num.toString()+"' name='check"+getGroup[i].num.toString()+"' id='check"+getGroup[i].num.toString()+"'onchange='settings()' checked='checked'/><label>"+getGroup[i].text+"</label></p>";
		} else {
			HTML += "<p><input type='checkbox' class='set' num='"+getGroup[i].num.toString()+"' name='check"+getGroup[i].num.toString()+"' id='check"+getGroup[i].num.toString()+"'onchange='settings()'/><label>"+getGroup[i].text+"</label></p>";
		}
	}
	$('#lib').html(HTML)
});

function settings() {
	console.log('enter setting')
	var List = $('.set').toArray();
	var setGroup = new Array(List.length);
	if(List) {
		for (var i=0; i<List.length; i++) {
			index = parseInt(List[i].name.substr(5,7));
			setGroup[index-1] = List[i].checked;
		}
	}
	localStorage["setGroup"] = setGroup;
	chrome.extension.sendRequest({host:"searchlib", message:"setGroupChanged"}, function(response){console.log(response);})
}