const Keybinds = () => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col gap-2 items-center text-xs text-foreground">
        <div className="flex items-center">
          <span className="py-1 px-2 mx-2 rounded bg-background-keybind">
            Tab
          </span>
          <p>- refocus</p>
        </div>
        <div className="flex items-center">
          <span className="py-1 px-2 mx-2 rounded bg-background-keybind">
            Ctrl
          </span>
          <p>+</p>
          <span className="py-1 px-2 mx-2 rounded bg-background-keybind">
            Space
          </span>
          <p>- restart</p>
        </div>
      </div>
    </div>
  );
};

export default Keybinds;
