import Dashboard from '../Dashboard/dashboard';
import UpdateProductCard from '../Dashboard/updateProductCard';

export function Home() {

	return (
		<div id='dashboard_container' className='standard'>
			<h1>Breinify Code Challenge</h1>
			<UpdateProductCard/>
			<Dashboard/>
		</div>
	);
}
