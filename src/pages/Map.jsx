import { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint, deletePoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";
import { SearchIcon, PlayIcon, StarIcon } from "../components/Icons";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: -23.55052, lng: -46.633308 };

export const Map = () => {
  const { user } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState(null);
  const [newPointDescription, setNewPointDescription] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const gradientBg = { background: "linear-gradient(90deg, #FF50A8 0%, #F4865E 100%)" };

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

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setNewPointCoords({ lat, lng });
    setNewPointDescription("");
    setShowModal(true);
  };

  const handleConfirmPoint = async () => {
    if (!newPointDescription) {
        alert("Digite uma descrição!");
        return;
    }

    const newPoint = {
      latitude: newPointCoords.lat,
      longitude: newPointCoords.lng,
      descricao: newPointDescription, 
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
      setShowModal(false);
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    }
  };

  const handleDeleteClick = async () => {
    if (!selectedMarker) return;
    if (selectedMarker.userId === user.id) {
        if (confirm(`Deseja excluir o ponto "${selectedMarker.title}"?`)) {
            try {
                await deletePoint(selectedMarker.id);
                setMarkers((prev) => prev.filter((m) => m.id !== selectedMarker.id));
                setSelectedMarker(null);
            } catch (error) {
                alert("Erro ao deletar: " + error.message);
            }
        }
    } else {
        alert(`Este ponto foi criado por outra pessoa.`);
    }
  };

  const filteredMarkers = markers.filter(marker => 
    marker.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full h-full flex flex-col font-['Poppins']">
      
      <div className="absolute top-0 left-0 right-0 z-[10] p-4 flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto relative w-full max-w-md mx-auto">
           <div className="w-full h-12 rounded-full border-[3px] border-black flex items-center px-4 shadow-lg" style={gradientBg}>
              <input 
                type="text"
                placeholder="Pesquisar"
                className="bg-transparent text-white font-bold text-xl flex-1 text-center placeholder-white/80 outline-none drop-shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-transparent"><SearchIcon /></div>
           </div>
        </div>
        <div className="pointer-events-auto flex justify-center gap-3">
            {['preço', 'música', 'distância'].map((filter) => (
                <button key={filter} className="px-4 py-1 rounded-full border-[2px] border-black text-white font-bold text-sm shadow-md hover:scale-105 transition-transform" style={gradientBg}>
                    {filter}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 w-full h-full z-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
            options={{
                disableDefaultUI: true,
                zoomControl: false,
            }}
          >
            {filteredMarkers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="relative w-48 h-40 flex flex-col items-center justify-center p-2 overflow-hidden cursor-pointer" onClick={handleDeleteClick}>
                    <div className="absolute inset-0 rounded-[20px] border-2 border-white" style={gradientBg}></div>
                    <h2 className="relative text-white font-black text-lg tracking-wide drop-shadow-md z-10 text-center mb-2">
                        {selectedMarker.title}
                    </h2>
                    <div className="relative w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-lg bg-white z-10 mb-1">
                         <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=80" alt="Local" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative flex items-center gap-1 z-10">
                        <StarIcon size={14} />
                        <span className="text-white text-md font-bold">5.0</span>
                    </div>
                    {selectedMarker.userId === user.id && (
                        <div className="relative z-10 text-[10px] text-white mt-1 underline">Clique p/ excluir</div>
                    )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full">Carregando mapa...</div>
        )}
      </div>

      <button className="absolute bottom-6 right-4 w-16 h-16 rounded-full border-[3px] border-black flex items-center justify-center shadow-xl z-[900] bg-[#89CFF0] hover:scale-110 transition-transform">
        <div className="w-10 h-10 bg-[#FF50A8] rounded-full flex items-center justify-center border border-black">
             <PlayIcon />
        </div>
      </button>

      {showModal && (
        <div className="absolute inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xs border-2 border-black">
                <h3 className="font-bold text-xl mb-4 text-center">Nova Festa</h3>
                <input 
                    type="text" 
                    className="w-full border-2 border-black rounded-lg p-2 mb-4 font-['Poppins']"
                    placeholder="Nome do Local / Descrição"
                    value={newPointDescription}
                    onChange={(e) => setNewPointDescription(e.target.value)}
                    autoFocus
                />
                <div className="flex gap-2">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2 border-2 border-black rounded-lg font-bold">Cancelar</button>
                    <button onClick={handleConfirmPoint} className="flex-1 py-2 border-2 border-black rounded-lg font-bold text-white" style={gradientBg}>Salvar</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};