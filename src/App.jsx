import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Post from './components/Post';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  res: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(85% - 10px)',
    },
  }
}))

function App() {

  const classes = useStyle()
  const [value, setValue] = useState('')
  const handleValueChange = e => {
    setValue(e.target.value)
  }

  const calculateDuration = (time) => {
    const aSecond = 1000
    const aMinute = aSecond * 60
    const anHour = aMinute * 60
    const aDay = anHour * 24
    const aWeek = aDay * 7
    const aMonth = aWeek * 4
    const aYear = aMonth * 12
    let duration = Date.now() - time
    if (duration >= aYear) {
      let result = Math.ceil(duration / aYear)
      return result > 1 ? `${result} years ago` : '1 year ago'
    } else if (duration > aMonth) {
      let result = Math.ceil(duration / aMonth)
      return result === 12 ? 'A year ago' : (result > 1 ? `${result} months ago` : 'A month ago')
    } else if (duration > aWeek) {
      let result = Math.ceil(duration / aWeek)
      return result === 5 ? 'A month ago' : (result > 1 ? `${result} weeks ago` : 'A week ago')
    } else if (duration > aDay) {
      let result = Math.ceil(duration / aDay)
      return result === 7 ? 'A week ago' : (result > 1 ? `${result} days ago` : 'A day ago')
    } else if (duration > anHour) {
      let result = Math.ceil(duration / anHour)
      return result === 24 ? 'A day ago' : (result > 1 ? `${result} hours ago` : 'An hour ago')
    } else if (duration > aMinute) {
      let result = Math.ceil(duration / aMinute)
      return result === 60 ? 'An hour ago' : (result > 1 ? `${result} minutes ago` : 'An minute ago')
    } else return 'A moment ago'
  }

  return (
    <BrowserRouter>
      <div id='app' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={classes.res}>
          <Navbar value={value} handleValueChange={handleValueChange} />
          <Switch>
            <Route exact path='/'>
              <Home calculateDuration={calculateDuration} value={value} />
            </Route>
            <Route exact path='/post/:postId'>
              <Post calculateDuration={calculateDuration} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
