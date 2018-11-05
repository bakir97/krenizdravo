import axios from "axios";
export const dohvatiObjave = skip => async dispatch => {
  try {
    const objave = await axios.get(
      `https://instagramkopija.herokuapp.com/objave/${skip}`
    );
    dispatch({
      type: "DOHVATI_OBJAVE",
      payload: objave.data
    });
  } catch (error) {
    dispatch({
      type: "OBJAVE_ERROR"
    });
    dispatch({
      type: "OBJAVE_LOADING",
      payload: false
    });
  }
};
export const traziObjave = (skip, podaci) => async dispatch => {
  try {
    if (podaci.trazi.length < 1) {
      const objave = await axios.get(
        `https://instagramkopija.herokuapp.com/objave/${skip}`
      );
      dispatch({
        type: "TRAZI_OBJAVE",
        payload: {
          objave: objave.data,
          trazi: false
        }
      });
    } else {
      const objave = await axios.post(
        `https://instagramkopija.herokuapp.com/objave/traziObjave`,
        podaci
      );
      dispatch({
        type: "TRAZI_OBJAVE",
        payload: {
          objave: objave.data,
          trazi: true
        }
      });
    }
  } catch (error) {
    dispatch({
      type: "TRAZI_OBJAVE",
      payload: []
    });
    dispatch({
      type: "OBJAVE_ERROR"
    });
    dispatch({
      type: "OBJAVE_LOADING",
      payload: false
    });
  }
};
export const objaveLoadingSpinner = () => async dispatch => {
  dispatch({
    type: "OBJAVE_LOADING",
    payload: true
  });
};
export const dohvatiMojeObjave = skip => async dispatch => {
  try {
    const objave = await axios.get(
      `https://instagramkopija.herokuapp.com/mojeObjave`
    );
    dispatch({
      type: "DOHVATI_OBJAVE",
      payload: objave.data
    });
  } catch (error) {}
};
export const dohvatiObjavu = id => async dispatch => {
  const objava = await axios.get(
    `https://instagramkopija.herokuapp.com/objava/${id}`
  );

  dispatch({
    type: "DOHVATI_OBJAVU",
    payload: objava.data
  });
};
export const dohvatiMojuObjavu = id => async dispatch => {
  try {
    const objava = await axios.get(
      `https://instagramkopija.herokuapp.com/mojaObjava/${id}`
    );
    dispatch(editObjavu(objava.data));
  } catch (error) {}
};
export const editObjavu = objava => ({
  type: "DOHVATI_MOJU_OBJAVU",
  payload: objava
});

export const omiljenaObjava = podaci => async dispatch => {
  const objava = await axios.post(
    "https://instagramkopija.herokuapp.com/omiljeneObjave",
    podaci
  );

  dispatch({
    type: "OMILJENA_OBJAVA",
    payload: objava.data
  });
};
export const dohvatiOmiljeneObjave = () => async dispatch => {
  const objave = await axios.get(
    "https://instagramkopija.herokuapp.com/omiljeneObjave"
  );
  dispatch({
    type: "DOHVATI_OBJAVE",
    payload: objave.data
  });
};
export const obrisiObjavuAkcija = id => async dispatch => {
  try {
    const objave = await axios.delete(
      `https://instagramkopija.herokuapp.com/Objava/${id}`
    );

    dispatch({
      type: "OBRISANA_OBJAVA",
      payload: objave.data
    });
  } catch (error) {}
};

export const novaObjava = (podaci, push) => async dispatch => {
  try {
    const novaObjava = await axios.post(
      "https://instagramkopija.herokuapp.com/novaObjava",
      podaci
    );
    if (novaObjava) {
      push("/objave");
    }
  } catch (error) {}
};
export const resetObjave = () => ({
  type: "RESET_OBJAVE",
  payload: []
});
