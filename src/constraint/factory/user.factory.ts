import { GenericFactory } from "../../common/constraint/factory/generic.factory";
import type { User } from "../../data/do/user.do";
import type { UserRequestDTO } from "../../data/dto/user/user-request.dto";
import type { UserResponseDTO } from "../../data/dto/user/user-response.dto";

const responseSchema = { id: "id", firstName: "firstName", lastName: "lastName", age: "age" };
const schema = { ...responseSchema };

export class UserFactory extends GenericFactory<User, UserRequestDTO, UserResponseDTO> {}

export const userFactory = new UserFactory(schema, schema, responseSchema);
