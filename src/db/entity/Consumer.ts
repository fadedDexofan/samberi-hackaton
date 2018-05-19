import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Buy } from "./Buy";

@Entity()
export class Consumer extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;
  @ManyToMany((type) => Buy, (buy) => buy.consumers, { cascade: true })
  @JoinTable()
  public buys: Buy[];
}
