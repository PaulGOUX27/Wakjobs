var hasardCraft = false

function xpLevel(level) {
  return 75 + 150 * level
}

function xpNiveauTotal(niveau) {
  return 75 * niveau * niveau
}

function updateCoefficientCraft(niv) {
  if (niv <= 9 && niv > 0) {
	hasardCraft = true
	return 1 + niv / 10
  } else if (niv >= -10 && niv <= 0)
    return 1
  else
    switch (niv) {
      case -11:
        return 0.976
      case -12:
        return 0.904
      case -13:
        return 0.794
      case -14:
        return 0.654
      case -15:
        return 0.50
      case -16:
        return 0.346
      case -17:
        return 0.206
      case -18:
        return 0.096
      case -19:
        return 0.024
      default:
      	throw "Difference in level too great"
    }
}

function xpByCraft(currentLevel, recipeLevel, baseXpRecipe, percentage, booster, weekend){
	let coefficientCraft = updateCoefficientCraft(recipeLevel - currentLevel)
	if (booster)
		baseXpRecipe *= 1.5
	let gainedExperience = Math.floor(baseXpRecipe * coefficientCraft * (1 + (percentage / 100)))
	if (weekend)
		gainedExperience *= 2
	return gainedExperience
}

function nbCraft(nivDepart, nivArrive, xpDepart, recipeLevel, recipeExperience, percentage, booster, weekend) {
	hasardCraft = false
	let nbCraft = 0;
	let currentLevel = nivDepart
	let currentExperience = xpDepart
	
	gainedExperience = xpByCraft(currentLevel, recipeLevel, recipeExperience, percentage, booster, weekend)

	while (currentLevel < nivArrive) {
		nbCraft++;
		currentExperience += gainedExperience;
		while (currentExperience >= xpLevel(currentLevel)) {
			currentLevel += 1
			currentExperience -= xpLevel(currentLevel - 1)
		}
		gainedExperience = xpByCraft(currentLevel, recipeLevel, recipeExperience, percentage, booster, weekend)
	}
	return { "nbCraft": nbCraft, "hasardCraft" : hasardCraft }
}

function reverse(nivDepart, nbCraft, xpDepart, recipeLevel, recipeExperience, percentage, booster, weekend) {
	hasardCraft = false
	let currentLevel = nivDepart
	let currentExperience = xpDepart
	let coefficientCraft = updateCoefficientCraft(recipeLevel - currentLevel)
	let craftDone = 0
	gainedExperience = xpByCraft(currentLevel, recipeLevel, recipeExperience, percentage, booster, weekend)
	while (craftDone < nbCraft) {
		craftDone++;
		currentExperience += gainedExperience;
		while (currentExperience >= xpLevel(currentLevel)) {
			currentLevel += 1
			currentExperience -= xpLevel(currentLevel - 1)
		}
		gainedExperience = xpByCraft(currentLevel, recipeLevel, recipeExperience, percentage, booster, weekend)
	}
	return {"level": currentLevel, "experience": currentExperience, "hasardCraft" : hasardCraft }
}
