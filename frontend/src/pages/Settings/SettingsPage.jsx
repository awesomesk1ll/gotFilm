import React, {useState} from 'react';
import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import FooterBar from "../../components/FooterBar/FooterBar";
import "./SettingsPage.scss";
import { Slider, Switch, Select, Tag } from 'antd';

const SettingsPage = () => {
  const [leftNumberRat, setLeftNumberRat] = useState(2);
  const [rightNumberRat, setRightNumberRat] = useState(10);
  const [leftNumberYear, setLeftNumberYear] = useState(1900);
  const [rightNumberYear, setRightNumberYear] = useState(2021);
  const genres = [{ value: 'боевик' }, { value: 'комедия' }, { value: 'драма' }, { value: 'мюзикл' }];
  const countries = [{ value: 'Россия' }, { value: 'США' }, { value: 'Франция' }, { value: 'Германия' }];

  return (
    <section>
      <Header title="Настройки" />
      <div className="div-filter">
        <button className="reg-button">ВХОД / РЕГИСТРАЦИЯ"</button>
        <h2 className="h2-fil">
          Темная верия оформенлия
          <Switch defaultChecked size='small' className='switch-style' />
        </h2>
        <h2 className="h2-fil-2">Настройки поиска</h2>
        <div className='div-range-slider'>
          <span className='range-slider-title'>Рейтинг: <br/>{leftNumberRat} - {rightNumberRat}</span>
          <Slider
            range
            min={0}
            max={10}
            defaultValue={[2, 10]}
            onChange={(value) => {
              setLeftNumberRat(value[0]);
              setRightNumberRat(value[1]);
            }
            }
            trackStyle={[{
              backgroundColor: '#d89437',
            },{
              backgroundColor: '#d89437',
            }]}
            handleStyle={[{
              borderColor: '#d89437',
              backgroundColor: '#d89437',
            },
            {
              borderColor: '#d89437',
              backgroundColor: '#d89437',
            }
            ]}
            className='range-slider-filter'
          />
        </div>
        <div className='div-range-slider'>
          <span className='range-slider-title'>Годы: <br/>{leftNumberYear} - {rightNumberYear}</span>
          <Slider
            range
            min={1900}
            max={2021}
            defaultValue={[1950, 2021]}
            onChange={(value) => {
              setLeftNumberYear(value[0]);
              setRightNumberYear(value[1]);
            }}
            trackStyle={[{
              backgroundColor: '#d89437',
            },{
              backgroundColor: '#d89437',
            }]}
            handleStyle={[{
              borderColor: '#d89437',
              backgroundColor: '#d89437',
            },
            {
              borderColor: '#d89437',
              backgroundColor: '#d89437',
            }
            ]}
            className='range-slider-filter'
          />
        </div>
        <div className='div-selector'>
          <span className='range-slider-title'>Жанры</span>
          <Select
            mode="multiple"
            showArrow
            options={genres}
            className='range-slider-filter'
          />
        </div>
        <div className='div-selector'>
          <span className='range-slider-title'>Страны</span>
          <Select
            mode="multiple"
            showArrow
            options={countries}
            className='range-slider-filter'
          />
        </div>
        <button className="delete-button">СБРОСИТЬ НАСТРОЙКИ</button>
      </div>
      <FooterBar />
    </section>
  );
};

export default SettingsPage;
// <span className="h2-fil-switch">
//   <span className="h2-fil-slider-point"></span>
// </span>

// <Filter settingName="Рейтинг"/>
