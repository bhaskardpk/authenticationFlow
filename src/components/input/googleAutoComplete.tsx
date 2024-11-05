import React, { useEffect, useRef, useState } from "react";
import CustomInput from "./input";
import CustomImage from "../image/customImage";
import { IconJson } from "@/images/imagesFile";
import { envValues } from "@/utils/envConfig";

// Define the type for the place object
interface Place {
  description: string;
  place_id: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  [key: string]: any; // To accommodate other properties
}

// Define the props for the component
interface PlacesInputProps {
  onPlaceSelected?: (place: Place) => void;
  placeholder?: string;
  children?: React.ReactElement<React.ReactElement>;
}
interface GooglePlacesInputProps {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  label?: string;
  icon?: keyof typeof IconJson;
  inputClassName?: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  children?: React.ReactNode;
  setValue?: (name: string, value?: string, validation?: any) => void;
  value?: string;
}
const PlacesInput: React.FC<GooglePlacesInputProps> = ({
  onPlaceSelected,
  label,
  icon,
  inputClassName = "bg-slate-blue w-full h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]",
  name = "",
  type = "text",
  children,
  setValue = () => {},
  value = "",
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setPlaceInput = (placeValue: any) => {
    let value = inputRef?.current?.value;
    setValue(name, value, { shouldValidate: true });
  };
  const onChangeInput = (e: any) => {
    let value = e.target.value;
    setValue(name, value, { shouldValidate: true });
  };

  useEffect(() => {
    if (value === "" && inputRef.current)
      setValue(name, "", { shouldValidate: true });
  }, []);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window?.google && inputRef.current) {
        const autoCompleteInstance = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["address"], // You can specify other types if needed
          }
        );
        autoCompleteInstance.addListener("place_changed", async () => {
          const place: any = autoCompleteInstance.getPlace();
          if (place.place_id) {
            setPlaceInput(place);
            setValue("placeId", place.place_id);
          }
        });
        setAutocomplete(autoCompleteInstance);
      }
    };

    // Load Google Maps API script if not already loaded
    if (!window?.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${envValues.NEXT_PUBLIC_GOOGLE_PLACE_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMapsApi;
      document.body.appendChild(script);
    } else {
      loadGoogleMapsApi();
    }

    // Cleanup: Remove listeners when component unmounts
    return () => {
      if (autocomplete) {
        google?.maps?.event?.clearInstanceListeners(inputRef?.current!);
      }
    };
  }, [onPlaceSelected]);

  // Function to fetch place details using place_id
  const fetchPlaceDetails = async (placeId: string): Promise<Place> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${envValues.NEXT_PUBLIC_GOOGLE_PLACE_KEY}`
    );
    const data = await response.json();

    if (data.result) {
      const { geometry, formatted_address } = data.result;
      return {
        description: data.result.name,
        place_id: placeId,
        latitude: geometry?.location?.lat || 0,
        longitude: geometry?.location?.lng || 0,
        address: formatted_address,
        ...data.result,
      };
    }

    return { description: "", place_id: placeId };
  };

  return (
    <>
      <div className="w-full flex flex-col mb-[30px]">
        {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}
        <div className="w-full flex flex-col gap-[10px] relative">
          {icon && IconJson[icon] && (
            <CustomImage
              src={IconJson[icon]}
              className="absolute top-[10px] left-[10px]"
              height={20}
              width={20}
              alt={label || ""}
            />
          )}
          <input
            ref={inputRef}
            className={inputClassName}
            type={type}
            name={name}
            value={value}
            onChange={(e) => {
              onChangeInput(e);
            }}
            // id={label}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export { PlacesInput };
