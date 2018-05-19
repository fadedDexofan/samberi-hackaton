import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Goods } from "./Goods";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public name: string;
  @OneToMany((type) => Goods, (goods) => goods.category, { cascade: true })
  public goods: Goods[];
}
