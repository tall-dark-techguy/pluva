import withSession from "../../utils/withSession";
import bcrypt from "bcryptjs";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";

const handler = async (req, res) => {
  const db = await connectDB();
  const { method } = req;

  switch (method) {
    case "POST":
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res.json({
            status: "fail",
            message: "Invalid login details",
          });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.json({
            status: "fail",
            message: "Invalid login details",
          });
        }

        req.session.set("user", user);
        const data = await req.session.save();

        return res.json({
          status: "success",
          data,
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        req.session.destroy();
        return res.json({
          status: "success",
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error.message,
        });
      }

    default:
      res.status(500).json("Invalid request method.");
      break;
  }
};

export default withSession(handler);
