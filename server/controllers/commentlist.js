const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { bookid, openid } = ctx.request.query
    console.log('commentlist', { bookid, openid })
    const mysqlSelect = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    let comments
    if (bookid) {
        // 图书详情页的评论列表
        comments = await mysqlSelect.where('bookid', bookid)
    } else if (openid) {
        // 根据个人的openid筛选
        comments = await mysqlSelect.where('openid', openid)
    }
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