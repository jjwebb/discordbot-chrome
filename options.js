//Get data from Chrome synced storage
const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : setIDdisplayed(result)
    )
  )

//Get ID from the form when submit button is clicked
function enterID() {
    let discordUserID = document.getElementById("idEntry").value;
    chrome.storage.sync.set({ discordUserID });
    getStorageData("discordUserID");
}

//Set the current ID displayed on the page
function setIDdisplayed(storageData) {
    currentIDheader = document.getElementById("userID");
    currentIDheader.innerHTML = storageData.discordUserID;
}

//Retrieve ID from storage and add event listeners
getStorageData("discordUserID");
let idbutton = document.getElementById("idButton");
idbutton.addEventListener("click", enterID)