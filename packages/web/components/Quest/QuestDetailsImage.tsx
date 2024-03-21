import { AspectRatio, Image } from '@metafam/ds';

type Props = {
  src: string;
};

export const QuestDetailsImage: React.FC<Props> = ({ src }) => (
  <AspectRatio
    ratio={{
      base: 1 / 1,
      md: 4 / 3,
    }}
  >
    <Image src={src} alt="" borderRadius={10} fit="cover" />
  </AspectRatio>
);
