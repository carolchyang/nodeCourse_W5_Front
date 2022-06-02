<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pagination.hasPre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(currentPages - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="n in pagination.totalPage"
        :key="n"
        :class="{ active: pagination.currentPages == n }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(n)">{{ n }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.hasNext }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(currentPages + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: ["pagination"],
  emits: ["get-posts"],
  methods: {
    changePage(page = 1) {
      this.$emit("get-posts", page);
    },
  },
  computed: {
    currentPages() {
      const num = parseInt(this.pagination.currentPages);
      return num;
    },
  },
};
</script>
