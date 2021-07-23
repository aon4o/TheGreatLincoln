function makeQuery(data)
{
    var params = [];

    for (var d in data)
    {
        params.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }

    return params.join('&').concat("&pretty=1");
}

function getAllTheMessages(ch_id, timest)
{
  var data = {
    channel: ch_id,
    ts: timest
  };

  var parms = {
    method : 'get',
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}`}
  };

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reactions");
  let specialSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");

  if (sheet == null || specialSheet == null)
  {
    return ContentService.createTextOutput("Error: Sheet was not found! You may enter an invalid name.");
  }

  let numRows = sheet.getLastRow();
  let numRows2 = specialSheet.getLastRow();

  var reacts = sheet.getRange(2, 1, numRows, 2).getValues();
  var subs = specialSheet.getRange(2, 1, numRows2, 2).getValues();

  var response = UrlFetchApp.fetch("https://slack.com/api/conversations.history?" + makeQuery(data), parms);

  var jsonOut = JSON.parse(response);
  var reactsArray = [];

  for(let i in jsonOut.messages)
  {
    // CHECKING THE MESSAGE WHICH WAS REACTED ON + 24 HOURS

    if(jsonOut['messages'][i]['ts'] == timest && calculateTS(jsonOut['messages'][i]['ts']) >= getYesterday())
    {
      // IF THE MESSAGE IS THIS, WE ARE DIVING IN ITS REACTIONS

      for(let r in jsonOut['messages'][i]['reactions'])
      {
        reactsArray.push(jsonOut['messages'][i]['reactions'][r]['name']);
      }

      if(reactsArray.includes("cactus"))
      {
        break;
      }

      else if(reactsArray.includes("newspaper"))
      {
        sheet.appendRow([jsonOut['messages'][i]['ts'], JSON.stringify(jsonOut['messages'][i]['reactions'])]);

        // notifying all the users who are subscribed to the channel
        
        for(let sub = 0 ; sub < numRows2 ; sub++)
        {
          if(subs[sub][1] == ch_id)
          {
            answerMsg(getLinkForMessage(ch_id, jsonOut['messages'][i]['ts']), subs[sub][0]);
          }
        }
        break;
      }

      for(let j in jsonOut['messages'][i]['reactions'])
      {
        let distinct_users = [];
        // IF THE REACTION COUNT IS 2 OR MORE WE ARE DOING JOB
        for(let u in jsonOut['messages'][i]['reactions'])
        {
          for(let uu in jsonOut['messages'][i]['reactions'][u]['users'])
          {
            let user = jsonOut['messages'][i]['reactions'][u]['users'][uu];
            //console.log(user);
            distinct_users.push(user);
          }
        }

        //console.log(distinct_users);

        const setty = new Set(distinct_users);
        const backToArray = [...setty];

        console.log(backToArray.length);

        if(backToArray.length > 1 &&  jsonOut['messages'][i]['reactions'][j]['count'] >= 2 && jsonOut['messages'][i]['reactions'][j]['name'] != "+1")
        {
          // WE ARE MAKING FLAG 

          var flagSpread = 0;

          // CHECKING SUBS SPREADSHEET

          for(let s = 0 ; s < numRows ; s++)
          {
            // CHECKING IF THE MESSAGE IS ALREADY IN OUR REACTIONS SPREDSHEET

            if(reacts[s][0] == jsonOut['messages'][i]['ts'])
            {
              flagSpread = 1; 
            } 
          }

          // IF MESSAGE IS NOT IN THE SPREADSHEET, WE ARE PUTTING IT

          if(flagSpread == 0)
          {
            sheet.appendRow([jsonOut['messages'][i]['ts'], JSON.stringify(jsonOut['messages'][i]['reactions'])]);
            console.log("Appended!");
            // notifying all the users who are subscribed to the channel
            
            for(let sub = 0 ; sub < numRows2 ; sub++)
            {
              if(subs[sub][1] == ch_id)
              {
                if(getUserStatus(subs[sub][0]))
                {
                  answerMsg(getLinkForMessage(ch_id, jsonOut['messages'][i]['ts']), subs[sub][0]);
                  console.log("Texted to subbed user!");
                }
              }
            }
            break;
          } 
        }
      }
    }
  }

  return ContentService.createTextOutput("Reaction was added!");
}

function testest()
{
  getAllTheMessages("C028KDW5H5E", "1626163573.001600");
}