import { NextApiRequest, NextApiResponse } from "next";
import CheckEmailModel from "../models/CheckEmailModel";

class CheckEmailController {
  static async checkEmail(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;
    const exists = await CheckEmailModel.checkEmail(email);

    res.status(200).json({ exists });
  }
}

export default CheckEmailController;
