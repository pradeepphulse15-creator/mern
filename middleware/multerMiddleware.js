import multer from "multer";
import DatParser from "datauri/parser.js";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DatParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  parser.format(fileExtension, file.buffer);
  return parser.content;
};

export default upload;
