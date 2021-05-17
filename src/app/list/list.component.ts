import { Component, OnInit } from '@angular/core';
import {MapsService} from "../services/maps.service";
import {Output, EventEmitter} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    private map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 37.776;
    lng = -122.414;
    zoom = 12;

    public json: any = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
            },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }
            }]
    };


    constructor(private mapsservice: MapsService) {
    }

  ngOnInit(): void {
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


      new mapboxgl.Marker({
          color: "#B53737",
          draggable: false
      }).setLngLat([-122.414, 37.776])
          .setPopup(new mapboxgl.Popup({className: 'my-class'}) //todo add temperature and date time to setHTML
              .setHTML('<h3>' + "Hello" + '</h3>' +
                  '<p>' + "Hello" + ", " + "Hello" + '</p>' +
                  '<p>' + +", " + +'</p>'))
          //'<p>' + this.details[city.id].values + '</p>'))

          .addTo(this.map);

      // add markers to map
      // todo should go throw json correctly no like now  just change this
      /*this.json.features.forEach(function(marker) {
        console.log(marker + " show marker");
        console.log(marker.properties.title + " show marker");
        console.log(marker.properties.description + " show marker");


        // create a HTML element for each feature
        //var el = document.createElement('div');
        //el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker({
          color: "#B53737",
          draggable: false
        })
            .setLngLat([-122.414, 37.776])
            .setPopup(
                new mapboxgl.Popup() // add popups
                    .setHTML(
                        '<h3>' +
                        marker.properties.title +
                        '</h3><p>' +
                        marker.properties.description +
                        '</p>'
                    ))
            .addTo(this.map);
      });*/

      //     this.map.addControl()
      //this.mapservice.getAllTowns().subscribe(data => this.cities = data);
  }



}
