import { useDispatch, useSelector } from 'react-redux';
import {
   addToCart,
   addToWishlist,
   decreaseQuantity,
   increaseQunatity,
   removeFromCart,
   removeFromWishlist,
} from '../src/slices';
import { useState } from 'react';

export default function Items() {
   const items = useSelector((state) => state.items);
   const wishlist = useSelector((state) => state.wishlist);
   const cart = useSelector((state) => state.cart);

   const dispatch = useDispatch();

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

   function toCart(item) {
      const alreadyInCart = cart.find((product) => product.id === item.id);
      if (!alreadyInCart) dispatch(addToCart(item));
   }

   function addQunatity(item) {
      dispatch(increaseQunatity(item.id));
   }
   function reduceQunatity(item) {
      const product = cart.find((product) => product.id === item.id);
      if (product?.quantity) {
         if (product.quantity > 1) {
            dispatch(decreaseQuantity(item.id));
         } else {
            // console.log('removing from the cart', item.id);
            dispatch(removeFromCart(item.id));
         }
      }
   }

   function getProductQuantity(item) {
      const p = cart.find((product) => product.id === item.id);
      return p?.quantity;
   }
   function isItemInCart(id) {
      if (cart.find((item) => item.id === id)) return true;
      return false;
   }

   return (
      <>
         <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
               Most ordered items this week
            </li>

            {items.map((item) => (
               <li key={item.id} className="list-row">
                  <div className="card card-side bg-base-100 shadow-sm">
                     <figure>
                        <ProductImage
                           title={item.title}
                           imageId={item.imageId}
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
                           {isItemInCart(item.id) ? (
                              <div className="flex items-center">
                                 <button
                                    className="btn btn-square font-bold text-xl w-10 h-10 "
                                    onClick={() => {
                                       reduceQunatity(item);
                                    }}
                                 >
                                    -
                                 </button>
                                 <span className="px-3 text-lg font-semibold ">
                                    {getProductQuantity(item)}
                                 </span>
                                 <button
                                    className="btn btn-square font-bold text-xl w-10 h-10 "
                                    onClick={() => {
                                       addQunatity(item);
                                    }}
                                 >
                                    +
                                 </button>
                              </div>
                           ) : (
                              <div>
                                 <button
                                    className="btn btn-primary text-lg"
                                    onClick={() => {
                                       toCart(item);
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
                                    // add to wishlist
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
                           )}
                        </div>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
      </>
   );
}

function ProductImage({ imageId, title }) {
   const [loading, setLoading] = useState(true);
   return (
      <>
         {loading && <div className="skeleton h-[150px] w-[170px]"></div>}
         <img
            src={`https://picsum.photos/id/${imageId}/170/150`}
            alt={title}
            loading="lazy"
            onLoad={() => {
               setLoading(false);
            }}
            onError={(e) => {
               e.target.style.width = '10rem';
               setLoading(false);
            }}
            className={`${loading ? 'opacity-0 absolute' : 'opacity-100 '}`}
         />
      </>
   );
}
