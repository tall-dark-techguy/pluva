import connectDB from "../../utils/connectDB";
import bcrypt from "bcryptjs";
import User from "../../models/User";

async function Signup(req, res) {
  const db = await connectDB();
  const { method } = req;

  switch (method) {
    case "POST":
      const { name, email, password } = req.body;

      try {
        let user = await User.findOne({ email });

        if (user) {
          return res.json({
            status: "fail",
            message: "User with email exists",
          });
        }

        user = new User({
          name,
          email,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const data = await user.save();
        res.json({
          status: "success",
          data,
        });

        // send mail action here
      } catch (error) {
        res.json({
          status: "error",
          message: error.message,
        });
      }
      break;

    default:
      res.json({
        status: "error",
        message: "Invalid request method.",
      });
      break;
  }
}

export default Signup;
