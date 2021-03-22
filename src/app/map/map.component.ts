import {Component, OnInit} from '@angular/core';
import {MapService} from "../services/map.service";
import {MapsService} from "../services/maps.service";
import {City} from "../entities/city";

import * as Mapboxgl from 'mapbox-gl';

import * as mapboxgl from "mapbox-gl";

import {environment} from "../../environments/environment";
import {CityDetails} from "../entities/cityDetails";
import {debounce} from "lodash-es";

/*import {debounce} from 'lodash-es';*/

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    public searchParameter: string;
    public cities: Array<City> = []; // todo change to some type
    public citiesCopy: Array<City> = []; // todo change to some type
    public details: Array<CityDetails> = [];
    public selectedPlace: string;

    public oneCityDetails: Array<any>;
    /*

        private defaultC: any = [
           {"id": 1, "name": "Presov","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 2, "name": "Poprad","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 3, "name": "Kosice","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 4, "name": "Bratislava","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 5, "name": "Roznava","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 6, "name": "Tatry","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 7, "name": "Praha","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 8, "name": "Strba","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 9, "name": "Sabinov","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 10, "name": "Bardejov","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 11, "name": "Presov","latitude": "xxxxx", "altitude": "xxxxx" },
           {"id": 12, "name": "Presov","latitude": "xxxxx", "altitude": "xxxxx" }

         ];
    */

    ///defualt setting
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 48.71;
    lng = 21.26;
    zoom = 12;
    private canCopyCity: boolean = true;


    // data
    //  source: any;
    //markers: any;

    constructor(private mapsservice: MapsService) {
    }

    ngOnInit(): void {

        this.mapsservice.getAllTowns().subscribe(cities => {
            this.cities = cities;
            this.citiesCopy = cities;

            /*
                        console.log(" ====> "  + cities.map(value => console.log(" city " + value.latitude + " " + value.longitude )));*/
            cities.map(city => this.createMark(city));
        });

        this.citiesCopy = this.cities;

        // @ts-ignore
        mapboxgl.accessToken = environment.mapbox.accessToken;

        console.log(mapboxgl.accessToken + " toke for mapbox ");

        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [this.lng, this.lat]
        });

        this.map.addControl(new mapboxgl.NavigationControl());


        const marker1 = new mapboxgl.Marker({
            color: "#B53737",
            draggable: false
        }).setLngLat([21.2496774, 48.7172272])
            .setPopup(new mapboxgl.Popup({className: 'my-class'})
                .setHTML('<h3>' + "Kosice" + '</h3><p>' + "21.2496774, 48.7172272" + '</p>'))
            .addTo(this.map);



        /*

                this.map.addLayer({
                    id: 'firebase',
                    source: 'firebase',
                    type: 'symbol',
                    layout: {
                        'text-field': '{message}',
                        'text-size': 24,
                        'text-transform': 'uppercase',
                        'icon-image': 'rocket-15',
                        'text-offset': [0, 1.5]
                    },
                    paint: {
                        'text-color': '#f16624',
                        'text-halo-color': '#fff',
                        'text-halo-width': 2
                    }
                });
        */

        this.details.push({"id_town": 2, "type": "temperature", "unit": 20, "values": "2020-12-24 14:00:00"});
        this.details.push({"id_town": 3, "type": "temperature", "unit": 20, "values": "2020-12-24 14:00:00"});
        this.details.push({"id_town": 4, "type": "temperature", "unit": 20, "values": "2020-12-24 14:00:00"});
        this.details.push({"id_town": 5, "type": "temperature", "unit": 20, "values": "2020-12-24 14:00:00"});

    }


    private createMark(city: City) {

        //todo potrebne nacitat data aj ked kliknem na znacku a tiey aby sa zobrazil komponent data in left menu
        this.mapsservice.getOneTown(1).subscribe(value => {
            this.details.push(value);
        });


        new mapboxgl.Marker({
            color: "#B53737",
            draggable: false
        }).setLngLat([city.longitude, city.latitude])
            .setPopup(new mapboxgl.Popup({className: 'my-class'}) //todo add temperature and date time to setHTML
                .setHTML('<h3>' + city.name + '</h3>' +
                    '<p>' + city.latitude + ", " + city.longitude + '</p>' +
                    '<p>' + +", " + +'</p>'))
            //'<p>' + this.details[city.id].values + '</p>'))

            .addTo(this.map);
    }


    flyTo(city: City) {
        /*
        const result = words.filter(word => word.length > 6);
        this.details.filter(value => value.id==)
        */
        console.log("'''''''''''''''''''");
        console.log(this.details);

        console.log("'''''''''''''''''''");


        console.log("id chossing city " + city.id);

        this.selectedPlace = city.name;

        this.oneCityDetails = this.details.filter(value => value.id_town === city.id);
        console.log("filter city is " + JSON.stringify(this.oneCityDetails));
        this.oneCityDetails = this.oneCityDetails[0];

        this.map.flyTo({
            //center: [this.lng, this.lat]
            center: [city.longitude, city.latitude]
        })
    }


    private initializeMap() {
        //locate the user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.map.flyTo({
                    center: [this.lng, this.lat]
                })

            });
        }
        this.buildMap();

    }

    buildMap() {
        this.map = new Mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 2,
            center: [this.lng, this.lat]
        });
        // add map controls
        this.map.addControl(new Mapboxgl.NavigationControl());
    }


    searchValue = debounce((): void => {

        console.log("copy cities " + JSON.stringify(this.citiesCopy));

        this.cities = this.citiesCopy;


        if (this.searchParameter.length > 0 && this.searchParameter.length != null) {

            this.cities = this.cities.filter(value => {
                if (value.name.search(this.searchParameter) > -1) {
                    return value;
                }
            });

            console.log("search values " + JSON.stringify(this.cities));

        }

    }, 300);


}

// todo download data for mark after click on the list ??????
