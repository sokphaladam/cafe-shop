"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { MeQuery, useMeQuery } from "@/gql/graphql";
import { Player } from "@lordicon/react";
import { loadIcon } from "@/lib/loadIcon";

interface Props {
  onCompleted?: (success: boolean) => void;
}

export function TokenVerification(props: Props) {
  const token = getCookie("tk_token");
  const { push } = useRouter();
  const [load, setLoad] = useState(true);
  const [icon, setIcon] = useState<any>(null);

  const playerRef = useRef<Player>(null);

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

  const { loading, data } = useMeQuery({
    onCompleted: async (r) => {
      resetToken(r);
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
    },
  });

  useEffect(() => {
    loadIcon("clock-time").then((d) => {
      setIcon(d);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (playerRef && icon) {
        playerRef.current?.playFromBeginning();
      }
    }, 2500);
  }, [icon]);

  if (!loading && !load) {
    return <></>;
  }

  const playerReady = () => {
    playerRef.current?.playFromBeginning();
  };

  return (
    <div
      className="fixed w-screen h-screen bg-slate-100 z-[999] flex justify-center items-center bg-login flex-col"
      style={{ display: loading || load ? "" : "none" }}
    >
      <div>
        <Player icon={icon} ref={playerRef} onReady={playerReady} size={100} />
      </div>
      <div className="flex text-lg font-semibold">
        <h3 className="text-red-500">
          <Typewriter
            words={["Welcome to application", "Application Loading..."]}
            loop={true}
            delaySpeed={300}
            cursor
            onType={() => {
              if (data && data.me) {
                setLoad(loading);
              }
            }}
          />
        </h3>
      </div>
    </div>
  );
}
