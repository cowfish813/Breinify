import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Provider } from 'react-redux';
import './index.css';
import './css_reset.css';

function App({store}) {
	return (
		<Provider store={store}>
			<div className='App'>
				<Router>
					<Routes>
						<Route path='home' element={<Home />} />
						<Route path='*' element={<Navigate replace to='home' />} />
					</Routes>
				</Router>
			</div>
		</Provider>
	);
}

export default App;
