// src/components/Driver/Driver.tsx
import useConfirm from "../../useConfirm";
import {
	ContentContainer,
	DriversCarousel,
	DriverCardWrapper,
	DriverCard,
	DriverInfo,
	DriverNameRating,
	DriverName,
	DriverRating,
	DriverPrice,
	DriverDescription,
	DriverSelection,
	ChooseButton,
} from "./DriverStyled";

function Driver() {
	const { handleRequest, drivers } = useConfirm();

	return (
		<ContentContainer>
			<DriversCarousel>
				{drivers.map((driver) => (
					<DriverCardWrapper key={driver.vehicle}>
						<DriverCard>
							<DriverInfo>
								<DriverNameRating>
									<DriverName>{driver.name}</DriverName>
									<DriverRating>{driver.review.rating} ⭐</DriverRating>
								</DriverNameRating>
								<DriverPrice>{driver.value}</DriverPrice>
							</DriverInfo>

							<DriverDescription>{driver.description}</DriverDescription>

							<DriverSelection>
								<p>{driver.vehicle}</p>
								<ChooseButton
									onClick={() =>
										handleRequest(String(driver.value), {
											id: driver.id,
											name: driver.name,
										})
									}
								>
									Escolher
								</ChooseButton>
							</DriverSelection>
						</DriverCard>
					</DriverCardWrapper>
				))}
			</DriversCarousel>
		</ContentContainer>
	);
}

export default Driver;
