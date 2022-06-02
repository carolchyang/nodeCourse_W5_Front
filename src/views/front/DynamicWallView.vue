<template>
  <div class="row g-3 mb-4">
    <div class="col-12 col-md-4">
      <select class="form-select form-select-sm" v-model="filter.sort">
        <option value="desc" selected>由新到舊</option>
        <option value="asc">由舊到新</option>
      </select>
    </div>
    <div class="col-12 col-md-8">
      <div class="input-group input-group-sm">
        <input
          type="text"
          class="form-control"
          placeholder="搜尋貼文"
          aria-label="search"
          aria-describedby="search"
          v-model="filter.q"
        />
        <button
          class="effectBtn btn btn-primary py-0 px-3"
          type="button"
          id="search"
          @click.prevent="filterPost"
        >
          <i class="bi bi-search h3"></i>
        </button>
      </div>
    </div>
  </div>

  <ul class="mb-10">
    <li class="card" v-for="(item, key) in data" :key="key">
      <div class="d-flex align-items-center mb-4">
        <img
          :src="item.user?.avatar"
          class="thumbnail thumbnail-xl"
          v-if="item.user.avatar"
        />
        <img
          src="../../assets/images/user_default.png"
          class="thumbnail thumbnail-xl"
          v-else
        />
        <div class="fw-bold ms-4">
          <router-link to="/personalwall" class="link-dark">
            {{ item.user.name }}
          </router-link>
          <span class="d-block text-light fs-7 fw-normal">
            {{ $getTime(item.createdAt) }}
          </span>
        </div>
        <a
          href="#"
          class="cardCloseBtn"
          v-if="item.user?._id == user._id"
          @click.prevent="deletePost(item._id)"
        >
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
      <div>
        <p class="mb-4">
          {{ item.content }}
        </p>
        <div
          class="bgCover mb-4"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
          v-if="item.image"
        ></div>
      </div>
    </li>
  </ul>

  <div
    class="bg-white border border-2 rounded shadow-sm"
    v-if="data.length == 0"
  >
    <div class="p-4 border-bottom border-2 border-dark">
      <ul class="d-flex">
        <li class="circle me-2"></li>
        <li class="circle circle-1 me-2"></li>
        <li class="circle circle-2"></li>
      </ul>
    </div>
    <div class="py-8 text-center text-light">
      目前尚無動態，新增一則貼文吧！
    </div>
  </div>

  <PaginationComponent
    :pagination="pagination"
    @get-posts="getPosts"
    v-if="data.length"
  />
</template>

<script>
import PaginationComponent from "@/components/PaginationComponent";

export default {
  name: "DynamicWallView",
  data() {
    return {
      data: [],
      pagination: {
        currentPages: 1,
        hasNext: false,
        hasPre: false,
        totalPage: 1,
      },
      filter: {
        sort: "desc",
        q: "",
      },
      user: {
        _id: "62981e2773de4afd453ed557",
        name: "carol",
        gender: "female",
        avatar:
          "https://images.unsplash.com/photo-1618988727281-8d54f5d32932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80",
      },
    };
  },
  methods: {
    getPosts(page = 1, sort = "desc", q = "") {
      this.$emitter.emit("toggle-loading", true);
      this.$http
        .get(
          `${process.env.VUE_APP_API}/posts?page=${page}&sort=${sort}&q=${q}`
        )
        .then((res) => {
          this.data = res.data.data.data;
          this.pagination = res.data.data.pagination;
          this.$emitter.emit("toggle-loading", false);
        })
        .catch((err) => {
          this.$pushMessage({
            style: "danger",
            content: err.response.data.message || "取得貼文失敗",
          });
          this.$emitter.emit("toggle-loading", false);
        });
    },
    filterPost() {
      this.getPosts(
        this.pagination.currentPages,
        this.filter.sort,
        this.filter.q
      );
    },
    deletePost(id) {
      this.$emitter.emit("toggle-loading", true);
      this.$http
        .delete(`${process.env.VUE_APP_API}/post/${id}`)
        .then(() => {
          this.getPosts();
          this.$pushMessage({
            style: "dark",
            content: "刪除貼文成功",
          });
          this.$emitter.emit("toggle-loading", false);
        })
        .catch((err) => {
          this.$pushMessage({
            style: "danger",
            content: err.response.data.message || "刪除貼文失敗",
          });
          this.$emitter.emit("toggle-loading", false);
        });
    },
  },
  components: {
    PaginationComponent,
  },
  mounted() {
    this.getPosts();
  },
};
</script>
