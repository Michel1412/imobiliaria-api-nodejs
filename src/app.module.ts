import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Seller } from './domain/seller.entity';
import { Buyer } from './domain/buyer.entity';
import { City } from './domain/city.entity';
import { Association } from './domain/association.entity';
import { Comment } from './domain/comment.entity';
import { Property } from './domain/property.entity';

// Services
import { SellerService } from './service/seller.service';
import { BuyerService } from './service/buyer.service';
import { CityService } from './service/city.service';
import { AssociationService } from './service/association.service';
import { CommentService } from './service/comment.service';
import { PropertyService } from './service/property.service';

// Controllers
import { SellerController } from './controller/seller.controller';
import { BuyerController } from './controller/buyer.controller';
import { CityController } from './controller/city.controller';
import { AssociationController } from './controller/association.controller';
import { CommentController } from './controller/comment.controller';
import { PropertyController } from './controller/property.controller';

// Use Cases (providers)
import { CreateSellerUseCase } from './use-case/create/create-seller.usecase';
import { UpdateSellerUseCase } from './use-case/update/update-seller.usecase';
import { DeleteSellerUseCase } from './use-case/delete/delete-seller.usecase';
import { ToggleSellerIsWorkingUseCase } from './use-case/update/toggle-seller-isworking.usecase';

import { CreateBuyerUseCase } from './use-case/create/create-buyer.usecase';
import { UpdateBuyerUseCase } from './use-case/update/update-buyer.usecase';
import { DeleteBuyerUseCase } from './use-case/delete/delete-buyer.usecase';

import { CreateCityUseCase } from './use-case/create/create-city.usecase';
import { UpdateCityUseCase } from './use-case/update/update-city.usecase';
import { DeleteCityUseCase } from './use-case/delete/delete-city.usecase';

import { CreateAssociationUseCase } from './use-case/create/create-association.usecase';
import { UpdateAssociationUseCase } from './use-case/update/update-association.usecase';
import { DeleteAssociationUseCase } from './use-case/delete/delete-association.usecase';

import { CreateCommentUseCase } from './use-case/create/create-comment.usecase';
import { UpdateCommentUseCase } from './use-case/update/update-comment.usecase';
import { DeleteCommentUseCase } from './use-case/delete/delete-comment.usecase';
import { CreateAndAssignCommentUseCase } from './use-case/create/create-assign-comment.usecase';

import { CreatePropertyUseCase } from './use-case/create/create-property.usecase';
import { UpdatePropertyUseCase } from './use-case/update/update-property.usecase';
import { DeletePropertyUseCase } from './use-case/delete/delete-property.usecase';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'imobiliaria.sqlite',
      entities: [Seller, Buyer, City, Association, Comment, Property],
      synchronize: true, // use false in production!
    }),
    TypeOrmModule.forFeature([Seller, Buyer, City, Association, Comment, Property]),
  ],
  controllers: [
    SellerController,
    BuyerController,
    CityController,
    AssociationController,
    CommentController,
    PropertyController,
  ],
  providers: [
    // Services
    SellerService,
    BuyerService,
    CityService,
    AssociationService,
    CommentService,
    PropertyService,

    // Use Cases
    CreateSellerUseCase,
    UpdateSellerUseCase,
    DeleteSellerUseCase,
    ToggleSellerIsWorkingUseCase,
    CreateBuyerUseCase,
    UpdateBuyerUseCase,
    DeleteBuyerUseCase,
    CreateCityUseCase,
    UpdateCityUseCase,
    DeleteCityUseCase,
    CreateAssociationUseCase,
    UpdateAssociationUseCase,
    DeleteAssociationUseCase,
    CreateCommentUseCase,
    UpdateCommentUseCase,
    DeleteCommentUseCase,
    CreateAndAssignCommentUseCase,
    CreatePropertyUseCase,
    UpdatePropertyUseCase,
    DeletePropertyUseCase,
  ],
})
export class AppModule {}