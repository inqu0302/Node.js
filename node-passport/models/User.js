import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  userid: String,
  password: String,
});

export default Mongoose.model("users", userSchema);
