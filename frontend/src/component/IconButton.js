"use client";
import { Flashlight } from "lucide-react";
import { useState } from "react";

export default function IconButton({ src, alt }) {
  const [show, setShow] = useState(false);

  return (
    <button
      onClick={() => {
        setShow(!show);
      }}
    >
      {/* className="
        group
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-black/30
        backdrop-blur
        hover:bg-black/50
        transition
      "
      aria-label={alt} */}
      <div className="flex flex-row">
        <img
          src={src}
          alt=""
          className="
          w-10
          opacity-70
          hover:opacity-100
          transition
        "
        />
        {show ? <p className="m-2 text-black">{alt}</p> : null}
      </div>
    </button>
  );
}
