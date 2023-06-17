let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
//const port = 2410;
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { products,users } = require("./productsData.js");

app.get("/products", function(req, res) {
	let arr1 = products;
	res.send(arr1);
});

app.get("/products/:category", function(req, res) {
	let category = req.params.category;
	let arr1 = products.filter(pr => pr.category === category);
	res.send(arr1);
});

app.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var cust = users.find(function(item) {
    return item.email === email && item.password === password;
  });
  console.log(cust);
	if(cust) {
		res.send(cust);
	}
	else {
		res.send("Invalid");
	}
});


app.put("/products/:prodCode", function(req, res) {
	console.log("Put Called");
	let prodCode = req.params.prodCode;
	let body = req.body;
	let index = products.findIndex((c) => c.prodCode === prodCode);
	if (index>=0) {
		let updatedProduct = {...body};
		products[index] = updatedProduct;
		console.log("update successful",updatedProduct);
		res.send(updatedProduct);
	}
	else {
		res.status(404).send("No product found");
	}
});

app.delete("/delete/:prodCode", function(req,res){
	console.log("Delete Called");
	let prodCode = req.params.prodCode;
	let index = products.findIndex((c) => c.prodCode === prodCode);
	let deletedproduct = products.splice(index, 1);
	res.send(deletedproduct);
});

app.post("/products", function (req, res) {
	let body = req.body;
	console.log("Post called");
	let newProduct = {...body};
	products.push(newProduct);
	res.send(newProduct);
});