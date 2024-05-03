// import {  NextResponse } from 'next/server';
import { NextApiHandler, NextApiRequest } from 'next';
import Database from '@/database/database';
// import { Product } from '@/models/userModel';
// import { upload } from '@/app/components/lib';
import path from 'path';
import fs from 'fs/promises';
import formidable from 'formidable';

Database();

export const config = {
      api: {
            bodyParser: false
      }
}
const readFile = (req: NextApiRequest, saveLocally?: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {

      const options: formidable.Options = {};
      if (saveLocally) {
            options.uploadDir = path.join(process.cwd(), "/public/static");
            options.filename = (name, ext, path, form) => {
                  return Date.now().toString() + "_" + path.originalFilename
            }
      }

      const form = formidable(options)
      return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                  if (err) reject();
                  resolve({ fields, files })
            })
      })
}

export const handler: NextApiHandler = async (req, res) => {

      // const _id = request.nextUrl.searchParams.get('_id')
      // const product = await Product.findOne({_id:_id})
      try {
            await fs.readdir(path.join(process.cwd() + "/public", "/static"));
      } catch (error) {
            await fs.mkdir(path.join(process.cwd() + "/public", "/static"))
      }
      await readFile(req, true)
      res.json({ done: "ok" })
};

