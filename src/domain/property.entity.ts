import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Seller } from './seller.entity';
import { Comment } from './comment.entity';
import { RentPropertyDto } from './dto/property.dto';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Seller)
  seller: Seller;

  @Column()
  name: string;

  @Column('float')
  value: number;

  @Column()
  isRentable: boolean;

  @Column()
  isPurchasable: boolean;

  @Column('text')
  description: string;

  @Column('simple-array')
  images: string[];

  @OneToMany(() => Comment, (comment) => comment.property)
  comments: Comment[];

  @Column()
  adress: string;

  @Column()
  isOnHigh: boolean;

  @Column({ type: 'json', nullable: true })
  periodRentByBuyer?: RentPropertyDto;
  
}
