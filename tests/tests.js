const scripts = require("../js/scripts")
const assert = require("assert")

function testExpFirstCraft(testData) {
    testData.forEach((d, i) => {
        const val = scripts.xpByCraft(d.startLevel, d.recipeLevel, d.baseRecipeExp,
            d.percentageBonus, d.booster, d.doubleWeekend)
        assert.equal(val, d.expFirstCraft, `First craft exp is not the same at ${i + 1}`)
    })
}

function testReverse(testData) {
    testData.forEach((d, i) => {
        const val = scripts.reverse(d.startLevel, d.craftQuantity, d.startExp, d.recipeLevel,
            d.baseRecipeExp, d.percentageBonus, d.booster, d.doubleWeekend)
        assert.equal(val.level, d.endLevel, `Reverse craft quantity is incorrect at ${i + 1}`)
        assert.equal(val.experience, d.endExp, `Reverse craft experience is incorrect at ${i + 1}`)
    })
}


module.exports = {testExpFirstCraft, testReverse}