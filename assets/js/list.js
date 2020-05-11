(function () {
    function onLoad() {
        let addChBtn = document.querySelector("#add-channel-button");

        // Register event handlers
        addChBtn.addEventListener("click", onClickedAddButton);

        // Load all channels
        browser.storage.sync.get("channelStore")
            .then(item => {
                const store = item.channelStore;
                Object.keys(store).forEach(v => addChannelToList(store[v]));
            })
            .catch(err => console.log(err));
    }

    function onClickedAddButton() {
        // Go on to the add page
        window.location.assign("/pages/add.html");
    }

    function addChannelToList(channel) {
        let listView = document.querySelector("#channel-list");
        let listSeparator = document.querySelector("#channel-list-separator");
        let onClickedListItem = ev => {
            let dstUrl = channel.url;

            listItemSpinner.classList.remove("invisible");
            browser.tabs.query({active: true, currentWindow: true}, tabs => {
                tabs.forEach(v => {
                    let srcUrl = v.url;
                    sendToChannel(dstUrl, srcUrl)
                        .catch(err => console.error(`Send-to-Discord: ${err}`))
                        .finally(() => listItemSpinner.classList.add("invisible"));
                })
            });

            ev.stopPropagation(); // To prevent from firing other event redundantly
        };
        let onClickedListItemDeleteBtn = ev => {
            let dstUrl = channel.url;

            ev.stopPropagation(); // To prevent from firing other event redundantly
            deleteChannel(dstUrl);
        };

        // Define new item
        let listItem = document.createElement("div");
        let listItemText = document.createElement("div");
        let listItemSpinner = document.createElement("div");
        let listItemDeleteBtn = document.createElement("div");

        listItem.classList.add("panel-list-item");
        listItem.addEventListener("click", onClickedListItem);
        listItemText.textContent = channel.name;
        listItemText.classList.add("text");
        listItemSpinner.classList.add("spinner", "invisible");
        listItemDeleteBtn.classList.add("delete");
        listItemDeleteBtn.addEventListener("click", onClickedListItemDeleteBtn);

        listItem.append(
            listItemText,
            listItemSpinner,
            listItemDeleteBtn
        );

        // Append new item
        listView.insertBefore(listItem, listSeparator);
    }

    function sendToChannel(dstUrl, srcUrl) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: `{"content":"${srcUrl}","username":"Usagiga","avatar_url":"https://i.imgur.com/hodSYp3.png"}`
        };

        return fetch(dstUrl, init);
    }

    function deleteChannel(url) {
        let doneGetStore = item => {
            let store = item.channelStore;

            if (typeof store === "undefined") return;
            if (typeof store[url] === "undefined") return;

            delete store[url];

            browser.storage.sync.set({channelStore: store})
                .then(doneSetStore)
                .catch(errorAccessStore);
        };
        let doneSetStore = () => window.location.reload();
        let errorAccessStore = err => console.error(err);

        browser.storage.sync.get("channelStore")
            .then(doneGetStore)
            .catch(errorAccessStore);
    }

    onLoad();
})();
