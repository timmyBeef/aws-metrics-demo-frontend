import { environment } from './../environments/environment';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
  show?: boolean;
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  show?: boolean;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/metrics/query',
    title: 'Metrics Demo',
    type: 'link',
    icontype: 'business_bank',
    show: true
  }
];
