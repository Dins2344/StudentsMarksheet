const User = require("../configure/userModal");
const mongodb = require("mongodb");

module.exports = {
  addUser: async (records) => {
    console.log(records);
    const newRecord = new User(records);
    const response = await newRecord.save();
    return response;
  },

  getStudents: async (result) => {
    console.log(result);
    const students = await User.find({ result: result });
    return students;
  },

  getResultStatus: async (id) => {
    const user = await User.find({ _id: id });
    if (user) {
      return user[0].result;
    } else {
      return null;
    }
  },
};
