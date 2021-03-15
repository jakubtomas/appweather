import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 48.71647290;
    lng = 21.260695998;
    zoom = 12;

    constructor() {
        // @ts-ignore
        mapboxgl.accessToken = environment.mapbox.accessToken;
    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [this.lng, this.lat]
        });
        this.map.addControl(new mapboxgl.NavigationControl());
    }


}
