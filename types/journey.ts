export type Journey = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  startDate: string;
  endDate: string | null;
  plan: boolean;
  track: boolean;
  reassess: boolean;
};

export type JourneyByID = {
  [journeyID: number]: Journey;
};

export const JourneyByIDConstructor = (input: Journey[]): JourneyByID => {
  return input.reduce((acc: JourneyByID, journey: Journey) => {
    acc[journey.id] = journey;
    return acc;
  }, {});
};
