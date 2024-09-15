import type { User } from "../../data/do/user.do";
import type { UserRequestDTO } from "../../data/dto/user/user-request.dto";
import type { UserResponseDTO } from "../../data/dto/user/user-response.dto";
import { GenericController } from "@/common/infrastructure/generic.controller";
import type { UserSA } from "@/service/applicatif/user.sa";
import { userSA } from "@/service/applicatif/user.sa";

class UserController extends GenericController<User, UserRequestDTO, UserResponseDTO, UserSA> {}

export const userController = new UserController(userSA);
