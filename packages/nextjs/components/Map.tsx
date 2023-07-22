import { useEffect, useRef, useState } from "react";
// import { Flex } from "@chakra-ui/react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";

// console.log("turf", turf);

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Sita: NextPage = () => {
  const map = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLElement | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: "draw_polygon",
    });

    function updateArea(e) {
      const data = draw.getAll();
      console.log(data);
      const answer = document.getElementById("calculated-area");
      if (data.features.length > 0) {
        const area = turf.area(data);
        const pointGeo = turf.centerOfMass(data);
        console.log(pointGeo);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        console.log(rounded_area);
        // answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
      } else {
        // answer.innerHTML = "";
        if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
      }
    }

    map.current.addControl(draw);

    map.current.on("draw.create", updateArea);
    map.current.on("draw.delete", updateArea);
    map.current.on("draw.update", updateArea);
  });

  return (
    <>
      {/* <Flex className="flex items-center flex-col flex-grow pt-10">
        <h1>Map</h1>
        <h2>Test2</h2>
      </Flex> */}
      <div
        style={{
          height: "400px",
        }}
        className="map-container"
        ref={mapContainer}
      />
    </>
  );
};

export default Sita;
