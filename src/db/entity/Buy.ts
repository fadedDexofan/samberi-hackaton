import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consumer } from "./Consumer";
import { Goods } from "./Goods";

@Entity()
export class Buy extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;
  @Column()
  @Generated("uuid")
  public uuid: string;
  @ManyToMany((type) => Goods)
  @JoinTable()
  public goods: Goods[];
  @ManyToOne((type) => Consumer, (consumer) => consumer.buys)
  @JoinColumn()
  public consumer: Consumer;
  @CreateDateColumn() public date: Date;
}
