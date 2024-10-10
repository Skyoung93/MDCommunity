import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { GetJourneysSerivice } from 'services/journeys/getJourneysService';
import { UpdateJourneyService } from 'services/journeys/updateJourneyService';
import { Journey, JourneyByID } from 'types/journey';

import StatusCode from 'types/statusCodes';

type JourneyContextType = {
  journeyDict: JourneyByID;
  fetchAllJourneys: () => Promise<StatusCode>;
  upsertJourney: (journey: Journey) => void;
  deleteJourney: (journeyID: number) => void;
  togglePlanStatus: (journeyID: number) => Promise<StatusCode>;
  toggleTrackStatus: (journeyID: number) => Promise<StatusCode>;
  toggleReassessStatus: (journeyID: number) => Promise<StatusCode>;
  toggleCompleteStatus: (journeyID: number) => Promise<StatusCode>;
};

const JourneyContext = createContext<JourneyContextType>({
  journeyDict: {},
  fetchAllJourneys: () => undefined,
  upsertJourney: (journey: Journey) => undefined,
  deleteJourney: (journeyID: number) => undefined,
  togglePlanStatus: (journeyID: number) => undefined,
  toggleTrackStatus: (journeyID: number) => undefined,
  toggleReassessStatus: (journeyID: number) => undefined,
  toggleCompleteStatus: (journeyID: number) => undefined,
});

export const JourneyDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [journeyDict, setJourneyDict] = useState<JourneyByID>({});

  //! Layer 0
  // Create & Update
  const upsertJourney = (journey: Journey): void => {
    setJourneyDict((prev) => {
      const copy = { ...prev };
      copy[journey.id] = journey;
      return copy;
    });
  };
  // Delete
  const deleteJourney = (journeyID: number): void => {
    setJourneyDict((prev) => {
      const copy = { ...prev };
      delete copy[journeyID];
      return copy;
    });
  };

  //! Layer 1

  const fetchAllJourneys = async (): Promise<StatusCode> => {
    const response = await GetJourneysSerivice();
    if (response !== StatusCode.FAIL) {
      response.forEach((res) => upsertJourney(res));
      return StatusCode.SUCCESS;
    } else {
      return StatusCode.FAIL;
    }
  };

  const togglePlanStatus = useCallback(
    async (journeyID: number): Promise<StatusCode> => {
      const journey = journeyDict[journeyID];
      const plan = !journey.plan;
      const updatedJourney = {
        ...journey,
        plan,
        // Clearing next steps if toggling to false
        track: plan ? journey.track : false,
        reassess: plan && journey.track ? journey.reassess : false,
      };
      const response = await UpdateJourneyService({ updatedJourney });
      if (response !== StatusCode.FAIL) {
        upsertJourney(updatedJourney);
        return StatusCode.SUCCESS;
      } else {
        return StatusCode.FAIL;
      }
    },
    [journeyDict]
  );

  const toggleTrackStatus = useCallback(
    async (journeyID: number): Promise<StatusCode> => {
      const journey = journeyDict[journeyID];
      // Prev Step Check
      if (!journey.plan) {
        return StatusCode.FAIL;
      }
      const track = !journey.track;
      const updatedJourney = {
        ...journey,
        track,
        // Clearing next steps if toggling to false
        reassess: track ? journey.reassess : false,
      };
      const response = await UpdateJourneyService({ updatedJourney });
      if (response !== StatusCode.FAIL) {
        upsertJourney(updatedJourney);
        return StatusCode.SUCCESS;
      } else {
        return StatusCode.FAIL;
      }
    },
    [journeyDict]
  );

  const toggleReassessStatus = useCallback(
    async (journeyID: number): Promise<StatusCode> => {
      const journey = journeyDict[journeyID];
      // Prev Step Check
      if (!journey.track) {
        return;
      }
      const updatedJourney = {
        ...journey,
        reassess: !journey.reassess,
      };

      const response = await UpdateJourneyService({ updatedJourney });
      if (response !== StatusCode.FAIL) {
        upsertJourney(updatedJourney);
        return StatusCode.SUCCESS;
      } else {
        return StatusCode.FAIL;
      }
    },
    [journeyDict]
  );

  const toggleCompleteStatus = useCallback(
    async (journeyID: number): Promise<StatusCode> => {
      const journey = journeyDict[journeyID];
      const updatedJourney = {
        ...journey,
        isComplete: !journey.isComplete,
        endDate: journey.isComplete ? null : new Date().toISOString(),
      };
      const response = await UpdateJourneyService({ updatedJourney });
      if (response !== StatusCode.FAIL) {
        upsertJourney(updatedJourney);
        return StatusCode.SUCCESS;
      } else {
        return StatusCode.FAIL;
      }
    },
    [journeyDict]
  );

  const value: JourneyContextType = useMemo(
    () => ({
      journeyDict,
      fetchAllJourneys,
      upsertJourney,
      deleteJourney,
      togglePlanStatus,
      toggleTrackStatus,
      toggleReassessStatus,
      toggleCompleteStatus,
    }),
    [
      journeyDict,
      fetchAllJourneys,
      upsertJourney,
      deleteJourney,
      togglePlanStatus,
      toggleTrackStatus,
      toggleReassessStatus,
      toggleCompleteStatus,
    ]
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
};

export function useJourneyContext(): JourneyContextType {
  return useContext(JourneyContext);
}
