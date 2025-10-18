
export default function Cart() {
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();

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

   return (
      <>
         {!cart.length && <div className="text-xl">No items in Cart.</div>}
         <ul className="list bg-base-100 rounded-box shadow-md">
            {cart.map((item) => (
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
                                 {item.quantity}
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
                        </div>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
      </>
   );
}