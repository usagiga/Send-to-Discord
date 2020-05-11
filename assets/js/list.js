(function() {
    function onLoad() {
        let addChBtn = document.querySelector("#add-channel-button");
        addChBtn.addEventListener("click", openAddChannelPage);
    }

    function openAddChannelPage() {
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
