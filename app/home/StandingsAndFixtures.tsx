"use client";

import { Standing } from "@/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function StandingsAndFixtures({
  standingsData,
}: {
  standingsData: Standing[];
}) {
  const leagueNames = [
    "🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL",
    "🇪🇸 La Liga",
    "🇩🇪 BundesLiga",
    "🇮🇹 Serie A",
    "🇫🇷 Ligue1",
  ];
  const [activeTab, setActiveTab] = useState(3);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToTab = (index: number) => {
    const container = menuRef.current;
    if (container) {
      const tab = container.children[index] as HTMLElement;
      tab?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    scrollToTab(index);
  };
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey) {
        event.preventDefault();
      }
    };

    const container = menuRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full  bg-gradient-to-br from-orange-500/75 to-orange-500/20 lg:flex-row ">
      <div className="flex justify-center items-center lg-w-3/5 md:p-10 py-5 max-w-7xl">
        <div className="flex flex-col items-start bg-gradient-to-b from-black/40 w-full text-neutral-100 rounded-xl">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="p-2 font-bold">STANDINGS</div>
            <div className="w-full flex justify-center ">
              {leagueNames.map((leagueName, index) => (
                <button
                  key={index}
                  className={`w-full p-4 rounded-t-lg md:text-base
                                        text-xs font-bold mx-1
                                        ${
                                          index === activeTab
                                            ? "text-neutral-100 underline underline-offset-8"
                                            : "text-orange-600 bg-black/70"
                                        }`}
                  onClick={() => handleTabClick(index)}
                >
                  {leagueName}
                </button>
              ))}
            </div>
            <div
              ref={menuRef}
              className="w-full flex overflow-x-hidden snap-x scrollbar-none
                                 scroll-smooth text-xs md:text-sm"
            >
              {standingsData.map((responseData, i) => (
                <div
                  key={responseData.league.id}
                  className="flex-shrink-0 w-full snap-center flex
                                        justify-center items-center"
                >
                  <div
                    className="flex flex-col justify-between p-2
                                        w-full"
                  >
                    <div className="flex w-full p-1">
                      <div className="w-1/12 font-bold">#Rank</div>
                      <div className="w-3/12 font-bold">Team</div>
                      <div className="w-6/12 flex justify-evenly">
                        <div className="w-full text-center">M</div>
                        <div className="w-full text-center">W</div>
                        <div className="w-full text-center">D</div>
                        <div className="w-full text-center">L</div>
                        <div className="w-full text-center">GF</div>
                        <div className="w-full text-center">GA</div>
                        <div className="w-full text-center">GD</div>
                        <div className="w-full text-center font-bold">P</div>
                      </div>
                      <div className="w-2/12 text-center">Form</div>
                    </div>
                    {responseData.league.standings[0].map((team, j) => (
                      <Link
                        href={`/team/${team.team.id}`}
                        key={j + team.team.name}
                        className={`flex w-full p-1 hover:bg-red-800/50
                                                        ${
                                                          j % 2 === 0
                                                            ? "bg-black/40"
                                                            : ""
                                                        }`}
                      >
                        <div className="w-1/12 flex px-2 ">
                          <div
                            className={`w-5 flex justify-center items-center text-sm rounded font-semibold ${
                              j < 4
                                ? "bg-sky-400"
                                : j === 4
                                ? "bg-pink-600 "
                                : j === 5
                                ? "bg-amber-500 "
                                : j >
                                  responseData.league.standings[0].length - 4
                                ? "bg-rose-600	"
                                : ""
                            }`}
                          >
                            {j + 1}
                          </div>
                        </div>
                        <div
                          className={`w-3/12 flex text-sm font-bold  items-center  ${
                            j % 2 === 0 ? "text-yellow-200	" : ""
                          }  `}
                        >
                          {team.team.name}
                        </div>
                        <div className="w-6/12 flex justify-center items-center">
                          <div className="w-full text-center">
                            {team.all.played}
                          </div>
                          <div className="w-full text-center">
                            {team.all.win}
                          </div>
                          <div className="w-full text-center">
                            {team.all.draw}
                          </div>
                          <div className="w-full text-center">
                            {team.all.lose}
                          </div>
                          <div className="w-full text-center">
                            {team.all.goals.for}
                          </div>
                          <div className="w-full text-center">
                            {team.all.goals.against}
                          </div>
                          <div className="w-full text-center">
                            {team.goalsDiff}
                          </div>
                          <div className="w-full text-center font-bold">
                            {team.points}
                          </div>
                        </div>
                        <div className="w-2/12 flex justify-center items-center">
                          {team.form?.split("").map((char, i) => (
                            <div
                              key={char + i}
                              className={`opacity-80 w-3 h-3 m-[1px] rounded-full
                                                                        ${
                                                                          char ===
                                                                          "L"
                                                                            ? "bg-red-600"
                                                                            : char ===
                                                                              "D"
                                                                            ? "bg-yellow-400"
                                                                            : "bg-green-500"
                                                                        }`}
                            ></div>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full h-0.5 bg-white m-2"></div>

          <div className="flex flex-col items-start m-2">
          <div className="flex items-center justify-center ">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-sky-400"></div>
              <p className="text-lg">
                - Promotion - Champions League (Group Stage: )
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-pink-600"></div>
              <p className="text-lg">
                - Promotion - Europa League (Group Stage: )
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-amber-500"></div>
              <p className="text-lg">
                - Promotion - Europa Conference League (Qualification: )
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-rose-600"></div>
              <p className="text-lg">- Relegation - To weakest division </p>
            </div>
          </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
