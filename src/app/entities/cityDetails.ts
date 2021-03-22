export class CityDetails {

    public constructor(
        public id_town: number,
        public type: string,
        public unit: number,
        public values: string
    ) {
    }


}

/*
* {
    "id_town": 1,
    "type":"temperature",
    "unit": "20",
    "values":"2020-12-24 14:00:00"
}*/