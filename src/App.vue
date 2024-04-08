<template>
  <a-layout>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="App Bar" />
  </a-layout>

  <a-layout>
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <a-menu :style="{ height: '100vh' }" mode="vertical">
        <a-menu-item key="1">
          <DashboardOutlined />
          <router-link :to="{ name: 'dashboard' }" style="margin-left: 10px">{{
            $t("nav.dashboard")
          }}</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <OrderedListOutlined />
          <router-link :to="{ name: 'todos' }" style="margin-left: 10px">{{
            $t("nav.todos")
          }}</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <CloudOutlined />
          <router-link :to="{ name: 'weather' }" style="margin-left: 10px">{{
            $t("nav.weather")
          }}</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <SettingOutlined />
          <router-link :to="{ name: 'profile' }" style="margin-left: 10px">{{
            $t("nav.profile")
          }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout-content>
      <div
        :style="{
          padding: '24px',
          minHeight: '720px',
        }">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import {
  DashboardOutlined,
  OrderedListOutlined,
  CloudOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
</script>
