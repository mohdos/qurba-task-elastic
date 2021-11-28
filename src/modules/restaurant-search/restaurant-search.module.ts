import { Module } from '@nestjs/common';
import { RestaurantsSearchService } from './restaurant-search.service';
import { RestaurantSearchController } from './restaurant-search.controller';
import { SearchModule } from '../search/search.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SearchModule, ConfigModule],
  providers: [RestaurantsSearchService],
  controllers: [RestaurantSearchController]
})
export class RestaurantSearchModule {}
