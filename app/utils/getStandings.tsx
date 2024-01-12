import 'server-only'
import { Standing } from "@/types";
import moment, { Moment } from "moment";

export default async function getStandings(): Promise<Standing[]> {
    const currentTime: Moment = moment();
    const month = currentTime.month();
    let year;
    if (month < 6) {
        year = currentTime.year() - 1;
    } else {
        year = currentTime.year();
    }
    const API_KEY: string = process.env.API_KEY as string;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
        next:{
            revalidate: 60 * 60 * 24
        }
    };
    const standings: Standing[]=[];
    const leagues =[
        {name: "Premier League", id: 39},
        {name: "La Liga", id: 140},
        {name: "Bundesliga", id: 78},
        {name: "Serie A", id: 135},
        {name: "Ligue 1", id: 61},
    ];
    for (const league of leagues){
        let  url = `https://api-football-beta.p.rapidapi.com/standings?season=${year}&league=${league.id}`;
      
        await fetch(url, options)
        .then(response=>response.json())
        .then(data=>{
            const standings=data.response[0];
            if(standings){
                standings.push(standings)
            }
        })
        .catch(err =>{
            console.error(`Error fetching ${league.name} standings ${err}`);
        })
    }
    return standings;
    }

