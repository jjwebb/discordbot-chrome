var discordUserID = '0000000000';

//Get data from Chrome synced storage
const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : setDiscordUserID(result)
    )
  )

//Set discordUserID to default state in Chrome storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ discordUserID });
});
  
//Trigger an event when a tab is loaded
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.url.startsWith("https://www.youtube.com/watch")) {
        console.log("YouTube tab loaded! ID: " + discordUserID)
        const data = { id: discordUserID };

        //Send our ID to the bot server to deduct a DiscordDollar
        fetch('https://harvbot.jjwebb.repl.co/users/15', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            registration.showNotification("Discordbot: ", {
                body: "Spent a DiscordDollar to watch YouTube!",
                icon: "images/Discord/discord128.png",
            })
        })
        .catch((error) => {
        console.error('Error:', error);
        });

        console.log(tab.url)
    }
})

function setDiscordUserID(id) {
    discordUserID = id.discordUserID;
}

getStorageData("discordUserID")