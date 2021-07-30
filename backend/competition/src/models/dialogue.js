const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Speaker:{
        type: String,
        required: true
    },
    Date:{
        type: Number,
        required: true
    },
    Year:{
        type:String,
        required: true
    },
    Discription: {
        type: String,
        required: true
    },

    owner :{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    }
})

userSchema.statics.findByCredentials = async (Date) => {
    const task = await Task.find({Date})
    if(!task){
        throw new error ("task doesnt exist")
    }
    return task
}
const Task = mongoose.model('Task', userSchema)  

module.exports =Task