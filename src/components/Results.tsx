import { AlignLeftIcon, ChevronRightIcon, ImageIcon, RotateCw, StepBackIcon, TriangleAlertIcon } from "lucide-react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTypingStore } from "../store/typingStore";

type Props = {};

// TODO: Handle results

const Results = (props: Props) => {
  const stats = useTypingStore((state) => state.finalStats);
  const liveStats = useTypingStore((state) => state.liveStats);

  console.log(stats, liveStats);

  return (
    <div id="result" className="col-[full-width] content-grid">
      <div className="col-[content] grid gap-4 items-center grid-cols-[auto_1fr] grid-rows-2">
        <div
          id="stats"
          className="col-start-1 row-start-1 col-span-1 row-span-1 grid gap-2 content-center items-center grid-rows-2"
        >
          <div>
            <div className="text-[2rem] leading-[1.5rem] flex text-sub mb-1">wpm</div>
            <div className="text-[4rem] leading-[4rem] text-main">38</div>
          </div>
          <div>
            <div className="text-[2rem] leading-[1.5rem] flex text-sub mb-1">acc</div>
            <div className="text-[4rem] leading-[4rem] text-main">83%</div>
          </div>
        </div>
        <div
          id="morestats"
          className="col-start-1 col-span-2 row-start-2 row-span-1 grid grid-flow-col items-start justify-between gap-2 gap-x-8 grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-[max-content_max-content_max-content] lg:grid-cols-none lg:grid-rows-none"
        >
          <div>
            <div className="text-sub text-[1rem] leading-[1rem] mb-1">test type</div>
            <div className="text-main text-[1rem] leading-[1.25]">
              {"words 50"}
              <br />
              {"english"}
            </div>
          </div>
          <div className="hidden">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">other</div>
            <div className="text-main text-[1rem] leading-[1.25]">afk detected</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">raw</div>
            <div className="text-main text-[2rem] leading-[2rem]">47</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">characters</div>
            <div className="text-main text-[2rem] leading-[2rem]">227/14/2/3</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">consistency</div>
            <div className="text-main text-[2rem] leading-[2rem]">48%</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">time</div>
            <div className="text-main text-[2rem] leading-[2rem]">
              <div>01:12</div>
              <div className="text-sub text-[0.75rem] leading-[0.75rem] ml-[0.2rem]">6.96% afk</div>
              <div className="text-sub text-[0.75rem] leading-[0.75rem] ml-[0.2rem]">00:01:20 session</div>
            </div>
          </div>
        </div>
        <div
          id="chart"
          className="col-start-2 col-span-1 row-start-1 row-span-1 h-[200px] max-h-[200px] w-full text-sub"
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: "spline",
                height: 200,
                backgroundColor: "transparent",
                marginTop: 10,
                marginLeft: 85,
                marginBottom: 35,
                style: {
                  fontFamily: "Roboto Mono",
                },
              },
              title: {
                text: null,
              },
              subtitle: {
                text: null,
              },
              credits: {
                enabled: false,
              },
              xAxis: {
                gridLineWidth: 1,
                gridLineColor: "#181825",
                labels: {
                  rotation: -45,
                  style: {
                    fontSize: "1rem",
                    color: "#7f849c",
                  },
                },
              },
              yAxis: {
                endOnTick: false,
                startOnTick: false,
                gridLineWidth: 1,
                gridLineColor: "#181825",
                tickInterval: 20,
                title: {
                  text: "Words Per Minute",
                },
                labels: {
                  style: {
                    fontSize: "1rem",
                    color: "#7f849c",
                  },
                },
              },
              tooltip: {
                crosshairs: true,
                shared: true,
              },
              legend: {
                enabled: false,
              },
              plotOptions: {
                areaspline: {
                  fillColor: "#181825AC",
                },
              },
              series: data.map((s) => {
                return {
                  color: s.id == "wpm" ? "#cba6f7" : "#7f849c",
                  name: s.id,
                  type: s.id == "wpm" ? "spline" : "areaspline",
                  marker: {
                    width: 1,
                    height: 1,
                  },
                  id: s.id,
                  data: s.data,
                };
              }),
            }}
          />
        </div>
        <div id="bottom" className="col-start-1 col-span-full">
          <div id="buttons" className="grid gap-4 justify-center grid-flow-col">
            <button className="relative h-min inline-flex gap-2 items-baseline justify-center text-sub text-[1em] leading-[1.25] text-center px-8 py-4">
              <ChevronRightIcon size={20} />
            </button>
            <button className="relative h-min inline-flex gap-2 items-baseline justify-center text-sub text-[1em] leading-[1.25] text-center px-8 py-4">
              <RotateCw size={20} />
            </button>
            <button className="relative h-min inline-flex gap-2 items-baseline justify-center text-sub text-[1em] leading-[1.25] text-center px-8 py-4">
              <TriangleAlertIcon size={20} />
            </button>
            <button className="relative h-min inline-flex gap-2 items-baseline justify-center text-sub text-[1em] leading-[1.25] text-center px-8 py-4">
              <AlignLeftIcon size={20} />
            </button>
            <button className="relative h-min inline-flex gap-2 items-baseline justify-center text-sub text-[1em] leading-[1.25] text-center px-8 py-4">
              <StepBackIcon size={20} />
            </button>
            <button className="relative h-min inline-flex gap-2 items-baseline justify-center text-sub text-[1em] leading-[1.25] text-center px-8 py-4">
              <ImageIcon size={20} />
            </button>
          </div>
        </div>
        <div id="loginTip"></div>
      </div>
    </div>
  );
};

