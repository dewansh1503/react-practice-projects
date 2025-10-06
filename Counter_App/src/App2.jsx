import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/userSlice';
import { useRef } from 'react';

function App2() {
   const inputRef = useRef(null);
   const dispatch = useDispatch();
   return (
      <>
         <h1>App2</h1>
         <input type="text" ref={inputRef} />
         <button
            onClick={() => {
               const userid = parseInt(inputRef.current.value);
               if (userid && !isNaN(userid)) dispatch(fetchUser(userid));
               else alert('enter valid id');
            }}
         >
            Fetch User
         </button>
         <User />
      </>
   );
}

function User() {
   const { loading, user, error } = useSelector((state) => state.user);
   console.log(user);
   if (error) {
      return <div> Failed to fetch user</div>;
   }
   return (
      <>
         {loading ? (
            <div>Loading...</div>
         ) : (
            user && (
               <div>
                  {' '}
                  <span>{user?.id}</span> {user?.username}
               </div>
            )
         )}
      </>
   );
}

export default App2;
