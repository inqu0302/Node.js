import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  userid: String,
  password: String,
  eMail: String,
});

export default Mongoose.model("users", userSchema);
