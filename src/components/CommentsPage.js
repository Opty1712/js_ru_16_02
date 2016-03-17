import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { commentStore } from '../stores'
import Comment from './Comment'
import {loadCommentsPerPage} from './../actions/comment'

class CommentsPage extends Component {
    constructor(props) {
        super()
        const { params: { page }} = props
        setTimeout(() => loadCommentsPerPage(page), 0)
        this.state = {
            comments: commentStore.getAll()
        }

    }
    componentDidMount() {
        commentStore.addChangeListener(this.change)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.change)
    }

    componentWillReceiveProps(props) {
        setTimeout(() => loadCommentsPerPage(props.params.page), 0)
        this.setState({
            comments: commentStore.getAll()
        })
    }

    render() {
        const commentList = this.state.comments.map(
            comment => <li key={comment.id}>
                <Comment comment = {comment}/>
            </li>
        )
        return (
            <div>
                <ul>{commentList}</ul>
                {this.getPaging()}
            </div>
        )
    }

    change = () => {
        setTimeout(() => loadCommentsPerPage(this.props.params.page), 0)
        this.setState({
            comments: commentStore.getAll()
        })
    }

    getPaging() {
        const total = commentStore.getTotal()
        const pages = Math.round(total / 10)
        var links = []
        for (var i = 0; i < pages; i++) {
            links.push(
                <span key={i}>
                    <Link to={`/comments/${i + 1}`}
                        activeClassName = "active"
                        activeStyle = {{color: 'red'}}
                    >
                        {i + 1}
                    </Link>
                </span>
            )
        }
        return <div>{links}</div>
    }
}

export default CommentsPage