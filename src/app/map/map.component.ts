import {Component, OnInit} from '@angular/core';
import {MapService} from "../services/map.service";
import * as mapboxgl from 'mapbox-gl';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    ///defualt setting
    map: mapboxgl.Map;
    style = 'mapbox://styles/vojak528/ckmagf6p8iwi117l9cw2uh9hh';
    lat = 48.71647290;
    lng = 21.260695998;
    zoom = 12;


    // data
    source: any;
    markers: any;

    constructor(private mapService: MapService) {
    }

    ngOnInit(): void {
        this.mapService.buildMap();
        // this.initializeMap();
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
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 9,
            center: [this.lng, this.lat]
        });
        // add map controls
        this.map.addControl(new mapboxgl.NavigationControl());
    }

}
