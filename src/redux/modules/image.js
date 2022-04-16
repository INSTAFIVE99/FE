import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_PREVIEW = "SET_PREVIEW";

const setPreview = createAction(SET_PREVIEW, (preview, file) => ({
  preview,
  file,
}));

const initialState = {
  uploading: false,
  preview: null,
  // formData: null,
  file: "",
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
        draft.file = action.payload.file;
      }),
  },
  initialState
);
const actionCreators = {
  setPreview,
};

export { actionCreators };