import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { RestaurantSearchModule } from './modules/restaurant-search/restaurant-search.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`, '.env', '.env.example']
    }),
    SearchModule,
    RestaurantSearchModule
  ]
})
export class AppModule {}
