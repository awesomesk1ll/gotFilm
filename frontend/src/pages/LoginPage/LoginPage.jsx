import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import Title from 'antd/lib/typography/Title'
import { Link } from 'react-router-dom'

import './LoginPage.scss'
import CustomLink from '../../components/CustomLink'

const LoginForm = (props) => {
  const onFinish = (values) => {
    alert('Логин, пароль, статус чекбокса выведены в консоль.')
    console.log('Received values of form: ', values)
  }

  return (
    <div className='formWrapper theme'>
      <Form
        name='login-form'
        className='loginForm theme'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title className='loginForm__title' level={2}>
          Вход
        </Title>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите имя или ник!',
            },
          ]}
        >
          <label className='theme'>
            Имя пользователя
            <Input placeholder='Ваше имя' />
          </label>
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль!',
            },
          ]}
        >
          <label className='theme'>
            Пароль
            <Input.Password type='password' placeholder='Ваш пароль' />
          </label>
        </Form.Item>

        <Form.Item>
          <Form.Item name='remember' noStyle valuePropName='checked'>
            <Checkbox className='theme'>Запомнить меня</Checkbox>
          </Form.Item>

          <Link className='loginForm__forgot' to='/recovery_password'>
            Забыли пароль?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='loginForm__button'>
            войти
          </Button>
          <div className='loginForm--switcher theme'>
            или{' '}
            <Link className='loginForm__linkToRegistration' to='/registration'>
              зарегистрировать аккаунт
            </Link>
          </div>
        </Form.Item>
      </Form>
      <CustomLink
        className='linkToSettings loginForm__button'
        to='/settings'
        tag={Button}
      >
        Назад к настройкам
      </CustomLink>
    </div>
  )
}

export default LoginForm
