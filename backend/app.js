require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./src/utils/dbConnection");
const userRoutes = require("./src/routes/UserRoutes");
const categoryRoutes = require("./src/routes/CategoryRoutes");
const productRoutes = require("./src/routes/ProductRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

dbConnection();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(PORT, () => {
  console.log(`App Running at http://localhost:${PORT}`);
});
