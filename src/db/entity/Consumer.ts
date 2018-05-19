import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Buy } from "./Buy";

@Entity()
export class Consumer extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;
  @OneToMany((type) => Buy, (buy) => buy.consumer, { cascade: true })
  public buys: Buy[];
}
