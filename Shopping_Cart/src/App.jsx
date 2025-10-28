import { Link, Outlet, useLocation } from 'react-router-dom';
import TabRoutes from './routes.jsx';
import { useSelector } from 'react-redux';

export default function MyApp() {
	return (
		<>
			<TabRoutes />
		</>
	);
}

export function Tabs() {
	const currentTab = useLocation().pathname.replace('/', '');
	const wishlistLength = useSelector((state) => state.wishlist.length);
	const cart = useSelector((state) => state.cart);

	function getTotalCost() {
		const totalCost = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		const formattedCost = new Intl.NumberFormat('en-US', {
			// style: 'currency',
			currency: 'USD',
		}).format(totalCost);

		return formattedCost;
	}

	return (
		<>
			<div className="flex w-full box-border">
				<div className="lg:min-w-[60%] min-w-[80%] ">
					<div className="tabs tabs-border tabs-xl relative z-10">
						<Link to={'items'}>
							<label className="tab flex items-center gap-2">
								<input
									type="radio"
									name="my_tabs"
									className="hidden"
									checked={currentTab === 'items'}
									readOnly
								/>
								<span>Items</span>
							</label>
						</Link>

						<Link to={'wishlist'}>
							<label className="tab flex items-center gap-2">
								<input
									type="radio"
									name="my_tabs"
									className="hidden"
									checked={currentTab === 'wishlist'}
									readOnly
								/>
								<span>Wishlist</span>
								<svg
									className="size-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={!wishlistLength ? 'none' : 'red'}
									stroke={
										!wishlistLength ? 'currentColor' : 'red'
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
							</label>
						</Link>

						<Link to={'cart'}>
							<label className="tab flex items-center gap-2">
								<input
									type="radio"
									name="my_tabs"
									className="hidden"
									checked={currentTab === 'cart'}
									readOnly
								/>
								<span>Cart</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									fill={!cart.length ? 'none' : 'white'}
									stroke={'currentColor'}
									className="size-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
									/>
								</svg>
							</label>
						</Link>
					</div>

					<div className="border-base-300 bg-base-100 p-5 relative z-10">
						<Outlet />
					</div>
				</div>

				<div className="drawer lg:drawer-open max-w-full lg:w-[40%] drawer-end top-3 right-3 bg-base-100">
					<input
						id="my-drawer"
						type="checkbox"
						className="drawer-toggle"
					/>
					<div className="drawer-content flex justify-end ">
						<label
							htmlFor="my-drawer"
							className="btn drawer-button lg:hidden"
						>
							Bill
						</label>
					</div>
					<div className="drawer-side w-full z-0">
						<label
							htmlFor="my-drawer"
							aria-label="close"
							className="drawer-overlay"
						></label>

						<div className="overflow-x-auto bg-base-100 md:min-h-full min-h-[60%] max-w-fit">
							<table className="table table-zebra text-lg tracking-wide">
								<thead className="text-lg tracking-wide">
									<tr>
										<th></th>
										<th className="min-w-20">Item</th>
										<th>Quantity</th>
										<th>Price ($)</th>
										<th>Cost ($)</th>
									</tr>
								</thead>
								<tbody>
									{cart.map((item, i) => (
										<tr key={i}>
											<th>{i + 1}</th>
											<td>{item.title}</td>
											<td className="text-center">
												{item.quantity}
											</td>
											<td className="text-center">
												{item.price}
											</td>
											<td className="text-center">
												{item.price * item.quantity}
											</td>
										</tr>
									))}
								</tbody>
								{Boolean(cart.length) && ( // push first (adding total conditionally)
									<tfoot>
										<tr className="text-lg text-end pr-6">
											<th colSpan={4}>Total</th>
											<td className="text-center text-white font-semibold">
												{getTotalCost()}
											</td>
										</tr>
									</tfoot>
								)}
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

