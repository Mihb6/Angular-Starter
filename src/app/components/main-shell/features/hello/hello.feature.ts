import { Feature } from "@wolkabout/commons";
import { APP_NAME } from "../../../../common/service/config.service";

export const ROUTE_HELLO = 'hello';

export const FEATURE_HELLO: Feature = {
  app: APP_NAME,
  name: "HELLO.FEATURE_NAME",
  icon: { id: 'feature_hello' },
  iconPath: 'assets/icons/two-way-settings.svg',
  entryRoute: ROUTE_HELLO,
  primaryColor: '#e2c630',
  translations: ['hello'],
};

export default FEATURE_HELLO;
