import { BrowserRouter } from "react-router-dom";
import Router from "../../Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EstimateProvider } from "../../contexts/Estimate/EstimateContext";

function App() {
	return (
		<BrowserRouter>
			<EstimateProvider>
				<ToastContainer />
				<Router />
			</EstimateProvider>
		</BrowserRouter>
	);
}

export default App;
