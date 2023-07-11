import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import Login from '@/pages/login'
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Fragment } from "react";

export const App = () => (
  <Fragment>
    <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth loginPage={Login}>
      <Resource
        name="posts"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="comments"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  </Fragment>
);
