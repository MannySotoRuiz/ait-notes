import express from "express";
import session from "express-session";
const app = express();

app.set("view engine", "hbs");

// give us access to req.body
app.use(express.urlencoded({ extended: false }));

const sessionOptions = {
    secret: "secret for signing session id",
    saveUninitialized: false,
    resave: false
}
app.use(session(sessionOptions));
// this gives us access to req.session (writable and readable... specific for returning client/session)
// a site that remembers your name

app.post("/", (req, res) => {
    console.log(req.body.name);
    req.session.name = req.body.name;
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render("home", {name: req.session.name});
});

// try to use Set-Cookie heaeder
app.get("/bake", (req, res) => {
    // appends allows adding multiple headers w same name
    res.append("Set-Cookie", "color=red");
    res.append("Set-Cookie", "sessid=1234;HttpOnly"); // using HttpOnly cannot be read by client side JS
    res.send("made u some cookies");
});

app.get("/peek", (req, res) => {
    const s = "<script>alert(document.cookie)</script>";
    res.send(s);
});


app.listen(3000);