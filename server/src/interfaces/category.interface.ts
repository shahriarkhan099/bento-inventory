export interface ICategory {
    id: number;
    restaurantId: number;
    ingredientId: number;
    categoryName: string;
    imageUrl?: string;
    storageShelf?: string;
    storageType?: string;
    description?: string;
    vegetarian?: boolean;
    vegan?: boolean;
}
