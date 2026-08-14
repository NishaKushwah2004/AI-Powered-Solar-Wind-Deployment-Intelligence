import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


const TerrainMap = ({
    sites,
}) => {

    const validSites = sites.filter(
        (site) =>
            Number.isFinite(
                Number(site.latitude)
            ) &&
            Number.isFinite(
                Number(site.longitude)
            )
    );


    const center =
        validSites.length > 0
            ? [
                Number(
                    validSites[0].latitude
                ),
                Number(
                    validSites[0].longitude
                ),
            ]
            : [20.5937, 78.9629];


    return (

        <div className="rounded-xl border bg-white p-4 shadow-sm">

            <div className="mb-4">

                <h2 className="text-lg font-semibold">
                    Terrain Map
                </h2>

                <p className="text-sm text-gray-500">
                    Site terrain and slope visualization.
                </p>

            </div>


            <div className="h-112.5 overflow-hidden rounded-lg">

                <MapContainer
                    center={center}
                    zoom={6}
                    scrollWheelZoom
                    className="h-full w-full"
                >

                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {validSites.map((site) => (

                        <CircleMarker
                            key={site.site_id}
                            center={[
                                Number(
                                    site.latitude
                                ),
                                Number(
                                    site.longitude
                                ),
                            ]}
                            radius={8}
                        >

                            <Popup>

                                <p className="font-semibold">
                                    {site.site_name}
                                </p>

                                <p className="mt-1">
                                    Land slope:
                                    {" "}
                                    {site.land_slope}°
                                </p>

                            </Popup>

                        </CircleMarker>

                    ))}

                </MapContainer>

            </div>

        </div>

    );

};


export default TerrainMap;