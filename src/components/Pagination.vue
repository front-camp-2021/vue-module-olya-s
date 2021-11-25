<template>
  <div
    v-if="pages.length"
    class="pagination"
    @pointerdown="handlePointerDown"
  >
    <span
      class="pagination__item"
      data-element="prevPage"
    >
      {{ prevPage }}
      <button
        v-if="current !== 1"
        class="pagination__link pagination__link_arrow"
      >
        &lt;
      </button>
    </span>
    <ul class="pagination__list">
      <li
        v-for="page of pages"
        :key="page.dataIndex"
        :class="page.class"
        :data-index="page.dataIndex"
      >
        <button
          v-if="page && page.dataContent"
          class="pagination__link"
        >
          {{ page.dataContent === "..." ? page.dataContent : page.dataIndex }}
        </button>
        {{ page.dataContent ? "" : page.dataIndex }}
      </li>
    </ul>
    <span
      class="pagination__item"
      data-element="nextPage"
    >
      {{ nextPage }}
      <button
        v-if="current !== total"
        class="pagination__link pagination__link_arrow"
      >
        &gt;
      </button>
    </span>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Pagination",
  setup() {
    const store = useStore();

    const start = 1;
    const viewPages = store.getters.viewPages;
    const current = computed(() => store.getters.currentPage);
    const total = computed(() => store.getters.totalPages);
    const prevPage = computed(() => {
      return current.value === 1 ? "<" : "";
    });
    const nextPage = computed(() => {
      return current.value === total.value ? ">" : "";
    });
    const pages = computed(() => getPages());

    function getPages() {
      let pages = [];
      const currentPage = current.value;
      const totalPages = total.value;
      if (totalPages <= 1) {
        return [];
      }
      if (totalPages <= viewPages) {
        for (let i = 1; i <= totalPages; i++) {
          if (currentPage === i) {
            pages[i] = {
              class: "pagination__item pagination__item_current",
              dataIndex: i,
              dataContent: "",
            };
          } else {
            pages[i] = {
              class: "pagination__item",
              dataIndex: i,
              dataContent: "button",
            };
          }
        }
        return pages.filter((page) => page);
      }
      if (currentPage < start + 5) {
        for (let i = start; i < viewPages - 1; i++) {
          if (currentPage === i) {
            pages[i] = {
              class: "pagination__item pagination__item_current",
              dataIndex: i,
              dataContent: "",
            };
          } else {
            pages[i] = {
              class: "pagination__item",
              dataIndex: i,
              dataContent: "button",
            };
          }
        }
        pages[start + 7] = {
          class: "pagination__item",
          dataIndex: start + 7,
          dataContent: "...",
        };
        pages[viewPages] = {
          class: "pagination__item",
          dataIndex: totalPages,
          dataContent: "button",
        };
      } else if (currentPage > totalPages - 5) {
        for (let i = totalPages; i > totalPages - viewPages + 1; i--) {
          if (currentPage === i) {
            pages[i] = {
              class: "pagination__item pagination__item_current",
              dataIndex: i,
              dataContent: "",
            };
          } else {
            pages[i] = {
              class: "pagination__item",
              dataIndex: i,
              dataContent: "button",
            };
          }
        }
        pages[totalPages - viewPages + 2] = {
          class: "pagination__item",
          dataIndex: totalPages - viewPages + 2,
          dataContent: "...",
        };
        pages[start] = {
          class: "pagination__item",
          dataIndex: start,
          dataContent: "button",
        };
      } else {
        pages[start] = {
          class: "pagination__item",
          dataIndex: start,
          dataContent: "button",
        };
        pages[currentPage - 3] = {
          class: "pagination__item",
          dataIndex: currentPage - 3,
          dataContent: "...",
        };
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          if (currentPage === i) {
            pages[i] = {
              class: "pagination__item pagination__item_current",
              dataIndex: i,
              dataContent: "",
            };
          } else {
            pages[i] = {
              class: "pagination__item",
              dataIndex: i,
              dataContent: "button",
            };
          }
        }
        pages[totalPages - 1] = {
          class: "pagination__item",
          dataIndex: totalPages,
          dataContent: "button",
        };
        pages[currentPage + 3] = {
          class: "pagination__item",
          dataIndex: currentPage + 3,
          dataContent: "...",
        };
      }
      return pages.filter((page) => page);
    }

    function handlePointerDown(event) {
      let currentPage = current.value;
      if (event.target.classList.contains("pagination__link")) {
        if (event.target.parentElement.dataset.element === "prevPage") {
          currentPage = current.value - 1;
        } else if (event.target.parentElement.dataset.element === "nextPage") {
          currentPage = current.value + 1;
        }
        if (event.target.className === "pagination__link") {
          currentPage = +event.target.closest("li").dataset.index;
        }
      }

      store.dispatch("updateCurrentPage", currentPage);
    }

    return {
      pages,
      current,
      total,
      prevPage,
      nextPage,
      handlePointerDown,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/styles/vars";
@import "../assets/styles/mixins";

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;

  &__link {
    border: none;
    color: $text-color;
    @include text-format(300, 1.2rem);

    &:hover {
      cursor: pointer;
    }

    &_arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      background: #ededed;
      border-radius: 50%;
    }
  }

  &__list {
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: 0 10px;
    background: #ededed;
    border-radius: 7px;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background: #ededed;
    border-radius: 50%;

    &_current {
      border-radius: 50%;
      color: #fff;
      background: #6f64f8;
    }
  }
}
</style>
