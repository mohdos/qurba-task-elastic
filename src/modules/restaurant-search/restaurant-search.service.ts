import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RestaurantSearchBody } from './types/restaurant-search-body.interface';
import { RestaurantSearchResult } from './types/restaurant-search-result.interface';
import { RestaurantSearchDto } from './types/restaurant-search.dto';
 
@Injectable()
export class RestaurantsSearchService { // used only for indexing restaurants, and not for actual searching
  private index = 'restaurants'; // index used in elastic search
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService, private readonly configService: ConfigService
  ) {}
 
  /**
   * Index a restaurant
   * 
   * @param restaurant object holding the required restaurant keys to be searched for
   * 
   * @returns the new index/document
   */
  async indexRestaurant(restaurant: RestaurantSearchBody) {
    const indexed = await this.elasticsearchService.index({
      index: this.index,
      body: {
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        cuisine: restaurant.cuisine
      }
    });
    return indexed;
  }

  /**
   * Searches for a restaurant with given filters
   * 
   * @param restaurantSearchDto filters to search for restaurant
   * 
   * @returns array of matching restaurants
   */
  async search(restaurantSearchDto: RestaurantSearchDto) {
    let filtersObj = {};
    let queries: Array<string> = [];
    let fields: Array<string> = [];
    for (let key of Object.keys(restaurantSearchDto)) // loop through all keys
    {
        if (restaurantSearchDto[key]) { // if a key is defined
            queries.push(restaurantSearchDto[key]); // add the search to query
            fields.push(key); // add the current key to the fields to be searched for
        }
    }
    const queryString = queries.join(" OR "); // formatting the query to elastic search (Currently searching using OR, can be implemented using AND instead, depending on the requirement)

    const { body } = await this.elasticsearchService.search<RestaurantSearchResult>({ // perform search
      index: this.index,
      body: {
        query: {
            multi_match: {
                query: queryString,
                fields,
                fuzziness: 2 // max number of words different from actual, can be changed depending on purpose
            }
        }
      }
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source); // document is saved in _source, returning only that from all items in hits
  }

}
