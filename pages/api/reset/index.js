import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import sendMail from "../../../utils/nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  const db = await connectDB();
  const { method } = req;

  switch (method) {
    case "POST":
      const { email } = req.body;

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.json({
            status: "fail",
            message: "Email not found",
          });
        }

        const t_r_c = crypto.randomBytes(3).toString("hex");

        const mailOptions = {
          from: "Pluva <contact@pluvastore.com>",
          to: email,
          subject: `Password reset code`,
          html: `<h1>Pluva</h1>
          <p>Hi esteemed user,</p>
          <p>This is your password reset code for your Pluva account:</p>
          <p><strong>${t_r_c}</strong></p>
          <br />
          <p>Regards, Pluva</p>
          <p>Please kindly ignore this email if this is not you.</p>`,
        };

        await sendMail(mailOptions);

        //   after sending mail
        user.t_r_c = t_r_c;
        await user.save();

        res.json({
          status: "success",
          data: { id: user._id, name: user.name, email: user.email },
        });
      } catch (error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
        console.log(error);
      }
      break;

    case "PUT":
      const { password } = req.body;
      const { id } = req.query;
      try {
        const user = await User.findById({ _id: id });
        if (!user) {
          return res.json({
            status: "fail",
            message: "User not found",
          });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
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
      res.status(400).json("Invalid request method");
      break;
  }
};

export default handler;
