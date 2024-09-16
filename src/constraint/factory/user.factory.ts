import { GenericFactory } from "../../common/constraint/factory/generic.factory";
import type { User } from "../../data/do/user.do";
import type { UserRequestDTO } from "../../data/dto/user/user-request.dto";
import type { UserResponseDTO } from "../../data/dto/user/user-response.dto";

const schema = {
  firstName: "firstName",
  lastName: "lastName",
  age: "age",
};

const responseSchema = {
  id: "id",
  socketId: "socketId",
  ...schema,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

export class UserFactory extends GenericFactory<User, UserRequestDTO, UserResponseDTO> {}

export const userFactory = new UserFactory(schema, schema, responseSchema);
