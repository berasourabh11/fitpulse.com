import activitiesModel from '../models/activitiesModel';

export default async function getActivityDetails(activityName: string) {
  try {
    const activity = await activitiesModel.findOne({ activityName: activityName }).exec();
    return activity;
  } catch (error) {
    console.error('Error retrieving activity details:', error);
    throw error;
  }
}
