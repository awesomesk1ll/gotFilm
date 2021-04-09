import { Form, Input, Button, Checkbox } from "antd";
import Title from "antd/lib/typography/Title";
import { NavLink } from "react-router-dom";
import "./RegistrationPage.scss";

const RegistrationPage = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="registration-form"
      className="regForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Title className="regForm__title" level={2}>Регистрация</Title>
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
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Введённый почтвой адрес не корректен",
          },
          {
            required: true,
            message: "Пожалуйста введите свою почту",
          },
        ]}
      >
        <Input placeholder="Ваша почта" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Ваш пароль" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста подтвердите введённый пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Введённые пароли несовпадают!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Подтвердите свой пароль" />
      </Form.Item>

      <Form.Item
        name="agreement"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Для регистрации примите соглашение")),
          },
        ]}
      >
        <Checkbox>
          Я прочитал(а) <NavLink className="regForm__agreement" to="/agreement">соглашение</NavLink>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="regForm__button">
          Зарегистрироваться
        </Button>
      </Form.Item>

      <NavLink className="regForm__linkToLogin" to="/login">Уже есть аккаунт</NavLink>
    </Form>
  );
};

export default RegistrationPage;
