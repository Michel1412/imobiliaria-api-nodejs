import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from './city.entity';
import { Comment } from './comment.entity';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => City)
  homeCity: City;

  @ManyToOne(() => City)
  interresedCity: City;

  @Column('float')
  rangeToSpend: number;

  @OneToMany(() => Comment, (comment) => comment.buyer)
  comments: Comment[];
}