import React from "react";

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return <h3 className="my-2 text-secondary">{title}</h3>;
};
