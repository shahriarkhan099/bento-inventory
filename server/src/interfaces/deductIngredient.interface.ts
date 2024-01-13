import { IIngredientBatch } from "./ingredientBatch.interface";

export interface IngredientToReduce {
  id: number;
  quantity: number;
}

export interface DeductedIngredient {
  ingredientId: number;
  deductedIngredientBatches: IIngredientBatch[];
}