import { useDispatch, useSelector } from 'react-redux';
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

function User() {
   const { loading, user, error } = useSelector((state) => state.user);

   if (error) {
      return <div> Failed to fetch user</div>;
   }
   return (
      <>{loading ? <div>Loading...</div> : user && <div>user?.username</div>}</>
   );
}

export default App2;
