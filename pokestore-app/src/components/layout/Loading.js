import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  marginAutoContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  marginAutoItem: {
    margin: 'auto',
    textAlign: 'center',
    padding: '70px 0'
  },
  media: {
    height: 0,
    width:250,
    paddingTop: '60%', // 16:9
  },
}))
const Centering4Ways = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.marginAutoContainer}>
        <div className={classes.marginAutoItem}>
          <CardMedia
            className={classes.media}
            image="https://i.pinimg.com/originals/7a/37/76/7a3776e02be07dc9b951cd19b77bc8f0.jpg" />
          <CircularProgress
            color={'secondary'}
            size={75}
            disableShrink
          />
        </div>
      </div>     
    </>
  )
}
export default Centering4Ways