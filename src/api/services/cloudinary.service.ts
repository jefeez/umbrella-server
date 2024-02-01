import { v2 } from 'cloudinary';
import Datauri from 'datauri/parser';
import { Request } from 'express';

const uploader = async (req: Request) => {
  const datauri = new Datauri();
  if (req.file) {
    const buffer = datauri.format('.png', req.file.buffer);
    if (buffer.content) {
      const result = await v2.uploader.upload(buffer.content, { folder: 'bolt', timeout: 60000 });
      return result.secure_url;
    }
    return null;
  }
  return null;
};

export default { uploader };
