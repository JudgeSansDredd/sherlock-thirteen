import React from "react";
import Header from "../Components/Header";

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white min-w-screen">
      <Header />
      <div className="container flex flex-col min-w-full grow">
        {props.children}
      </div>
    </div>
  );
}
