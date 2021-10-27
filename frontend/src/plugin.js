import React from "react";
import ReactDOM from "react-dom";
import EkycContractView from "./views/EkycContractView";
import EkycDetailView from "./views/EkycDetailView";
import Navigation from "./components/Navigation";
import TestAPI from "./views/TestAPI";
import './static/App.css'
import "antd/dist/antd.css";

let container = null;

const navigation = {
  id: "navigation-plugin",
  pluginPoint: "cockpit.navigation",
  render: (node, { api }) => {
    container = node;
    ReactDOM.render(<Navigation />, container);
  },
  unmount: () => {
    ReactDOM.unmountComponentAtNode(container);
  },

  // make sure we have a higher priority than the default plugin
  priority: 12,
};

const searchPlugin = {
  id: "search-plugin",
  pluginPoint: "cockpit.route",
  properties: {
    path: "/contract-search",
  },
  render: (node, { api }) => {
    container = node;
    ReactDOM.render(
      <EkycContractView camundaAPI={api} />,
      //<App camundaAPI={ api } />,
      container
    );
  },
  unmount: () => {
    ReactDOM.unmountComponentAtNode(container);
  },

  // make sure we have a higher priority than the default plugin
  priority: 12,
};

const detailPlugin = {
  id: "detail-plugin",
  pluginPoint: "cockpit.route",
  properties: {
    path: "/contract-detail",
  },
  render: (node, { api }) => {
    container = node;
    ReactDOM.render(<EkycDetailView camundaAPI={api} />, container);
  },
  unmount: () => {
    ReactDOM.unmountComponentAtNode(container);
  },

  // make sure we have a higher priority than the default plugin
  priority: 12,
};

const testApiPlugin = {
  id: "test-api-plugin",
  pluginPoint: "cockpit.route",
  properties: {
    path: "/test-api",
  },
  render: (node, { api }) => {
    container = node;
    ReactDOM.render(<TestAPI camundaAPI={api} />, container);
  },
  unmount: () => {
    ReactDOM.unmountComponentAtNode(container);
  },

  // make sure we have a higher priority than the default plugin
  priority: 12,
};

export default [navigation, searchPlugin, detailPlugin, testApiPlugin];
