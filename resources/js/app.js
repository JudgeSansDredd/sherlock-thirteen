require("./bootstrap");

import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import React from "react";
import { render } from "react-dom";
import Layout from "./Layouts/Layout";

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => {
    const page = require(`./Pages/${name}`).default;
    page.layout =
      page.layout || (page => <Layout children={page} name={name} />);
    return page;
  },
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});

InertiaProgress.init({ color: "#4B5563" });
