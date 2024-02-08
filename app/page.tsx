import { Standing } from '@/types';
import getStandings from './utils/getStandings';
import StandingsAndFixtures from './home/StandingsAndFixtures';

export default async function Home() {
  const standingsData : Standing[] = await getStandings();
  return (
    <div>
      <StandingsAndFixtures standingsData={standingsData}/>
    </div>
  )
}
