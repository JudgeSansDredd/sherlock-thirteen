import React from "react";
import Header from "../Components/Header";

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <div className="min-w-screen min-h-screen bg-stone-400 flex flex-col items-center">
      <div className="container flex flex-col">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
