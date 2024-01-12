import 'server-only';
import { Standing, Team } from "@/types";
import getStandings from './getStandings';

export default async function getTeams(): Promise<Team[]> {
    try {
        const standings: Standing[]= await getStandings();

        const teams: Team[]=[];
        
        for(const league of  standings){
            for(const standing of league.league.standings){
                if(Array.isArray(standing)){
                    for(const team of standing){
                        teams.push(team)
                    }
                } else {
                    console.error('Invalid standings data for league:', league.league.name);
                }
            }
        }
        return teams;

    } catch (error) {
        console.error (`Error occurred while fetching teams` , error);
        throw error;
    }
    }

