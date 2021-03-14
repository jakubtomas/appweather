import { Component, OnInit } from '@angular/core';
import {MapsService} from "../services/maps.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {



  public cities: any; // todo change to some type
  constructor(private mapservice: MapsService) { }

  ngOnInit(): void {

    this.mapservice.getAllTowns().subscribe(data => this.cities = data);
  }

}
