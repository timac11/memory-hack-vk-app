import React, { useState, useEffect } from 'react';
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
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = id => {
		setActivePanel(id);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Info id='home' go={go} userId={fetchedUser && fetchedUser.id}/>
			<Result id='result' go={go} userId={fetchedUser && fetchedUser.id}/>
			<MapResults id='mapResults' go={go} userId={fetchedUser && fetchedUser.id}/>
		</View>
	);
}

export default App;

