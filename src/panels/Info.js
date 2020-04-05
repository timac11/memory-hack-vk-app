import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import File from "@vkontakte/vkui/dist/components/File/File";
import Icon24Document from '@vkontakte/icons/dist/24/document';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import {API_URL} from "../API_CONFIG";
const axios = require('axios').default;

const Info = ({id, go}) => {
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        patronymic: ""
    });
    const [militaryUnits, setMilitaryUnits] = useState([]);

    useEffect(() => {

        axios.get(API_URL + "militaryUnits").then(async (response) => {
            setMilitaryUnits(response.data.units);
            setPopout(null);
        });
    });

    return popout || <Panel id={id}>
        <PanelHeader>Информация о ветеране</PanelHeader>

        <FormLayout>
            <Div style={{display: "flex", justifyContent: "center"}}>
                <img align="center" className="page_avatar_img"
                     src="https://sun1-19.userapi.com/c855616/v855616091/2b491/Cr4UI-ECoKg.jpg?ava=1" width="200"
                     height="200" alt=""/>
            </Div>
            <File before={<Icon24Document/>} controlSize="xl" mode="secondary"/>
        </FormLayout>

        <Group title="Базовая информация">
            <FormLayout>
                <FormLayoutGroup top="ФИО">
                    <Input type="text"
                           placeholder="Фамилия"
                           value={user && user.surname}
                           onChange={(e) => {setUser({...user, surname: e.target.value})}}/>
                    <Input type="text"
                           placeholder="Имя"
                           value={user && user.name}
                           onChange={(e) => {setUser({...user, name: e.target.value})}}/>
                    <Input type="text"
                           placeholder="Отчество"
                           value={user && user.patronymic}
                           onChange={(e) => {setUser({...user, patronymic: e.target.value})}}/>
                </FormLayoutGroup>
                <FormLayoutGroup top="Служба">
                    <Select placeholder="Воинская часть">
                        {militaryUnits.map((unit) => <option value={unit.id}>{unit.name}</option>)}
                    </Select>
                </FormLayoutGroup>
            </FormLayout>
        </Group>

        <Div>
            <Button onClick={() => go("result")} size="xl">Загрузить информацию</Button>
        </Div>
    </Panel>
};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default Info;
