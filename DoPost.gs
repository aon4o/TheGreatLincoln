function doPost(request) {
  let returnValue;
  // Uncomment if you want to see each request written in the DoPostData sheet
  // SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DoPostData").appendRow([JSON.stringify(request)]);
  // HANDLING COMMANDS AND EVENTS
  if(isSub(request))
  {
    returnValue = subscribe(request.parameter.user_id, request.parameter.text);
  }
  else if(isUnsub(request))
  {
    returnValue = unsubscribe(request.parameter.user_id, request.parameter.text);
  }
  else if(isGetSub(request))
  {
    returnValue = getSubs(request.parameter.user_id);
  }
  else if(isHelp(request))
  {
    returnValue = sendHelpMessage(request.parameter.user_id);
  }
  else if(subReaction(request))
  {
    let v = JSON.parse(request.postData.contents);

    returnValue = getThreadMsg(v.event.user, v.event.item.channel, v.event.item.ts);
  }
  else if(isThread(request))
  {
    let v = JSON.parse(request.postData.contents);

    returnValue = getTheThreadPls(v.event.thread_ts, v.event.channel);
  }
  else if(removeSubReaction(request))
  {
    let v = JSON.parse(request.postData.contents);

    returnValue = removeThreadSub(v.event.user, v.event.item.ts);
  }
  else if(isReactionEvent(request))
  {
    let v = JSON.parse(request.postData.contents);
    returnValue = getAllTheMessages(v.event.item.channel, v.event.item.ts);
  }
  else if(isMemberJoined(request))
  {
    let v = JSON.parse(request.postData.contents);
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
    let numRows = sheet.getLastRow();
    var subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();

    for (let i = 0; i < numRows; ++i) {
      if (subscribtions[i][0] == v.event.user && subscribtions[i][1] == v.event.channel) {
        sheet.deleteRow(i + 2);
        returnValue = ContentService.createTextOutput("ok");
        break;
      }
    }
  }
  else if(isMemberLeft(request))
  {
    let v = JSON.parse(request.postData.contents);
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
    sheet.appendRow([v.event.user, v.event.channel]);
    returnValue = ContentService.createTextOutput("ok");
  }
  else if(isChannelCreated(request))
  {
    let v = JSON.parse(request.postData.contents);
    let users = getUsers();
    const channelId = v.event.channel.id;
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");

    for(let user of users)
    {
      if(user == v.event.channel.creator) {
        continue;
      }
      sheet.appendRow([user, channelId]);
    }
    returnValue = ContentService.createTextOutput("ok");
  }
  else if(isChannelDeleted(request))
  {
    let v = JSON.parse(request.postData.contents);

    // GETTING THE SHEET
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
    if (sheet == null) {
      return ContentService.createTextOutput("Error: Sheet not found!");
    }
    let numRows = sheet.getLastRow();
    let subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();

    // CHECKING FOR EXISTING SUBSCRIPTIONS AND DELETING THEM
    for (let row = numRows-1; row >= 0; --row)
    {
      if (subscribtions[row][1] == v.event.channel) {
        sheet.deleteRow(row+2); 
      }
    }

    returnValue = ContentService.createTextOutput("");
  }
  else if(isTeamJoin(request))
  {
    let v = JSON.parse(request.postData.contents);
    returnValue = sendHelpMessage(v.event.user.id);
  }

  // HANDLING CHALLANGE
  else
  {
    if(typeof request !== 'undefined') {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName('DoPostData');
      sheet.getRange(1,1).setValue(JSON.stringify(request));
    }
    var v = JSON.parse(request.postData.contents);
    sheet.getRange(1,1).setValue(JSON.stringify(v));
    returnValue = ContentService.createTextOutput(v.challenge);
  }

  return returnValue;
}