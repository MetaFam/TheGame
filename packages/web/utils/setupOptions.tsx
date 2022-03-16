import { Maybe } from '@metafam/utils';
import { ReactElement } from 'react';

export type SetupStep = {
  label: string;
  slug?: string;
  sectionIndex: number;
};

export type SetupSection = {
  label: string;
  title: {
    [any: string]: string | undefined | ReactElement;
  };
};

export class SetupOptions {
  sections: SetupSection[] = [
    {
      label: 'About You',
      title: { base: 'About', sm: '1. About You' },
    },
    {
      label: 'Professional Profile',
      title: {
        base: 'Pro',
        sm: <>2. Pro&shy;fess&shy;ional</>,
        lg: <>2. Pro&shy;fess&shy;ional Profile</>,
      },
    },
    {
      label: 'Player Profile',
      title: {
        base: 'Player',
        sm: '3. Player',
        lg: '3. Player Profile',
      },
    },
  ];

  steps: SetupStep[] = [
    {
      label: 'Name',
      slug: 'name',
      sectionIndex: 0,
    },
    {
      label: 'Personality Type',
      slug: 'colorDisposition',
      sectionIndex: 0,
    },
    {
      label: 'Time Zone',
      slug: 'timeZone',
      sectionIndex: 0,
    },
    {
      label: 'Skills',
      slug: 'skills',
      sectionIndex: 1,
    },
    {
      label: 'Availability',
      slug: 'availability',
      sectionIndex: 1,
    },
    {
      label: 'Roles',
      slug: 'roles',
      sectionIndex: 2,
    },
    {
      label: 'Memberships',
      slug: 'memberships',
      sectionIndex: 2,
    },
    {
      label: 'Start Playing',
      slug: 'complete',
      sectionIndex: 3,
    },
  ];

  stepIndexMatchingSlug(slug: Maybe<string>): number {
    return this.steps.findIndex((step) => step.slug === slug);
  }

  get numSteps(): number {
    return this.steps.length;
  }

  isLastStep(stepIndex: number): boolean {
    return stepIndex >= this.numSteps - 1;
  }

  isFinalStepOfSection(stepIndex: number): boolean {
    if (this.isLastStep(stepIndex)) return true;
    return (
      this.steps[stepIndex].sectionIndex !==
      this.steps[stepIndex + 1].sectionIndex
    );
  }

  progressWithinSection(stepIndex: number): number {
    const stepSectionIndex = this.steps[stepIndex].sectionIndex;
    let stepsCompletedInSection = 0;
    const stepsInSection = this.steps.reduce(
      (count: number, step: SetupStep, index: number) => {
        if (stepIndex === index) {
          stepsCompletedInSection = count;
        }
        if (step.sectionIndex === stepSectionIndex) {
          return count + 1;
        }
        return count;
      },
      0,
    );
    return Math.floor(stepsCompletedInSection * 100.0) / stepsInSection;
  }
}
