import $ from 'jquery'

export function loadForArticle({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}


export function loadCommentsPerPage( offset ) {
    return $.get(`/api/comment?limit=10&offset=${(offset - 1) * 10}`)
}