<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <component v-if="route.meta.ignoreCache" :is="Component" :key="route.fullPath" />
        <keep-alive v-else>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>
