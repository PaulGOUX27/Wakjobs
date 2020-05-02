function xpLevel(level) {
  return 75 + 150 * level
}

function xpNiveauTotal(niveau) {
  return 75 * niveau * niveau
}

function updateCoefficientCraft(niv) {
  if (niv <= 9 && niv > 0)
    return 1 + niv / 10
  else if (niv >= -10 && niv <= 0)
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

function xpByCraft(jobLevel, recipeLevel, baseXpRecipe, booster, weekend){
	
}

function nbCraft(nivDepart, nivArrive, xpDepart, recipeLevel, recipeExperience, percentage, booster, weekend) {
	let nbCraft = 0;
	let currentLevel = nivDepart
	let currentExperience = xpDepart
	let coefficientCraft = updateCoefficientCraft(recipeLevel - currentLevel)
	if (booster)
		recipeExperience *= 1.5
	let gainedExperience = (recipeExperience * coefficientCraft * (1 + (percentage / 100)))
	if (weekend)
		gainedExperience *=2
	do {
		nbCraft++;
		currentExperience += gainedExperience;
		while (currentExperience >= xpLevel(currentLevel)) {
			currentLevel += 1
			currentExperience -= xpLevel(currentLevel - 1)
		}
		coefficientCraft = updateCoefficientCraft(recipeLevel - currentLevel)
		gainedExperience = (recipeExperience * coefficientCraft * (1 + (percentage / 100)))
	} while (currentLevel < nivArrive)
	return nbCraft
}

function reverse(nivDepart, nbCraft, xpDepart, recipeLevel, recipeExperience, percentage, booster, weekend) {
	let currentLevel = nivDepart
	let currentExperience = xpDepart
	let coefficientCraft = updateCoefficientCraft(recipeLevel - currentLevel)
	let craftDone = 0
	if (booster)
		recipeExperience *= 1.5
	let gainedExperience = (recipeExperience * coefficientCraft * (1 + (percentage / 100)))
	if (weekend)
		gainedExperience *=2
	do {
		craftDone++;
		currentExperience += gainedExperience;
		while (currentExperience >= xpLevel(currentLevel)) {
			currentLevel += 1
			currentExperience -= xpLevel(currentLevel - 1)
		}
		coefficientCraft = updateCoefficientCraft(recipeLevel - currentLevel)
		gainedExperience = (recipeExperience * coefficientCraft * (1 + (percentage / 100)))
	} while (craftDone < nbCraft)
	console.log(craftDone, nbCraft)
	console.log(currentLevel, currentExperience)
	return nbCraft
}
