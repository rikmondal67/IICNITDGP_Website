
const fs = require('fs');
const path = require('path');

const UPLOADS_ROOT = path.resolve(
  __dirname,
  '..',
  'public',
  'uploads'
);

const deleteUploadedFile = async (fileUrl) => {
  if (!fileUrl) return false;

  try {
    const parsedUrl = new URL(fileUrl);
    const uploadsPath = parsedUrl.pathname.split('/uploads/')[1];

    if (!uploadsPath) {
      throw new Error('Invalid upload URL');
    }
    const filePath = path.resolve(
      UPLOADS_ROOT,
      decodeURIComponent(uploadsPath)
    );
    if (!filePath.startsWith(UPLOADS_ROOT + path.sep)) {
      throw new Error('Invalid file path');
    }
    await fs.promises.unlink(filePath);

    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false; 
    }

    throw error;
  }
};

module.exports =  deleteUploadedFile ;
