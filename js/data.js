function getformatedData(){
	return formatData(downloadJSON('recipes'), downloadJSON('items'), downloadJSON('jobsItems'), downloadJSON('recipeResults'))
}

function downloadJSON(JSONName, async = false){
	toReturn = []
	jQuery.ajax({
        url: 'https://wakfu.cdn.ankama.com/gamedata/1.67.2.178339/'+ JSONName + '.json',
        //headers: {'Access-Control-Allow-Origin' : '*'},
        success: function (result) {
        	toReturn = result
        },
        async: async
	});
	return toReturn;
}

function rarityIdToString(id) {
	switch(id){
		case 0:
			return "commun"
		case 1:
			return "unusual"
		case 2:
			return "rare"
		case 3:
			return "mythical"
		case 4:
			return "legendary"
		case 5:
			return "relique"
		case 6:
			return "souvenir"
		case 7:
			return "epique"
		default:
			return 'unknown'
	}
}

function formatData(recipes, items, jobsItems, recipeResults){
	let recipesReturned = []

	//some jobsItems don't have title, juste remove them
	jobsItems = jobsItems.filter(function(jobItem){
		return jobItem.title !== undefined
	})

	recipeResults.forEach(function(recipeResult){
		recipe = recipes.find(function(recipe){
    		return recipeResult.recipeId === recipe.id
    	})
		item = undefined
    	item = items.find(function(item){
    		return recipeResult.productedItemId === item.definition.item.id
    	})

    	if (item !== undefined){
			recipeToAdd = {
				recipe : {
					'xpRatio' : recipe.xpRatio,
					'level' : recipe.level,
					'id' : recipe.id,
				},
				item : {
					'id' : item.definition.item.id,
					'title' : item.title,
					'rarity' : rarityIdToString(item.definition.item.baseParameters.rarity),
					'imageId' : item.definition.item.graphicParameters.gfxId
				}
			}
		} else { //every jobItem is not in item, so, let's go have a look
    		item = jobsItems.find(function(jobItem){
	    		return recipeResult.productedItemId === jobItem.definition.id
	    	})
	    	if (item !== undefined) {
				recipeToAdd = {
					recipe : {
						'xpRatio' : recipe.xpRatio,
						'level' : recipe.level,
						'id' : recipe.id,
					},
					item : {
						'id' : item.definition.id,
						'title' : item.title,
						'rarity' : rarityIdToString(-1), //we don't know
						'imageId' : item.definition.graphicParameters.gfxId
					}
				}
	    	}
		}
    	if (item !== undefined){
			recipesReturned.push(recipeToAdd)
		}
	})
	return recipesReturned
}