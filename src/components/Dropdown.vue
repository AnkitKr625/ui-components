<template>
  <div class="relative inline-block text-left w-64">
    <!-- Trigger Button -->
    <button
      @click="toggleDropdown"
      class="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
    >
      <span>{{ buttonLabel }}</span>
      <v-icon
        name="hi-chevron-down"
        class="transition-transform duration-500"
        :class="isOpen ? '-rotate-180' : 'rotate-0'"
      ></v-icon>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50 p-2"
    >
      <!-- Search -->
      <div class="p-2 pt-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full px-3 py-1 border-2 border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      <!-- Back button -->
      <div
        v-if="path.length && !searchQuery"
        class="flex items-center px-3 py-2 border-b-1 border-b-gray-300"
      >
        <button @click="goBack" class="flex items-center cursor-pointer">
          <v-icon name="io-arrow-back" class="w-4 h-4" />
        </button>
        <v-icon
          v-if="path[path.length - 1]?.icon"
          :name="path[path.length - 1]?.icon"
          class="ml-2"
        ></v-icon>
        <span class="ml-2 font-medium">{{ path[path.length - 1]?.label }}</span>
      </div>

      <!-- Options -->
      <ul class="max-h-64 overflow-y-auto">
        <li
          v-for="opt in currentOptions"
          :key="opt.id"
          class="px-3 py-2 flex items-center cursor-pointer hover:bg-gray-100"
          :class="{ 'opacity-50 cursor-not-allowed': opt.disabled }"
          @click="handleOptionClick(opt)"
        >
          <!-- Icon -->
          <span v-if="opt.icon" class="mr-2">
            <v-icon :name="opt.icon"></v-icon>
          </span>
          <span>{{ opt.label }}</span>
          <v-icon
            v-if="opt.children && !searchQuery"
            class="ml-auto text-gray-400"
            name="hi-chevron-right"
          >
          </v-icon>
        </li>
        <li v-if="!currentOptions.length" class="px-3 py-2 text-gray-500">
          No options found
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted, watch } from "vue";
export default {
  name: "Dropdown",
  props: {
    options: { type: Array, required: true },
    buttonLabel: { type: String, default: "Click here" },
  },
  emits: ["select"],

  setup(props, { emit }) {
    const isOpen = ref(false);
    const searchQuery = ref("");
    const debouncedSearchQuery = ref("");
    const path = ref([]);

    let debounceTimeout;
    watch(searchQuery, (newVal) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        debouncedSearchQuery.value = newVal.trim();
      }, 300);
    });

    onUnmounted(() => {
      clearTimeout(debounceTimeout);
    });

    const currentOptions = computed(() => {
      if (debouncedSearchQuery.value) {
        return filteredOptions.value;
      }
      if (path.value.length === 0) {
        return props.options;
      }
      return path.value[path.value.length - 1].children || [];
    });

    const filteredOptions = computed(() => {
      if (!debouncedSearchQuery.value) {
        return [];
      }
      return searchOptions(props.options, debouncedSearchQuery.value);
    });

    function searchOptions(list, query) {
      let results = [];
      for (const opt of list) {
        if (opt.children && opt.children.length) {
          results = results.concat(searchOptions(opt.children, query));
        } else if (opt.label.toLowerCase().includes(query.toLowerCase())) {
          results.push(opt);
        }
      }
      return results;
    }

    function handleOptionClick(option) {
      if (option.disabled) return;

      if (option.children && option.children.length && !searchQuery.value) {
        path.value.push(option);
      } else {
        emit("select", option);
        isOpen.value = false;
        reset();
      }
    }

    function goBack() {
      path.value.pop();
    }

    function reset() {
      path.value = [];
      searchQuery.value = "";
    }

    function toggleDropdown() {
      isOpen.value = !isOpen.value;
      reset();
    }

    return {
      isOpen,
      searchQuery,
      path,
      currentOptions,
      handleOptionClick,
      goBack,
      toggleDropdown,
    };
  },
};
</script>
