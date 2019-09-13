<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <!-- <common-icon :type="parentItem.icon || ''"/> -->
      <span :class="parentItem.icon"></span>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children" style="background:red">
      <template v-if="item.children && item.children.length === 1" style="background:red">
        <side-menu-item style="background:#000" v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item style="background:#000" v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><span :class="item.children[0].icon || ''"></span><span>{{ showTitle(item.children[0]) }}</span></menu-item>
      </template>
      <template v-else>
        <side-menu-item style="background:#000" v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item style="background:#000" v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><span :class="item.icon || ''"></span><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>
