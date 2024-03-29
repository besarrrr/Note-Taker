const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/", htmlRoutes)
app.use("/api", apiRoutes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
