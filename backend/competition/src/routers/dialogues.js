const express = require('express')
const User = require('../models/users')
const Task = require('../models/dialogue')
const Tasks = require('../models/dialogue')
const Users = require('../models/users')
const auth = require('../middleware/auth')
const fs = require('fs')
const router = new express.Router()


router.get('/alldialogues',auth,async(req,res) => {

       try{
        const task = await Task.find({owner: req.user._id})
        var tasks = new Array();
        task.forEach (function(item, index, array){
            tasks.push({speaker: item.Speaker, lines: item.Discription})
        } );
                res.send(tasks)
            }
            catch(e){
                console.log(e)
                res.status(404).send(e)
            }
       
    
})

router.get('/dialogues/find_by_date',auth,async(req,res) => {
    try{
        const task = await Task.findByCredentials(req.body.Date)
        //console.log(task)
var tasks = new Array();
task.forEach (function(item, index, array){
    tasks.push({speaker: item.Speaker, lines: item.Discription})
} );
        res.send(tasks)
    }
    catch(e){
        console.log(e)
        res.status(404).send(e)
    }
    // const _id= req.params.id
    // try {   
    //     const task = await Task.findOne({Date, owner: req.user.Date})
    //     if(!task){
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // }catch(e){
    //     res.send(e)
    //     console.log(e)
    // }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // })
})
router.post('/dialogues/stop',auth,async(req,res) =>{
    data ="false"
    fs.writeFileSync('notes.txt', data)
    await sleep(6000);
    text = fs.readFileSync('text.txt')
    text = text.toString('utf8')
    console.log(text)
    try{ 
        res.send(text)
        } catch(e){
    res.send(e)
}
  
})
 
router.post('/dialogue/start',auth,async(req,res) =>{
    data ="true"
    fs.writeFileSync('text.txt', '')
    fs.writeFileSync('notes.txt', data)
    res.send("started")

})
router.post('/dialogue/create',auth ,async (req,res) => {
    const task = new Task ({   
         ...req.body,
         owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(text)
    } catch(e){
        res.status(401).send(e)
    }
})

// router.delete('/tasks/:id', auth ,async(req,res) => {
//     try {
//         const deleteing =  await Task.findByIdAndDelete({_id: req.params.id,  owner: req.user._id})
//         if(!deleteing){
//             res.send('not available')
//         }
//         else{
//         res.send('task deleted')}
//     }
//     catch(e){
//         res.send(e)
//         console.log(e)
//     }

// })
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}   
module.exports = router