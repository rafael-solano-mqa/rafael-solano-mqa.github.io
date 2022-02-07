import React, { useEffect, useRef, useState } from "react";
import "./BingMap.css";
import { loadBingServices } from "../../services/ExternalAPILoader";

const COORD2DEXPR = new RegExp("\\(\\-?\\d+(\\.\\d+)?,\\-?\\d+(\\.\\d+)?,\\-?\\d+(\\.\\d+)?\\)")
const MARKER = {
    title: 'EMCO',
    subTitle: 'Warehouse',
    text: '⚑'
}

function onBingMapRightClick(event) {
    const markerData = this.markerFactory();    
    if(markerData) {
        let marker = new window.Microsoft.Maps.Pushpin(event.location, markerData);
        let location = `(${event.location.latitude},${event.location.longitude},${this.mapHandle.getZoom()})`;
        this.mapHandle.entities.clear();
        this.mapHandle.entities.push(marker);
        this.element.setAttribute('data-location', location)
    }
}

async function createBingMap(element, options, markerFactory) {
    if(typeof element.mapHandle === "undefined") {
        await loadBingServices()
        const mapHandle = window.Microsoft.Maps.Map(element);
        mapHandle.setOptions(options);
        
        window.Microsoft.Maps.Events.addHandler(mapHandle, 'rightclick', onBingMapRightClick.bind({mapHandle, element, markerFactory}));        
        element.mapHandle = mapHandle;
    }

    return element.mapHandle;
}

export default function BingMap(props) {
    const containerRef = useRef(null)
    const mapOptions = props.mapOptions || {};
    const className = props.className || "bing-map";
    const name = props.name;
    const markerFactory = typeof props.markerFactory === "function" ? props.markerFactory : () => (MARKER);
    const [valueProp, setValueProp] = useState(false);

    useEffect(() => {
        if (valueProp) return;
        (async () => {
            await createBingMap(containerRef.current, mapOptions, markerFactory);
        })()
        Object.defineProperty(containerRef.current, "userInput", {
            get() {
                return containerRef.current.getAttribute('data-location');
            },

            set(_value) {
                (async () => {
                    const mapHandle = await createBingMap(containerRef.current, mapOptions, markerFactory);
                    mapHandle.entities.clear();
                    containerRef.current.removeAttribute('data-location');
                    if (_value && COORD2DEXPR.test(_value)) {     
                        const [latitude, longitude, zoom] = _value.replaceAll(/\(|\)/g, '').split(',').map(x => parseFloat(x));                        
                        const location = new window.Microsoft.Maps.Location(latitude, longitude);                                                
                        let marker = new window.Microsoft.Maps.Pushpin(location, markerFactory());                        
                        mapHandle.setView({
                            center: location,
                            zoom: zoom
                        });
                        mapHandle.entities.push(marker);
                        containerRef.current.setAttribute('data-location', _value)
                    }
                })()
            },
        });

        containerRef.current.reset = () => {
            containerRef.current.removeAttribute('data-location');
        };

        setValueProp(true);

        // eslint-disable-next-line
    }, [])
    return (
        <div data-control='bing-map' name={name} ref={containerRef} className={className}></div>
    )
}