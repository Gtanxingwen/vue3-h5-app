<template>
  <div>login page</div>
  <p>我是登录页 {{ now }}</p>
  <ul>
    <li>vue3/vite2/typescript 等前端开发技术</li>
    <li>axios 开箱即用</li>
    <li>store 已内置</li>
    <li>支持移动端适配（采用vw适配）</li>
    <li>支持svg雪碧图</li>
  </ul>
  <!-- sizes and positions -->
  <div class="p-5px mt-[0.3px]">sizes and positions</div>

  <!-- colors -->
  <button class="bg-hex-b2a8bb">colors</button>
  <button class="bg-[hsl(211.7,81.9%,69.6%)]">colors2</button>

  <!-- grid template -->
  <div class="grid-cols-[auto,1fr,30px]">grid template</div>
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
      const now = new Date().toLocaleString();
      return {
        login,
        now,
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
