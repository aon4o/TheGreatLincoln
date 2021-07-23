function getAllUsersFromChannel(channel_id) 
{
  let payload = {
    token: SLACK_BOT_TOKEN,
    channel: channel_id
  };

  let params = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`},
    payload: payload
  };

  let response = JSON.parse(UrlFetchApp.fetch(URL_FOR_CONVUSERS + "?channel=" + channel_id, params));
  var counter = 0;

  for(i in response['members'])
  {
    counter ++;
  }

  return Math.round(counter * 50/100);
}