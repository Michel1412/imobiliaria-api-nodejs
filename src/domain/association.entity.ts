import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { Comment } from './comment.entity';

@Entity()
export class Association {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Seller, seller => seller.association)
  sellers: Seller[];

  @OneToMany(() => Comment, comment => comment.association)
  comments: Comment[];

  @Column()
  document: string;
}