const data = [
  {
    id: "wpm",
    data: [
      { x: 1, y: 91 },
      { x: 2, y: 82 },
      { x: 3, y: 83 },
      { x: 4, y: 51 },
      { x: 5, y: 41 },
      { x: 6, y: 36 },
      { x: 7, y: 33 },
      { x: 8, y: 28 },
      { x: 9, y: 25 },
      { x: 10, y: 23 },
      { x: 11, y: 21 },
      { x: 12, y: 17 },
      { x: 13, y: 18 },
      { x: 14, y: 20 },
      { x: 15, y: 25 },
      { x: 16, y: 26 },
      { x: 17, y: 29 },
      { x: 18, y: 31 },
      { x: 19, y: 32 },
      { x: 20, y: 32 },
      { x: 21, y: 35 },
      { x: 22, y: 36 },
      { x: 23, y: 38 },
      { x: 24, y: 39 },
      { x: 25, y: 40 },
      { x: 26, y: 41 },
      { x: 27, y: 42 },
      { x: 28, y: 41 },
      { x: 29, y: 41 },
      { x: 30, y: 40 },
      { x: 31, y: 39 },
      { x: 32, y: 39 },
      { x: 33, y: 40 },
      { x: 34, y: 40 },
      { x: 35, y: 41 },
      { x: 36, y: 40 },
      { x: 37, y: 41 },
      { x: 38, y: 41 },
      { x: 39, y: 42 },
      { x: 40, y: 42 },
      { x: 41, y: 43 },
      { x: 42, y: 43 },
      { x: 43, y: 43 },
      { x: 44, y: 44 },
      { x: 45, y: 43 },
      { x: 46, y: 44 },
      { x: 47, y: 43 },
      { x: 48, y: 43 },
      { x: 49, y: 43 },
      { x: 50, y: 42 },
      { x: 51, y: 43 },
      { x: 52, y: 43 },
      { x: 53, y: 42 },
      { x: 54, y: 43 },
      { x: 55, y: 43 },
      { x: 56, y: 44 },
      { x: 57, y: 44 },
      { x: 58, y: 43 },
      { x: 59, y: 42 },
      { x: 60, y: 41 },
    ],
  },
  {
    id: "raw",
    data: [
      { x: 1, y: 84 },
      { x: 2, y: 84 },
      { x: 3, y: 56 },
      { x: 4, y: 32 },
      { x: 5, y: 16 },
      { x: 6, y: 12 },
      { x: 7, y: 16 },
      { x: 8, y: 8 },
      { x: 9, y: 0 },
      { x: 10, y: 0 },
      { x: 11, y: 12 },
      { x: 12, y: 36 },
      { x: 13, y: 48 },
      { x: 14, y: 68 },
      { x: 15, y: 60 },
      { x: 16, y: 76 },
      { x: 17, y: 76 },
      { x: 18, y: 80 },
      { x: 19, y: 76 },
      { x: 20, y: 72 },
      { x: 21, y: 72 },
      { x: 22, y: 72 },
      { x: 23, y: 72 },
      { x: 24, y: 72 },
      { x: 25, y: 72 },
      { x: 26, y: 68 },
      { x: 27, y: 60 },
      { x: 28, y: 56 },
      { x: 29, y: 44 },
      { x: 30, y: 44 },
      { x: 31, y: 40 },
      { x: 32, y: 48 },
      { x: 33, y: 52 },
      { x: 34, y: 60 },
      { x: 35, y: 44 },
      { x: 36, y: 52 },
      { x: 37, y: 48 },
      { x: 38, y: 64 },
      { x: 39, y: 60 },
      { x: 40, y: 68 },
      { x: 41, y: 64 },
      { x: 42, y: 64 },
      { x: 43, y: 60 },
      { x: 44, y: 64 },
      { x: 45, y: 56 },
      { x: 46, y: 44 },
      { x: 47, y: 60 },
      { x: 48, y: 60 },
      { x: 49, y: 76 },
      { x: 50, y: 56 },
      { x: 51, y: 52 },
      { x: 52, y: 52 },
      { x: 53, y: 52 },
      { x: 54, y: 52 },
      { x: 55, y: 64 },
      { x: 56, y: 60 },
      { x: 57, y: 48 },
      { x: 58, y: 20 },
      { x: 59, y: 20 },
      { x: 60, y: 16 },
    ],
  },
];

export default Results;
