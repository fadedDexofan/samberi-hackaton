import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consumer } from "./Consumer";
import { Goods } from "./Goods";

@Entity()
export class Buy extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;
  @ManyToMany((type) => Goods)
  @JoinTable()
  public goods: Goods[];
  @ManyToMany((type) => Consumer, (consumer) => consumer.buys)
  public consumers: Consumer[];
  @CreateDateColumn() public date: Date;
}
