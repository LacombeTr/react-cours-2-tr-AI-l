export type ItinerairePoint = {
    point_interet: string;
    lat: string;
    lng: string;
    description: string;
    distance: string;
    temps_estime: string;
    conseils: string;
};

export type PromptReturn = {
    destination: string;
    depart: string;
    arrivée: string;
    trace_gpx?: string;
    distance_totale: string;
    temps_total_estime: string;
    difficulté: "facile" | "modérée" | "difficile";
    itineraire: ItinerairePoint[];
};