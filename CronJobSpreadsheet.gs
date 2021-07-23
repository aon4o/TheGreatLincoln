function executeCronJob() 
{
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reactions");
  if (sheet == null) 
  {
    return ContentService.createTextOutput("Error: Sheet not found!");
  }

  let numRows = sheet.getLastRow();
  var reacts = sheet.getRange(2, 1, numRows, 2).getValues();
  var rowsDeleted = 0;

  for(let i = 0 ; i < numRows - 1 ; i++)
  {
    let t = Date.now() - reacts[i][0] * 1000;
    t = t / (1000 * 60 * 60 * 24);
    console.log(t)
    if(t > 1)
    {
      sheet.deleteRow(parseInt(i) + 2 - rowsDeleted);
      rowsDeleted++;
    }
  }
}
