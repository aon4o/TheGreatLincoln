function sendMsg(txt) 
{
  var payload = {
    text: txt,
    token: SLACK_BOT_TOKEN,
    channel: CHANNEL_ID
  };

  const sendMsg = makeRequest(URL_FOR_SENDING, payload, 'post');

  var response = sendMsg.getResponseCode();
  Logger.log(sendMsg);
  Logger.log(response);
}

function main()
{
  sendMsg("asd");
}