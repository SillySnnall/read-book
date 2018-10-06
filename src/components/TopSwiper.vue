<template>
  <div class="swiper">
    <swiper
    :indicator-dots='true'
    indicator-color='#ea5a49'
    :autoplay='true'
    :interval='6000'
    :duration='1000'
    :circular='true'
    >
    <div :key='imgindex' v-for='(top,imgindex) in imgurls'>
      <swiper-item>
        <img 
        @click="bookDetail(img)"
        class="slide-image" 
        mode= 'aspectFit' 
        v-for="img in top"
         :src='img.image' 
         :key="img.id"
        alt="">
      </swiper-item>
    </div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["tops"],
  data() {
    return {};
  },

  components: {},

  computed: {
    imgurls() {
      let res = this.tops;
      // 为了每个页面显示3本书
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    bookDetail(item) {
      wx.navigateTo({
        url: "/pages/detail/main?id=" + item.id
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.swiper {
  margin-top: 5px;
  .slide-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>