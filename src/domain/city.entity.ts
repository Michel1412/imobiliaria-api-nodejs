import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  state: string;

  @Column()
  country: string;
}