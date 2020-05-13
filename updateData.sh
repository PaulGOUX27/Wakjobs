# Arguments : file_to_download wakfu_version out_file
# file_to_download : don't pass extension.
# Example : to download recipes JSON file, run : downloadJSONWakfuFile recipes $WAKFU_VERSION recipes.json
downloadJSONWakfuFile(){
	echo "Download https://wakfu.cdn.ankama.com/gamedata/${2}/${1}.json to ${3}"
	curl "https://wakfu.cdn.ankama.com/gamedata/${2}/${1}.json" -o $3
}

dos2unix updateData.sh
mkdir -p data
cd data

ACTUAL_WAKFU_VERSION=$(curl "https://wakfu.cdn.ankama.com/gamedata/config.json" | jq '.version' -r)
LATEST_DOWNLOADED_WAKFU_VERSION=$(cat wakfuConfig.json | jq '.version' -r)

echo "Actual files version is $LATEST_DOWNLOADED_WAKFU_VERSION"
echo "Latest Wakfu version is $LATEST_DOWNLOADED_WAKFU_VERSION"

if [[ $ACTUAL_WAKFU_VERSION == $LATEST_DOWNLOADED_WAKFU_VERSION ]]; then
	echo "Same versions, files are up to date, nothing to do, exit"
	exit
fi

echo "Files are not at the latest version, go to update them"
echo
curl "https://wakfu.cdn.ankama.com/gamedata/config.json" -o wakfuConfig.json
WAKFU_VERSION=$(cat wakfuConfig.json | jq '.version' -r)

# Download wakfu's jsons in tmp files
downloadJSONWakfuFile recipes $WAKFU_VERSION recipes.json
downloadJSONWakfuFile items $WAKFU_VERSION items.json
downloadJSONWakfuFile jobsItems $WAKFU_VERSION jobsItems.json
downloadJSONWakfuFile recipeResults $WAKFU_VERSION recipeResults.json