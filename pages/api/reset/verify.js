import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import sendMail from "../../../utils/nodemailer";

const handler = async (req, res) => {
  const db = await connectDB();
  const { method } = req;

  switch (method) {
    case "POST":
      const { code } = req.body;
      const { _id } = req.query;

      try {
        const user = await User.findById({ _id });
        if (!user) {
          return res.json({
            status: "fail",
            message: "User not found",
          });
        }

        if (user.t_r_c !== code) {
          return res.json({
            status: "fail",
            message: "Invalid reset code",
          });
        }

        user.t_r_c = "";
        await user.save();

        res.json({
          status: "success",
        });
      } catch (error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
      break;

    default:
      res.status(400).jsno("Invalid request method");
      break;
  }
};

export default handler;
