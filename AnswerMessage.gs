function answerMsg(message, userId) 
{
  let payload = {
    text: message,
    channel: userId
  };

  const sendMsg = makeRequest(URL_FOR_SENDING, payload);
  var response = sendMsg.getResponseCode();  

  Logger.log(sendMsg);
  Logger.log(response);
}
