

//import mongoose from 'mongoose';
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(()=> {console.log('Connected !')});

const { Schema } = mongoose;

const locationSchema = new Schema({
    filmType:  String, // String is shorthand for {type: String}
    filmProducerName: String,
    endDate:   Date,
    filmName: String,
    district: Number,
    geolocation : {
        coordinates : [Number],
        type : String,
    },
    sourceLocationId: String,
    filmDirectorName : String,
    address : String,
    startDate : Date,
    year : Number,
});

const yo = mongoose.model('Locations', locationSchema);
console.log("YO LE GANG");


/*const filmingLocations = []

async function main() {
    const connections = await Promise.all(values: [mongoose.connect(param:1), mongoose])
}*/
