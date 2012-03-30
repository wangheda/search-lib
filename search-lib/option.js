// JavaScript Document
$(document).ready(function(){
	HTML = "";
	for (var i=0; i<getGroup.length; i++) {
		HTML += "<p><input type='checkbox' class='set' num='"+getGroup[i].num.toString()+"' name='check"+getGroup[i].num.toString()+"' id='check"+getGroup[i].num.toString()+"'onchange='settings()'/><label>"+getGroup[i].text+"</label></p>";
	}
	$('#lib').html(HTML)
});

function settings() {
	console.log('enter setting')
	var List = $('.set');
	var setGroup = new Array(List.length);
	if(List) {
		for (var i=0; i<List.length; i++) {
			index = parseInt(List[i].num);
			setGroup[index] = List[i].checked;
		}
	}
	localStorage["setGroup"] = setGroup;
}