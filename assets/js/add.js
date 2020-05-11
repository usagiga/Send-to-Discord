(function() {
    function onLoad() {
        let addChBtn = document.querySelector("#add-channel-button");

        // Register event handlers
        addChBtn.addEventListener("click", onClickedAddButton);
    }

    function onClickedAddButton() {

    }

    function appendChannel() {
        console.log("NOP");
    }

    onLoad();
})();
