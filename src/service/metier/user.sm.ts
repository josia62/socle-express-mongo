import { AppDataSource } from "../../data-source";
import { GenericSM } from "../../common/service/generic.sm";
import { User } from "../../data/do/user.do";
import type { Repository } from "typeorm";

export class UserSM extends GenericSM<User, string, Repository<User>> {}

export const userSM = new UserSM(AppDataSource.getRepository(User));
