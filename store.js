import { reactive, computed, watch } from "vue";
const storeName = "vite-recipe-book-store";
const id = () => "_" + Math.random().toString(36).substr(2, 9);
const state = reactive(
    localStorage.getItem(storeName)
        ? JSON.parse(localStorage.getItem(storeName))
        : {
              ingredients: [],
              recipes: [],
          }
);
watch(state, (value) => localStorage.setItem(storeName, JSON.stringify(value)));
export const useStore = () => ({
    ingredients: computed(() =>
        state.ingredients.sort((a, b) => a.name.localeCompare(b.name))
    ),
    recipes: computed(() =>
        state.recipes
            .map((recipe) => ({
                ...recipe,
                ingredients: recipe.ingredients.map((ingredient) =>
                    state.ingredients.find((i) => i.id === ingredient)
                ),
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
    ),
    addIngredient: (ingredient) => {
        state.ingredients = [
            ...state.ingredients,
            { id: id(), name: ingredient },
        ];
    },
    removeIngredient: (ingredient) => {
        if (
            state.recipes.some((recipe) =>
                recipe.ingredients.some((i) => i.id === ingredient.id)
            )
        )
            return;
        state.ingredients = state.ingredients.filter(
            (i) => i.id !== ingredient.id
        );
    },
    addRecipe: (recipe) => {
        state.recipes = [
            ...state.recipes,
            {
                id: id(),
                ...recipe,
                ingredients: recipe.ingredients.map((i) => i.id),
            },
        ];
    },
    removeRecipe: (recipe) => {
        state.recipes = state.recipes.filter((r) => r.id !== recipe.id);
    },
});
