import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  t_r_c: {
    type: String,
  }, // temporary reset code

  date: {
    type: Date,
    default: Date.now(),
  },
  date_modified: {
    type: Date,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
