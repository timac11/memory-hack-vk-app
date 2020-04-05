import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

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
        city: "",
        patronymic: "",
        military: "1"
    });
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const getUserMatched = () => {
        return <HorizontalScroll>
            <div style={{display: 'flex'}}>
                {users.map((u, index) => {
                    return <div key={index} style={{...itemStyle, paddingLeft: 4}}>
                        <Avatar src={u.userImgLink} size={64}></Avatar>
                        <div style={{textAlign: "center"}}>
                            {u.userName} {u.userSurName}
                        </div>
                    </div>
                })}
            </div>
        </HorizontalScroll>
    };

    const getParentMatched = () => {
        return <HorizontalScroll>
            <div style={{display: 'flex'}}>
                {users.map((u, index) => {
                    return <div key={index} style={{...itemStyle, paddingLeft: 4}}>
                        <img src={u.img} style={{width: 64, height: 64, borderRadius: "50%"}}></img>
                        <div style={{textAlign: "center"}}>
                            {u.name} {u.surName}
                        </div>
                    </div>
                })}
            </div>
        </HorizontalScroll>
    };

    if (!isLoaded) {
        get("matched/" + props.fetchedUser.id).then((response) => {
            setUser(response.data.user);
            setUsers(response.data.matched);
            setPopout(null);
            setIsLoaded(true);
        });
    }

    return <Panel id={props.id}>
        <PanelHeader>
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
                            {user.city || "-"}
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header="Воинская часть">
                            {user.military}
                        </InfoRow>
                    </Cell>
                </List>
            </Group>
            <Group style={{paddingBottom: 8}} header={<Header mode="secondary">Совпадение с друзьями</Header>}>
                {getUserMatched()}
            </Group>
            <Group style={{paddingBottom: 8}} header={<Header mode="secondary">Родственники</Header>}>
                {getParentMatched()}
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
