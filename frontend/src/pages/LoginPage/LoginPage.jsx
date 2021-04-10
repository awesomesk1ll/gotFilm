import { Form, Input, Button, Checkbox } from 'antd';
import Title from 'antd/lib/typography/Title';
import { NavLink } from 'react-router-dom';
import "./LoginPage.scss"

const LoginForm = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="login-form"
      className="loginForm"
      initialValues={ {
        remember: true,
      } }
      onFinish={ onFinish }
    >
      <Title className="loginForm__title" level={2}>Вход</Title>
      <Form.Item
        name="username"
        rules={ [
          {
            required: true,
            message: 'Пожалуйста введите имя или ник!',
          },
        ] }
      >
        <Input placeholder="Ваше имя" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={ [
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ] }
      >
        <Input.Password
          type="password"
          placeholder="Ваш пароль"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" noStyle valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <NavLink className="loginForm__forgot" to="/recovery_password">
          Забыли пароль?
        </NavLink>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="loginForm__button">
          войти
        </Button>
        или <NavLink className="loginForm__linkToRegistration" to="/registration">Зарегистрироваться</NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
