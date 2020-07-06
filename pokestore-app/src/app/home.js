import React, { useState, useEffect } from 'react';
import axios from "axios";
import AppBarSearch from '../components/layout/AppBarSearch';
import CardPokemon from '../components/pokemons/CardPokemon';
import Grid from '@material-ui/core/Grid';


export default function Home() {
	const [perfil, setPerfil] = useState([]);
	const [repositorios, setRepositorios] = useState([]);
	useEffect(() => {
		axios
			.get("https://api.github.com/users/joelmaykonTADS")
			.then((response) => {
				setPerfil(response.data);
			});
		axios
			.get(`https://api.github.com/users/joelmaykonTADS/repos`)
			.then((response) => {
				setRepositorios(response.data);
				console.log(response.data);
			});
	}, []);
	return (
		<>
			<AppBarSearch ></AppBarSearch>
			<Grid container spacing={10}
				style={{ padding: '24px' }}
			>
				{React.Children.toArray(
					repositorios.map((repository) => {
						return (
							<Grid key={repository.id} item
								xs={12} sm={6} md={4} lg={4} xl={3}
							>
								<CardPokemon name={repository.user} ></CardPokemon>
								</Grid>
						);
					})
				)};
			</Grid>
		</>
	)
}