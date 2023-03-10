import express from "express"
const app =  express();

// app.post("/", (req, res) => {
//     const c = new Cat....
//     res.redirect("/");
// });

app.get("/cat", async (req, res) => {
    // if u use await within func, func must be defined as async
    const cats = await Cats.find({});
    res.render("cats", {cats});
})
app.listen(3000);