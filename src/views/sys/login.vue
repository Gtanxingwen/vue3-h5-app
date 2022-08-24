<template>
  <div>login page</div>
  <p>我是登录页 {{ Date.now().toLocaleString() }}</p>
  <ul>
    <li>vue3/vite2/typescript 等前端开发技术</li>
    <li>axios 开箱即用</li>
    <li>store 已内置</li>
    <li>支持移动端适配（采用vw适配）</li>
    <li>支持svg雪碧图</li>
  </ul>
  <button class="login-btn" @click="login">登录</button>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from 'vue';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const login = async () => {
        await userStore.login(
          toRaw({
            phone: '18581893580',
          }),
        );
      };
      return {
        login,
      };
    },
  });
</script>

<style lang="less" scoped>
  .login-btn {
    display: block;
    width: 100px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    margin: 60px auto;
    cursor: pointer;
  }
</style>
