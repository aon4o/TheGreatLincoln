function getSubs(user) {
  // CHECKING INPUT
  if (typeof user != 'string' || user.length == 0) {
    return ContentService.createTextOutput("Error: Bad Input: USER!");
  }

  // CHECKING IF THE USER EXISTS
  let users = getUsers();
  if (!users.includes(user)) {
    return ContentService.createTextOutput("Error: User does not exist!");
  }

  // GETTING THE INFORMATION FROM THE SHEET
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
  if (sheet == null) {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }
  let numRows = sheet.getLastRow();
  var subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();
  Logger.log(subscribtions);

  // ADDING THE CHANNLS TO A STRING
  let channels = getChannels();
  let response = "You are subscribed to: "
  let flag = true;
  for (let row in subscribtions) {
    if (subscribtions[row][0] == user) {
      for (let channel in channels) {
        // Logger.log([channels[channel], subscribtions[row][1]]);
        if(channels[channel] == subscribtions[row][1]) {
          flag = false;
          Logger.log(channel);
          response += channel;
          response += ", ";
          break;
        }
      }
    }
  }

  // RETURNING
  if (flag) {
    response = "You are not subscribed to any channels!"
    return ContentService.createTextOutput(response);
  }
  response = response.slice(0, -2);
  response += '!';
  return ContentService.createTextOutput(response);
}

function getSubsMain() {
  (getSubs('U027G1RG880'));
}