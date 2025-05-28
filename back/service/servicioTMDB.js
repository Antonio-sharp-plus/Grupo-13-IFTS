const repoTMDB = require("../repositorio/repositorioTMDB");

export class ServicioTMDB{

    async Getmovies(){
        const datos = repoTMDB.BusquedaGeneral()
        try{
            let resultados = datos.results;
        }
        catch{
            console.log("No se obtuvieron los datos de la API");
            return
        }
        
        return resultados;
    }
}