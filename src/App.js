import { BrowserRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import View from './view.js';
import View_production from './view.js';


// Class de fonction communiquant avec l'API
class API {

    // Récupération emmision CO2
    api_co2 (callback) 
    {
        fetch("http://localhost:8000/api/v1/sensors/emissions", { method: "GET" })
            .then((response) => {
            return response.json();
        })
            .then((json) => {
            callback(json);
        });
    }
    
    //Récupération du temps
    api_time (callback)
    {
        fetch("http://localhost:8000/api/v1/sensors/datetime", { method: "GET" })
            .then((response) => {
            return response.json();
        })
            .then((json) => {
            callback(json);
        });
    }

    // Récupération de la position du soleil
    api_sun (callback)
    {
        fetch("http://localhost:8000/api/v1/sensors/sun", { method: "GET" })
            .then((response) => {
            return response.json();
        })
            .then((json) => {
            callback(json);
        });
    }
    // Récupération de la force du vent
    api_wind (callback)
    {
        {
            fetch("http://localhost:8000/api/v1/sensors/wind", { method: "GET" })
                .then((response) => {
                return response.json();
            })
                .then((json) => {
                callback(json);
            });
        } 
    }

        // Récupération des producteurs
    api_producteur (callback)
    {
        {
            fetch("http://localhost:8000/api/v1/producers", { method: "GET" })
                .then((response) => {
                return response.json();
            })
                .then((json) => {
                callback(json);
            });
        } 
    }
    //Récupération des consomatteurs
    api_consumers (callback)
    {
        {
            fetch("http://localhost:8000/api/v1/consumers", { method: "GET" })
                .then((response) => {
                return response.json();
            })
                .then((json) => {
                callback(json);
            });
        } 
    }
    // Récupération des données de stockages
    api_storages (callback)
    {
        {
            fetch("http://localhost:8000/api/v1/storages", { method: "GET" })
                .then((response) => {
                return response.json();
            })
                .then((json) => {
                callback(json);
            });
        } 
    }
 
    
    
/*********************************/
    // CHangemenet d'état des volants
/*********************************/
    
   api_change_flywheels (mode,rate,i) {

        fetch("http://localhost:8000/api/v1/storages/flywheels/"+i, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`mode=${mode}&rate=${rate}` // "mode="+mode+"&rate="+rate"
        })
            .then((response) => {
            return response.json();
        })
            .then((json) => {
            console.log(JSON.stringify(json));
        });
       alert("done");
       alert(`mode=${mode}&rate=${rate}`);
    }
}



class App extends Component {
    constructor(props) {
        super(props);
       
         this.api = new API();  // Création de l'objet API
        this.state = {
            emission: "",
            time: "",
            sun :  {
                azimuth : 0,
                altitude : 0
            },
            wind : {
                azimuth : 0,
                speed : 0
            },
            co2 : {
                emission : 0,
                total : 0
            },
            producteur : {  },   //  Les objets sont créer vides, leurs attributs sont récuperer avec les fonctions de l'API
            consumers : {},
            storage :{}
        }
        
        this.state = {
            
            i: 0,               // utiliser boucle for
            conso_tot :0,           // COnsomation total du réseau
            prod_tot :0,            // Production total sur le réseau
            diff_cons_prod_watt : 0,    // Différence entre consomation et production en watt
            diff_cons_prod_mw : 0,      // Différence entre la consomation et la production en Mw
            
        }
        
        
        // Initialisation pour eviter les bug
        
         this.api.api_producteur(
                (data) => {
                    this.setState({
                        producteur: data
                    });
                  //  console.log(this.state.producteur);
                }
            )
            // récupération consomateurs 
            this.api.api_consumers(
                (data) => {
                    this.setState({
                        consumers: data
                    });
                  //  console.log(this.state.consumers);
                }
            )
            // Récupération storage
            this.api.api_storages(
                (data) => {
                    this.setState({
                        storage: data
                    });
                   // console.log(this.state.storage);
                }
            )
        
        
        
    }
    
    

