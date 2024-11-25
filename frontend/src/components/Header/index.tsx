import HeaderStyled from "./HeaderStyled";

type HeaderProps = {
	readonly title: string;
};

const Header = ({ title }: HeaderProps) => {
	return <HeaderStyled>{title}</HeaderStyled>;
};

export default Header;
