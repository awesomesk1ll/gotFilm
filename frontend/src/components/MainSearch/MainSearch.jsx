import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);

const MainSearch = (props) => {
    return(
        <Space direction="vertical" style={{margin: "36px"}}>
          <Search placeholder="Find your film" onSearch={onSearch} size="large" enterButton />
        </Space>
      );
}

export default MainSearch;