    componentDidMount() {
       
        /********************************************/
        /* Récuperation des data */
        /*******************************************/
          // récupération producteur

        
        
        this.timerID = setInterval(() => {     // Emision
            this.api.api_co2(
                (data) => {
                    this.setState({
                        co2: {
                            emission : data.emission,
                            total : data.total
                        }
                    });
                  //  console.log(this.state.co2);
                }
            );
            // Heure
            this.api.api_time(
                (data) => {
                    this.setState({
                        time: data.datetime
                    });
                //    console.log(data.datetime);
                }
            );
            // SOleil
            this.api.api_sun(
                (data) => {
                    this.setState({
                        sun: {
                            azimuth: data.azimuth,
                            altitude : data.altitude
                        }
                    });
                 //   console.log(this.state.sun);
                }
            );
            // Récupéreation du vent
            this.api.api_wind(
                (data) => {
                    this.setState({
                        wind: {
                            azimuth: data.azimuth,
                            speed : data.speed
                        }
                    });
               //     console.log(this.state.wind);
                }
            );
            // récupération producteur
            this.api.api_producteur(
                (data) => {
                    this.setState({
                        producteur: data
                    });
                  //  console.log(this.state.producteur);
                }
            );
            // récupération consomateurs 
            this.api.api_consumers(
                (data) => {
                    this.setState({
                        consumers: data
                    });
                  //  console.log(this.state.consumers);
                }
            );
            // Récupération storage
            this.api.api_storages(
                (data) => {
                    this.setState({
                        storage: data
                    });
                   // console.log(this.state.storage);
                }
            );
            
            
            // Calcul de la consomation de la production et de l'écart sur le réseau
            this.calc_conso_tot ();
        },1000);
        // boucle toutes les secondes

       
       
    }
    
    
    
    calc_conso_tot ()  {
      
        
        //Prod
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[0].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[1].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[2].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[3].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[4].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[5].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[6].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[7].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[8].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[9].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[10].power;
       this.state.conso_tot = this.state.conso_tot + this.state.producteur[11].power;
        
        
        // Cons
       this.state.prod_tot = this.state.conso_tot + this.state.consumers[0].consumption;
       this.state.prod_tot = this.state.conso_tot + this.state.consumers[1].consumption;
       this.state.prod_tot = this.state.conso_tot + this.state.consumers[2].consumption;
       this.state.prod_tot = this.state.conso_tot + this.state.consumers[3].consumption;
        
        
        this.state.diff_cons_prod_watt = this.state.prod_tot - this.state.conso_tot ; // ici on est en Watt
        this.state.diff_cons_prod_mw = this.state.diff_cons_prod_watt /1000000; // ici en Megawat
        
        console.log(this.state.conso_tot);
        console.log(this.state.prod_tot);
        console.log(this.state.diff_cons_prod_mw);
    }

    change_flywheels (mode,rate,i) {
    this.api.api_change_flywheels (mode,rate,i)
    }

    render() {

        //this.change_flywheels("Consumer",0.4,2)
        //{ console.log(this.state.storage)}
        //  
        // 
        
        return (
    
            <header>
            <BrowserRouter>
            
            <div> 
            Il est actuellement : {this.state.time}
            <div><Link to="/view">view</Link></div>
            <View_production  prod = { this.state.producteur}  />
            <button onClick={() => {this.calc_conso_tot ()}}> fzfezf </button>
            
            La difference prod con est : {this.state.diff_cons_prod_watt} Watt
            
            toto : {this.state.producteur.power} efzef
            
            <br />
                Donc : {this.state.diff_cons_prod_mw} Mégawatts

            </div>
            {
                 console.log(this.state.producteur)
            }
    
            <Route path="/view" component={() => <View  time = {this.state.time}  />}/>
            
            <div>   </div>
        
        </BrowserRouter>
            </header>
);
}
/*    

<Route path="/view" component={() => <View_production  prod = { this.state.producteur}  />}/>


*/


}


export default App;

