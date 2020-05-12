(function () {
    function onLoad() {
        let addChBtn = document.querySelector("#add-channel-button");

        // Register event handlers
        addChBtn.addEventListener("click", onClickedAddButton);
    }

    function onClickedAddButton() {
        let err = "";
        let name = document.querySelector("#channel-name").value;
        let url = document.querySelector("#channel-url").value;
        let doneGetStore = item => {
            let store = item.channelStore;
            if (typeof store === "undefined") store = {};
            if (typeof store[url] === "undefined") store[url] = {};

            store[url] = {
                name: name,
                url: url,
            };

            browser.storage.sync.set({channelStore: store})
                .then(doneSetStore)
                .catch(errorAccessStore);
        };
        let doneSetStore = () => {
            // Go on to the list page.
            window.location.assign("/pages/list.html");
        };
        let errorAccessStore = err => showErrorMessage(err);

        // Validation
        err = validateName(name);
        if (err !== "") {
            showErrorMessage(err);
            return;
        }
        err = validateWebhookURL(url);
        if (err !== "") {
            showErrorMessage(err);
            return;
        }
        clearErrorMessage();

        // Add new channel into storage
        browser.storage.sync.get("channelStore")
            .then(doneGetStore)
            .catch(errorAccessStore);
    }

    function showErrorMessage(message) {
        let errMsgLabel = document.querySelector("#error-message");

        console.error(`Send to Discord: ${message}`);
        errMsgLabel.textContent = message;
        errMsgLabel.classList.remove("invisible");
    }

    function clearErrorMessage() {
        let errMsgLabel = document.querySelector("#error-message");

        errMsgLabel.textContent = "";
        errMsgLabel.classList.add("invisible");
    }

    function validateName(name) {
        if (typeof (name) === "undefined") return "Something wrong. Please reopen it.";
        if (name === "" || name === null) return "Name must NOT be empty.";

        return "";
    }

    function validateWebhookURL(url) {
        if (typeof (url) === "undefined") return "Something wrong. Please reopen it.";
        if (url === "" || url === null) return "Webhook URL must NOT be empty.";
        if (!url.startsWith("https://discord.com/api/webhooks/") && !url.startsWith("https://discordapp.com/api/webhooks/"))
            return "Webhook URL must be Discord Webhook URL.";

        return "";
    }

    // Run
    onLoad();
})();
