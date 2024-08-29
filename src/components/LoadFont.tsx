"use client";
import { Hanuman, Poppins, Nova_Square } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const hanuman = Hanuman({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const nova_square = Nova_Square({
  weight: ["400"],
  subsets: ["latin"],
});

export function LoadFont() {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${poppins.style.fontFamily}, ${hanuman.style.fontFamily} !important;
        }

        .card-number {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 50px 25px 10px;
          font-size: 23px;
          font-family: ${nova_square.style.fontFamily}, monospace;
        }

        .card-holder {
          margin: 30px 25px 0 25px;
          text-transform: uppercase;
          font-family: ${nova_square.style.fontFamily}, monospace;
        }

        .card-end {
          margin-left: 25px;
          text-transform: uppercase;
          font-family: ${nova_square.style.fontFamily}, monospace;
        }
      `}</style>
    </>
  );
}