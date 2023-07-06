import fs from 'fs';
import path from 'path';
import { buildPath, extractPath } from '@/helpers/api-util';
import { NextApiRequest, NextApiResponse } from 'next';
interface Data {
  message: string;
  payload: string | object;
}
export interface Comment {
  email: string;
  name: string;
  text: string;
  id: string;
}
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const newNewsletter: Comment = {
      email: req.body.email,
      name: req.body.name,
      text: req.body.text,
      id: new Date().toISOString(),
    };
    //write data to file
    const filePath = path.join(process.cwd(), 'data', 'comments.json');
    const data = extractPath(buildPath('data', 'comments'));
    data.push(newNewsletter);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      message: 'Your comment was successfully added..',
      payload: data,
    });
  } else {
    const data = extractPath(buildPath('data', 'comments'));
    res
      .status(200)
      .json({ message: 'A different api method used', payload: data });
  }
};
export default handler;
