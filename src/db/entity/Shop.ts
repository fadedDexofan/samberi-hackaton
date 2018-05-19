import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() address: string;
  @Column({ type: "double precision" })
  longitude: number;
  @Column({ type: "double precision" })
  latitude: number;
}
