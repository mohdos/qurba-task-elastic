import { RestaurantSearchBody } from "./restaurant-search-body.interface";

export interface RestaurantSearchResult {
    hits: {
        total: number;
        hits: Array<{
          _source: RestaurantSearchBody;
        }>;
    };
}
