import { Form, Input, Button, Checkbox } from "antd";
import Title from "antd/lib/typography/Title";
import { NavLink } from "react-router-dom";
import "./RegistrationPage.scss";

const RegistrationPage = (props) => {
  const onFinish = (values) => {
    alert(
      "Юзернейм, email, пароль, подтверждение пароля, статус чекбокса выведены в консоль."
    );
    console.log("Received values of form: ", values);
  };

  return (
    <div className="formWrapper theme">
      <Form
        name="registration-form"
        className="regForm theme"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title className="regForm__title" level={2}>
          Регистрация
        </Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста введите имя или ник!",
            },
          ]}
        >
          <label className="theme">
            Имя пользователя
            <Input placeholder="Ваше имя" />
          </label>
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
          <label className="theme">
            E-mail
            <Input placeholder="Ваша почта" />
          </label>
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
          <label className="theme">
            Пароль
            <Input.Password placeholder="Ваш пароль" />
          </label>
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

                return Promise.reject(
                  new Error("Введённые пароли несовпадают!")
                );
              },
            }),
          ]}
        >
          <label className="theme">
            Подтверждение пароля
            <Input.Password placeholder="Подтвердите свой пароль" />
          </label>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Для регистрации примите соглашение")
                    ),
            },
          ]}
        >
          <Checkbox className="theme">
            Я прочитал(а){" "}
            <NavLink className="regForm__agreement" to="/agreement">
              соглашение
            </NavLink>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="regForm__button">
            Зарегистрироваться
          </Button>
        </Form.Item>

        <div className="regForm--switcher theme">
          или{" "}
          <NavLink className="regForm__linkToLogin" to="/login">
            уже есть аккаунт
          </NavLink>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationPage;
