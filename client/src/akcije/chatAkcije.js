import axios from "axios";
export const dohvatiChat = (podaci, slice) => async dispatch => {
  try {
    const chat = await axios.post(
      `https://instagramkopija.herokuapp.com/chatovi/${slice}`,
      podaci
    );

    dispatch({
      type: "CHAT",
      payload: chat.data.reverse()
    });
  } catch (error) {
    dispatch({
      type: "CHAT",
      payload: []
    });
  }
};
export const dodajPoruku = podaci => async dispatch => {
  const poruka = await axios.post(
    "https://instagramkopija.herokuapp.com/chat",
    podaci
  );
  // const novaPoruka = {
  //   _id: poruka.data._id,
  //   poruka: poruka.data.poruka,
  //   od: {
  //     slika: poruka.data.slika,
  //     username: poruka.data.od
  //   }
  // };
  // dispatch({
  //   type: "DODAJ_PORUKU",
  //   payload: novaPoruka
  // });
};

export const resetPoruke = () => ({
  type: "CHAT_RESET",
  payload: []
});
export const dohvatiNeprocitanePoruke = () => async dispatch => {
  const poruke = await axios.get(
    "https://instagramkopija.herokuapp.com/neprocitanePoruke"
  );
  // const poruka = {
  //   poruka: podaci.poruka,
  //   od: podaci.from
  // };
  dispatch({
    type: "NEPROCITANE_PORUKE",
    payload: poruke.data
  });
};
export const dodajNeprocitanuPoruku = poruka => ({
  type: "NEPROCITANA_PORUKA",
  payload: poruka
});
export const resetNeprocitanePoruke = ime => async dispatch => {
  const poruke = await axios.delete(
    `https://instagramkopija.herokuapp.com/resetneprocitanePoruke/${ime}`
  );
  dispatch({
    type: "NEPROCITANE_PORUKE",
    payload: poruke.data
  });
};
export const dohvatiPoruke = () => async dispatch => {
  const poruke = await axios.get(
    `https://instagramkopija.herokuapp.com/poruke`
  );

  dispatch({
    type: "PORUKE",
    payload: poruke.data
  });
};
