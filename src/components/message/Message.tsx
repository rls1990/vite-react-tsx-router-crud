/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface messageProps {
  msg: string;
  bgColor: string;
}

export const Message: React.FC<messageProps> = ({ msg, bgColor }) => {
  const styles: any = {
    padding: "1rem",
    marginButtom: "1rem",
    backgroundColor: bgColor,
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div style={styles}>
      <p>{msg}</p>
    </div>
  );
};
