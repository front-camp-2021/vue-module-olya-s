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
        v-if="currentPage !== 1"
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
        v-if="currentPage !== totalPages"
        class="pagination__link pagination__link_arrow"
      >
        &gt;
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageSize: { type: Number, default: 6 },
    totalPages: { type: Number, default: 0 },
  },
  data: function () {
    return {
      start: 1,
      viewPages: 9,
      currentPage: 1,
    };
  },
  computed: {
    prevPage: function () {
      return this.currentPage === 1 ? "<" : "";
    },
    nextPage: function () {
      return this.currentPage === this.totalPages ? ">" : "";
    },
    pages: function () {
      let pages = [];
      if (this.totalPages <= 1) {
        return [];
      }
      if (this.totalPages <= this.viewPages) {
        for (let i = 1; i <= this.totalPages; i++) {
          if (this.currentPage === i) {
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
      if (this.currentPage < this.start + 5) {
        for (let i = this.start; i < this.viewPages - 1; i++) {
          if (this.currentPage === i) {
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
        pages[this.start + 7] = {
          class: "pagination__item",
          dataIndex: this.start + 7,
          dataContent: "...",
        };
        pages[this.viewPages] = {
          class: "pagination__item",
          dataIndex: this.totalPages,
          dataContent: "button",
        };
      } else if (this.currentPage > this.totalPages - 5) {
        for (
          let i = this.totalPages;
          i > this.totalPages - this.viewPages + 1;
          i--
        ) {
          if (this.currentPage === i) {
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
        pages[this.totalPages - this.viewPages + 2] = {
          class: "pagination__item",
          dataIndex: this.totalPages - this.viewPages + 2,
          dataContent: "...",
        };
        pages[this.start] = {
          class: "pagination__item",
          dataIndex: this.start,
          dataContent: "button",
        };
      } else {
        pages[this.start] = {
          class: "pagination__item",
          dataIndex: this.start,
          dataContent: "button",
        };
        pages[this.currentPage - 3] = {
          class: "pagination__item",
          dataIndex: this.currentPage - 3,
          dataContent: "...",
        };
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          if (this.currentPage === i) {
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
        pages[this.totalPages - 1] = {
          class: "pagination__item",
          dataIndex: this.totalPages,
          dataContent: "button",
        };
        pages[this.currentPage + 3] = {
          class: "pagination__item",
          dataIndex: this.currentPage + 3,
          dataContent: "...",
        };
      }
      // console.log(pages);
      return pages.filter((page) => page);
    },
  },
  methods: {
    handlePointerDown: function (event) {
      if (event.target.classList.contains("pagination__link")) {
        if (event.target.parentElement.dataset.element === "prevPage") {
          this.currentPage--;
        } else if (event.target.parentElement.dataset.element === "nextPage") {
          this.currentPage++;
        }
        if (event.target.className === "pagination__link") {
          this.currentPage = +event.target.closest("li").dataset.index;
        }
      }
      this.$emit("changePage", this.currentPage);
    },
  },
};
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
