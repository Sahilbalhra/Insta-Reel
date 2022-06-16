import React, { useContext } from "react";
import ProfileComp from "../../components/ProfileComp";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useContext(AuthContext);

  const Redirect = () => {
    const router = useRouter();
    router.push("/login");
    return null;
  };
  return <>{user!=null ? <ProfileComp /> : <Redirect />}</>;
};

export default index;
