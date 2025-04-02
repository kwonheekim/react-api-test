import { useReducer, useEffect, useCallback } from "react";

//  Loading, Error, Success
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null, data: null };
    case "SUCCESS":
      return { loading: false, error: null, data: action.data };
    case "ERROR":
      return { loading: false, error: action.error, data: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const useAsync = (callback, deps = [], skip = false) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await callback();
      dispatch({ type: "SUCCESS", data: response });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  }, [callback]);

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, fetchData];
};

export default useAsync;
