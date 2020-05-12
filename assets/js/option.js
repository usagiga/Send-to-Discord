(function () {
    function onLoad() {
        const reqBodyKey = {
            webhookReqBody: ""
        };
        const doneGetReqBody = item => {
            const reqBody = item.webhookReqBody;
            webhookReqBodyTextBox.value = reqBody;
        };
        const errorGetReqBody = err => console.error(err);
        const webhookReqBodyTextBox = document.querySelector("#webhook-req-body");
        const saveBtn = document.querySelector("#save-button");

        // Register event handlers
        saveBtn.addEventListener("click", onClickedSaveButton);

        // Load all setting values
        browser.storage.sync.get(reqBodyKey)
            .then(doneGetReqBody)
            .catch(errorGetReqBody);
    }

    function onClickedSaveButton() {
        const webhookReqBody = document.querySelector("#webhook-req-body").value;

        // Save all form data
        if (webhookReqBody.length <= 0) {
            browser.storage.sync.remove("webhookReqBody");
            return;
        }

        browser.storage.sync.set({webhookReqBody: webhookReqBody})
            .catch(err => console.error(err));
    }

    onLoad();
})();
