function getLinkForMessage(ch, ts) 
{
  let payload = {
    token: SLACK_BOT_TOKEN,
    channel: ch,
    message_ts: ts
  };

  let params = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`},
    payload: payload
  };

  let response = JSON.parse(UrlFetchApp.fetch(URL_FOR_LINK + "?channel=" + ch + "&message_ts=" + ts + "&pretty=1" , params));

  return response['permalink'];
}