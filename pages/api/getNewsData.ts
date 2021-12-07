import type {NextApiRequest, NextApiResponse} from 'next'
import {Http} from "../../utils/http";

export default async function getNewsData(req: NextApiRequest, res: NextApiResponse) {
  const page: any = req.query.page;
  const pageSize: any = req.query.pageSize;
  const type: any = req.query.type;

  const {data: {result: newsData, pager: {total}}, success} = await Http.getNewsData(page, pageSize, type);

  if (success) {
    res.status(200).json({newsData, total});
  } else {
    res.status(500).json({msg: '请求失败'});
  }
}