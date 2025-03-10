
import React, { useEffect, useRef } from "react";

interface GoogleMapProps {
  address: string;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap = ({ address, className = "" }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Função para carregar o script do Google Maps
    const loadGoogleMapsScript = () => {
      // Verifica se o script já foi carregado
      if (window.google?.maps) {
        initializeMap();
        return;
      }

      // Define uma função global que o callback do Google Maps usará
      window.initMap = initializeMap;

      // Cria o script do Google Maps
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvBqgGiJ1L_oNUxUM2DpBwyHdajSgv4nk&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Limpa o script quando o componente é desmontado
        window.initMap = undefined;
        document.head.removeChild(script);
      };
    };

    // Função para inicializar o mapa
    const initializeMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Cria o geocoder para converter o endereço em coordenadas
      const geocoder = new window.google.maps.Geocoder();

      // Converte o endereço em coordenadas
      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          // Cria o mapa
          const mapOptions = {
            center: results[0].geometry.location,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          };

          // Inicializa o mapa
          mapInstanceRef.current = new window.google.maps.Map(
            mapRef.current,
            mapOptions
          );

          // Adiciona um marcador na localização
          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: mapInstanceRef.current,
            animation: window.google.maps.Animation.DROP,
          });
        } else {
          console.error("Não foi possível geocodificar o endereço:", status);
        }
      });
    };

    loadGoogleMapsScript();

    return () => {
      // Limpa a referência ao mapa quando o componente é desmontado
      mapInstanceRef.current = null;
    };
  }, [address]);

  return (
    <div 
      ref={mapRef} 
      className={`aspect-video bg-muted rounded-md ${className}`}
      aria-label={`Mapa mostrando a localização: ${address}`}
    >
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Carregando mapa...</p>
      </div>
    </div>
  );
};

export default GoogleMap;
