// .then(fullfill, reject)
// .catch

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/class12");

const CatSchema = new mongoose.Schema({
    name: String,
    lives: {type: Number, required: true, min: 1}
})

const Cat = mongoose.model("Cat", CatSchema);

const c = new Cat({
    name: "foo",
    lives: 1
})

/*
const p = c.save()
p.then(savedCat => {
    console.log("saved ur cat", savedCat);
})
*/
// console.log("AFTYER");
// AT THE TOP LEVEL (outside of functions)
// 1. put everything within then
// 2. await

// const savedCat = await c.save();
// console.log(savedCat);
// console.log("AFTER SAVE");
// this ---> set the fxn to call when promise succeeds (fullfilled)
// * set the fxn to call when promise succeeds (fulfilled)
// * also, second arg is possibly fail / reject func
// reeject --> set the fxn to call when promise fails
// if promise is at top level, you can await


async function createCat() {
    // if promise is in fxn, u can await with async
    const c = new Cat({
        name: "foo",
        lives: 1
    })

    const savedCat = await c.save(); // returns a promise
    console.log("saved ur cat", savedCat);
    console.log("INSIDE: AFTER SAVE");

}

createCat();
console.log("OUTSIDE: after");


app.get("/cats", async (req, res) => {
    const foundCats = await Cat.find({});
    res.render("cats", {cats: foundCats});
});