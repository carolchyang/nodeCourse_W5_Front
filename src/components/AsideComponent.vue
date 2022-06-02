<template>
  <aside class="aside">
    <div class="asideContent">
      <router-link
        to="/createpost"
        class="effectBtn d-none d-lg-block btn btn-primary w-100 mb-6 fw-bold"
        >張貼動態</router-link
      >
      <ul class="asideList">
        <li class="d-none d-lg-flex mb-9">
          <router-link to="/" class="asideLink">
            <img :src="user.avatar" class="thumbnail thumbnail-xl" />
            <h5 class="ms-4 fw-bolder">{{ user.name }}</h5>
          </router-link>
        </li>
        <li class="d-lg-none">
          <router-link to="/" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-house-door"></i>
            </div>
          </router-link>
        </li>
        <li class="mb-lg-8">
          <a href="#" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-bell"></i>
            </div>
            <h5 class="d-none d-lg-block ms-4 fw-bolder">追蹤名單</h5>
          </a>
        </li>
        <li>
          <a href="#" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-hand-thumbs-up"></i>
            </div>
            <h5 class="d-none d-lg-block ms-4 fw-bolder">我按讚的文章</h5>
          </a>
        </li>
        <li class="d-lg-none">
          <router-link to="/createpost" class="asideLink">
            <div class="asideLinkIcon">
              <i class="bi bi-plus-lg"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AsideComponent",
  data() {
    return {
      user: {
        _id: "62981e2773de4afd453ed557",
        name: "carol",
        gender: "female",
        avatar:
          "https://images.unsplash.com/photo-1618988727281-8d54f5d32932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80",
      },
    };
  },
};
</script>
