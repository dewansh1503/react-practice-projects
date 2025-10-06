import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../features/counterSlice';

function App() {
   return (
      <>
         <Count />
         {/* <Iseven /> */}
         <Increase />
         <Decrease />
      </>
   );
}
function Count() {
   const count = useSelector((state) => state.count);
   return <div>Count {count}</div>;
}

function Increase(){
   const dispatch = useDispatch()
   return <button onClick={()=>{dispatch(increase())}}>Increase</button>
}
function Decrease(){
   const dispatch = useDispatch()
   return <button onClick={()=>{dispatch(decrease())}}>Decrease</button>
}

export default App;

