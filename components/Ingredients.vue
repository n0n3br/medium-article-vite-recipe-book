<template>
  <section>
    <input type="text" v-model="data.filter" placeholder="Type something to filter the list" />
  </section>
  <section>
    <input type="text" v-model="data.newIngredient" placeholder="Title" />
    <button @click="add(data.newIngredient)" @disabled="!data.newIgredient">Add</button>
  </section>
  <section>
    <template v-if="!data.ingredients.length">
      <h1>No ingredients found</h1>
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
          <tr v-for="ingredient in filteredIngredients" :key="ingredient">
            <td>{{ingredient.id}}</td>
            <td>{{ingredient.name}}</td>
            <td>
              <button @click="update(ingredient)">Update</button>
              <button @click="remove(ingredient)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
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
      filter: "",
      newIngredient: ""
    });
    const filteredIngredients = computed(() =>
      data.ingredients.filter(
        ingredient => !data.filter || ingredient.name.includes(data.filter)
      )
    );
    const add = ingredient => {
      store.addIngredient(ingredient);
    };
    const update = ingredient => {
      data.newIngredient = ingredient;
      rmeove(ingredient);
    };
    const remove = ingredient => {
      store.removeIngredient(ingredient);
    };
    return {
      filteredIngredients,
      data,
      add,
      update,
      remove
    };
  }
};
</script>
