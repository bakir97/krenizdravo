const initialState = {
  objave: [],
  objava: null,
  mojaObjava: null,
  objaveLoading: false,
  trazi: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DOHVATI_OBJAVE":
      return {
        ...state,
        objave: state.objave.concat(action.payload),
        objaveLoading: false
      };
    case "DOHVATI_OBJAVU":
      return { ...state, objava: action.payload };
    case "TRAZI_OBJAVE":
      return {
        ...state,
        objave: action.payload.objave,
        trazi: action.payload.trazi
      };
    case "DOHVATI_MOJU_OBJAVU":
      return { ...state, mojaObjava: action.payload };
    case "OMILJENA_OBJAVA":
      return {
        ...state,
        objave: state.objave.map(objava => {
          if (objava._id === action.payload._id) {
            return (objava = action.payload);
          }
          return objava;
        })
      };
    case "OBRISANA_OBJAVA":
      const filter = state.objave.filter(
        objava => objava._id !== action.payload._id
      );
      return {
        ...state,
        objave: filter
      };
    case "OBJAVE_LOADING":
      return { ...state, objaveLoading: action.payload };
    case "RESET_OBJAVE":
      return { ...state, objave: action.payload };

    default:
      return state;
  }
};
