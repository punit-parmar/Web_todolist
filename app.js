const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const itemSchema = mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", itemSchema);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  Item.find(function(err, items) {
      if (err) {
        console.log(err);
      } else {
        res.render("list", {
          nextday: "Today",
          listitem: items
        });
      }
  })

});

app.post('/', function(req, res) {
  var item = req.body.new;
  const newitem = new Item({
    name: item
  });
  newitem.save();

  res.redirect("/");
});

app.post("/delete",function(req,res){
   Item.deleteOne({_id:req.body.checkbox},function(err){console.log(err);});
   res.redirect("/")
});
app.listen(3000, function() {
  console.log("server is running at port 3000");
})
