import { dataCollect } from '@src/screens/myCommitment/services';
import AppleHealthKit from 'rn-apple-healthkit';

const PREMISSION_READ = {
  RUNNING: 'DistanceWalkingRunning',
  BIKING: 'DistanceCycling',
  BURN_CALORIES: 'ActiveEnergyBurned',
  STEP_COUNT: 'StepCount',
};

const PREMISSION_WRITE = [];

const checkAvailableHeathkit = () => {
  try {
    return new Promise((resolve, reject) => {
      AppleHealthKit.isAvailable((err: object, available: boolean) => (err ? reject(err) : resolve(available)));
    });
  } catch (error) {
    throw error;
  }
};

const setPremission = (read?: string[], write?: string[]) => {
  try {
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit({permissions: {read, write}}, (err: string, results: object) =>
        err ? reject(err) : resolve(results),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getDailyStepCount = (startDate: Date, endDate: Date = new Date()): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      (AppleHealthKit as any).getDailyStepCountSamples(
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        (err: string, results: object[]) => (err ? reject(err) : resolve(results)),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getStepCount = (date: Date) => {
  try {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getStepCount(
        {
          date: date.toISOString(),
        },
        (err: string, results: object) => (err ? reject(err) : resolve(results)),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getDailyDistanceWalkingRunning = (startDate: Date, endDate: Date = new Date()): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      (AppleHealthKit as any).getDailyDistanceWalkingRunningSamples(
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          ascending: true,
          unit: 'mile',
        },
        (err: string, results: object[]) => (err ? reject(err) : resolve(results)),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getDistanceWalkingRunning = (date: Date, unit: string = 'mile') => {
  try {
    return new Promise((resolve, reject) => {
      (AppleHealthKit as any).getDistanceWalkingRunning(
        {unit, date: date.toISOString()},
        (err: object, results: object) => (err ? reject(err) : resolve(results)),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getDailyDistanceCycling = (startDate: Date, endDate: Date = new Date()): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      (AppleHealthKit as any).getDailyDistanceCyclingSamples(
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          ascending: true,
        },
        (err: object, results: object) => (err ? reject(err) : resolve(results)),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getDistanceCycling = (date: Date, endDate: Date = new Date(), unit: string = 'mile') => {
  try {
    return new Promise((resolve, reject) => {
      (AppleHealthKit as any).getDistanceCycling({unit, date: date.toISOString()}, (err: object, results: object) =>
        err
          ? resolve({
              startDate: date.toISOString(),
              endDate: endDate.toISOString(),
              value: 0,
            })
          : resolve(results),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getActiveEnergyBurned = (startDate: Date, endDate: Date = new Date()): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      (AppleHealthKit as any).getActiveEnergyBurned(
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        (err: object, results: object) => (err ? reject(err) : resolve(results)),
      );
    });
  } catch (error) {
    throw error;
  }
};

const getDataHealth = async (timeStart: {goal_id: number; created_at: string}[]) => {
  if (timeStart.length > 0) {
    const readPremission = [];
    let dataBurnCalories = [];
    const dataRunning = [];
    let dataBiking = [];
    let dataStep = [];
    const burnCalories = timeStart.find((item: any) => item.goal_id === 1);
    const running = timeStart.find((item: any) => item.goal_id === 2);
    const biking = timeStart.find((item: any) => item.goal_id === 3);
    const stepCount = timeStart.find((item: any) => item.goal_id === 4);
    if (burnCalories) readPremission.push(PREMISSION_READ.BURN_CALORIES);
    if (running) readPremission.push(PREMISSION_READ.RUNNING);
    if (biking) readPremission.push(PREMISSION_READ.BIKING);
    if (stepCount) readPremission.push(PREMISSION_READ.STEP_COUNT);
    await setPremission(readPremission);
    if (burnCalories) {
      dataBurnCalories = await getActiveEnergyBurned(new Date(burnCalories.created_at));
      if (dataBurnCalories.length > 0) {
        await dataCollect(1, JSON.stringify(dataBurnCalories), null);
      }
    }
    // if (running) {
    //   dataRunning = await getDailyDistanceWalkingRunning(new Date(running.created_at));
    //   if (dataRunning.length > 0) {
    //     await dataCollect(2, JSON.stringify(dataRunning), null);
    //   }
    // }
    if (biking) {
      dataBiking = await getDailyDistanceCycling(new Date(biking.created_at));
      if (dataBiking.length > 0) {
        await dataCollect(3, JSON.stringify(dataBiking), null);
      }
    }
    if (stepCount) {
      dataStep = await getDailyStepCount(new Date(stepCount.created_at));

      // const dataStep2 = await getDailyStepCount(new Date("2020-05-16T16:00:33.000+0700"));
      if (dataStep.length > 0) {
        await dataCollect(4, JSON.stringify(dataStep), null);
      }
    }

    return {
      dataBurnCalories,
      dataRunning,
      dataBiking,
      dataStep,
    };
  }
};

export default {
  PREMISSION_READ,
  PREMISSION_WRITE,
  checkAvailableHeathkit,
  setPremission,
  getDailyStepCount,
  getStepCount,
  getDailyDistanceWalkingRunning,
  getDistanceWalkingRunning,
  getDailyDistanceCycling,
  getDistanceCycling,
  getActiveEnergyBurned,
  getDataHealth,
};
