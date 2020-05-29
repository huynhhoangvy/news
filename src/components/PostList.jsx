import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

const CustomSpan = () => <span style={{ margin: '0 5px', color: '#696969' }}>|</span>

const useStyle = makeStyles(theme => ({
    anchor: {
        fontSize: 13,
        color: '#828282',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    hover: {
        cursor: 'pointer'
    },
    customButton: {
        border: 'none',
        background: 'none',
    },
    postList: {
        padding: '5px 7px 0 7px',
        background: '#f6f6ef',
    }
}))

const PostList = ({ newData, pagination, sortValue, calculateDuration }) => {
    const classes = useStyle()
    const history = useHistory()

    return (
        <div id='post-list' className={classes.postList}>
            {
                newData.sort((a, b) => - (a[sortValue] - b[sortValue])).slice(pagination === 1 ? 0 : 30 * (pagination - 1), 30 * pagination).map((item, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <span onClick={() => history.push(`/post/${item.id}`)} className={clsx(classes.hover)} style={{ fontSize: 14 }}>{item.id}: Title: {item.title} </span>
                                <a className={clsx(classes.anchor)} href={item.url} target='_blank' rel='noopener noreferrer'>({item.url})</a>
                            </div>
                            <div style={{ display: 'flex', fontSize: 13, color: '#828282' }}>
                                <span>
                                    {item.points} points
                                </span>
                                <CustomSpan />
                                <span>
                                    {item.author}
                                </span>
                                <CustomSpan />
                                <span>
                                    {calculateDuration(item.date)}
                                </span>
                                <CustomSpan />
                                <span>
                                    1 comment
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PostList
