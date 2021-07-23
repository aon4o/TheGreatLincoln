function makeQuery(data) {
  var params = [];

  for (var d in data) {
    params.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }

  return params.join('&').concat("&pretty=1");
}

function getAllTheMessages() {
  var data = {
    channel: CHANNEL_ID
  };

  var parms = {
    method: 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` }
  };

  var response = UrlFetchApp.fetch("https://slack.com/api/conversations.history?" + makeQuery(data), parms);
  //Logger.log(response);

  var jsonOut = JSON.parse(response);
  var mapMap = new Map();

  for (let i in jsonOut.messages) {
    var obj = jsonOut['messages'][i];
    var id = obj['reactions'];

    for (let j in id) {
      if (id != null) {
        console.log(id[j]['name'] + " - " + id[j]['count']);
        mapMap.set(`:${id[j]['name']}:`, id[j]['count']);
      }
    }
  }

  console.log([...mapMap.entries()]);
  sendMsg("Реакцийте + броя им : " + [...mapMap.entries()]);
  return mapMap;
}
