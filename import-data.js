

//import mongoose from 'mongoose';
const mongoose = require('mongoose');
require('dotenv').config()

const filmingLocations = require('./lieux-de-tournage-a-paris.json')

const { Schema } = mongoose;

const Locations = new Schema({
    filmType:  String, // String is shorthand for {type: String}
    filmProducerName: String,
    endDate:   Date,
    filmName: String,
    district: String,
    geolocation : {
        type: {
            enum: ['Point'], // 'location.type' must be 'Point'
            required: false,
        },
        coordinates: [Number],
    },
    sourceLocationId: String,
    filmDirectorName : String,
    address : String,
    startDate : Date,
    year : String,
});

async function pushJsonMongoose(model) {
    for (let i of filmingLocations) {
        let thisLocation = new model({
            filmType: i.fields.type_tournage,
            filmProducerName: i.fields.nom_producteur,
            endDate: Date(i.fields.date_fin),
            filmName: i.fields.nom_tournage,
            district: i.fields.ardt_lieu,
            geolocation: {
                coordinates: [parseInt(i.fields.coord_x), parseInt(i.fields.coord_y)],
            },
            sourceLocationId: i.fields.id_lieu,
            filmDirectorName: i.fields. nom_realisateur,
            address: i.fields.adresse_lieu,
            startDate: Date(i.fields.date_debut),
            year: i.fields.annee_tournage
        });
        thisLocation.save();
    }
}

async function queryOneLocation(yolegang, id) {
    // const kkchaud = yolegang.collection('inventory').find( { _id: id } );
    const kkchaud = await yolegang.findById(id);
    // const kkchaud = yolegang.find({ _id: ObjectId(id) });

    console.log(kkchaud.address);
}

async function queryAllLocations(yolegang, myFilmName) {
    // const kkchaud = yolegang.collection('inventory').find( { _id: id } );
    //const kkchaud = await yolegang.findById(id);
    const kkchaud = await yolegang.find({ filmName: myFilmName });
    console.log("NO WAY");
    console.log(kkchaud[0].address);
    for (let i of kkchaud) {
        console.log(i.address);
    }
}


async function main() {
    await mongoose.connect(process.env.MONGO_URI).then(()=> {console.log('Connected !')});
    const yolegang = mongoose.model('Locations', Locations);
    //console.log(filmingLocations);
    // await pushJsonMongoose(yolegang);
    await queryOneLocation(yolegang, "633f1d9d5a0b7c9310c141fa");
    await queryAllLocations(yolegang, "Une jeune fille qui va bien");
    console.log("Done!");
}

main()

/*const filmingLocations = [] test..

async function main() {
    const connections = await Promise.all(values: [mongoose.connect(param:1), mongoose])
}*/
