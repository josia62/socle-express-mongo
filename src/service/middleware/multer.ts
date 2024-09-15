import * as fs from "node:fs";
import * as multer from "multer";

import { configs } from "../../data/constants/configs";
import { HttpStatus } from "../../data/constants/http-status";
import { Exception } from "./exception-handler";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { uploadDir } = configs;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.includes("image") || file.mimetype.includes("sheet")) {
    cb(null, true);
  } else {
    cb(new Exception(HttpStatus.BAD_REQUEST, "Type fichier non valide"));
  }
};

export const imageUpload = multer({ storage, fileFilter: imageFilter });
