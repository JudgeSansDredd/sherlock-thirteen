import React from "react";
import Header from "../Components/Header";

export default function Layout(props: React.PropsWithChildren<{}>) {
  console.log(props);
  return (
    <div className="min-w-screen min-h-screen bg-white flex flex-col items-center">
      <Header />
      <div className="container flex flex-col">{props.children}</div>
    </div>
  );
}
