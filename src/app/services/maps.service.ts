import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {City} from "../entities/city";

@Injectable({
    providedIn: 'root'
})
export class MapsService {

    /*
    * {
    "id": <int>,
    "name": <string>,
    "latitude": <tbd>,
    "altitude" <tbd>
    }*/

    /* private cities: any = [
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

     ];*/

    private serverUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) {
    }

    //todo change type of observable create entities
    getAllTowns(): Observable<any> {

        return this.http.get(this.serverUrl + "getTowns");


        /* return this.http.get(this.serverUrl + "getTowns").pipe(
             map(data => {console.log(data)})
         );*/


        // return this.http.get<Array<City>>(this.serverUrl + "getTowns")
        //catchError(error => this.processHttpError(error))

    }

    //todo change
    getOneTown(placeId: number): Observable<any> {
        return this.http.get(this.serverUrl + "getMeteoData/"+ placeId)

    }

    /*
    *
    getExtendedUsers(): Observable<User[]> {
      return this.http.get<Array<any>>(this.serverUrl + "users/" + this.token).pipe(
        map(usersFromServer => this.mapToExtendedUsers(usersFromServer)),
        catchError(error => this.processHttpError(error))
      );
    }*/


    //// create function with http which return observable
    /// lepsie ulozit hodnoty poli do aplikacia a potom stym pracovat alebo s kazdou z menou pismena volat api
    // sprostost zavolat api raz a potom filter na hodnoty
}
