# Send to Discord

The Firefox extension which clicks to send the link of the opened page into your Discord servers.


## Install

Perhaps, this will reveal on Firefox Add-On site.


### For developers

1. Download it
1. Open `about:debugging` on your Firefox
1. Choose `This Firefox`
1. Click `Load Temporary Add-on...` and choose `manifest.json` of Send to Discord


### Permissions

Send to Discord use these permissions.
If you wanna know why is it needed, read below.

| Permission | Use |
| -- | -- |
| `https://discord.com/api/webhooks/*` | To send message to specific channel on Discord. |
| `activeTab` | To get opened page's title and its URL. |
| `storage` | To store your Discord webhook URLs. |


## Usage

1. Click "Send to Discord" on address bar.
1. Click a channel you wanna send URL on the pop-up window.
1. Soon after the URL send to a specified channel.

To know how to configure, see Configuration.


### Configuration


#### To add your channel

1. Click `Add a channel...` button on its pop-up window.
1. Specify channel name and its Webhook URL.
    - You can obtain Webhook URL in Server settings on Discord. See also [Intro to Webhooks – Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks "Intro to Webhooks – Discord")
1. Then, press `Add` button.


#### To change a format of message

1. Open `about:addons`.
1. Open *Send to Discord* Setting page.
1. Edit `Webhook Request Body` as you like.
    - The app uses *POST /webhooks/{webhook.id}/{webhook.token}* . So, `Webhook Request Body` means request body of this API. See more details at [Discord Developer Portal — Documentation — Webhook](https://discord.com/developers/docs/resources/webhook "Discord Developer Portal — Documentation — Webhook")


## License

MIT
