function getChannelByID(id) {
  let channels = getChannels();
  for(let ch in channels) {
    if(channels[ch] == id) {
      return ch;
    }
  }
}
