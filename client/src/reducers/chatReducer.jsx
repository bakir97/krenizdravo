const initialState = {
  chat: [],
  neprocitanePoruke: {
    brojporuka: 0,
    poruke: []
  },
  poruke: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHAT":
      return { ...state, chat: [...action.payload, ...state.chat] };
    case "CHAT_RESET":
      return { ...state, chat: action.payload };
    case "DODAJ_PORUKU":
      return { ...state, chat: state.chat.concat(action.payload) };
    case "NEPROCITANE_PORUKE":
      return {
        ...state,
        neprocitanePoruke: {
          poruke: action.payload,
          brojporuka: action.payload
            .map(korisnik => korisnik.poruke.length)
            .reduce((a, b) => a + b, 0)
        }
      };
    case "NEPROCITANA_PORUKA":
      console.log(state.neprocitanePoruke.poruke, "poruke");
      console.log(action.payload.od);

      let array = state.neprocitanePoruke.poruke.filter(
        poruka => poruka.od === action.payload.od
      );
      console.log(array, "array");
      let novi = null;
      if (array.length > 0) {
        const proba = array[0].poruke.concat({
          _id: action.payload._id,
          poruka: action.payload.poruka,
          datum: action.payload.datum
        });
        array[0].poruke = proba;
        const ostali = state.neprocitanePoruke.poruke.filter(
          poruka => poruka.od !== action.payload.od
        );
        console.log(ostali, "ostali");
        novi = [array[0], ...ostali];
        // novi = ostali.concat(array[0]);
      } else {
        array = {
          od: action.payload.od,
          poruke: [
            {
              _id: action.payload._id,
              poruka: action.payload.poruka,
              datum: action.payload.datum
            }
          ],
          slika: action.payload.slika
        };
        console.log(array, "arraynovi");
        novi = [array, ...state.neprocitanePoruke.poruke];
        console.log("elseee");
      }

      return {
        ...state,
        neprocitanePoruke: {
          poruke: novi,
          brojporuka: state.neprocitanePoruke.brojporuka + 1
        }
      };
    case "PORUKE":
      return { ...state, poruke: action.payload };
    default:
      return state;
  }
};
