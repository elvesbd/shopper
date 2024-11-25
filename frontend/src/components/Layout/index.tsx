import Footer from "../Footer";
import Header from "../Header";
import { Wrapper, Content } from "./LayoutStyled";

type LayoutProps = {
	readonly children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<Wrapper>
			<Header title="Drive & Vibes" />
			<Content>{children}</Content>
			<Footer />
		</Wrapper>
	);
}
