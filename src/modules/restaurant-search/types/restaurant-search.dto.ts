import { IsOptional, IsString, ValidateIf } from "class-validator";

export class RestaurantSearchDto {

    @IsString()
    @IsOptional()
    @ValidateIf(obj => obj.name || obj.uniqueName || obj.cuisine)
    name?: string;

    @IsString()
    @IsOptional()
    @ValidateIf(obj => obj.name || obj.uniqueName || obj.cuisine)
    uniqueName?: string;

    @IsString()
    @IsOptional()
    @ValidateIf(obj => obj.name || obj.uniqueName || obj.cuisine)
    cuisine?: string;
}

