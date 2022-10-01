import { Container, Heading, Image } from '@metafam/ds';
import DecentralizedFactoryImg from 'assets/decentralized-factory_1105x1098.png';

export const DecentralizedFactory: React.FC = () => (
  <Container as="section" className="mg-section">
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      A Decentralized Factory
    </Heading>

    <Image
      src={DecentralizedFactoryImg}
      alt="Diagram of the decentralized factory concept"
      mx="auto"
    />
  </Container>
);
