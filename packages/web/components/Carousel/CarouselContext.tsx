import { createContext, useContext } from 'react';

type CarouselContextType = {
  trackIsActive: boolean;
  setTrackIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: number;
  setActiveItem: React.Dispatch<React.SetStateAction<number>>;

  isDragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;

  isSubmittingProof: boolean;
  setIsSubmittingProof: React.Dispatch<React.SetStateAction<boolean>>;

  positions: number[];
  itemWidth: number;
  constraint: number;
  gap: number;

  sliderWidth: number;
  setSliderWidth: React.Dispatch<React.SetStateAction<number>>;

  multiplier: number;

  hidePositions: boolean;
  hideNav: boolean;
  itemsToShow: number;
  defaultCarousel: boolean;
};

export const CarouselContext = createContext<CarouselContextType>({
  trackIsActive: false,
  setTrackIsActive: () => undefined,
  activeItem: 0,
  setActiveItem: () => undefined,
  isSubmittingProof: false,
  setIsSubmittingProof: () => undefined,
  isDragging: false,
  setDragging: () => undefined,
  sliderWidth: 0,
  setSliderWidth: () => undefined,
  constraint: 0,
  multiplier: 0.35,
  itemWidth: 0,
  positions: [],
  gap: 0,
  hidePositions: false,
  hideNav: true,
  itemsToShow: 4,
  defaultCarousel: true,
});

export const useCarouselContext = () => useContext(CarouselContext);
