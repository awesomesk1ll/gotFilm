import { Form, Input, Button, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom';
import "./LoginPage.scss"

const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="loginForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className="loginForm__title">Вход</h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите имя или ник!',
          },
        ]}
      >
        <Input placeholder="Ваше имя" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ]}
      >
        <Input.Password
          type="password"
          placeholder="Ваш пароль"
        />
      </Form.Item>
      
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <NavLink className="loginForm__forgot" to="/recovery_password">
          Забыли пароль?
        </NavLink>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="loginForm__button">
          Войти
        </Button>
        или <NavLink to="/registration">Зарегистрироваться</NavLink>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;

// import React from "react";
// import { Field, reduxForm } from "redux-form";
// import { СustomInput } from "../../components/common/FormsControls";
// import { maxLengthCreator, required } from "../../utils/validators";
// import "./LoginPage.scss"

// const LoginPage = (props) => {

//   //здесь логинимся, пока заглушка
//   const onSubmit = (formData) => {
//     console.log(formData);
//   };

//   return <LoginReduxForm onSubmit={onSubmit} />;
// };

// const maxLength10 = maxLengthCreator(10);

// const LoginForm = (props) => {
//   return (
//     <form onSubmit={props.handleSubmit} className="loginForm">
//       <p className="loginForm__title">Вход</p>
//       <div>
//         <Field
//           type="email"
//           placeholder="Ваша почта"
//           name="email"
//           component={СustomInput}
//           validate={[required]}
//         />
//       </div>
//       <div>
//         <Field
//           type="password"
//           placeholder="Ваш пароль"
//           name="password"
//           component={СustomInput}
//           validate={[required, maxLength10]}
//         />
//       </div>
//       <div>
//         <Field
//           type="checkbox"
//           name="remember"
//           component={СustomInput}
//         />
//         <span>Запомнить меня</span>
//       </div>
//       <div>
//         <button>Войти</button>
//       </div>
//     </form>
//   );
// };

// const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

// export default LoginPage;
