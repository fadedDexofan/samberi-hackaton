import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Buy } from "./Buy";
import { Shop } from "./Shop";

@Entity()
export class Consumer extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;
  @OneToMany((type) => Buy, (buy) => buy.consumer, { cascade: true })
  public buys: Buy[];
  @OneToMany((type) => Buy, (sharedBuy) => sharedBuy.sharedConsumer, {
    cascade: true,
  })
  @JoinColumn()
  public sharedBuys: Buy[];

  @ManyToOne((type) => Shop, (currentShop) => currentShop.id)
  @JoinColumn()
  public currentShop: Shop | null;
}
