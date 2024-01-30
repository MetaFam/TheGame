import { Container, Heading, Image } from '@metafam/ds';
import DecentralizedFactoryImg from 'assets/decentralized-factory_1100x1079.webp';


export const DecentralizedFactory: React.FC = () => (
  <Container
    as="section"
    className="mg-guild-join-section" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
  >
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
      src={DecentralizedFactoryImg.src}
      alt="Diagram of the decentralized factory concept"
      mx="auto"
    />
  </Container>
);
