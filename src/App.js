import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Info from './panels/Info';
import Result from './panels/Result';
import {MapResults} from "./panels/MapResults";

const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [fetchedUser, setUser] = useState(null);

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
        }

        fetchData();
    }, []);

    const go = id => {
        setActivePanel(id);
    };
    debugger
    return (
        <View activePanel={activePanel}>
            <Info id='home' fetchedUser={fetchedUser} go={go}/>
            <Result id='result' go={go} fetchedUser={fetchedUser}/>
            <MapResults id='mapResults' go={go} fetchedUser={fetchedUser}/>
        </View>
    );
}

export default App;

