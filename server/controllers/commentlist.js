const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { bookid } = ctx.request.query
    const comments = await mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
        .where('bookid', bookid)
    ctx.state.data = {
        list: comments.map(v => {
            // 遍历每一对象
            const info = JSON.parse(v.user_info)
            // Object.assign用来重新组合数据，相同的对象他会覆盖
            return Object.assign({}, v, {
                title: info.nickName,
                image: info.avatarUrl
            })
        })
    }
}