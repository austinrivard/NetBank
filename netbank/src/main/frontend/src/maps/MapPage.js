import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import './map.css';

const redMarker = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  };
const blueMarker = {
  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
};
const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

export default function Places() {
    const center = useMemo(() => ({ lat: 37.335358, lng: -121.879906 }), []);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBI4E0sWHc4y-W9Yv_4hrXmSpUA-WcRrLA",
        libraries: ["places"],
    });

    const [selected, setSelected] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState("");

    useEffect(() => {
      if (window.google && window.google.maps) {
        // The Google Maps API is loaded.
      }
    }, []);

    if (loadError) return <div>Error loading map</div>;

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} setSelectedAddress={setSelectedAddress} />
            </div>


            <GoogleMap
                zoom={5}
                center={center}
                mapContainerClassName="map-container"
            >
                {selected && (
                    <InfoWindow
                        position={selected}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div className="infowindow" id="infowindow-content">
                         <div class="address">{selectedAddress}</div>
                        <p>Address: {selected.formatted_address}</p>
                        </div>

                    </InfoWindow>
                )}

                {/* Add onClick listener to Marker */}
    
                <Marker
                  position={selected}
                  icon={redMarker}
                  onCloseClick={() => setSelected(null)}

                />
            

            </GoogleMap>
        </>
    );
}

const PlacesAutocomplete = ({ setSelected, setSelectedAddress, setAutocompleteValue }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
        getAutocompleteService,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ["establishment"],
            strictBounds: false,
            fields: ["formatted_address", "geometry", "name"],
            restrictions: {types: ['address','atm']}
        },
    });

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng, formatted_address: results[0].formatted_address });
        setSelectedAddress(address);
    };

    const handleClear = () => {
      setValue("");
      setSelected(null);
      setSelectedAddress(null);
  };

    return (
      <div className="search-container">
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
        <button onClick={handleClear}>Clear</button>
      </div>
    );
};