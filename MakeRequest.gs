function makeRequest(url, payload, type) 
{  
  var parms = {
    method : type,
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${BOT_TOKEN}`},
    payload: JSON.stringify(payload)
  };

  const answer = UrlFetchApp.fetch(url, parms);

  return answer;
}
