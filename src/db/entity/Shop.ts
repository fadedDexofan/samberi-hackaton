import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public address: string;
  @Column({ type: "double precision" })
  public longitude: number;
  @Column({ type: "double precision" })
  public latitude: number;
}
