import { exceptionCode, exceptionMessage } from "../../data/constants/exception-message";
import { HttpStatus } from "../../data/constants/http-status";

export class Exception extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getErrorByCode = (err) => {
  const { message, code, query } = err;

  try {
    const [first = "", second = ""] = (query.match(/".*?"/)[0] || "").replace('"', "").replace('"', "").split("_");

    switch (code) {
      case exceptionCode.DELETE_UPDATE_FK_ERROR:
        return `Impossible de supprimé ${
          exceptionMessage[first.toUpperCase()]
        } qui est déjà rattaché à ${exceptionMessage[second.toUpperCase()]}`;
      default:
        return message;
    }
  } catch (error) {
    return message;
  }
};

export const exceptionHandler = (err, req, res, next) => {
  if (err) {
    const { statusCode } = err;
    res
      .status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: getErrorByCode(err), isError: true, data: null });
  } else {
    next();
  }
};
