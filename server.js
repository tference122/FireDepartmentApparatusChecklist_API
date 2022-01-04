const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

const uri = "mongodb://localhost:27017/FireDepartmentChecklists";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const check_list_router = require('./routes/checklist.route');

app.use('/checklist', check_list_router);


app.listen(5000, () => {
    console.log("Starting Web API Server on Port 5000");
})