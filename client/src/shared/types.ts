export enum SelectedPage {
    Home = "home",
    Benefits= "benefits",
    OurClasses = "ourclasses",
    ContactUs= "contactus",
    Store= "store",
  }

  export type BenefitType = {
    icon: JSX.Element,
    title: string,
    description: string
  }

  export type Activity = {
    activityId: number;
    activityName: string;
    imageurl: string;
  };

  export type userDetails = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
  }

  export type BookedActivity = {
    _id: string;
    activityName: string;
    activityId: number;
    activityDate: string;
    activityTime: string;
    activityDay: string;
    sessionUsers: string[];
  };
  