import { Component, OnInit } from '@angular/core';
import {MapsService} from "../services/maps.service";
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  public cities: any; // todo change to some type
  constructor(private mapservice: MapsService) { }

  ngOnInit(): void {

    this.mapservice.getAllTowns().subscribe(data => this.cities = data);
  }


  addNewItem(value: string) {
    console.log("posielana hodnota je " + value);

    this.newItemEvent.emit(value);
  }

}
