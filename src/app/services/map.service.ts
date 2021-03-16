import {Injectable} from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import {environment} from "../../environments/environment";
import * as mapboxgl from "mapbox-gl";

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map: Mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 48.71647290;
    lng = 21.260695998;
    zoom = 12;

    constructor() {
        // @ts-ignore
        Mapboxgl.accessToken = environment.mapbox.accessToken;
    }

    buildMap() {
        this.map = new Mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [this.lng, this.lat]
        });
        var marker = new Mapboxgl.Marker()
            .setLngLat([48.71647290, 21.268695998])
            .addTo(this.map);

        this.map.addControl(new mapboxgl.NavigationControl());
    }


    /*
    * var marker = new mapboxgl.Marker()
.setLngLat([12.550343, 55.665957])
.addTo(map);*/

}
