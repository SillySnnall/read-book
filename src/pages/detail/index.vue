<template>
<div>
  <BookInfo :info='info'></BookInfo>
  <CommentList :comments='comments'></CommentList>
  <div class="comment">
    <textarea 
    v-model='comment' 
    class="textarea" 
    :maxlength="100" 
    placeholder="请输入图书短评" 
    cols="30" 
    rows="10"></textarea>
    <div class="location">
      地理位置:
      <switch color='#ea5a49' @change='getGeo'></switch>
      <span class="text-primary">{{location}}</span>
    </div>
    <div class="phone">
      手机型号:
       <switch color='#ea5a49' @change='getPhone'></switch>
       <span class="text-primary">{{phone}}</span>
    </div>
    <button class="btn" @click="addComment">
      评论
    </button>
  </div>
</div>
</template>

<script>
import { get, post, showModal } from "@/util";
import BookInfo from "@/components/BookInfo";
import CommentList from "@/components/CommentList";
export default {
  name: "",
  props: [""],
  data() {
    return {
      userinfo: {},
      bookid: "",
      info: {},
      comment: "",
      phone: "",
      location: "",
      comments:[]
    };
  },

  components: {
    BookInfo,
    CommentList
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
    const userinfo = wx.getStorageSync("userinfo");
    if (userinfo) {
      this.userinfo = userinfo;
    }
  },

  methods: {
    async getComments() {
      const comments = await get("/weapp/commentlist", { bookid: this.bookid });
      this.comments = comments;
      console.log(comments)
    },
    async addComment() {
      if (!this.comment) {
        return;
      }
      // 评论内容，手机型号，地理位置，图书id，用户openid
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      };
      try {
        const res = await post("/weapp/addcomment", data);
        this.comment = "";
      } catch (error) {
        showModal("错误", error);
      }
      console.log(data);
    },
    getGeo(e) {
      // 3GyrcUYv7MWGyQC32LwEFNmurYikIo1F
      // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
      const ak = "sURIswFWogGIVw6HCPKqfAqWwECRmUxQ";
      let url = "http://api.map.baidu.com/geocoder/v2/";
      const self = this;
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url: url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: "json"
              },
              success: function(res) {
                console.log(res);
                if (res.data.status == 0) {
                  self.location = res.data.result.addressComponent.city;
                } else {
                  self.location = "未知地点";
                }
              }
            });
          }
        });
      } else {
        // 没选中
        this.location = "";
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        console.log(phoneInfo);
        this.phone = phoneInfo.model;
      } else {
        // 没选中
        this.phone = "";
      }
    },
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
      this.info = info;
      wx.setNavigationBarTitle({
        title: info.title
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.comment {
  margin-top: 10px;
  .textarea {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10rpx;
  }
}
</style>