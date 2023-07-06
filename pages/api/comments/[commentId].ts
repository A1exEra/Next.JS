import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '@/helpers/db-util';
interface Comment {
  text: string;
  email: string;
  name: string;
  eventId: string;
  _id?: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.commentId as string;
  let client;
  try {
    client = await connectDatabase();
  } catch (err: any) {
    res.status(500).json({
      message: 'Connection to database failed...',
      error: err.message,
    });
    return;
  }
  //check if the methood is POST
  if (req.method === 'POST') {
    const { text, email, name } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({
        message: 'Invalid input...',
      });
      client.close();
      return;
    }
    const newComment: Comment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };
    //write data to mongo
    // newComment.id = result.insertedId;
    //have to convert it to a string because oftypscript checking
    try {
      const result = await insertDocument(client, 'commets', newComment);
      newComment._id = result.insertedId.toString();
      res.status(201).json({
        message: 'Your comment was successfully added..',
        payload: result,
      });
    } catch (err: any) {
      res.status(500).json({
        message: 'Inserting comment failed...',
        error: err.message,
      });
    }
  }
  if (req.method === 'GET') {
    try {
      const comments = await getAllDocuments(
        client,
        'commets',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: comments });
    } catch (err: any) {
      res.status(500).json({
        message: 'Fetching data failed...',
        error: err.message,
      });
    }
  }
  client.close();
};
export default handler;
// import { NextApiRequest, NextApiResponse } from 'next';
// import { buildPath, extractPath } from '@/helpers/api-util';
// import fs from 'fs';
// import path from 'path';
// interface Comment {
//   text: string;
//   email: string;
//   name: string;
//   id: string;
// }
// const handler = (req: NextApiRequest, res: NextApiResponse) => {
//   const commentId = req.query.commentId;
//   //check if the methood is POST
//   if (req.method === 'POST') {
//     const newNewsletter: Comment = {
//       email: req.body.email,
//       name: req.body.name,
//       text: req.body.text,
//       id: new Date().toISOString(),
//     };
//     //write data to file
//     const filePath = path.join(process.cwd(), 'data', 'comments.json');
//     const data = extractPath(buildPath('data', 'comments'));
//     data.push(newNewsletter);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     res.status(201).json({
//       message: 'Your comment was successfully added..',
//       payload: data,
//     });
//   }
//   if (req.method === 'GET') {
//     const comments = extractPath(buildPath('data', 'comments'));
//     res.status(200).json({ comments });
//   }
// };
// export default handler;
