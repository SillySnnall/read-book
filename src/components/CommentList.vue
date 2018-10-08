<template>
  <div class="comment-list">
    <div class="page-title">
        我的评论
    </div>
    <div v-for="comment in comments.list" :key="comment.id" class="comment">
        <div class="user">
            <div class="inline">
                <img :src="comment.image" class="avatar" mode='aspectFit' alt="">
                {{comment.title}}
            </div>
            <div class="right">
                {{comment.location||'未知地点'}}
                <span class="text-primary">
                    --
                </span>
                {{comment.phone||'未知型号'}}
            </div>
        </div>
        <div class="content">
            {{comment.comment}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["comments"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.comment-list {
  background: #eee;
  font-size: 14px;
  .comment {
    background: white;
    margin-bottom: 10px;
    padding: 5px 20px;
    .content {
      margin: 10px 0;
    }
    .user {
      .inline {
          display: inline;
        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>