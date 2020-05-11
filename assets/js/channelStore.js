class ChannelStore {
    constructor() {
        this.channelStoreKey = "channelStore";
    }

    add(name, url) {
        let channel = {
            name: name,
            url: url
        };
        let channels = this.findAll();
        let channelStoreJson = "";

        channels[url] = channel;

        channelStoreJson = JSON.stringify(channels);
        browser.storage.sync.set(this.channelStoreKey, channelStoreJson);
    }

    find(url) {
        let channels = this.findAll();
        return channels["url"];
    }

    findAll() {
        let channelStoreJson = browser.storage.sync.get(this.channelStoreKey);
        return JSON.parse(channelStoreJson);
    }

    delete(url) {
        let channels = this.findAll();
        let channelStoreJson = "";

        delete channels[this.channelStoreKey];

        channelStoreJson = JSON.stringify(channels);
        browser.storage.sync.set(this.channelStoreKey, channelStoreJson);
    }
}
