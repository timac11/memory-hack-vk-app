import React from 'react';
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

const Info = ({id, go, fetchedUser}) => (
    <Panel id={id}>
        <PanelHeader>Информация о ветеране</PanelHeader>
        {/*{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}*/}

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
                    <Input type="text" placeholder="Фамилия"/>
                    <Input type="text" placeholder="Имя"/>
                    <Input type="text" placeholder="Отчество"/>
                </FormLayoutGroup>
                <FormLayoutGroup top="Служба">
                    <Select placeholder="Воинская часть">
                        <option value="m">Часть 1</option>
                        <option value="f">Часть 2</option>
                    </Select>
                    <Input type="date" placeholder="Дата поступления на службу"/>
                </FormLayoutGroup>
            </FormLayout>
        </Group>

        <Div>
            <Button onClick={() => go("result")} size="xl">Загрузить информацию</Button>
        </Div>
    </Panel>
);

Info.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Info;
