import { AtSignIcon, HashIcon, QuoteIcon, TimerIcon, TriangleIcon, Type, WrenchIcon } from "lucide-react";
import clsx from "clsx";
import { useTypingStore } from "../store/typingStore";

type Props = {};

const TestConfig = (props: Props) => {
  const config = useTypingStore((state) => state.config);
  const setConfig = useTypingStore((state) => state.setConfig);

  return (
    <div
      id="testConfig"
      className={clsx(
        "col-[full-width] relative grid justify-self-center w-max mb-4 justify-around h-max gap-2 grid-flow-col",
        false && "invisible",
      )}
    >
      <div className="flex bg-sub-alt rounded-lg">
        <div className="grid grid-flow-col justify-start">
          <button
            onClick={() => setConfig({ punctuation: !config.punctuation })}
            className={clsx(
              "h-min ml-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex items-start justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.punctuation ? "text-main" : "text-sub",
            )}
          >
            <AtSignIcon size={14} />
            {" punctuation"}
          </button>
          <button
            onClick={() => setConfig({ numbers: !config.numbers })}
            className={clsx(
              "h-min mr-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex items-start justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.numbers ? "text-main" : "text-sub",
            )}
          >
            <HashIcon size={14} />
            {" numbers"}
          </button>
        </div>
        <div className="h-auto w-[0.5em] rounded-sm bg-bg my-[0.5em] mx-0"></div>
        <div className="grid grid-flow-col justify-start">
          <button
            onClick={() => setConfig({ mode: "time" })}
            className={clsx(
              "h-min ml-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex items-center justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.mode == "time" ? "text-main" : "text-sub",
            )}
          >
            <TimerIcon size={14} />
            {" time"}
          </button>
          <button
            onClick={() => setConfig({ mode: "words" })}
            className={clsx(
              "h-min py-[11.2px] px-[6.72px] bg-none inline-flex items-center justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.mode == "words" ? "text-main" : "text-sub",
            )}
          >
            <Type size={14} />
            {" words"}
          </button>
          <button
            onClick={() => setConfig({ mode: "quote" })}
            className={clsx(
              "h-min py-[11.2px] px-[6.72px] bg-none inline-flex items-center justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.mode == "quote" ? "text-main" : "text-sub",
            )}
          >
            <QuoteIcon size={14} />
            {" quote"}
          </button>
          <button
            onClick={() => setConfig({ mode: "zen" })}
            className={clsx(
              "h-min py-[11.2px] px-[6.72px] bg-none inline-flex items-center justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.mode == "zen" ? "text-main" : "text-sub",
            )}
          >
            <TriangleIcon size={14} />
            {" zen"}
          </button>
          <button
            onClick={() => setConfig({ mode: "custom" })}
            className={clsx(
              "h-min mr-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex items-center justify-center gap-2 rounded-lg text-center align-baseline text-xs leading-[1] appearance-none cursor-pointer",
              config.mode == "custom" ? "text-main" : "text-sub",
            )}
          >
            <WrenchIcon size={14} />
            {" custom"}
          </button>
        </div>
        <div className="h-auto w-[0.5em] rounded-sm bg-bg my-[0.5em] mx-0"></div>
        <div className="grid grid-flow-col justify-start">
          {config.mode == "time" ? (
            <>
              <button
                onClick={() => setConfig({ timeLimit: 15 })}
                className={clsx(
                  "h-min ml-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.timeLimit == 15 ? "text-main" : "text-sub",
                )}
              >
                {" 15"}
              </button>
              <button
                onClick={() => setConfig({ timeLimit: 30 })}
                className={clsx(
                  "h-min py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.timeLimit == 30 ? "text-main" : "text-sub",
                )}
              >
                {" 30"}
              </button>
              <button
                onClick={() => setConfig({ timeLimit: 60 })}
                className={clsx(
                  "h-min py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.timeLimit == 60 ? "text-main" : "text-sub",
                )}
              >
                {" 60"}
              </button>
              <button
                onClick={() => setConfig({ timeLimit: 120 })}
                className={clsx(
                  "h-min mr-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.timeLimit == 120 ? "text-main" : "text-sub",
                )}
              >
                {" 120"}
              </button>
            </>
          ) : config.mode == "words" ? (
            <>
              <button
                onClick={() => setConfig({ wordCount: 10 })}
                className={clsx(
                  "h-min ml-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.wordCount == 15 ? "text-main" : "text-sub",
                )}
              >
                {" 10"}
              </button>
              <button
                onClick={() => setConfig({ wordCount: 30 })}
                className={clsx(
                  "h-min py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.wordCount == 30 ? "text-main" : "text-sub",
                )}
              >
                {" 25"}
              </button>
              <button
                onClick={() => setConfig({ wordCount: 50 })}
                className={clsx(
                  "h-min py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.wordCount == 50 ? "text-main" : "text-sub",
                )}
              >
                {" 50"}
              </button>
              <button
                onClick={() => setConfig({ wordCount: 100 })}
                className={clsx(
                  "h-min mr-[6.72px] py-[11.2px] px-[6.72px] bg-none inline-flex gap-2 items-center justify-center rounded-lg text-center text-xs leading-[1.25] appearance-none cursor-pointer ",
                  config.wordCount == 100 ? "text-main" : "text-sub",
                )}
              >
                {" 100"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TestConfig;
