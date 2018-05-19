import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Goods } from "./Goods";
import { Consumer } from "./Consumer";

@Entity()
export class Buy extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @ManyToMany((type) => Goods)
  @JoinTable()
  goods: Goods[];
  @ManyToMany((type) => Consumer, (consumer) => consumer.buys)
  consumers: Consumer[];
  @CreateDateColumn() date: Date;
}
