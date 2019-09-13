<template>
  <div class="side-menu-wrapper" style="height:100%;background:blue">
    <!-- <slot></slot> -->
    <div class="item-logo-main">
        <img src="http://www.coral3.com/ds/img/katong.gif" alt="" class="item-logo">
    </div>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect" style = "background:#000">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item style = "background:#000" v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item style = "background:#000" v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><span :class="item.children[0].meta.icon || ''"></span><span>{{ showTitle(item.children[0]) }}</span></menu-item>
        </template>
        <template v-else>
          <side-menu-item style = "background:#000" v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item style = "background:#000" v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><span :class="item.icon || ''"></span><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
        <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`">
          <!-- 收起侧边栏时图标展示 -->
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}"><span :size="rootIconSize" :color="textColor" :class="item.icon || (item.children && item.children[0].icon)"></span></a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
      
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
.item-logo-main{
  width:100%;
  height:100px;
  background:black;
  display:flex;
  justify-content: center;
  align-items:center;
  box-shadow:5px 0 10px -1px blue;
  margin-bottom:18px;
  overflow: hidden;
}
.item-logo{
    display:block;
    width:400px;
}
@import './side-menu.less';

</style>
