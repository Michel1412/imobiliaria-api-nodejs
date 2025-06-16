import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { Buyer } from './buyer.entity';
import { Property } from './property.entity';
import { Association } from './association.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stars: number;

  @Column({ nullable: true })
  comment?: string;

  @Column()
  profile: string;

  @ManyToOne(() => Seller, seller => seller.comments, { nullable: true })
  seller?: Seller;

  @ManyToOne(() => Buyer, buyer => buyer.comments, { nullable: true })
  buyer?: Buyer;

  @ManyToOne(() => Property, property => property.comments, { nullable: true })
  property?: Property;

  @ManyToOne(() => Association, association => association.comments, { nullable: true })
  association?: Association;
}