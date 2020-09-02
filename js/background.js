var licenceCheckResponse = {
    message: "LicenceCheck"
};

function log(message) {
    var now = new Date().getTime() / 1000;
    console.log(now + " - " + message);
}

function logError(message) {
    var now = new Date().getTime() / 1000;
    console.warn(now + " - " + message);
}

function logObject(object) {
    console.log(object);
}


chrome.commands.onCommand.addListener(function(command) {
    if (command == "submitpage" || command == "submitProductConfirmation" || command == "populatepage") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: command }, function(info) {
                return true;
            });
        });
        return true;
    }
    return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.message) {
        case "openURL":
            chrome.tabs.create({
                url: request.url,
                active: false,
                windowId: sender.tab.windowId
            });
            return true;
        case "downloadURL":
            var downloadOptions = {
                url: request.url
            };

            if (request.filename) {
                downloadOptions.filename = request.filename;
            }

            chrome.downloads.download(downloadOptions);

            return true;
        case "CopyToClipboard":
            var input = document.createElement('textarea');
            document.body.appendChild(input);
            input.value = request.text;
            input.focus();
            input.select();
            document.execCommand('Copy');
            input.remove();
            return true;
        case "closeMe":
            chrome.tabs.remove(sender.tab.id);
            return true;

    }

    return true;
});