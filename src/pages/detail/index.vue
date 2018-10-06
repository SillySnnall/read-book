<template>
  <div>{{bookid}}</div>
</template>

<script>
import { get } from "@/util";
export default {
  name: "",
  props: [""],
  data() {
    return {
      bookid: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
  },

  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
</style>