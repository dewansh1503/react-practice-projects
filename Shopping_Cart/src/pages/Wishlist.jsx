import { addToWishlist, removeFromWishlist } from '../src/slices';
import { useDispatch, useSelector } from 'react-redux';

export default function Wishlist() {
   const dispatch = useDispatch();
   const wishlist = useSelector((state) => state.wishlist);

   function toWishlist(item) {
      const alreadyInWishlist = wishlist.find(
         (product) => product.id === item.id
      );
      if (!alreadyInWishlist) {
         dispatch(addToWishlist(item));
      } else {
         dispatch(removeFromWishlist(item.id));
      }
   }

   return (
      <>
         {!wishlist.length && (
            <div className="text-xl">No items in wishlist.</div>
         )}
         <ul className="list bg-base-100 rounded-box shadow-md">
            {wishlist.map((item) => (
               <li key={item.id} className="list-row">
                  <div className="card card-side bg-base-100 shadow-sm">
                     <figure>
                        <img
                           src={`https://picsum.photos/id/${item.imageId}/170/150`}
                           alt="img"
                        />
                     </figure>
                     <div className="card-body min-w-100 px-6 py-1">
                        <h2 className="card-title text-2xl items-start">
                           {item.title}
                        </h2>
                        <p className="text-lg">{item.description}</p>

                        <div className="card-actions gap-1 items-center">
                           <p className="text-2xl font-semibold">
                              ${item.price}
                           </p>
                           <button
                              className="btn btn-primary text-lg"
                              onClick={() => {
                                 toCart(item.id);
                              }}
                           >
                              Cart
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="size-5"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                 />
                              </svg>
                           </button>
                           <button
                              className="btn btn-square btn-ghost"
                              onClick={() => {
                                 toWishlist(item);
                              }}
                           >
                              <svg
                                 className="size-[1.4em]"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill={
                                    wishlist.find(
                                       (product) => product.id === item.id
                                    )
                                       ? 'red'
                                       : 'none'
                                 }
                                 stroke={
                                    wishlist.find(
                                       (product) => product.id === item.id
                                    )
                                       ? 'red'
                                       : 'currentColor'
                                 }
                              >
                                 <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                 >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                 </g>
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
         <Alert />
      </>
   );
}

const AlertBox = forwardRef((props, ref) => {
   const [alerts, setAlert] = useState([]);
   const containerRef = useRef(null);
   const dispatch = useDispatch();

   useImperativeHandle(ref, () => ({
      addAlert(item) {
         const timeoutId = setTimeout(() => {
            setAlert((alerts) => {
               // console.log('alert removed after 5 sec', item.title);
               return alerts.filter((alert) => alert.id !== item.id);
            });
         }, 5000);

         setAlert((prev) => [...prev, { ...item, timeoutId }]);
      },
   }));

   function onUndo(item) {
      clearTimeout(item.timeoutId);
      setAlert((alerts) => {
         // console.log('alert removed immediately', item.title);
         return alerts.filter((alert) => alert.id !== item.id);
      });
      dispatch(addToWishlist(item));
   }

   useEffect(() => {
      const container = containerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop < 300;

      if (containerRef.current && isNearBottom) {
         containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
   }, [alerts]);

   return (
      <>
         <div
            ref={containerRef}
            style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
            className="fixed bottom-4 right-4 w-fit max-h-44 bg-transparent overflow-y-scroll "
         >
            {alerts.map((item) => {
               return <Alert key={item.id} item={item} onUndo={onUndo} />;
            })}
         </div>
      </>
   );
});


function Alert() {
   return (
      <>
         <div role="alert" className="w-fit alert alert-vertical sm:alert-horizontal">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               className="h-6 w-6 shrink-0"
            >
               <path
                  stroke={'oklch(74% 0.16 232.661)'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               ></path>
            </svg>
            <span>
               Removed item.title from wishlist{' '}
               <a className="link link-info">Undo</a>
            </span>
         </div>
      </>
   );
}
