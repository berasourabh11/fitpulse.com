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