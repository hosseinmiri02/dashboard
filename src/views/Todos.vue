<template>
  <!-- Configuration provider for theme -->
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <!-- Card container for todo list -->
    <a-card
      class="todos-container"
      :title="$t('todosPage.todoList')"
      style="text-align: center">
      <!-- Input field for adding new todo -->
      <a-input
        v-model:value="input_content"
        @keyup.enter="addTodo"
        placeholder="Add a new todo..." />
      <!-- List of todos -->
      <a-list style="margin-top: 20px">
        <!-- Individual todo items -->
        <a-list-item
          :class="{ 'todo-done-bg': todo.done }"
          v-for="(todo, index) in todos"
          :key="todo.id">
          <!-- Editing mode for todo -->
          <template v-if="todo.isEditing">
            <!-- Input field for editing todo -->
            <a-input
              v-model:value="todo.newText"
              @keyup.enter="finishEdit(todo)"
              style="margin-right: 10px" />
            <!-- Button to finish editing -->
            <a-button @click="finishEdit(todo)" shape="circle">
              <template #icon>
                <CheckOutlined />
              </template>
            </a-button>
          </template>

          <!-- Display mode for todo -->
          <template v-else>
            <!-- Container for todo text -->
            <div style="display: inline-block; width: 40%">
              <!-- Display todo text -->
              <span
                :class="{ 'todo-done': todo.done }"
                class="todo-text"
                @dblclick="editTodo(todo)">
                {{ todo.text }}
              </span>
            </div>
            <!-- Buttons for todo actions -->
            <div style="width: 60%">
              <!-- Checkbox for marking todo as done -->
              <a-checkbox
                v-model:checked="todo.done"
                @change="saveToLocalStorage"
                style="margin-right: 10px"></a-checkbox>
              <!-- Button to edit todo -->
              <a-button
                @click="editTodo(todo)"
                shape="circle"
                style="margin-right: 5px">
                <template #icon>
                  <EditOutlined />
                </template>
              </a-button>
              <!-- Button to delete todo -->
              <a-button @click="removeTodo(index)" shape="circle">
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </div>
          </template>
        </a-list-item>
      </a-list>
      <!-- Button to add new todo -->
      <a-button @click="addTodo" shape="circle">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-button>
    </a-card>
  </a-config-provider>
</template>

<script setup>
// Importing necessary Vue functions and libraries
import { ref, watch, onMounted } from "vue";
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { theme } from "ant-design-vue";
import { useStore } from "vuex";

// Accessing Vuex store
const store = useStore();
// Retrieving current theme from store
const currentTheme = store.state.theme;

// Reactive variable for todo list
const todos = ref([]);

// Reactive variable for input content
const input_content = ref("");

// Function to add a new todo
const addTodo = () => {
  // Check if input content is empty
  if (input_content.value.trim() === "") {
    return;
  }

  // Add new todo to the list
  todos.value.push({
    id: Date.now(),
    text: input_content.value,
    done: false,
    isEditing: false,
    newText: input_content.value,
  });

  // Clear input field
  input_content.value = "";
};

// Function to remove a todo
const removeTodo = (index) => {
  // Remove todo from the list
  todos.value.splice(index, 1);
  // Save changes to local storage
  saveToLocalStorage();
};

// Function to save todo list to local storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos.value));
}

// Function to enter editing mode for a todo
function editTodo(todo) {
  todo.isEditing = true;
}

// Function to finish editing a todo
const finishEdit = (todo) => {
  // Get new todo text and trim it
  const newTodoText = todo.newText.trim();
  // If new todo text is empty, exit editing mode
  if (newTodoText === "") {
    todo.isEditing = false;
    return;
  }

  // Update todo text and exit editing mode
  todo.text = newTodoText;
  todo.isEditing = false;
  todo.newText = newTodoText;
  // Save changes to local storage
  saveToLocalStorage();
};

// Watcher to save todos to local storage on change
watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);

// Lifecycle hook: called when component is mounted
onMounted(() => {
  // Retrieve todos from local storage on mount
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos);
  }
});
</script>

<style scoped>
.todos-container {
  max-width: 600px;
  margin: auto;
}

.todo-done {
  text-decoration: line-through;
}

.todo-text {
  /* width: 40%; */
  word-wrap: break-word;
}

.todo-done-bg {
  background-color: greenyellow;
  border-radius: 10px;
}
</style>
