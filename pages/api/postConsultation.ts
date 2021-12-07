import type {NextApiRequest, NextApiResponse} from 'next'
import {Http} from "../../utils/http";

export default async function postConsultation(req: NextApiRequest, res: NextApiResponse) {
  const formData: any = req.body;
  const {success, message} = await Http.postConsultation(formData);
  if (success) {
    res.status(200).json({success, message});
  } else {
    res.status(500).json({success, message});
  }
}