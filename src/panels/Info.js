import React, {useState} from 'react';
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
import {get, post} from "../ApiProvider";
import {toBase64} from "../utils";
import FormStatus from "@vkontakte/vkui/dist/components/FormStatus/FormStatus";

const Info = props => {
    const {id, go, fetchedUser} = props;
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [user, setUser] = useState({
        id: fetchedUser && fetchedUser.id,
        name: "",
        surName: "",
        patronymic: "",
        city: "",
        military: "26 танковая бригада (26 тбр)",
        img: "https://vk.com/images/camera_200.png?ava=1"
    });
    const [militaryUnits, setMilitaryUnits] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState("error");

    if (!isLoaded) {
        get("militaryUnits").then((response) => {
            setMilitaryUnits(response.data.units);
            setPopout(null);
            setIsLoaded(true);
        });
    }

    const validate = (user) => {
        if (user.name && user.name !== "" &&
            user.surName && user.surName !== "" &&
            user.patronymic && user.patronymic !== "" &&
            user.city && user.city !== "" && user.img && user.img !== "https://vk.com/images/camera_200.png?ava=1") {
            setStatus("default");
        } else {
            setStatus("error");
        }
    };

    const postUser = () => {
        setPopout(<ScreenSpinner size='large'/>);
        post("user", {
                ...user, ...{
                    id: fetchedUser.id,
                    userName: fetchedUser.first_name,
                    userSurName: fetchedUser.last_name,
                    userImgLink: fetchedUser.photo_200
                }
            }
        ).then(() => {
            setPopout(null);
            go("result");
        })
    };

    return popout || <Panel id={id}>
        <PanelHeader>Информация о ветеране</PanelHeader>
        <FormLayout>
            <Div style={{display: "flex", justifyContent: "center"}}>
                <img align="center" className="page_avatar_img"
                     src={user.img} width="200"
                     height="200"/>
            </Div>
            <File before={<Icon24Document/>}
                  accept="image/*"
                  onChange={(e) => {
                      toBase64(e.target.files[0]).then((result) => {setUser({...user, img: result}); validate({...user, img: result})});
                  }}
                  controlSize="xl"
                  mode="secondary"
            />
        </FormLayout>

        <Group title="Базовая информация">
            <FormLayout>
                <FormStatus header="Некорректно введены данные" hidden={status === "default"} mode={status}>
                    Необходимо заполнить все поля и загрузить фото
                </FormStatus>
                <FormLayoutGroup top="ФИО">
                    <Input type="text"
                           placeholder="Фамилия"
                           value={user && user.surName}
                           onChange={(e) => {
                               setUser({...user, surName: e.target.value});
                               validate({...user, surName: e.target.value});
                           }}
                    />
                    <Input type="text"
                           placeholder="Имя"
                           value={user && user.name}
                           onChange={(e) => {
                               setUser({...user, name: e.target.value});
                               validate({...user, name: e.target.value});
                           }}
                    />
                    <Input type="text"
                           placeholder="Отчество"
                           value={user && user.patronymic}
                           onChange={(e) => {
                               setUser({...user, patronymic: e.target.value});
                               validate({...user, patronymic: e.target.value});
                           }}
                    />
                    <Input type="text"
                           placeholder="Родной город"
                           value={user && user.city}
                           onChange={(e) => {
                               setUser({...user, city: e.target.value});
                               validate({...user, city: e.target.value});
                           }}
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top="Служба">
                    <Select placeholder="Воинская часть"
                            value={user && user.military}
                            onChange={(e) => {
                                setUser({...user, military: e.target.value});
                                validate({...user, military: e.target.value});
                            }}
                    >
                        {militaryUnits.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                    </Select>
                </FormLayoutGroup>
            </FormLayout>
        </Group>

        <Div>
            <Button disabled={status === "error"} onClick={() => postUser()} size="xl">Загрузить информацию</Button>
        </Div>
    </Panel>
};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.object
};

export default Info;
