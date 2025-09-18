<template>
  <div class="p-8">
    <Dropdown
      :options="categories"
      buttonLabel="Select Category"
      @select="onSelect"
    />
  </div>
</template>

<script>
import Dropdown from "./components/Dropdown.vue";

export default {
  name: "App",
  components: {
    Dropdown,
  },
  setup() {
    const categories = [
      {
        id: 1,
        label: "Furniture",
        children: [
          { id: 11, label: "Sofas", icon: "gi-sofa" },
          { id: 12, label: "Beds" },
          {
            id: 13,
            label: "Tables",
            icon: "md-tablerestaurant",
            children: [
              { id: 131, label: "Dining Tables" },
              { id: 132, label: "Coffee Tables" },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Electronics",
        children: [
          { id: 21, label: "Mobiles", icon: "fa-mobile-alt" },
          { id: 22, label: "Laptops" },
          { id: 23, label: "Cameras", disabled: true },
        ],
      },
      {
        id: 3,
        label: "Sports",
        icon: "md-sportsbaseball",
        children: [
          { id: 31, label: "Cricket", icon: "md-sportscricket" },
          { id: 32, label: "Football", disabled: true },
          { id: 33, label: "Hockey" },
        ],
      },
      {
        id: 4,
        label: "Books",
        children: [
          {
            id: 21,
            label: "Fictional",
            icon: "fa-mobile-alt",
            children: [],
            disabled: true,
          },
          { id: 22, label: "Auto Biography" },
          { id: 23, label: "Non-fictional", disabled: true },
        ],
      },
      {
        id: 5,
        label: "Movies",
        disabled: true,
        children: [],
      },
    ];

    function onSelect(option) {
      console.log("Selected option:", option);
    }

    return {
      categories,
      onSelect,
    };
  },
};
</script>
