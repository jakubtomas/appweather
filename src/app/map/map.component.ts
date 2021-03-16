import {Component, OnInit} from '@angular/core';
import {MapService} from "../services/map.service";
import * as Mapboxgl from 'mapbox-gl';

import * as mapboxgl from "mapbox-gl";

import {environment} from "../../environments/environment";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    ///defualt setting
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 48.71;
    lng = 21.26;
    zoom = 12;


    // data
    //  source: any;
    //markers: any;

    constructor(private mapService: MapService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        (mapboxgl as any).accessToken = environment.mapbox.accessToken;

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
            .setPopup(new mapboxgl.Popup({className: 'my-class'}).setHTML("<h1>kosice </h1>  <br> <h4>teplota 23 </h4>"))
            .addTo(this.map);


        /*
                const marker = new mapboxgl.Marker({
                    draggable: true
                }).setLngLat([48.71, 21.26])
                    .addTo(this.map);

                marker.on('drag', () => {
                    console.log(marker.getLngLat() + "  mark give my the coordination");

                })
        */


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

        //  this.createMark(4,1);
        // this.mapService.buildMap();
        // this.initializeMap();
    }


    items = ['item1', 'item2', 'item3', 'item4'];

    addItem(newItem: string) {
        console.log("add item add item ");

        this.items.push(newItem);
    }


    createMark(lng: number, lat: number) {
        console.log("calling function createMark");

        const marker = new mapboxgl.Marker({
            color: "#B53737",
            draggable: false
        }).setLngLat([48.71, 21.26])
            .addTo(this.map);
    }


    flyTo(/*lng: number, lat: number*/) {
        this.map.flyTo({
            center: [this.lng, this.lat]
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
            zoom: 9,
            center: [this.lng, this.lat]
        });
        // add map controls
        this.map.addControl(new Mapboxgl.NavigationControl());
    }


}
