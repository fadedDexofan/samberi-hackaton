import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Goods } from "./Goods";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @OneToMany((type) => Goods, (goods) => goods.category, { cascade: true })
  goods: Goods[];
}
