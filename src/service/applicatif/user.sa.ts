import { GenericSA } from "../../common/service/generic.sa";
import type { UserDO } from "../../data/do/user.do";
import type { UserRequestDTO } from "../../data/dto/user/user-request.dto";
import type { UserResponseDTO } from "../../data/dto/user/user-response.dto";
import type { UserSM } from "../metier/user.sm";
import { userSM } from "../metier/user.sm";
import type { UserFactory } from "../../constraint/factory/user.factory";
import { userFactory } from "../../constraint/factory/user.factory";

export class UserSA extends GenericSA<UserDO, UserRequestDTO, UserResponseDTO, UserSM, UserFactory> {
  async getUserById(userId: string) {
    return this.sm.findOne({ id: userId });
  }

  async updateSocketId(id: string, socketId: string) {
    await this.sm.partialUpdate(id, { socketId });
  }
}

export const userSA = new UserSA(userSM, userFactory);
