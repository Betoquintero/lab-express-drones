const mongoose = require('mongoose')
const Drones = require('../models/Drone.model')

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

  mongoose.connect("mongodb://localhost/lab-express-drones")
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Drones.create(drones)
  })
  .catch(e => console.log(e))
  .finally(() => {
    mongoose.connection.close()
  })
