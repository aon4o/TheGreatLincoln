function removeThreadSub(user_id, timest) 
{
  let tsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Threads");

  if (tsheet == null) 
  {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }

  let numRows = tsheet.getLastRow();
  let threadsSubs = tsheet.getRange(2, 1, numRows, 2).getValues();

  for(let i in threadsSubs)
  {
    if(threadsSubs[i][0] == user_id && threadsSubs[i][1] == timest)
    {
      tsheet.deleteRow(Number.parseInt(i) + 2);
      answerMsg("Your thread sub was removed!", user_id);
      break;
    }
  }
}
