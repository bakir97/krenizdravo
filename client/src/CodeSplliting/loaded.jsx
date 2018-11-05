import Loadable from "react-loadable";
import React from "react";

export const ObrisiModal = Loadable({
  loader: () => import("../profile/ObrisiModal"),
  loading: () => (
    <div style={{ position: "absolute", top: "50%", bottom: "50%" }}>
      Loading...
    </div>
  )
});
export const NapraviProfil = Loadable({
  loader: () => import("../profile/napraviProfil"),
  loading: () => <div>Loading...</div>
});
export const MojeObjave = Loadable({
  loader: () => import("../objava/MojeObjave"),
  loading: () => <div>Loading...</div>
});
export const Objave = Loadable({
  loader: () => import("../objava/objave"),
  loading: () => <div>Loading...</div>
});
