import React from "react";
import {YMaps, Map, Placemark, GeoObject} from 'react-yandex-maps';

export const YMap = (props) => (
    <YMaps>
        <div style={{display: "flex", width: "100%", height: "360px", justifyContent: "center"}}>
            <Map style={{flex: 1, padding: "0 16px"}} defaultState={{ center: [55.75, 37.57], zoom: 4 }}>
                {props.points.map(coordinate => <Placemark key={coordinate[0] + coordinate[1]} geometry={coordinate} options={{iconColor: '#F008'}}/>)}
                <GeoObject
                    geometry={{
                        type: 'LineString',
                        coordinates: props.points,
                    }}
                    options={{
                        geodesic: true,
                        strokeWidth: 5,
                        strokeColor: '#F008',
                    }}
                />
            </Map>
        </div>
    </YMaps>
);