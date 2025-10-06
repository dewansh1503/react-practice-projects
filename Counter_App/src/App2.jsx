import { useDispatch } from 'react-redux';
import { fetchUser } from '../features/userSlice';
import { useRef } from 'react';

function App2() {
   const inputRef = useRef(null);
   const dispatch = useDispatch();
   return (
      <>
         <input type="text" ref={inputRef} />
         <button
            onClick={() => {
               const userid = parseInt(inputRef.current.value);
               dispatch(fetchUser(userid));
            }}
         >
            Fetch User
         </button>
      </>
   );
}

export default App2;
