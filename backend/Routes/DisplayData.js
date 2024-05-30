const express = require('express');
const router = express.Router();
const mongoDB = require('../db');

router.post('/foodData', async (req, res) => {
  try {
    // Wait for the database connection and data retrieval
    await mongoDB(); 
    if (!global.fooddata2 || !global.Foodcategory) {
        throw new Error('fooddata2 or foodCategory is undefined');
      }
      console.log(global.fooddata2);
      console.log(global.Foodcategory);
      res.send({ fooddata2: global.fooddata2, foodcategory: global.Foodcategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
