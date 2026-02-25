import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { ItinerairePoint } from "../types/PromptReturn";
import L from "leaflet";

type MapProps = {
    itineraireSteps: ItinerairePoint[];
};

const MapUpdater = ({ itineraireSteps }: MapProps) => {
    const map = useMap();

    useEffect(() => {
        if (itineraireSteps.length > 0) {
            const bounds = L.latLngBounds(
                itineraireSteps.map((step) => [
                    parseFloat(step.lat),
                    parseFloat(step.lng),
                ])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [itineraireSteps, map]);

    return null;
};

export const Map = ({ itineraireSteps }: MapProps) => {
    return (
        <MapContainer
            center={
                itineraireSteps.length > 0
                    ? [
                          parseFloat(itineraireSteps[0].lat),
                          parseFloat(itineraireSteps[0].lng),
                      ]
                    : [51.505, -0.09]
            }
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
            className='display flex justify-center items-center w-full h-full rounded-xl bg-white/20 text-white border-t-[0.5px] border-b border-t-white/40 border-b-white/40 backdrop-blur-sm'
        >
            <MapUpdater itineraireSteps={itineraireSteps} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {itineraireSteps.map((step, index) => (
                <Marker
                    key={index}
                    position={[parseFloat(step.lat), parseFloat(step.lng)]}
                >
                    <Popup>{step.description}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
