import { GenericSM } from "../../common/service/generic.sm";
import type { UserDO } from "../../data/do/user.do";
import { userModelName, userSchema } from "../../data/do/user.do";

export class UserSM extends GenericSM<UserDO> {}

export const userSM = new UserSM(userModelName, userSchema);
