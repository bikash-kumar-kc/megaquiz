import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const authStatus = useSelector((store) => store.userAuth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus && authStatus !== authentication) navigate("/login");
    else if (!authentication && authStatus !== authentication) navigate("/");

    setLoading(false);
  });

  return loading ? <h1>its loading...</h1> : <>{children}</>;
};

export default Protected;
