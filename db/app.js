// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
// const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'reservations';

mongoose.connect(`${url}/${dbName}`);

const businessSchema = mongoose.Schema({
  business_id: {
    type: Number,
    unique: true,
    require: true,
  },
  business_name: {
    type: String,
    require: true,
  },
  allow_reservations: Boolean,
  people_per_reservation: Number,
  days_in_advance: Number,
  reservations_per_time: Number,
  hours: {
    Sunday: String,
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
  },
  current_reservations: mongoose.Schema.Types.Mixed,
});

const Restaurants = mongoose.model('Restaurants', businessSchema);

// need to create data with a save function

const seed = (array) => {
  Restaurants.collection.drop();
  array.forEach((entry) => {
    // console.log(entry, 'end');
    const business = new Restaurants(entry);
    business.save((error, document) => {
      if (error) {
        console.error('error');
      } else {
        console.log(document, 'Has Been Saved!');
      }
    });
  });
};
// findOneAndUpdate when a new reservation is added
  // this will be the object updated locally and passed in to be fully updated

const addRes = (obj) => {
  const business = new Restaurants(obj);
  Restaurants.findOneAndUpdate({ id: obj.id }, business, (err, document) => {
    if (err) {
      console.error(err);
    } else {
      console.log(document, 'Was updated!');
    }
  });
};

module.exports = { seed, addRes };
