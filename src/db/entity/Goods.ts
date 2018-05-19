import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Goods extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public name: string;
  @Column({ type: "real" })
  public cost: number;
  @ManyToOne((type) => Category, (category) => category.goods)
  public category: Category;
}
