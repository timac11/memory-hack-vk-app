import React from "react";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import {YMap} from "../YMap";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {IOS, Panel, platform} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import connect from '@vkontakte/vk-connect';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

export const MapResults = props => {
    const vkPost = () => {
        const info = {};
        const {fetchedUser} = props;

        info.userid = fetchedUser.id;
        info.usercity = fetchedUser.city.title;
        info.userphoto = fetchedUser.photo_200;
        info.username = fetchedUser.first_name;
        info.usersurname = fetchedUser.last_name;

        connect.send("VKWebAppShowWallPostBox", {"message": "С 9 мая!", attachment: getAttachment()});

    };

    const getAttachment = () => "photo34917303_457242737";

    return <Panel id={props.id}>
        <PanelHeader
            left={<PanelHeaderButton onClick={props.go} data-to="home">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>}
        >
            Совпадение
        </PanelHeader>
        <Group style={{paddingBottom: 8}} header={<Header mode="secondary">Карта передвижения</Header>}>
            <YMap/>
        </Group>

        <Div>
            <Button onClick={() => vkPost()} size="xl">Опубликовать на стене</Button>
        </Div>
    </Panel>
};

MapResults.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.object
};