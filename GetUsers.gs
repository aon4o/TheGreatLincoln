function getUsers() 
{
  const users = makeRequest(URL_FOR_USERS, {}, 'post');
  var jsonOut = JSON.parse(users);
  var userIds = [];

  for(let i in jsonOut.members) {
    if(jsonOut['members'][i]['is_bot']) {
      continue;
    }
    userIds.push(jsonOut['members'][i]['id']);
  }

  Logger.log(userIds);
  return userIds;
}