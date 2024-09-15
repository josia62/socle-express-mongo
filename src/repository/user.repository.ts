import type { DataSource, Repository } from "typeorm";
import { User } from "../data/do/user.do";

export const UserRepository = (dataSource: DataSource): Repository<User> => {
  return dataSource.getRepository(User);
};
