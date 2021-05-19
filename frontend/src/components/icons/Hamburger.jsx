import Icon from '@ant-design/icons';

const HamburgerSvg = () => (
    <svg viewBox="0 -8 100 80" width="32" height="32">
        <rect width="100" height="20"></rect>
        <rect y="30" width="100" height="20"></rect>
        <rect y="60" width="100" height="20"></rect>
    </svg>
);

const Hamburger = props => <Icon component={ HamburgerSvg } { ...props } />;

export default Hamburger;