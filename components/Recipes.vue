<template>
  <section>
    <input type="text" v-model="data.filter" placeholder="Type something to filter the list" />
  </section>
  <section>
    <input type="text" v-model="data.newRecipe.name" placeholder="Name" />
    <br />
    <select v-model="data.newIngredient">
      <option value></option>
      <option
        v-for="ingredient in data.ingredients"
        :key="ingredient.id"
        :value="ingredient.id"
      >{{ingredient.name}}</option>
    </select>
    <button
      @click="addIngredient(data.newIngredient)"
      :disabled="!data.newIngredient"
    >Add Ingredient</button>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in data.newRecipe.ingredients" :key="ingredient.id">
          <td>{{ingredient.id}}</td>
          <td>{{ingredient.name}}</td>
          <td>
            <button @click="removeIngredient(ingredient)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="add(data.newRecipe)" :disabled="!canAddRecipe">Add Recipe</button>
  </section>
  <section>
    <template v-if="!data.recipes.length">
      <h1>No recipes found</h1>
    </template>
    <template v-else>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in data.recipes" :key="recipe.id">
            <td>{{recipe.id}}</td>
            <td>{{recipe.name}}</td>
            <td>
              <button @click="view(recipe)">View</button>
              <button @click="update(recipe)">Update</button>
              <button @click="remove(recipe)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </section>
  <section v-if="data.viewRecipe.name">
    <p>
      <strong>Name:</strong>
      {{data.viewRecipe.name}}
    </p>
    <p>
      <strong>Ingredients</strong>
    </p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in data.viewRecipe.ingredients" :key="ingredient.id">
          <td>{{ingredient.id}}</td>
          <td>{{ingredient.name}}</td>
        </tr>
      </tbody>
    </table>
    <button @click="hide">Hide</button>
  </section>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "../store";
export default {
  setup() {
    const store = useStore();
    const data = reactive({
      ingredients: store.ingredients,
      recipes: store.recipes,
      filter: "",
      newRecipe: { name: "", ingredients: [] },
      newIngredient: "",
      viewRecipe: {}
    });
    const filteredRecipes = computed(() =>
      data.recipes.filter(
        recipe => !data.filter || JSON.stringify(recipe).includes(data.filter)
      )
    );
    const add = recipe => {
      store.addRecipe(recipe);
      data.newRecipe = { name: "", ingredients: [] };
      data.newIngredient = "";
    };
    const update = recipe => {
      data.newRecipe = recipe;
      remove(recipe);
    };
    const remove = recipe => {
      store.removeRecipe(recipe);
    };
    const hide = () => {
      data.viewRecipe = {};
    };
    const view = recipe => {
      data.viewRecipe = recipe;
    };
    const canAddRecipe = computed(
      () => data.newRecipe.name && data.newRecipe.ingredients.length
    );

    const addIngredient = ingredient => {
      if (data.newRecipe.ingredients.some(i => i.id === ingredient)) return;
      data.newRecipe.ingredients = [
        ...data.newRecipe.ingredients,
        data.ingredients.find(i => i.id === ingredient)
      ];
    };
    const removeIngredient = ingredient =>
      (data.newRecipe.ingredients = data.newRecipe.ingredients.filter(
        i => i.id !== ingredient.id
      ));
    return {
      filteredRecipes,
      data,
      add,
      update,
      remove,
      hide,
      view,
      canAddRecipe,
      addIngredient,
      removeIngredient
    };
  }
};
</script>
