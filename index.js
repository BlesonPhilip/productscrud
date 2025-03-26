// import express from "express";
// import uniqid from "uniqid";

// const app = express();

// const mFn = (req, res, next) => {
//   console.log("method :", req.method);
//   console.log("url:", req.url);
//   next();
// };
// app.use(express.json());
// app.use(mFn);

// const products = [];

// app.get("/product", (req, res) => {
//   res.status(200).json(products);
// });

// app.post("/product", (req, res) => {
//   const { body } = req;
//   products.push({ id: uniqid(), ...body });
//   console.log("post method");
//   res.status(200).json({ message: "products added" });
// });

// app.get("/product/:id", (req, res) => {
//   const { id } = req.params;
//   const data = products.filter((item) => item.id == id);
//   res.status(200).json(data[0]);
// });

// app.patch("/product", (req, res) => {
//   const { id } = req.params;
//   const { body } = req;
//   let index = 0;
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id == id) index = i;
//   }
//   products[index] = { ...products[index], ...body };
//   res.status(200).json({ message: "products updated" });
// });

// app.delete("/product", (req, res) => {
//   const { id } = req.params;

//   let index = 0;
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id == id) index = i;
//   }
//   products.splice(index, 1);
//   res.status(200).json({ message: "products deleted" });
// });

// app.use("*", (req, res) => {
//   res.status(404).json({ message: "no route found" });
// });

// app.listen(4000, () => {
//   console.log("app is runing @ http://localhost:4000/");
// });

import express from "express";
import uniqid from "uniqid";
import morgan from "morgan";

const app = express();

const mFn = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  next();
};

app.use(morgan("dev"));
app.use(express.json());
// app.use(mFn);

const products = [];

app.get("/product", (req, res) => {
  console.log(req.query);
  res.status(200).json({ products, message: "Get request" });
});

app.post("/product", (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res
      .status(400)
      .json({ message: "Please add title, description, and price" });
  }

  const newProduct = { id: uniqid(), title, description, price };
  products.push(newProduct);
  console.log("POST method");

  res.status(201).json({ message: "Product added", product: newProduct });
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

app.patch("/product/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = { ...products[index], ...body };
  res
    .status(200)
    .json({ message: "Product updated", product: products[index] });
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;

  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);
  res.status(200).json({ message: "Product deleted" });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "No route found" });
});

app.listen(8000, () => {
  console.log("App is running @ http://localhost:8000/");
});
