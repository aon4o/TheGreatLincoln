function subscribe(user, channel) {
  // IF NO CHANNEL ARGUMENT IS GIVEN
  if (typeof channel != 'string' || channel.length == 0) {
    return subscribeAll(user);
  }

  // CHECKING IF THE CHANNEL EXISTS
  let channels = getChannels();
  if (typeof channels[channel] == 'undefined') {
    return ContentService.createTextOutput("Channel with name '" + channel + "' does not exist!");
  }

  // GETTING THE INFORMATION FROM THE SHEET
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
  if (sheet == null) {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }
  let numRows = sheet.getLastRow();
  var subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();

  // CHECKING FOR EXISTING SUBSCRIPTION
  for (let i = 0; i < numRows; ++i) {
    if (subscribtions[i][0] == user && subscribtions[i][1] == channels[channel]) {
      return ContentService.createTextOutput("You are already subscribed to channel: " + channel + "!");
    }
  }

  // IF THERE IS NO ERROR SAVE
  sheet.appendRow([user, channels[channel]])
  return ContentService.createTextOutput("Successfully subscribed to channel: " + channel + "!");
}

function unsubscribe(user, channel) {
  // IF NO CHANNEL ARGUMENT IS GIVEN
  if (typeof channel != 'string' || channel.length == 0) {
    return unsubscribeAll(user);
  }

  // CHECKING INPUT
  if (typeof user != 'string' || user.length == 0) {
    return ContentService.createTextOutput("Error: Bad Input!");
  }

  // CHECKING IF THE CHANNEL EXISTS
  let channels = getChannels();
  if (typeof channels[channel] == 'undefined') {
    return ContentService.createTextOutput("Channel with name '" + channel + "' does not exist!");
  }

  // GETTING THE INFORMATION FROM THE SHEET
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
  if (sheet == null) {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }
  let numRows = sheet.getLastRow();
  var subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();
  Logger.log(subscribtions);

  // SEARCHING FOR THE SUBSCRIBTION
  for (let i = 0; i < numRows; ++i) {
    if (subscribtions[i][0] == user && subscribtions[i][1] == channels[channel]) {
      sheet.deleteRow(i + 2);
      return ContentService.createTextOutput("Subscription successfully removed!");
    }
  }

  // IF SUBSCRIPTION NOT FOUND
  return ContentService.createTextOutput("Error: Subscribtion not found!");
}

function subscribeAll(userId)
{
  // GETTING THE NEEDED INFORMATION
  let channels = getChannels();
  let userChannels = getUserChannels(userId);
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
  if (sheet == null) {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }
  let numRows = sheet.getLastRow();
  var subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();
  
  // SUBSCRIBING
  let newSubscriptions = 0;
  let existsFlag = false;
  for(let ch in channels)
  {
    let existsFlag = false;

    // CHECKING IF THE SUBSCRIBTION EXISTS
    if(!userChannels.includes(channels[ch])) {
      for (let i = 0; i < numRows; ++i) {
        if (subscribtions[i][0] == userId && subscribtions[i][1] == channels[ch]) {
          existsFlag = true;
          break;
        }
      }
      if(existsFlag) {
        continue;
      }

      sheet.appendRow([userId, channels[ch]]);
      ++newSubscriptions;
    }
  }

  // RETURNING SUCCESS MESSAGE
  if(newSubscriptions == 0) {
    return ContentService.createTextOutput("You are already subscribed to all channels that you are not a member of!");
  }
  else {
    return ContentService.createTextOutput("Successfully subscribed to " + newSubscriptions + " channels!");
  }
}

function unsubscribeAll(userId) {
  // GETTING THE INFORMATION FROM THE SHEET
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions");
  if (sheet == null) {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }
  let numRows = sheet.getLastRow() - 1;
  var subscribtions = sheet.getRange(2, 1, numRows, 2).getValues();
  Logger.log(subscribtions);

  // SEARCHING FOR THE SUBSCRIBTION
  let deletedSubscribtions = 0;
  for (let i = numRows - 1; i >= 0; --i) {
    if (subscribtions[i][0] == userId) {
      Logger.log(subscribtions[i][0]);
      sheet.deleteRow(i + 2);
      ++deletedSubscribtions;
    }
  }

  // RETURNING SUCCESS MESSAGE
  if(deletedSubscribtions == 0) {
    return ContentService.createTextOutput("You are already unsubscribed from all channels!");
  }
  else {
    return ContentService.createTextOutput("Successfully unsubscribed from " + deletedSubscribtions + " channels!");
  }
}

function subAllTest()
{
  subscribeAll("U027G1RG880");
}
function unsubAllTest()
{
  unsubscribeAll("U027G1RG880");
}