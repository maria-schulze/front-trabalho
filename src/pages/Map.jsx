import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint, deletePoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: -23.55052, lng: -46.633308 };

export const Map = () => {
  const { user } = useAuth();
  const [markers, setMarkers] = useState([]);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints();
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, []);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPoint = {
      latitude: lat,
      longitude: lng,
      descricao: `Ponto de ${user.name}`,
    };

    try {
      const savedPoint = await postPoint(newPoint, user.id);
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.descricao,
        position: { lat: savedPoint.latitude, lng: savedPoint.longitude },
        userId: user.id
      };
      setMarkers((prev) => [...prev, savedMarker]);
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    }
  };

  const handleMarkerClick = async (marker) => {
    if (marker.userId === user.id) {
        if (confirm(`Deseja excluir o ponto "${marker.title}"?`)) {
            try {
                await deletePoint(marker.id);
                setMarkers((prev) => prev.filter((m) => m.id !== marker.id));
            } catch (error) {
                alert("Erro ao deletar: " + error.message);
            }
        }
    } else {
        alert(`Este ponto foi criado por outra pessoa.`);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "100%" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
      </div>
    </>
  );
};
