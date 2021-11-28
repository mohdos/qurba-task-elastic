import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestaurantsSearchService } from './restaurant-search.service';
import { RestaurantSearchBody } from './types/restaurant-search-body.interface';
import { RestaurantSearchDto } from './types/restaurant-search.dto';

@Controller('restaurant-search')
export class RestaurantSearchController {

    constructor(private readonly restaurantSearchService: RestaurantsSearchService) { }


  /**
   * Searches for a restaurant with given filters
   * 
   * @param restaurantSearchDto filters to search for restaurant
   * 
   * @returns array of matching restaurants
   */
    @Get()
    searchRestaurant(@Query() searchDto: RestaurantSearchDto) {
        const matches = this.restaurantSearchService.search(searchDto);
        return matches;
    }

    /**
   * Index a restaurant
   * 
   * @param restaurant object holding the required restaurant keys to be searched for
   * 
   * @returns the new index/document
   */
    @Post()
    indexRestaurant(@Body() restaurantBody: RestaurantSearchBody) {
        const doc = this.restaurantSearchService.indexRestaurant(restaurantBody);
        return doc;
    }

}
