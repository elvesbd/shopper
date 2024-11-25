import useConfirm from "../../useConfirm";
import { MapContainer, MapImage } from "./StaticMapStyled";

function StaticMapWithRoute() {
	const { encodedPolyline, origin, destination } = useConfirm();

	const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY;	
	const encodedPath = encodeURIComponent(encodedPolyline);

	const originMarker = `${origin.latitude},${origin.longitude}`;
	const destinationMarker = `${destination.latitude},${destination.longitude}`;

	const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x200&path=enc:${encodedPath}&markers=color:blue|label:A|${originMarker}&markers=color:red|label:B|${destinationMarker}&key=${googleMapsApiKey}`;
	console.log(staticMapUrl, staticMapUrl);
	

	return (
		<MapContainer>
			<MapImage src={staticMapUrl} alt="Static Map with Route" />
		</MapContainer>
	);
}

export default StaticMapWithRoute;
