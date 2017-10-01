document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({},function(tabs){     
    var select = document.getElementById("selectButton");
    var option;
    for (var i = 0; i < tabs.length; i++) {
      if(chrome.extension.getBackgroundPage().window.list_config.checkYoutubeSite(tabs[i].url)){
        option = document.createElement("option");
        option.text = tabs[i].title;
        option.value = tabs[i].id;
        select.add(option);
        if(chrome.extension.getBackgroundPage().window.list_config.getCurrentTab() == option.value){
          option.selected = "selected";
        }
      }
    }
  });

  document.getElementById('selectButton').onchange = doSelected;
});

function doSelected(){
  var select = document.getElementById("selectButton");
  var tabId = select.options[select.selectedIndex].value;
  chrome.extension.getBackgroundPage().window.list_config.setCurrentTab(tabId);
}
