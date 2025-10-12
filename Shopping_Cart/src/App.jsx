export default function App() {
   return (
      <>
         <Tabs />
      </>
   );
}

function Tabs() {
   return (
      <>
         <div className="flex justify-between">
            <div className="tabs tabs-border tabs-xl">
               <label className="tab flex items-center gap-2">
                  <input type="radio" name="my_tabs" className="hidden" />
                  <span>Items</span>
               </label>

               <div className="tab-content border-base-300 bg-base-100 p-10">
                  {<Items />}
               </div>

               <label className="tab flex items-center gap-2">
                  <input
                     type="radio"
                     name="my_tabs"
                     className="hidden"
                     defaultChecked
                  />
                  <span>Wishlist</span>
                  <svg
                     className="size-4"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                  >
                     <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                     >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                     </g>
                  </svg>
               </label>

               <div className="tab-content border-base-300 bg-base-100">
                  {<Wishlist />}
               </div>

               <label className="tab flex items-center gap-2">
                  <input type="radio" name="my_tabs" className="hidden" />
                  <span>Cart</span>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-4"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                     />
                  </svg>
               </label>

               <div className="tab-content border-base-300 bg-base-100 p-10">
                  {<Cart />}
               </div>
            </div>
            <div className="border-2 border-red-200 ">hey </div>
         </div>
      </>
   );
}

