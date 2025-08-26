import {
  AtSignIcon,
  HashIcon,
  QuoteIcon,
  TimerIcon,
  TriangleIcon,
  Type,
  WrenchIcon,
} from "lucide-react";

type Props = {};

const TestConfig = (props: Props) => {
  return (
    <div
      id="testConfig"
      className="col-[full-width] relative grid justify-self-center w-max mb-4 justify-around h-max gap-2 grid-flow-col "
    >
      <div className="flex bg-sub-alt rounded-lg">
        <div className="grid grid-flow-col justify-start">
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <AtSignIcon size={14} />
            {" punctuation"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <HashIcon size={14} />
            {" numbers"}
          </button>
        </div>
        <div className="h-auto w-2 rounded-sm bg-bg my-3"></div>
        <div className="grid grid-flow-col justify-start">
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <TimerIcon size={14} />
            {" time"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <Type size={14} />
            {" words"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <QuoteIcon size={14} />
            {" quote"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <TriangleIcon size={14} />
            {" zen"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            <WrenchIcon size={14} />
            {" custom"}
          </button>
        </div>
        <div className="h-auto w-2 rounded-sm bg-bg my-3"></div>
        <div className="grid grid-flow-col justify-start">
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            {" 15"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            {" 30"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            {" 60"}
          </button>
          <button className="inline-flex text-sub cursor-pointer rounded-lg text-center bg-none appearance-none h-min text-xs leading-[1.25] gap-2 items-center justify-center py-2.5 px-2">
            {" 120"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestConfig;
