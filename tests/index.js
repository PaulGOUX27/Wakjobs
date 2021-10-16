const t = require('./CSVReader')
const tests = require('./tests')

t.readTestData((testData) => {
    try {
        tests.testExpFirstCraft(testData)
        tests.testReverse(testData)

        console.log("All test are OK")
    } catch (err) {
        console.error('An error occurred')
        console.error(err.message)
    }

});
