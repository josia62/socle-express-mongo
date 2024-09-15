import { exceptionCode, exceptionMessage } from "../../data/constants/exception-message";
import { HttpStatus } from "../../data/constants/http-status";

export class Exception extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const exceptionHandler = (err, req, res, next) => {
  if (err) {
    const { statusCode } = err;
    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "ERROR", isError: true, data: null });
  } else {
    next();
  }
};
