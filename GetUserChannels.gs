function getUserChannels(userId) {
  let payload = {
    token: SLACK_BOT_TOKEN,
    user: userId
  };

  let params = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`},
    payload: payload
  };

  let response = JSON.parse(UrlFetchApp.fetch(URL_FOR_USER_CONVERSATIONS + "?user=" + userId, params));
  let channelsList = [];
  for (let channel in response.channels) {
    channelsList.push(response['channels'][channel]['id']);
  }

  console.log(channelsList);
  return channelsList;
}

function get_Main() {
  getUserChannels('U027G1RG880');
}