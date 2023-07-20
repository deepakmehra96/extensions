const sendMessageToContentScript = (message, callback) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message , (response) => {
            return
        });
    });
}

const scroller = document.getElementById('scrollButton')

chrome.storage.onChanged.addListener((result) => {
    if (result["applicationIsOn"]?.newValue != undefined)
        if (!result["applicationIsOn"].newValue) {
            scroller.innerText = "Disable"
        }else{
            scroller.innerText = "Enable"
        }
});

scroller.addEventListener('click', () => {

    let buttonText = scroller.textContent || scroller.innerText;

    sendMessageToContentScript({
        payload: buttonText,
        action: 'BUTTON_CLICK'
    }, (response) => {
       return
    });
});