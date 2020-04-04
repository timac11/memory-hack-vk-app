import React from "react";
import { YMaps, Map } from 'react-yandex-maps';

export const YMap = () => (
    <YMaps>
        <div style={{display: "flex", width: "100%", height: "360px", justifyContent: "center"}}>
            <Map style={{flex: 1, padding: "0 16px"}} defaultState={{ center: [55.75, 37.57], zoom: 4 }} />
        </div>
    </YMaps>
);