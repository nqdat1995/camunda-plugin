import React from "react";

function Navigation() {
  return (
    <div style={{ display: "inline-flex" }}>
      <a
        ng-href="#/contract-search"
        className="ng-binding ng-scope"
        href="#/contract-search"
      >
        Search Contract
      </a>
      <a
        ng-href="#/test-api"
        className="ng-binding ng-scope"
        href="#/test-api"
      >
        TestAPI
      </a>
    </div>
  );
}

export default Navigation;
