import React from "react";

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <>
      <div>This is the layout</div>
      {props.children}
    </>
  );
}
