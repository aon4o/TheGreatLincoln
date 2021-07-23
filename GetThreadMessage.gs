function getThreadMsg(user_id, channel_id, timest) 
{
  let payload = {
    token: SLACK_BOT_TOKEN,
    channel: channel_id,
    ts: timest
  };

  let params = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`},
    payload: payload
  };

  let response = JSON.parse(UrlFetchApp.fetch(URL_FOR_REPLIES + "?channel=" + channel_id + "&ts=" + timest + "&pretty=1", params));

  let tsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Threads");

  if (tsheet == null) 
  {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }

  let numRows = tsheet.getLastRow();
  let threadsSubs = tsheet.getRange(2, 1, numRows, 2).getValues();

  let flagThread = 0;

  for(let i in threadsSubs)
  {
    if(threadsSubs[i][0] == user_id && threadsSubs[i][1] == timest)
    {
      flagThread = 1;
    }
  }

  if(flagThread == 0)
  {
    tsheet.appendRow([user_id, timest]);
    answerMsg("You are subscribed to the message." + getLinkForMessage(channel_id, timest), user_id);
  }
}

function getTheThreadPls(timest, channel_id)
{
  let payload = {
    token: SLACK_BOT_TOKEN,
    channel: channel_id,
    ts: timest
  };

  let params = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`},
    payload: payload
  };

  let response = JSON.parse(UrlFetchApp.fetch(URL_FOR_REPLIES + "?channel=" + channel_id + "&ts=" + timest + "&pretty=1", params));

  let tsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Threads");

  if (tsheet == null) 
  {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }

  let numRows = tsheet.getLastRow();
  let threadsSubs = tsheet.getRange(2, 1, numRows, 2).getValues();

  for(let t in threadsSubs)
  {
    if(threadsSubs[t][1] == timest && threadsSubs[t][0] != response.messages[response.messages.length - 1].user)
    {
      if(response.messages.length != 1)
      {
        last_thread = response.messages[response.messages.length - 1].text;
        root_message = response.messages[0].text;
        last_thread_link = getLinkForMessage(channel_id, response.messages[response.messages.length - 1].ts);
        answerMsg(last_thread_link, threadsSubs[t][0]);
      }
    }
  }
}

function fsgsg()
{
  getTheThreadPls("1626089507.034000", "C0260F98UGM");
}
