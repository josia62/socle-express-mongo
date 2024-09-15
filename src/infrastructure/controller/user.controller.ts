import type { User } from "../../data/do/user.do";
import type { UserRequestDTO } from "../../data/dto/user/user-request.dto";
import type { UserResponseDTO } from "../../data/dto/user/user-response.dto";
import { GenericController } from "@/common/infrastructure/generic.controller";
import type { UserSA } from "@/service/applicatif/user.sa";
import { userSA } from "@/service/applicatif/user.sa";

class UserController extends GenericController<User, UserRequestDTO, UserResponseDTO, UserSA> {
  create = async (req, res, next) => {
    const { body } = req;
    try {
      console.log("jos", body);
      res.locals.data = await this.serviceSA.create(body);
      res.locals.statusCode = 200;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userSA);
