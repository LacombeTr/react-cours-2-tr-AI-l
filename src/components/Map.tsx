import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { ItinerairePoint } from "../types/PromptReturn";
import L from "leaflet";

type MapProps = {
    itineraireSteps: ItinerairePoint[];
};

// Fonction pour créer un icône Leaflet avec SVG personnalisé
const createReactIcon = (svgHtml: string) => {
    return L.divIcon({
        html: svgHtml,
        className: "react-icon-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

// SVG pour la location dot (premier point)
const getLocationDotSVG = (color: string) => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="28" height="28" className="animate-pulse">
            <g transform="scale(0.046875)">
                <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
            </g>
        </svg>
    `;
};

// SVG pour la map pin (autres points)
const getMapPinSVG = (color: string) => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="28" height="28">
            <g transform="scale(0.046875)">
                <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
            </g>
        </svg>
    `;
};

const MapUpdater = ({ itineraireSteps }: MapProps) => {
    const map = useMap();

    useEffect(() => {
        if (itineraireSteps.length > 0) {
            const bounds = L.latLngBounds(
                itineraireSteps.map((step) => [
                    parseFloat(step.lat),
                    parseFloat(step.lng),
                ]),
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [itineraireSteps, map]);

    return null;
};

export const Map = ({ itineraireSteps }: MapProps) => {
    return (
        <>
            <style>{`
                .react-icon-marker {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                }
            `}</style>
            <MapContainer
                center={
                    itineraireSteps.length > 0
                        ? [
                              parseFloat(itineraireSteps[0].lat),
                              parseFloat(itineraireSteps[0].lng),
                          ]
                        : [45, 0]
                }
                zoom={itineraireSteps.length > 0 ? 13 : 2}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
                className='display flex justify-center items-center w-full h-full rounded-xl bg-white/20 text-white border-t-[0.5px] border-b border-t-white/40 border-b-white/40 backdrop-blur-sm'
                >
                <MapUpdater itineraireSteps={itineraireSteps} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {itineraireSteps.map((step, index) =>
                    index === 0 ? (
                        <Marker
                            key={index}
                            position={[parseFloat(step.lat), parseFloat(step.lng)]}
                            icon={createReactIcon(getLocationDotSVG("#ef4444"))}
                        >
                            <Popup>
                                <h3>{step.point_interet}</h3>
                                <p>{step.description}</p>
                                <p>{step.conseils}</p>
                            </Popup>
                        </Marker>
                    ) : (
                        <Marker
                            key={index}
                            position={[parseFloat(step.lat), parseFloat(step.lng)]}
                            icon={createReactIcon(getMapPinSVG("#35530e"))}
                        >
                            <Popup>
                                <h3>{step.point_interet}</h3>
                                <p>{step.description}</p>
                                <p>{step.conseils}</p>
                            </Popup>
                        </Marker>
                    ),
                )}
            </MapContainer>
        </>
    );
};
