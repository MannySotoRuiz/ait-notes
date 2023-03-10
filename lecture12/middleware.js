import express from "express";
const app = express();

// pre-emptively send back response
// set properties on the req and res
function checkHostHeaeder(req, res, next) {
    const hostHeader = req.get("Host");
    if (hostHeader) {
        next();
    } else {
        res.status(400).send("bad request, missing host header");
    }

}

app.use(checkHostHeaeder);

app.get("/", (req, res) => {
    res.send("this worked");
});


// create a middleware fxn that will send back
// 400 if there's no Host header

/*
app.use() // called first
app.use() // may be called next depending on above
*/


app.listen(3000);