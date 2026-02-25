import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { ItinerairePoint } from "../types/PromptReturn";
import L from "leaflet";

type MapProps = {
    itineraireSteps: ItinerairePoint[];
};

// Seuil de proximité pour considérer deux étapes comme se chevauchant (en degrés)
const OVERLAP_THRESHOLD = 0.002;

// Regroupe les étapes par proximité et retourne pour chaque index son label
const getStepLabels = (steps: ItinerairePoint[]): string[] => {
    const labels: string[] = new Array(steps.length).fill("");
    const visited = new Set<number>();

    for (let i = 0; i < steps.length; i++) {
        if (visited.has(i)) continue;
        const group: number[] = [i];
        visited.add(i);

        for (let j = i + 1; j < steps.length; j++) {
            if (visited.has(j)) continue;
            const dLat = Math.abs(parseFloat(steps[i].lat) - parseFloat(steps[j].lat));
            const dLng = Math.abs(parseFloat(steps[i].lng) - parseFloat(steps[j].lng));
            if (dLat < OVERLAP_THRESHOLD && dLng < OVERLAP_THRESHOLD) {
                group.push(j);
                visited.add(j);
            }
        }

        const label = group.map((idx) => idx + 1).join("/");
        for (const idx of group) {
            labels[idx] = label;
        }
    }

    return labels;
};

// Fonction pour créer un icône Leaflet avec SVG personnalisé et un label d'étape
const createReactIcon = (svgHtml: string, stepLabel: string) => {
    return L.divIcon({
        html: `
            <div style="position:relative;display:inline-block;">
                ${svgHtml}
                <span style="
                    position:absolute;
                    top:-8px;
                    right:-50%;
                    background:#29441e;
                    color:#fff;
                    font-size:11px;
                    font-weight:700;
                    border-radius:9999px;
                    padding:1px 5px;
                    line-height:1.3;
                    white-space:nowrap;
                    border:1.5px solid #c5e6a4;
                    box-shadow:0 1px 3px rgba(0,0,0,0.4);
                    pointer-events:none;
                ">${stepLabel}</span>
            </div>
        `,
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
    const stepLabels = getStepLabels(itineraireSteps);

    return (
        <>
            <style>{`
                .react-icon-marker {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                    overflow: visible !important;
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
                className='display flex justify-center items-center w-full h-full rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl shadow-black/5 overflow-hidden'
                >
                <MapUpdater itineraireSteps={itineraireSteps} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {itineraireSteps.map((step, index) =>
                    index === 0 || index === itineraireSteps.length - 1 ? (
                        <Marker
                            key={index}
                            position={[parseFloat(step.lat), parseFloat(step.lng)]}
                            icon={createReactIcon(getLocationDotSVG("#d97706"), stepLabels[index])}
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
                            icon={createReactIcon(getMapPinSVG("#488222"), stepLabels[index])}
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
