const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find({});
    res.render('drones/list', { drones } )        
} catch (error) {
    next(error)        
}
});

router.get('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {    
    res.render('drones/create-form')        
} catch (error) {
    next(error)        
} 
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  const {name, propellers, maxSpeed} = req.body
  const intPropellers = parseInt(propellers)
  const intMaxSpeed = parseInt(maxSpeed)
  try {
    await Drone.create({name, propellers:intPropellers, maxSpeed: intMaxSpeed });
    res.redirect('/drones')       
} catch (error) {
    next(error) 
}  
});

router.get('/edit/:id', async (req, res, next) => {
  // Iteration #4: Update the drone
const {id} = req.params;
try {
  const drone = await Drone.findById(id);  
  res.render('drones/update-form', drone)       
} catch (error) {
  next(error) 
}  
});

router.post('/edit/:id', async (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params
  const {name, propellers, maxSpeed} = req.body
  const intPropellers = parseInt(propellers)
  const intMaxSpeed = parseInt(maxSpeed)
  try {
    await Drone.findByIdAndUpdate(id, {name, propellers:intPropellers, maxSpeed: intMaxSpeed });
    res.redirect('/')       
} catch (error) {
    next(error) 
} 
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  const{id} = req.params;
try {
  await Drone.findByIdAndDelete(id);
  res.render('/')       
} catch (error) {
  next(error) 
} 
});

module.exports = router;
