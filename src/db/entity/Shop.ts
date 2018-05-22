import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consumer } from "./Consumer";

@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public address: string;
  @Column({ type: "double precision" })
  public longitude: number;
  @Column({ type: "double precision" })
  public latitude: number;
  @OneToMany(
    (type) => Consumer,
    (consumersInShop) => consumersInShop.currentShop,
  )
  public consumersInShop: Consumer[];
}
