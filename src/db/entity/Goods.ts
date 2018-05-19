import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Goods extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ type: "real" })
  cost: number;
  @ManyToOne((type) => Category, (category) => category.goods)
  category: Category;
}
