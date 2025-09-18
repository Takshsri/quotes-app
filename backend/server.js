const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("console");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let quotes = [
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Act as if what you do makes a difference. It does.",
  "No Pain No Gain"
];

app.get("/quote",(req,res)=>{
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({quote:randomQuote});
});

app.get("/all-quotes",(req,res)=>{
  res.json({quotes});
});


app.post("/add-quote",(req,res)=>{
  const {quote} = req.body;
  if(!quote || quote.trim() == ""){
    return res.status(400).json({error :"Quote cannot be Empty"});
  }
  quotes.push(quote);
  res.status(201).json({message:"Quote added suucessfully",quotes});
});

app.get("/",(req,res)=>{
  res.send("Welcome to Quotes API! Try /quote /all-quotes, or POST /add-quote");
});

app.listen(4000,()=>{
  console.log("Server running at http://localhost:4000");
});