import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../pages/error-page";
// import { Detail } from "../pages/detail/index";
import PetList from "../pages/default/index";
// import MineDetail from "../pages/mine/index";
import AddressDetail from "../pages/address";
import CommitmentDetail from "../pages/commitment";
import BlockDetail from "../pages/blocks/detail"

import Blocks from "../pages/blocks";
import Transactions from "../pages/transactions";
import TransactionsDetail from "../pages/transactions/detail";
import Transitions from "../pages/transitions";
import TransitionsDetail from "../pages/transitions/detail";
import Favorites from "../pages/favorites";
import Provers from "../pages/provers";

import Validators from "../pages/validators";
import ProgramsTable from "../pages/programs";
import ProgramsDetail from "../pages/programs/detail";
import ProgramsDeploy from "../pages/programs/deploy";

// import Compete from "../pages/competition";

import React from "react";

export const BaseRouter = createBrowserRouter([
  {
    path: "/",
    element: <PetList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "blocks",
    element: <Blocks />,
    errorElement: <ErrorPage />,
   },{
    path: "block/:blockId",
    element:<BlockDetail/>
  },{
    path: "transactions",
    element: <Transactions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "transactions/:transactionID",
    element: <TransactionsDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "transitions",
    element: <Transitions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "transitions/:transitionsID",
    element: <TransitionsDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "validators",
    element: <Validators />,
    errorElement: <ErrorPage />,
  },{
    path: "programs",
    element: <ProgramsTable />,
    errorElement: <ErrorPage />,
  },{
    path: "programs/:programID",
    element: <ProgramsDetail />,
    errorElement: <ErrorPage />,
  },{
    path: "programs/deploy",
    element: <ProgramsDeploy/>,
    errorElement: <ErrorPage />,
  },{
    path: "provers",
    element: <Provers />,
    errorElement: <ErrorPage />,
  },{
    path: "favorites",
    element: <Favorites />,
    errorElement: <ErrorPage />,
  },{
    path: "address/:addressId",
    element:<AddressDetail/>
  },{
    path: "commitment/:commitmentId",
    element:<CommitmentDetail/>
  }
]);
