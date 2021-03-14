import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MapsService} from "../services/maps.service";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product: number;
 public city: any;

  constructor(private route: ActivatedRoute, private mapservice: MapsService) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const placeId = Number(routeParams.get('placeId'));
    console.log(placeId);


   // this.mapservice.getOneTown().subscribe(data => console.log("data are " + JSON.stringify(data)));
    this.mapservice.getOneTown(placeId).subscribe(data => this.city = data );


    // Find the product that correspond with the id provided in route.
    //this.product = products.find(product => product.id === productIdFromRoute);
  }

}
