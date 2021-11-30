const users=[]
function userjoin (id,username,room)
{
  const user={id,username,room}
  users.push(user)
  return user
}
function getuser (id)
{
    return users.find(user=>user.id==id)
}
function userleft (id)
{
  const index=users.findIndex(user=>user.id==id)
  console.log(index)
  if (index!==-1)
  {
     return users.splice(index,1)[0]
  }
}
function getroom(room)
{
  return users.filter(user=>user.room==room)
}

module.exports={userjoin,getuser,userleft,getroom}
