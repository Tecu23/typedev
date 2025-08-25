type Props = {};

const Caret = (props: Props) => {
  return (
    <div className="absolute w-[3px] h-[38px] bg-caret rounded-lg col-[full-width] origin-top-left top-[6px] left-[8.5px] animate-caret"></div>
  );
};

export default Caret;
