import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, insertDocument } from '@/helpers/db-util';
interface Data {
  message: string;
  payload?: string | object;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const newEmail = {
      email: req.body.email,
    };
    //write data to file
    if (!req.body.email || !req.body.email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    //set up mondo connection to add idata into a collection
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
    try {
      await insertDocument(client, 'newsletter', newEmail);
      client.close();
    } catch (err: any) {
      res.status(500).json({
        message: 'Inserting data failed...',
        error: err.message,
      });
      return;
    }
    // res.status(200).json({ message: 'Email sent' });
    res.status(201).json({ message: 'Signed up...' });
  }
};
export default handler;
// import fs from 'fs';
// import path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { buildPath, extractPath } from '@/helpers/api-util';
// interface Data {
//   message: string;
//   payload: string | object;
// }

// // export const buildNewsletterPath = () => {
// //   return path.join(process.cwd(), 'data', 'newsletter.json');
// // };
// // export const extractNewsletter = (filePath: fs.PathOrFileDescriptor) => {
// //   const fileData = fs.readFileSync(filePath) as string | any;
// //   const data = JSON.parse(fileData);
// //   return data;
// // };

// const handler = (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const newNewsletter = {
//       email: req.body.email,
//       id: new Date().toISOString(),
//     };
//     //write data to file
//     if (!req.body.email || !req.body.email.includes('@')) {
//       res.status(422).json({ message: 'Invalid email address' });
//       return;
//     }
//     const filePath = path.join(process.cwd(), 'data', 'newsletter.json');
//     const data = extractPath(buildPath('data', 'newsletter'));
//     data.push(newNewsletter);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     res.status(201).json({ message: 'Success', payload: data });
//   } else {
//     const data = extractPath(buildPath('data', 'newsletter'));
//     res
//       .status(200)
//       .json({ message: 'A different api method used', payload: data });
//   }
// };
// export default handler;
