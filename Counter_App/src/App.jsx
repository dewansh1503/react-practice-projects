import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../features/counterSlice';

function App() {
   return (
      <>
         <h1>App1</h1>
         <Count />
         <Iseven />
         <Increase />
         <Decrease />
      </>
   );
}
function Count() {
   const count = useSelector((state) => state.count.count);
   return <div>Count {count}</div>;
}
function Iseven() {
   const iseven = useSelector((state) => state.count.count % 2 === 0);
   return <div>{iseven ? 'Even' : 'Odd'} </div>;
}

function Increase() {
   const dispatch = useDispatch();
   return (
      <button
         onClick={() => {
            dispatch(increase());
         }}
      >
         Increase
      </button>
   );
}
function Decrease() {
   const dispatch = useDispatch();
   return (
      <button
         onClick={() => {
            dispatch(decrease());
         }}
      >
         Decrease
      </button>
   );
}

export default App;

