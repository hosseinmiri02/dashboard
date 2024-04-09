<template>
  <!-- Layout for the entire page -->
  <a-layout>
    <!-- Header section -->
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="App Bar" />
  </a-layout>

  <a-layout>
    <!-- Sider section for sidebar navigation -->
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <!-- Vertical menu -->
      <a-menu :style="{ height: '100vh' }" mode="vertical">
        <!-- Menu items -->
        <a-menu-item key="1">
          <DashboardOutlined />
          <!-- Link to dashboard -->
          <router-link :to="{ name: 'dashboard' }" style="margin-left: 10px">{{
            $t("nav.dashboard")
          }}</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <OrderedListOutlined />
          <!-- Link to todos -->
          <router-link :to="{ name: 'todos' }" style="margin-left: 10px">{{
            $t("nav.todos")
          }}</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <CloudOutlined />
          <!-- Link to weather -->
          <router-link :to="{ name: 'weather' }" style="margin-left: 10px">{{
            $t("nav.weather")
          }}</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <SettingOutlined />
          <!-- Link to profile -->
          <router-link :to="{ name: 'profile' }" style="margin-left: 10px">{{
            $t("nav.profile")
          }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- Main content section -->
    <a-layout-content>
      <div
        :style="{
          padding: '24px',
        }">
        <!-- Component for displaying routed views -->
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
// Importing necessary icons
import {
  DashboardOutlined,
  OrderedListOutlined,
  CloudOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
</script>
