(function() {
    function onLoad() {
        let addChBtn = document.querySelector("#add-channel-button");

        // Register event handlers
        addChBtn.addEventListener("click", onClickedAddButton);
    }

    function onClickedAddButton() {
        // Go on to the add page
        window.location.assign("/pages/add.html");
    }

    function sendToChannel() {
        console.log("NOP");
    }

    function appendChannel() {
        console.log("NOP");
    }

    function deleteChannel(i) {
        console.log("NOP");
    }

    onLoad();
})();
