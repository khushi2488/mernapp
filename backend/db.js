const mongoose = require('mongoose');

async function mongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/GoFood');
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db;
    // Fetch data for 'fooddata2' collection
    const foodDataCollection = db.collection('fooddata2');
    const foodData = await foodDataCollection.find({}).toArray();
    if (!foodData) {
      throw new Error('No data found in fooddata2 collection');
    }
    global.fooddata2 = foodData;
    console.log(global.fooddata2);

    // Fetch data for 'foodCategory' collection
    const foodCategoryCollection = db.collection('Foodcategory');
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();
    if (!foodCategoryData) {
      throw new Error('No data found in foodCategory collection');
    }
    global.Foodcategory = foodCategoryData;
    console.log(global.Foodcategory);

    return db; // Return the db object


  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = mongoDB;
