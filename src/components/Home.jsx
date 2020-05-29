import React, { useState, useEffect } from 'react'
import PostList from './PostList'
import data from '../MOCK_DATA.json'
import { makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    sortSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: '#f6f6ef',
        padding: '0 7px',
        marginTop: 5
    },
    select: {
        marginLeft: 5,
    }
}));

const Home = ({ value, calculateDuration }) => {
    const classes = useStyles()
    const [sortValue, setSortValue] = useState('date')
    const [newData, setNewData] = useState(data)
    const [pagination, setPagination] = useState(1)

    const handlePaginationChange = (evt, val) => {
        if (pagination === val) {
            return
        } else {
            setPagination(val)
        }
    }

    const handleSortValue = e => {
        setSortValue(e.target.value)
    }

    useEffect(() => {
        setPagination(1)
        setNewData(data.filter(item => item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }, [value])

    useEffect(() => {
        setPagination(1)
    }, [sortValue])

    return (
        <div id='home'>
            <div id='sort-section' className={classes.sortSection}>
                <span>Search Stories by </span>
                <div>
                    <select className={classes.select} onChange={handleSortValue} name="cars" id="cars">
                        <option value="date">Date</option>
                        <option value="points">Points</option>
                    </select>
                </div>
            </div>
            <PostList newData={newData} pagination={pagination} sortValue={sortValue} calculateDuration={calculateDuration} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination page={pagination} count={Math.ceil(newData.length / 30)} onChange={handlePaginationChange} color='primary' />
            </div>
        </div>
    )
}

export default Home
