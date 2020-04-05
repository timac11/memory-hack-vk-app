import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IOS, platform} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24User from '@vkontakte/icons/dist/24/user';

import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import List from "@vkontakte/vkui/dist/components/List/List";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";
import {get} from "../ApiProvider";

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

const Result = props => {
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [user, setUser] = useState({
        id: props.fetchedUser && props.fetchedUser.id,
        name: "",
        surName: "",
        patronymic: "",
        military: "1"
    });
    const [isLoaded, setIsLoaded] = useState(false);

    if (!isLoaded) {
        get("user/" + props.fetchedUser.id).then((response) => {
            setUser(response.data);
            setPopout(null);
            setIsLoaded(true);
        });
    }

    return <Panel id={props.id}>
        <PanelHeader
            left={<PanelHeaderButton onClick={props.go} data-to="home">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>}
        >
            Совпадение
        </PanelHeader>
        {popout ||
        <Div>
            <Div style={{display: "flex", justifyContent: "center"}}>
                <img align="center" className="page_avatar_img"
                     src={user.img} width="200"
                     height="200" alt=""/>
            </Div>
            <Group header={<Header mode="secondary">Информация о ветеране</Header>}>
                <List>
                    <Cell>
                        <InfoRow header="ФИО">
                            {user.surName} {user.name} {user.patronymic}
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header="Родной город">
                            Ереван
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header="Воинская часть">
                            {user.military}
                        </InfoRow>
                    </Cell>
                </List>
            </Group>
            <Group style={{paddingBottom: 8}} header={<Header mode="secondary">Совпадение</Header>}>
                <HorizontalScroll>
                    <div style={{display: 'flex'}}>
                        <div style={{...itemStyle, paddingLeft: 4}}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Элджей
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Ольга
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Сергей
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Илья
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Алексей
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Костя
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Миша
                        </div>
                        <div style={{...itemStyle, paddingRight: 4}}>
                            <Avatar size={64} style={{marginBottom: 8}}><Icon24User/></Avatar>
                            Вадим
                        </div>
                    </div>
                </HorizontalScroll>
            </Group>

            <Div>
                <Button onClick={() => props.go("mapResults")} size="xl">Посмотреть информацию</Button>
            </Div>
        </Div>
        }
    </Panel>
};

Result.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.object
};

export default Result;
