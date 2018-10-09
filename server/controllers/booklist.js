const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { page, openid } = ctx.request.query
    const size = 10
    const mysqlSelect = mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .orderBy('books.id', 'desc')
    let books
    if (openid) {
        // 根据openid过滤
        books = await mysqlSelect.where('books.openid', openid)
    } else {
        // 全部图书，分页
        books = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
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