const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://hrusikeshviroot:hrusikesh@cluster0.2yj2wdw.mongodb.net/job")

module.exports={connection}