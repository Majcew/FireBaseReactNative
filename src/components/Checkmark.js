import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const Checkmark = (props) => {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    if (props.state) setIcon({ name: "md-checkmark", color: "green" });
    else setIcon({ name: "md-close", color: "tomato" });
  }, [props.state]);
  return <Ionicons name={icon.name} size={16} color={icon.color} />;
};

export default Checkmark;
