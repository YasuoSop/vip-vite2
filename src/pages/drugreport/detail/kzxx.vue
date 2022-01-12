<template>
  <div class="detail-items" v-if="extendList && extendList.length > 0">
    <div class="detail-item">
      <div class="item-title">
        <span class="text">扩展信息</span>
      </div>
      <div class="extend-list">
        <ExtendButton
          v-for="(item, index) in extendList"
          :key="index"
          :item="item"
        ></ExtendButton>
      </div>
    </div>
  </div>
</template>

<script>
import ExtendButton from "@/components/common/extend-button.vue"
export default {
  components: {
    ExtendButton,
  },
  props: {
    extendList: Array,
    res: {
      type: Object,
    },
    ylbm: {
      type: String,
    }
  },
  methods: {},
  created() {
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/var.less";
@import "../css/com.less";

.extend-list {
  padding: 20px 180px 20px 100px;
}
</style>
 