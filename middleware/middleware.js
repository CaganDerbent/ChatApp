const jwt = require("jsonwebtoken")
const User = require("../models/chatuser")

const checkUser = (req,res,next)=>{

  const token = req.cookies.jwt

  if(token){
    jwt.verify(token , 'secret', async (err,decodedToken)=>{
      if(err){
        console.log(err)
        res.locals.user = null
      }
      else{
        console.log("decodedToken: "+decodedToken)
        try{
          let user = await User.findById(decodedToken.id)
          res.locals.user = user
          console.log("user: "+user)
          next()
        }
        catch(err){
          console.log(err)
          res.locals.user = null
          next()

        }
      }
    })
  }
  else{
    console.log("bruhh")
    res.locals.user = null
    next()
  }

}
module.exports = {checkUser}