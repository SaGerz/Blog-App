const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Midleware :
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// routes
const routes = require("./routes/routes");
app.use(routes);

// Img upload
app.use("/uploads", express.static(`${__dirname}/uploads`));

app.listen(5000);
