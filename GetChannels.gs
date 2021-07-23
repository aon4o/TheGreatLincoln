function getChannels() 
{
  const channels = makeRequest(URL_FOR_CHANNELS, {}, 'post');
  var jsonOut = JSON.parse(channels);
  var channelsList = {};

  for(let i in jsonOut.channels) 
  {
    var obj = jsonOut['channels'][i];
    channelsList[obj["name"]] = obj["id"];
  }

  console.log(channelsList);
  return channelsList;
}