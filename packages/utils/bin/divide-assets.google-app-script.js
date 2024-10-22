function distributeTokens() {
  var inputSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Output");

  // Check if output sheet exists, create if not
  if (!outputSheet) {
    outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Output");
  }

  // Get input data
  var inputData = inputSheet.getDataRange().getValues();

  // Define recipients
  var recipient1 = "0xRecipient1Address";
  var recipient2 = "0xRecipient2Address";

  // Define distribution ratio (50/50 in this example)
  var ratio1 = 0.5;
  var ratio2 = 0.5;

  // Process input data
  var outputData = [];
  for (var i = 1; i < inputData.length; i++) {
    var tokenName = inputData[i][0];
    var tokenSymbol = inputData[i][1];
    var tokenAddress = inputData[i][2];
    var tokenBalance = inputData[i][3];
    var tokenDecimals = inputData[i][4];

    // Calculate token amounts for each recipient
    var amount1 = tokenBalance * ratio1 / Math.pow(10, tokenDecimals);
    var amount2 = tokenBalance * ratio2 / Math.pow(10, tokenDecimals);

    // Create output rows
    outputData.push([
      tokenSymbol,
      tokenAddress,
      recipient1,
      amount1
    ]);
    outputData.push([
      tokenSymbol,
      tokenAddress,
      recipient2,
      amount2
    ]);
  }

  // Write output data to output sheet
  outputSheet.clearContents();
  outputSheet.getRange(1, 1, outputData.length, 4).setValues(outputData);
}