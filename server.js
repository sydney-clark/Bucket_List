const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bucketList = require(`./models/list.js`); 
const bucketListSchema = require('./models/listSchema.js');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')); 
app.use("/public", express.static(__dirname + "/public"));

// ========================
// Seed Route
// ========================

app.get('/bucket_list/seed', (req, res) => {
	bucketListSchema.create(bucketList, (error, seedData) => { //use this line for every route, need scheme and pokemonjs file
		res.send(seedData);
	});
});

// ========================
// Index
// ========================

app.get('/bucket_list', (req, res) => {
    bucketListSchema.find({}, (bucketList, (error, allPlaces) => {
        res.render(
            'index.ejs',
            {
                places:allPlaces,
            }
        )
    })
    )
})

// =======================
// New
// =======================

app.get('/bucket_list/new', (req, res) => {
    res.render('new.ejs');
});

// =======================
// Create //processes the data that is submitted in the form
// =======================

//data not being recorded??
app.post('/bucket_list', (req, res) => {
    console.log("new place")
    req.body.visited === 'on'?req.body.visited=true:req.body.visited=false;
    bucketListSchema.create(req.body, (error, createdBucketList) => {
        res.send(req.body)
    })
    //  res.send(req.body);
})

// =======================
// Show
// =======================

app.get('/bucket_list/:id', (req, res) => {
    bucketListSchema.findById(req.params.id, (error, foundBucketList) => {
        res.render(
            'show.ejs',
            {
                showBucketList:foundBucketList
            }
        );
    });
})

// =======================
// Delete
// =======================

//data not being recorded??
app.delete('/bucket_list/:id', (req, res)=>{ //delete step 2 (create the route the button follows)
    bucketListSchema.findByIdAndRemove(req.params.id, (err, data) => {
        console.log('delete')
        res.redirect("/bucket_list");
    })
    // res.send('deleting...');
});

// =======================
// Edit
// =======================

app.get('/bucket_list/:id/edit', (req, res)=>{
    bucketListSchema.findById(req.params.id, (err, foundBucketList)=>{ 
        res.render(
            'edit.ejs', 
            {
                places: foundBucketList
            }
    );
    });
});

//data not being recorded??
app.put('/bucket_list/:id', (req, res)=>{
    console.log("edited place");
    req.body.visited === 'on'?req.body.visited=true:req.body.visited=false;
    bucketListSchema.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBucketList)=>{
    res.send(updatedBucketList);
    });
});
// =======================
// Listener
// =======================

mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost:27017/bucketList', () => {
    console.log('The connection with mongodb is established');
})

app.listen(3000, () => {
    console.log('listening...');
})