export interface RouterPropsIF {
    loggedIn: boolean;
    component: any;
    exact: boolean;
    path: string;
    redirect: boolean;
    redirectCondition: boolean;
    redirectPath: string;
  }