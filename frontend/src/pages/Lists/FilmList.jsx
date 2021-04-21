import React from 'react';
import { List, Typography } from 'antd';


import ListItem from '../../components/ListItem/ListItem';

const { Title } = Typography;


const FilmList = (props) => {
    return (
        <List
            className="lists__container"
            size="large"
            header={ <div className="lists__header theme">
                <Title className="lists__header--title" level={ 2 }>{ props.name }</Title> </div> }
            bordered
            dataSource={ props.source }
            renderItem={ item => (
                <List.Item >
                    <ListItem
                        key={ `item-${item.id}` }
                        name={ item.name }
                        secondName={ item.secondName }
                        year={ item.year }
                        genre={ item.genres }
                        age={ item.age }
                        rate={ item.rate }
                    />
                </List.Item>
            ) }
        />
    )
}

export default FilmList;