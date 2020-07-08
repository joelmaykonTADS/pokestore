import React, { useState, useEffect } from 'react';
import axios from "axios";
import AppBarSearch from '../components/layout/AppBarSearch';
import Loading from '../components/layout/Loading'
import CardPokemon from '../components/pokemons/CardPokemon';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
export default function Home() {
	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pokemon,setPokemon] = useState()
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
	},[quantidade])

	return (
		<>
			<AppBarSearch ></AppBarSearch>
			{!loading ?
				<Grid container spacing={10}
					style={{ padding: '24px' }}
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
		</>
	)
}