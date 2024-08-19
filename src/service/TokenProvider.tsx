"use client";
import React, { useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { MeQuery, useMeQuery } from "@/gql/graphql";
import { Loading } from "@/components/custom/Loading";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

interface Props {
  onCompleted?: (success: boolean) => void;
}

export function TokenVerification(props: Props) {
  const token = getCookie("tk_token");
  const { push } = useRouter();
  const [load, setLoad] = useState(true);

  const resetToken = async (res: MeQuery) => {
    if (token && res.me === null) {
      await deleteCookie("tk_token");
      await push("/");
      if (process.browser) {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }
  };

  const { loading } = useMeQuery({
    onCompleted: async (r) => {
      resetToken(r);
      setTimeout(() => {
        if (r && r.me) {
          if (!!r.me) {
            props.onCompleted && props.onCompleted(true);
          } else {
            props.onCompleted && props.onCompleted(false);
          }
        } else {
          props.onCompleted && props.onCompleted(false);
          setLoad(false);
        }
      }, 3000)
    },
  });

  if (!loading && !load) {
    return <></>;
  }

  const words = [
    {
      text: "Welcome ",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "to",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "application",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "Loading...",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div
      className="fixed w-screen h-screen bg-slate-100 z-[999] flex justify-center items-center bg-login flex-col"
      style={{ display: loading || load ? "" : "none" }}
    >
      <div>
        <Loading />
      </div>
      <div className="flex text-lg font-semibold">
        <TypewriterEffectSmooth words={words} />
      </div>
    </div>
  );
}
