# Scripts
## Update data script
Before running script, make sure you have the following requirements by running
```
sudo apt-get install dos2unix jq
```
- `dos2unix ` is useful when running scripts in WSL
- `jq` for reading JSON in terminal

To update data, simply run 
```
./updateData.sh
```
If you are at the latest version defined [here](https://wakfu.cdn.ankama.com/gamedata/config.json), files are not changed.  
Oterwise, they are downloaded.  

To force the download, change the version number in `data/wakfuConfig.json`