function isSub(request) {
  if(request['parameter']['command'] == '/sub') {
    return true;
  }
  return false;
}

function isUnsub(request) {
  if(request['parameter']['command'] == '/unsub') {
    return true;
  }
  return false;
}

function isGetSub(request) {
  if(request['parameter']['command'] == '/getsubs') {
    return true;
  }
  return false;
}

function isHelp(request) {
  if(request['parameter']['command'] == '/help') {
    return true;
  }
  return false;
}

function isThread(request)
{
  var v = JSON.parse(request.postData.contents);
  if(v['event'])
  {
    if(v['event']['thread_ts'])
    {
      return true;
    }  
  }

  return false;
}

function subReaction(request)
{
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'reaction_added' && v['event']['reaction'] == 'subscribe') 
    {
      return true;
    }
  }
  return false;
}

function removeSubReaction(request)
{
  var v = JSON.parse(request.postData.contents);

  if(v['event'])
  {
    if(v['event']['type'] == 'reaction_removed' && v['event']['reaction'] == 'subscribe')
    {
      return true;
    }
  }

  return false;
}

function isReactionEvent(request) {
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'reaction_added') 
    {
      return true;
    }
  }
  return false;
}

function isMemberJoined(request) {
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'member_joined_channel') 
    {
      return true;
    }
  }
  return false;
}

function isMemberLeft(request) {
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'member_left_channel') 
    {
      return true;
    }
  }
  return false;
}

function isChannelCreated(request) {
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'channel_created') 
    {
      return true;
    }
  }
  return false;
}

function isChannelDeleted(request) {
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'channel_deleted') 
    {
      return true;
    }
  }
  return false;
}

function isTeamJoin(request) {
  var v = JSON.parse(request.postData.contents);

  if(v['event']) 
  {
    if(v['event']['type'] == 'team_join') 
    {
      return true;
    }
  }
  return false;
}