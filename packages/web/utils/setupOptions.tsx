
export type SetupStep = {
  label: string;
  slug?: string;
  sectionIndex: number;
}

export type SetupSection = {
  label: string;
  title: {
    [any: string]: string | undefined;
  };
};

export class SetupOptions {
  sections: SetupSection[] = [
    {
      label: 'About You',
      title: { base: 'About You', sm: '1. About You' }
    }, {
      label: 'Profile',
      title: {
        base: 'Profile',
        sm: '2. Profile',
        lg: '2. Professional Profile',
      }
    }, {
      label: 'Start Playing',
      title: {
        base: 'Play',
        sm: '3. Play',
        md: '3. Start Playing',
      },
    }
  ];

  steps: SetupStep[] = [
    {
      label: 'Username',
      slug: 'username',
      sectionIndex: 0
    }, {
      label: 'Personality Type',
      slug: 'personalityType',
      sectionIndex: 0
    }, {
      label: 'Player Type',
      slug: 'playerType',
      sectionIndex: 0
    }, {
      label: 'Skills',
      slug: 'skills',
      sectionIndex: 1
    }, {
      label: 'Availability',
      slug: 'availability',
      sectionIndex: 1
    }, {
      label: 'Time Zone',
      slug: 'timeZone',
      sectionIndex: 1
    }, {
      label: 'Memberships',
      slug: 'memberships',
      sectionIndex: 1
    }, {
      label: 'Start Playing',
      slug: 'complete',
      sectionIndex: 2
    }
  ]

  stepIndexMatchingSlug(slug: string | null): number {
    return this.steps.findIndex(step => step.slug === slug);
  };

  get numSteps(): number {
    return this.steps.length;
  }

  isLastStep(stepIndex: number): boolean {
    return stepIndex >= this.numSteps - 1;
  }

  isFinalStepOfSection(stepIndex: number): boolean {
    if (this.isLastStep(stepIndex)) return true;
    return this.steps[stepIndex].sectionIndex !== this.steps[stepIndex + 1].sectionIndex;
  }

  progressWithinSection(stepIndex: number): number {
    const stepSectionIndex = this.steps[stepIndex].sectionIndex;
    let stepsCompletedInSection = 0;
    const stepsInSection = this.steps.reduce((count:number, step:SetupStep, index:number) => {
      if (stepIndex === index) {
        stepsCompletedInSection = count;
      }
      if (step.sectionIndex === stepSectionIndex) {
        return count + 1;
      }
      return count;
    }, 0);
    return Math.floor((stepsCompletedInSection + 1) * 100.0) / stepsInSection;
  }
}
