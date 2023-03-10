import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/pizzadb");

// plugin setup
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);


const ToppingSchema = new mongoose.Schema({
    name: {type: String, requried: true},
    extra: {type: Boolean, default: false}
});

const PizzaSchema = new mongoose.Schema({
    size: {type: String, required: true, enum: ["small", "medium", "large"]},
    crust: String,
    slug: {
        type: String,
        slug: ["size", "crust"],
        unique: true,
        slugPaddingSize: 4
    },
    // embedded topping document ---- NO extra collection for toppings, we only have pizzas collection
    toppings: [ToppingSchema]
});


// more stuff goes here for (definitions for PizzaSchema, ToppingSchema, etc.)

const Pizza = mongoose.model("Pizza", PizzaSchema);

const p = new Pizza({  // instance in mongoose ---> represent a document in mongodb
    crust: "thin",
    size: "medium"
});

try {
    const savedPizza = await p.save();
    console.log(savedPizza);
    console.log("saved new pizza");
  } catch(err) {
    console.log(err);
  }

console.log(p.crust, p.slug);