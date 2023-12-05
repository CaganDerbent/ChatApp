const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const chatuserSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
})

chatuserSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            return user;
        }
        else{
            throw new Error("Incorrect password")
        }
    }
    else{
        throw new Error("User not found")
    }
}

chatuserSchema.pre('save', async function(next){ // async await öncelikli kod bloğu
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()

})

const chatusers = 'chatusers'


const chatUser = mongoose.model('chatuser',chatuserSchema,chatusers)
module.exports = chatUser;