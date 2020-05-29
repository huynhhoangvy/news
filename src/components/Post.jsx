import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../MOCK_DATA.json'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const CustomSpan = () => <span style={{ margin: '0 5px', color: '#696969' }}>|</span>

const useStyle = makeStyles(theme => ({
    hover: {
        cursor: 'pointer'
    },
    anchor: {
        fontSize: 12,
        color: '#828282',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    post: {
        minHeight: 'calc(100vh - 65px)',
        background: '#f6f6ef',
        padding: '0 7px'
    }
}))

const Post = ({ calculateDuration }) => {
    const classes = useStyle()
    const { postId } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        console.log('data: ', data)
        console.log(typeof (data[0].id))
        const result = data.filter((item, i) => item.id == postId)
        console.log('res: ', ...result)
        setPost(...result)
    }, [])

    const formatDateTime = (input) => {
        console.log('input: ', input)
        input = new Date(+input)
        const year = input.getFullYear()
        const month = input.toLocaleString('default', { month: 'short' })
        console.log('mon: ', input.toLocaleString('default', { month: 'short' }))
        const date = input.getDate()
        return `on ${month} ${date}, ${year}`
    }

    useEffect(() => console.log('post: ', post), [post])

    return (
        <div id='post' className={classes.post}>
            {console.log('redner: ', post)}
            <div>
                <span className={clsx(classes.hover)} style={{ fontSize: 14 }}>{post.title} </span>
                <a className={clsx(classes.anchor)} href={post.url} target='_blank' rel='noopener noreferrer'>({post.url})</a>
            </div>
            <div style={{ fontSize: 11, color: '#828282' }}>
                <span>{post.points} points by guest </span>
                <a href="/" className={classes.anchor}>{formatDateTime(post.date)}</a>
                <CustomSpan />
                <span>
                    {post.author}
                </span>
                <CustomSpan />
                <span>
                    {calculateDuration(post.date)}
                </span>
                <CustomSpan />
                <span>
                    1 comment
                </span>
            </div>
            <br />
            <div style={{ fontSize: 12, color: '#828282' }}>
                <span>{post.comment_owner} </span>
                <a href="/" className={classes.anchor}>{formatDateTime(post.comment_date)}</a>
                {/* <CustomSpan />
                <span>
                    {post.author}
                </span>
                <CustomSpan />
                <span>
                    {calculateDuration(post.date)}
                </span>
                <CustomSpan />
                <span>
                    1 comment
                </span> */}
                <br />
                <span style={{ fontSize: 13, color: '#000000' }}>{post.comment}</span>
            </div>
        </div>
    )
}

export default Post
