export interface IIngredient {
  id: number;
  uniqueIngredientId: number;
  ingredientName: string;
  unitOfStock: string;
  currentStockQuantity: number;
  unitOfPrice: string;
  costPerUnit: number;
  caloriesPerUnit: number;
  reorderPoint: number;
  expectedStockForToday: number;
  expectedStockForTomorrow: number;
  liquid: string;
  perishable: string;
  description: string;
  unitOfIdealStoringTemperature: string;
  idealStoringTemperature: number;
  restaurantId: number;
  categoryId: number;
}

export type ICreateIngredient = Omit<IIngredient, "id">;
