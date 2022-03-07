const express = require("express");
const users = require("./model/users");
var bodyParser = require('body-parser');


const mongoose = require('mongoose');
var methodOverride = require('method-override');
mongoose.connect('mongodb://localhost:27017/assignment_4');
const app = express();


app.use(methodOverride('_method'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))


app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/', async (req, res) => {
    var data = await users.find();
    res.render('homepage', { data })
});

app.get('/form', (req, res) => {
    res.render('form')
});

app.post("/users/add", async (req, res) => {

    try {
        await users.create({
            name: req.body.name,
            email: req.body.email,
            isPromoted: null
        })
    }
    catch (err) {
        console.log(err);
    };

    res.redirect('/');
})

app.put("/users/:id", async (req, res) => {

    //await users.updateOne({ _id: req.params.id }, { $set: { isPromoted: { $not: "$isPromoted" } } });

    const isPromoted = await users.find({ _id: req.params.id });
    //console.log(isPromoted);
    //console.log("isPromoted = >",isPromoted[0].isPromoted);
    if (isPromoted[0].isPromoted === false || isPromoted[0].isPromoted === null) {
        await users.updateOne(
            { _id: req.params.id },
            { isPromoted: true }

        )
    }
    else {
        await users.updateOne(
            { _id: req.params.id },
            { isPromoted: false }

        )
    }
    res.redirect("/");
})


app.delete("/users/:id", async (req, res) => {
    await users.deleteOne({ _id: req.params.id });

    res.redirect("/");
})

app.listen(3000, () => console.log("Server is listening")); 