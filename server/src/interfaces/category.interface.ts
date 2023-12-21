export interface ICategory {
    id?: number;
    categoryName: string;
    imageUrl?: string;
    storageShelf?: string;
    storageType?: string;
    vegetarian?: boolean;
    vegan?: boolean;
    restaurantId?: number;
}
