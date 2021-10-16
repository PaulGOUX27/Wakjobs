const csv = require("csv-parser")
const fs = require('fs')

async function getDataFromFile() {
    try {
        const fileHandle = await fs.open(`${__dirname}/data/gsheetdata.csv`, 'r')
        return await fileHandle.readFile();
    } catch (err) {
        console.error(`Error while reading file: ${err}`)
    }

    /* fs.open(`${__dirname}/data/gsheetdata.csv`, 'r').then((fileHandle) => {
        fileHandle.readFile().then((data) => {
            console.log(data)
        })
    }) */
}

function parseBool(string) {
    if(!string) return false
    return string.toLowerCase() === "oui" || string.toLowerCase() === 'yes';
}

const headersMap = [
    {name: 'startLevel', parse: parseInt},
    {name: 'startExp', parse: parseInt},
    {name: 'craftQuantity', parse: parseInt},
    {name: 'recipeLevel', parse: parseInt},
    {name: 'baseRecipeExp', parse: parseInt},
    {name: 'recipeName'},
    {name: 'percentageBonus', parse: parseFloat},
    {name: 'booster', parse: parseBool},
    {name: 'doubleWeekend',parse: parseBool},
    {name: null},
    {name: 'endLevel', parse: parseInt},
    {name: 'endExp', parse: parseInt},
    {name: "expFirstCraft", parse: parseInt}
]

function readTestData(callback) {
    const results = []
    fs.createReadStream(`${__dirname}/data/gsheetdata.csv`)
        .pipe(csv({
            strict: true,
            headers: headersMap.map(h => h.name),
            skipLines: 1,
            skipComments: true
            }
        ))
        .on('data', (data) => {
            for (const header of headersMap) {
                if (!header.name) continue;
                if (header.parse) {
                    data[header.name] = header.parse(data[header.name])
                }
            }
            return results.push(data)
        })
        .on('end', () => {
            console.log("Test data read complete");
            callback(results)
        })
}
module.exports = {readTestData};