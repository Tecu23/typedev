import { useMemo } from "react";

import { AlignLeftIcon, ChevronRightIcon, ImageIcon, RotateCw, StepBackIcon, TriangleAlertIcon } from "lucide-react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useWords } from "../hooks/useWords";
import { useTypingStore } from "../store/typingStore";
import Tooltip from "./standalone/Tooltip";
import clsx from "clsx";

type Props = {
  resetEngine: () => void;
};

const Results = ({ resetEngine }: Props) => {
  const config = useTypingStore((state) => state.config);
  const stats = useTypingStore((state) => state.finalStats);
  const wordResults = useTypingStore((state) => state.wordResults);
  const testDuration = useTypingStore((state) => {
    if (state.endTime && state.startTime) {
      return (state.endTime - state.startTime) / 1000; // in seconds
    }
    return 0;
  });
  const resetTest = useTypingStore((state) => state.resetTest);

  const { updateWords } = useWords(config);

  // Calculate chart data from wordResults
  const chartData = useMemo(() => {
    if (!wordResults || wordResults.length === 0) {
      return [
        { id: "wpm", data: [] },
        { id: "raw", data: [] },
      ];
    }

    const wpmData = wordResults.map((result, index) => ({
      x: index + 1,
      y: Math.round(result.wpm || 0),
    }));

    // Calculate raw WPM (including errors)
    const rawData = wordResults.map((result, index) => {
      const totalChars = result.word.length + result.errors;
      const timeFromStart = result.timestamp - (wordResults[0]?.timestamp || 0);
      const minutesElapsed = Math.max(timeFromStart / 60000, 0.001); // avoid division by zero
      const rawWpm = Math.round(totalChars / 5 / minutesElapsed);
      return {
        x: index + 1,
        y: rawWpm,
      };
    });

    return [
      { id: "wpm", data: wpmData },
      { id: "raw", data: rawData },
    ];
  }, [wordResults]);

  // Format time duration
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div id="result" className="col-[full-width] content-grid">
      <div className="col-[content] grid gap-4 items-center grid-cols-[auto_1fr] grid-rows-2">
        <div
          id="stats"
          className="col-start-1 row-start-1 col-span-1 row-span-1 grid gap-2 content-center items-center grid-rows-2"
        >
          <div>
            <div className="text-[2rem] leading-[1.5rem] flex text-sub mb-1">wpm</div>
            <div className="text-[4rem] leading-[4rem] text-main">{stats.wpm}</div>
          </div>
          <div>
            <div className="text-[2rem] leading-[1.5rem] flex text-sub mb-1">acc</div>
            <div className="text-[4rem] leading-[4rem] text-main">{stats.accuracy}%</div>
          </div>
        </div>
        <div
          id="morestats"
          className="col-start-1 col-span-2 row-start-2 row-span-1 grid grid-flow-col items-start justify-between gap-2 gap-x-8 grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-[max-content_max-content_max-content] lg:grid-cols-none lg:grid-rows-none"
        >
          <div>
            <div className="text-sub text-[1rem] leading-[1rem] mb-1">test type</div>
            <div className="text-main text-[1rem] leading-[1.25]">
              {config.mode === "words" ? `words ${config.wordCount}` : `time ${config.timeLimit}s`}
              <br />
              {config.language}
            </div>
          </div>
          <div className="hidden">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">other</div>
            <div className="text-main text-[1rem] leading-[1.25]">afk detected</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">raw</div>
            <div className="text-main text-[2rem] leading-[2rem]">{stats.rawWpm}</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">characters</div>
            <div className="text-main text-[2rem] leading-[2rem]">
              {stats.correctChars}/{stats.incorrectChars}/{stats.totalChars - stats.correctChars - stats.incorrectChars}
              /{wordResults.filter((w) => w.errors > 0).length}
            </div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">consistency</div>
            <div className="text-main text-[2rem] leading-[2rem]">{stats.consistency}%</div>
          </div>
          <div className="">
            <div className="text-sub text-[1rem] leading-[1rem] mb-1 flex items-center">time</div>
            <div className="text-main text-[2rem] leading-[2rem]">
              <div>{formatTime(testDuration)}</div>
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
              series: chartData.map((s) => {
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
            <button
              onClick={() => {
                updateWords();
                resetTest();
                resetEngine();
              }}
              className={clsx(
                "relative h-min inline-flex gap-2 items-baseline justify-center  px-8 py-4",
                "text-sub text-[1em] leading-[1.25] text-center hover:text-test",
                "cursor-pointer",
              )}
            >
              <Tooltip position="bottom" content="Next Test">
                <ChevronRightIcon size={20} />
              </Tooltip>
            </button>
            <button
              onClick={() => {
                resetTest();
                resetEngine();
              }}
              className={clsx(
                "relative h-min inline-flex gap-2 items-baseline justify-center  px-8 py-4",
                "text-sub text-[1em] leading-[1.25] text-center hover:text-test",
                "cursor-pointer",
              )}
            >
              <Tooltip position="bottom" content="Repeat Test">
                <RotateCw size={20} />
              </Tooltip>
            </button>
            <button
              className={clsx(
                "relative h-min inline-flex gap-2 items-baseline justify-center  px-8 py-4",
                "text-sub text-[1em] leading-[1.25] text-center hover:text-test",
                true ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <Tooltip position="bottom" content="Feature not implemented yet.">
                <TriangleAlertIcon size={20} />
              </Tooltip>
            </button>
            <button
              className={clsx(
                "relative h-min inline-flex gap-2 items-baseline justify-center  px-8 py-4",
                "text-sub text-[1em] leading-[1.25] text-center hover:text-test",
                true ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <Tooltip position="bottom" content="Feature not implemented yet.">
                <AlignLeftIcon size={20} />
              </Tooltip>
            </button>
            <button
              className={clsx(
                "relative h-min inline-flex gap-2 items-baseline justify-center  px-8 py-4",
                "text-sub text-[1em] leading-[1.25] text-center hover:text-test",
                true ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <Tooltip position="bottom" content="Feature not implemented yet.">
                <StepBackIcon size={20} />
              </Tooltip>
            </button>
            <button
              className={clsx(
                "relative h-min inline-flex gap-2 items-baseline justify-center  px-8 py-4",
                "text-sub text-[1em] leading-[1.25] text-center hover:text-test",
                true ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <Tooltip position="bottom" content="Feature not implemented yet.">
                <ImageIcon size={20} />
              </Tooltip>
            </button>
          </div>
        </div>
        <div id="loginTip"></div>
      </div>
    </div>
  );
};

export default Results;
