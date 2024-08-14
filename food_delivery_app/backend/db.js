const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://khushichada743:34oXcIGvwuiUGmle@cluster0.vzw9hsk.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongofun = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected successfully using mongoose");
    //fetch fooditems data

    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    global.food_items = data;

    // Use await instead of callback

    //fetch food_category data
    const foodCategory = mongoose.connection.db.collection("food_category");
    const categoryData = await foodCategory.find({}).toArray();
    global.food_category = categoryData;

    //console.log(global.food_items);

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = mongofun;
