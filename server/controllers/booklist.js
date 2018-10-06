const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const books = await mysql('books')
    .select('books.*','cSessionInfo.user_info')
    .join('cSessionInfo','books.openid','cSessionInfo.open_id')
    .orderBy('books.id', 'desc')
    console.log(books)
    console.log("--------------------")
    ctx.state.data = {
        list: books.map(v=>{
            // 遍历每一对象
            const info = JSON.parse(v.user_info)
            // Object.assign用来重新组合数据，相同的对象他会覆盖
            return Object.assign({},v,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    }
}