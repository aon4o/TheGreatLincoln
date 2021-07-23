function getUserStatus(user_id) 
{
  let payload = {
    token: SLACK_BOT_TOKEN,
    user: user_id
  };

  let params = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`},
    payload: payload
  };

  let response = JSON.parse(UrlFetchApp.fetch(URL_FOR_USER_INFO + "?user=" + user_id + "&pretty=1" , params));
  let response2 = JSON.parse(UrlFetchApp.fetch(URL_FOR_PRES + "?user=" + user_id + "&pretty=1" , params));

  var status = response['user']['profile']['status_text'];
  var presence = response2['presence'];

  if(status != "Vacationing" && presence == "active")
  {
    return true;
  }

  else if(status == "Vacationing" || presence == "away")
  {
    return false;
  }
}

function ttttt()
{
  console.log(getUserStatus("U026SGHUFQB"));
}
