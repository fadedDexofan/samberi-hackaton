import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Buy } from "./Buy";

@Entity()
export class Consumer extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @ManyToMany((type) => Buy, (buy) => buy.consumers, { cascade: true })
  @JoinTable()
  buys: Buy[];
}
