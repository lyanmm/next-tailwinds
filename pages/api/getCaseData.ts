import type {NextApiRequest, NextApiResponse} from 'next'
import {Http} from "../../utils/http";

export default async function getCaseData(req: NextApiRequest, res: NextApiResponse) {
  const page: any = req.query.page;
  const {data: {result: newsData, pager: {total}}, success} = await Http.getCaseData(page);
  if (success) {
    res.status(200).json({newsData, total});
  } else {
    res.status(500).json({msg: '请求失败'});
  }
}