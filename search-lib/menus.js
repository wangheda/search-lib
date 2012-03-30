menuID2getGroupID = {}

function counterPlus() {
	var counter;
	if(!localStorage.getItem("counter")) {
		localStorage["counter"] = 1;
	} else {
		counter = parseInt(localStorage.getItem("counter"));
		localStorage["counter"] = counter+1;
	}
}

function getSetGroup() {
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
	return setGroup;
}

function changeMenus() {
	setGroup = getSetGroup();
	number = 0;
	for (var i=0; i<setGroup.length; i++) {
		if (setGroup[i]) {
			var text = getGroup[i].text;
			var property = {"title": "在 "+text+" 中搜索", 
				"contexts":["selection"], 
				"onclick": genericOnClick};
			var mid = chrome.contextMenus.create(property);
			menuID2getGroupID[mid] = i;
			number ++;
		}
	}
	if (number == 0) {
		var property = {"title": "设置搜索图书馆", 
			"contexts":["selection"], 
			"onclick": genericOnClick};
		var mid = chrome.contextMenus.create(property);
		menuID2getGroupID[mid] = -1;//means no lib are chosen
	}
}


function genericOnClick(info, tab) {
	console.log(info);
	getGroupID = menuID2getGroupID[info.menuItemId];
	if (getGroupID >= 0) {
		// normal
		this_url = getGroup[getGroupID].url.replace(/%TITLE%/g, info.selectionText);
		chrome.tabs.create({url:encodeURI(this_url)});
		counterPlus();
	} else {
		// no lib chosen
		chrome.tabs.create({url:'option.html'});
	}
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (request.host == "searchlib") {
		sendResponse({host:"searchlib", message:"gotit"});
		if (request.message == "setGroupChanged") {
			chrome.contextMenus.removeAll();
			changeMenus();
		}
	}
});

// change Menus
changeMenus();
var firsttime;
if(!localStorage.getItem("firsttime")) {
	firsttime = false;
	chrome.tabs.create({url:'option.html'});
	localStorage["firsttime"] = firsttime;
}
