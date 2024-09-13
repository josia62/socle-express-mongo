import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column("varchar")
  firstName = "";

  @Column("varchar")
  lastName = "";

  @Column("int")
  age = 0;
}
