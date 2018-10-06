<template>
  <div>
<button open-type="getUserInfo">登录授权</button>
<Card :key='book.id' v-for='book in books' :book='book'></Card>
  </div>
</template>

<script>
import { get } from "@/util";
import Card from "@/components/Card";
export default {
  name: "",
  props: [""],
  data() {
    return {
      books: []
    };
  },

  components: {
    Card
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getList()
  },

  methods: {
    async getList() {
      const books = await get("/weapp/booklist");
      this.books = books.list;
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
</style>