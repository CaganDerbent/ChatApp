const jwt = require('jsonwebtoken')
const maxAge = 60*60*24
const User = require('../models/chatuser')


const createToken = (id)=>{
    return jwt.sign({id},'secret',{expiresIn:maxAge})
}

const login_get = (req,res)=>{
    res.render("login")
}
const login_post = async (req,res)=>{
    const {password,email} = req.body
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true, maxAge:maxAge * 1000})
        res.redirect("/")
    }
    catch(err){
        console.log(err)
        res.status(400).send(err.messsage)
    }
}

const register_get = (req,res)=>{
    res.render("register")
}
const register_post = (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)
    user.save()
    .then((result)=>{
        res.redirect("/login")
    })
    .catch((err)=>{
        console.log(err)

    })

}
const logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
  }
module.exports = {
    login_get,
    login_post,
    register_get,
    register_post,
    logout_get
}

