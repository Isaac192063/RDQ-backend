const express = require("express");
const patch = require("path");
const morgan = require("morgan");
const cors = require("cors");
const routesUsers = require("./routes/user.routes");
const routersProducts = require("./routes/product.routes");
const routerPerson = require("./routes/customer.routes");
const PORT = require("./config/port");
const app = express();

console.log(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(patch.join(__dirname, "public")));

app.use("/api/user", routesUsers);
app.use("/api/product", routersProducts);
app.use("/api/customer", routerPerson);

app.listen(PORT);

// app.listen(PORT, '192.168.137.203', function () {
//     console.log(' Aplicacion iniciada ' + PORT)
// });

