function sendHelpMessage(userId)
{
  let text = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hello, my name's *TheGreatLincoln* :subscribe: and my point in life is to inform you about important messages :clipboard: in your workspace! *In order* for me *to work I have to be invited in a channel* so I can see the messages in it."
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*The commands that I support are:* :arrow_down:"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*/sub* - subscribes you to all channels that you are not a member of"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*/sub* <channel_name> - subscribes you to a channel chosen by you"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*/unsub* - unsubscribes you from all channels"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*/unsub* <channel_name> - unsubscribes you from a channel chosen by you"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*/getsubs* - shows you a list with all channels you are subscribed to"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*/help* - :sos: shows you this message :page_with_curl:"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*I can actualy do 3 more things:* :arrow_down:"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "If you react with me :subscribe: to a message :page_with_curl:, you'll be notified :heavy_exclamation_mark: personally from me for every reply this message recieves!"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "If you react with :newspaper: the message is automatically treated as important :heavy_exclamation_mark:, or if you react with :cactus: the message is automatically treated as *not* important!"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "If your status is *Vacationing* or *Away* I will not bother you with any messages :page_with_curl:!"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Wow, :subscribe: I realy am Great!"
			}
		}
	]
};

  someF(text, userId);
  return ContentService.createTextOutput("Look at your DM :grinning:");
}

function someF(message, userId) 
{
  let payloadDM = {
    token: SLACK_BOT_TOKEN,
    return_im: false,
    users: userId
  };

  let jsonOut = JSON.parse(makeRequest(URL_FOR_DIRECT_MESSAGE, payloadDM));

  let payload = {
    blocks: message.blocks,
    token: SLACK_BOT_TOKEN,
    channel: jsonOut['channel']['id']
  };

  const sendMsg = makeRequest(URL_FOR_SENDING, payload);
  var response = sendMsg.getResponseCode();
}
