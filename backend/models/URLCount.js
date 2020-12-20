const mongoose = require("mongoose");

//define schema for url count
let URLCountSchema = new mongoose.Schema({
  count: {
    type: Number,
  },
});

const URLCountModel = mongoose.model("URLCount", URLCountSchema, "URLCount");
const incrementCount = async function () {
  const countObj = await URLCountModel.findOne();
  URLCountModel.findOneAndUpdate(
    { _id: countObj._id },
    { $inc: { count: 1 } },
    function (err, response) {
      if (response) {
        return { success: true, currentCount: response };
      }
      return { success: false, message: err.message };
    }
  );
};

module.exports = {
  getCount: () => URLCountModel.findOne(),
  incrementCount: () => incrementCount(),
  create: (data) => URLCountModel.create(data),
  find: () => URLCountModel.find(),
};
