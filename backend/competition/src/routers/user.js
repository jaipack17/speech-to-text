const express = require('express')
const User = require('../models/users')
const Users = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()
router.get('/user/me',auth,(req,res) => {   
        res.send(req.user)
})


router.post('/user/create',async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.send(e)
    }
    // user.save().then(() =>{
    //     res.status(201).send(user)   
    // }).catch((e) =>{
    //     res.send(e)
    // })


})
router.post('/user/login', async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }
    catch(e){
        console.log(e)
        res.status(404).send(e)
    }
})
router.post('/user/logout',auth, async (req, res) =>{
        try{
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !==req.token
            })
            await req.user.save()

            res.send()
        }
        catch(e){
            res.status(500).send()
        }
})
router.post('/user/logoutAll',auth, async (req, res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){

    }
})
router.patch('/user/update',auth,async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOpperation =updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOpperation){
        return res.status(400).send({error :'invalid updates'})
    }
    try {
        updates.forEach((update)=> req.user[update] = req.body[update] )
        await req.user.save()

        // const user = await Users.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidator: true})
        res.send(req.user)
        
    }
    catch(e){
        res.status(400).send(e)
        console.log(e)
    }

})
router.delete('/user/delete',auth, async(req,res) => {
    try {
    //     const deleteing =  await User.findByIdAndDelete(req.user._id)
    //     if(!deleteing){
    //         res.send('not available')
    //     }
    //     else{
    //     res.send('User deleted')}
    await req.user.remove()
    res.send(req.user)
    }

    catch(e){
        res.send(e)
        console.log(e)
    }

})
module.exports = router