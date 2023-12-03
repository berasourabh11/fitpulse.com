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