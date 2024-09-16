import { Entity, Column } from "typeorm";
import { Base } from "./base.do";

@Entity()
export class User extends Base {
  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column("int")
  age: number;

  @Column("varchar", { nullable: true, default: "" })
  socketId?: string;
}
