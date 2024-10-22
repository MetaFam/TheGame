function distributeTokens() {
  const input = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const inputData = input.getDataRange().getValues()

  const recipients = [
    '0x13251746A15A687c14E22A25739fbBfa60F29b22',
    '0x0078aE1617b89bbf219ebEE143CAD69461805026',
  ]
  const ratio = 0.5

  const outputData = (
    [['token_type', 'token_address', 'receiver', 'amount', 'id']]
  )
  for (let i = 1; i < inputData.length; i++) {
    let [name, symbol, address, balance, decimals] = inputData[i]
    decimals = decimals == null || decimals === '' ? 18 : decimals
    const half = balance * ratio
    const amounts = [half, balance - half].map(
      (amt) => amt / Math.pow(10, decimals)
    )

    recipients.forEach((rcpt, idx) => {
      outputData.push([
        !!symbol ? 'erc20' : 'native',
        address,
        rcpt,
        amounts[idx],
      ])
    })
  }

  if(outputData.length <= 1) {
    Logger.log('No output rows.')
  } else {
    const name = `${input.getName()} Divided`
    let output = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)

    if (!output) {
      output = SpreadsheetApp.getActiveSpreadsheet().insertSheet(name)
    }

    output.clearContents()
    output.getRange(1, 1, outputData.length, outputData[0].length).setValues(outputData)
  }
}