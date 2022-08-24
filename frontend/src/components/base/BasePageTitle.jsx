import React from "react";
import { Link } from "react-router-dom";

function BasePageTitle({ detail }) {
  return (
    <div
      className="page-title parallax parallax1"
      style={{
        backgroundImage: `url('/images/parallax/${detail.background}')`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-title-heading">
              <h1 className="title">{detail.title}</h1>
            </div>
            <div className="breadcrumbs">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {detail.breadCrumb && <li>{detail.breadCrumb}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasePageTitle;
