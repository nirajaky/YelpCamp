var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

// CREATING MONGOOSE SCHEMA
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// //ADDING CAMPGROUNG TO DB
//Campground.create({
//    name: "Niraj Mehta",
//    image: "https://farm4.staticflickr.com/3247/2984118763_043f6f486e.jpg",
//    description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. ... Camping can be enjoyed through all four seasons."
//    },function (err, campground) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log("Campground Added");
//            console.log(campground);
//        }
//});

app.get("/", function (req, res) {
    res.render("landing.ejs");
});

// INDEX Show all Campground 
app.get("/campgrounds", function (req, res) {
    // Get all campground from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds.ejs", { campgrounds: allCampgrounds });
        }
    });
    
});

// CREATE Add new Campground to DB
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };
    // Create a new Campground and save it to DB
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground Added");
            console.log(campground);
            // Redirect it back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW- Show form to create new Campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

// Show Delail info of one given id campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render the show templete with that id
            res.render("show.ejs", {campground: foundCampground});
        }
    });
});

app.listen(1000, function () {
    console.log("The YelpCamp Server is running");
});