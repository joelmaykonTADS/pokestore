import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Loading from '../layout/Loading'
import CardPokemon from '../pokemons/CardPokemon';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from "axios";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
export default function Cart() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState();
  const [quantidade, setQuantidade] = useState(0);
  const buscarPokemons = () => {
    setQuantidade(12)
    if (quantidade > 0) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=${quantidade}`)
        .then((response) => {
          setPokemons(response.data.results);
          setLoading(false)
        })
    }
  }
  useEffect(() => {
    buscarPokemons()
  }, [quantidade])

  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
      <main className={classes.content}>
        {!loading ?
          <Grid container spacing={3}
            style={{ padding: '64px' }}
          >
            {React.Children.toArray(
              pokemons.map((item) => {
                return (
                  <Grid key={item.id} item
                    xs={12} sm={6} md={4} lg={4} xl={3}
                  >
                    <CardPokemon name={item.name} url={item.url} tamanho={5}></CardPokemon>
                  </Grid>
                );
              })
            )};
			</Grid> :
          <div style={{ width: '100%' }}>
            <Box justifyContent="center">
              <Loading></Loading>
            </Box>
          </div>
        }
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Drawer>
        </div>
    </React.Fragment>
  );
}