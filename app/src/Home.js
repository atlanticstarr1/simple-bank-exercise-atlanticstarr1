import React from "react";
import { drizzleConnect } from "drizzle-react";

const Home = props => <div className="section">{console.log(props)}</div>;

const mapStateToProps = state => state;

export default drizzleConnect(Home, mapStateToProps);
