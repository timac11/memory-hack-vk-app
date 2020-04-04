import React from 'react';
import PropTypes from 'prop-types';
import {platform, IOS} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24User from '@vkontakte/icons/dist/24/user';

import './Persik.css';
import {YMap} from "../YMap";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import Header from "@vkontakte/vkui/dist/components/Header/Header";

const osName = platform();

const itemStyle = {
	flexShrink: 0,
	width: 80,
	height: 94,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	fontSize: 12
};

const Result = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={props.go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
			Совпадение
		</PanelHeader>
		<Group style={{ paddingBottom: 8 }} header={<Header mode="secondary">Совпадение</Header>}>
			<HorizontalScroll>
				<div style={{ display: 'flex' }}>
					<div style={{ ...itemStyle, paddingLeft: 4 }}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Элджей
					</div>
					<div style={itemStyle}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Ольга
					</div>
					<div style={itemStyle}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Сергей
					</div>
					<div style={itemStyle}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Илья
					</div>
					<div style={itemStyle}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Алексей
					</div>
					<div style={itemStyle}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Костя
					</div>
					<div style={itemStyle}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Миша
					</div>
					<div style={{ ...itemStyle, paddingRight: 4 }}>
						<Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
						Вадим
					</div>
				</div>
			</HorizontalScroll>
		</Group>

		<Group style={{ paddingBottom: 8 }} header={<Header mode="secondary">Карта передвижения</Header>}>
			<YMap/>
		</Group>
	</Panel>
);

Result.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Result;
