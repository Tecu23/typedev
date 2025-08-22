import Caret from "../TypingTest/Caret/Caret";
import Timer from "../TypingTest/Timer/Timer";
import TestArea from "../TypingTest/TestArea/TestArea";
import LiveStats from "../TypingTest/LiveStats/LiveStats";
import TypingTest from "../TypingTest/TypingTest";
import TestConfig from "../TestConfig/TestConfig";
import TestControls from "../TestControls/TestControls";
import HiddenInput from "../TypingTest/HiddenInput/HiddenInput";
import VirtualizedWords from "../TypingTest/VirtualizedWords/VirtualizedWords";

function App() {
  console.log("1");
  return (
    <TypingTest>
      <TestConfig />
      <TestArea>
        <LiveStats />
        <Timer />
        <VirtualizedWords />
        <Caret />
        <HiddenInput />
      </TestArea>
      <TestControls />
    </TypingTest>
  );
}

export default App;
