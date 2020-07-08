import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import './style.css'
import { SpriteAnimator } from 'react-sprite-animator'




const useStyles = makeStyles((theme) => ({
	root: {},
	card: { maxWidth: 345, },
	large: {
		width: theme.spacing(14),
		height: theme.spacing(14),
	}
}));

export default function CardPokemon(props) {
	const [Pokemon, setPokemon] = useState([])
	const [Imagem, setImagem] = useState()
	let valid = true;
	function getPokemon(url) {
		axios.get(url).then((response) => {
			setPokemon(response.data)
			setImagem(response.data.sprites.front_default)
		})
		valid = false
	}
	useEffect(() => {
		getPokemon(props.url)		
	}, [valid])
	const classes = useStyles();
		return (
		<Card className={classes.card}>
			<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" compoent="h2">							
							<center><Avatar alt="Remy Sharp" src={Imagem} className={classes.large} /></center>
						<center>{props.name}</center>
					</Typography>
						<Typography component="h2" variant="h3" color="textPrimary">
							${Pokemon.base_experience}							
						</Typography>						
				</CardContent>
			</CardActionArea >
			<CardActions>
					<Button variant="contained" fullWidth color="primary">
						Comprar
						</Button>
			</CardActions >
		</Card >);
}