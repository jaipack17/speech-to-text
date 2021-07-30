const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Task = require('./dialogue')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
       
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength: 7,
       
    },
    age: {
        type: Number,
        default: 0,

    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})
userSchema.virtual('tasks', {
    ref: 'Task',
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.generateAuthToken = async function(){
    user = this
    const token = jwt.sign({_id:user._id.toString()},'helloletsplaynode')
    
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token 
}
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({email})
    if(!user){
        throw new error ("user doesnt exist")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new error("unable to login")
    }
    return user
}
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
         user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next){
    const user = this
   await  Task.deleteMany({owner : user._id})
    next()
})
const Users = mongoose.model('User',userSchema)  
module.exports = Users