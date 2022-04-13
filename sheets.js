const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config()

module.exports = async function getData() {
    const doc = new GoogleSpreadsheet('1h1ye4D-zT64de2bOjfePVqv_-0tQxG7OC-VPXAcVU8Q')

    doc.useApiKey(process.env.GOOGLE_API)

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    await sheet.loadCells()
    const numCells = sheet.cellStats.nonEmpty
    const termArr = []

    for (let i = 2; i <= numCells; i++) {
        const value = sheet.getCellByA1(`A${i}`).value
        termArr.push(value)
    }

    return termArr

}



