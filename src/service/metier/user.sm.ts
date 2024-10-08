import { GenericSM } from "../../common/service/generic.sm";
import { type UserDO, userModeName } from "../../data/do/user.do";

export class UserSM extends GenericSM<UserDO> {}

export const userSM = new UserSM(userModeName);
