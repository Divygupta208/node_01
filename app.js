const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
