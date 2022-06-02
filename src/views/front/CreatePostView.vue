<template>
  <h1 class="header">張貼動態</h1>

  <form class="card p-md-8" ref="postForm" @submit.prevent="createPost">
    <div class="mb-4">
      <label for="content" class="form-label">貼文內容</label>
      <textarea
        id="content"
        class="form-control"
        rows="5"
        cols="50"
        placeholder="輸入您的貼文內容"
        v-model.trim="tempPost.content"
      ></textarea>
    </div>
    <div class="mb-10">
      <label for="image" class="form-label">圖片網址</label>
      <input
        type="text"
        id="image"
        class="form-control"
        placeholder="輸入圖片網址"
        v-model.trim="tempPost.image"
      />
    </div>

    <p class="text-center text-danger mb-6">{{ message }}</p>

    <div class="text-center">
      <button type="submit" class="effectBtn btn btn-primary w-100">
        送出貼文
      </button>
    </div>
  </form>
</template>

<script>
import { isValidUrl } from "@/scripts/methods";

export default {
  name: "CreatePostView",
  data() {
    return {
      tempPost: {
        user: "62981e2773de4afd453ed557",
        content: "",
        image: "",
      },
      message: "",
    };
  },
  methods: {
    createPost() {
      this.message = "";

      if (this.tempPost.content == "") {
        this.message = "貼文內容不得為空";
      } else if (
        this.tempPost.image !== "" &&
        !isValidUrl(this.tempPost.image)
      ) {
        this.message = "請填寫正確圖片網址";
      } else {
        this.$http
          .post(`${process.env.VUE_APP_API}/post`, this.tempPost)
          .then(() => {
            this.$refs.postForm.reset();
            this.$router.push("/");
            this.$pushMessage({
              style: "dark",
              content: "新增貼文成功",
            });
            this.$emitter.emit("toggle-loading", false);
          })
          .catch((err) => {
            this.$pushMessage({
              style: "danger",
              content: err.response.data.message || "建立貼文失敗",
            });
            this.$emitter.emit("toggle-loading", false);
          });
      }
    },
  },
};
</script>
