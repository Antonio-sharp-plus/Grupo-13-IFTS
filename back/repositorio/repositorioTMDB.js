const axios = require('axios');

export class repositorioTMDB {

    constructor() {
        this.api = axios.create({
            baseURL: "https://api.themoviedb.org/3",
            params: {
                api_key: '0794702ad2b0918f600e5733c7ee0dea',
                lenguaje: 'es-ES'
            }
        })
    }

    async BusquedaGeneral(tipo, query){

        if (tipo === "peliculas"){
            const response = await this.api.get("/search/movie", {parameters: {
            query
        }});
        } else if (tipo === "series"){
            const response = await this.api.get("/search/tv", {parameters: {
            query
        }});
        } else{
            const response = await this.api.get("/search", {parameters: {
            query
        }});
        }

        return response.data;
    }

    async Trending(){
        const response = await this.api.get("/trending/all/week");
        return response.data;
    }

    async PelisPopulares(){
        const response = await this.api.get("/movie/popular");
        return response.data;
    }

    async PelisValoradas(){
        const response = await this.api.get("/movie/top_rated");
        return response.data;
    }

    async PelisEstreno(){
        const response = await this.api.get("/movie/upcoming");
        return response.data;
    }

    async PelisAccion(){
        const response = await this.api.get("/discover/movie", {params: {with_genres: "28"}});
        return response.data;
    }

    async PelisComedia(){
        const response = await this.api.get("/discover/movie", {params: {with_genres: "35"}});
        return response.data;
    }

     async PelisDrama(){
        const response = await this.api.get("/discover/movie", {params: {with_genres: "18"}});
        return response.data;
    }

     async PelisSciFi(){
        const response = await this.api.get("/discover/movie", {params: {with_genres: "878"}});
        return response.data;
    }

    async SeriesPopulares(){
        const response = await this.api.get("/tv/popular");
        return response.data;
    }

    async SeriesValoradas(){
        const response = await this.api.get("/tv/top_rated");
        return response.data;
    }

    async SeriesComedia(){
        const response = await this.api.get("/discover/tv");
        return response.data;
    }
}