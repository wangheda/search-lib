fetch_content = [];
DayHourList = [];
pagenum = 40;

function genericOnClick(info, tab) {
    uid = info.linkUrl.match("id=[0-9]+")[0];
    uid = uid.substring(3,uid.length)
    chrome.tabs.create({url:"punchcard.html"}, function(tab){
        chrome.tabs.sendRequest(tab.id, {agent:"renren-punchcard", user:uid}, function(response){
            if (respose.agent && response.agent=="renren-punchcard") {
                console.log(response.message);
            }
        });
    });
}

var property = {"title": "Show PunchCard", 
"contexts":["link"], 
"targetUrlPatterns":["http://www.renren.com/profile.do*"], 
"documentUrlPatterns":["http://*.renren.com/*"],
"onclick": genericOnClick};


var mid = chrome.contextMenus.create(property);
