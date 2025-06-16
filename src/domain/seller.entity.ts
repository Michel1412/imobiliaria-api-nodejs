import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from './city.entity';
import { Association } from './association.entity';
import { Comment } from './comment.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => City)
  homeCity: City;

  @ManyToOne(() => City)
  shopCity: City;

  @ManyToOne(() => Association, association => association.sellers)
  association: Association;

  @Column()
  isWorking: boolean;

  @OneToMany(() => Comment, comment => comment.seller)
  comments: Comment[];
}