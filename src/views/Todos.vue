<template>
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <a-card
      class="todos-container"
      :title="$t('todosPage.todoList')"
      style="text-align: center">
      <a-input
        v-model:value="input_content"
        @keyup.enter="addTodo"
        placeholder="Add a new todo..." />
      <a-list>
        <a-list-item v-for="(todo, index) in todos" :key="todo.id">
          <template v-if="todo.isEditing">
            <a-input
              v-model:value="todo.newText"
              @keyup.enter="finishEdit(todo)"
              style="margin-right: 10px" />
            <a-button @click="finishEdit(todo)" shape="circle">
              <template #icon>
                <CheckOutlined />
              </template>
            </a-button>
          </template>

          <template v-else>
            <div class="todo-item" :class="{ 'todo-done-bg': todo.done }">
              <span
                :class="{ 'todo-done': todo.done }"
                @dblclick="editTodo(todo)">
                {{ todo.text }}
              </span>
            </div>
            <div>
              <a-checkbox
                v-model:checked="todo.done"
                @change="saveToLocalStorage"
                style="margin-right: 20px"></a-checkbox>
              <a-button
                @click="editTodo(todo)"
                shape="circle"
                style="margin-right: 10px">
                <template #icon>
                  <EditOutlined />
                </template>
              </a-button>

              <a-button @click="removeTodo(index)" shape="circle">
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </div>
          </template>
        </a-list-item>
      </a-list>
      <a-button @click="addTodo" shape="circle">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-button>
    </a-card>
  </a-config-provider>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { theme } from "ant-design-vue";
import { useStore } from "vuex";

const store = useStore();
const currentTheme = store.state.theme;

const todos = ref([]);

const input_content = ref("");

const addTodo = () => {
  if (input_content.value.trim() === "") {
    return;
  }

  todos.value.push({
    id: Date.now(),
    text: input_content.value,
    done: false,
    isEditing: false,
    newText: input_content.value,
  });

  input_content.value = "";
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
  saveToLocalStorage();
};

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos.value));
}

function editTodo(todo) {
  todo.isEditing = true;
}

const finishEdit = (todo) => {
  const newTodoText = todo.newText.trim();
  if (newTodoText === "") {
    todo.isEditing = false;
    return;
  }

  todo.text = newTodoText;
  todo.isEditing = false;
  todo.newText = newTodoText;
  saveToLocalStorage();
};

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);

onMounted(() => {
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

.todo-item {
  width: 70%;
  text-align: left;
  padding: 10px;
}

.todo-done-bg {
  background-color: greenyellow;
}
</style>
