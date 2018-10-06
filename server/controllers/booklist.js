const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { page } = ctx.request.query
    const size = 10
    const books = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .limit(size)
        .offset(Number(page) * size)
        .orderBy('books.id', 'desc')
    ctx.state.data = {
        list: books.map(v => {
            // 遍历每一对象
            const info = JSON.parse(v.user_info)
            // Object.assign用来重新组合数据，相同的对象他会覆盖
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}