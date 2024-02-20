import axios from "./../../api/apiConfig";
import {
  GET_ALL_TRANSACTIONS_DATA_FAILURE,
  GET_ALL_TRANSACTIONS_DATA_REQUEST,
  GET_ALL_TRANSACTIONS_DATA_SUCCESS,
  GET_BAR_CHART_DATA_FAILURE,
  GET_BAR_CHART_DATA_REQUEST,
  GET_BAR_CHART_DATA_SUCCESS,
  GET_COMBINED_DATA_FAILURE,
  GET_COMBINED_DATA_REQUEST,
  GET_COMBINED_DATA_SUCCESS,
  GET_PIE_CHART_DATA_FAILURE,
  GET_PIE_CHART_DATA_REQUEST,
  GET_PIE_CHART_DATA_SUCCESS,
  GET_STATISTICS_DATA_FAILURE,
  GET_STATISTICS_DATA_REQUEST,
  GET_STATISTICS_DATA_SUCCESS,
} from "./actionType";

export const getAllTransactionsData =
  ({ month, searchQuery, currentPage, itemsPerPage }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_TRANSACTIONS_DATA_REQUEST });
    try {
      const { data } = await axios.get(`/transactions`, {
        params: {
          month,
          search: searchQuery.trim(),
          page: currentPage,
          perPage: itemsPerPage,
        },
      });
      dispatch({ type: GET_ALL_TRANSACTIONS_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_TRANSACTIONS_DATA_FAILURE,
        payload: error?.response?.data?.message,
      });
      console.error(
        "Error fetching transactions:",
        error?.response?.data?.message
      );
    }
  };

export const getStatisticsData =
  ({ month }) =>
  async (dispatch) => {
    dispatch({ type: GET_STATISTICS_DATA_REQUEST });
    try {
      const { data } = await axios.get(`/statistics?month=${month}`);
      dispatch({ type: GET_STATISTICS_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_STATISTICS_DATA_FAILURE,
        payload: error?.response?.data?.message,
      });
      console.error(
        "Error fetching statistics data:",
        error?.response?.data?.message
      );
    }
  };

export const getBarChartData =
  ({ month }) =>
  async (dispatch) => {
    dispatch({ type: GET_BAR_CHART_DATA_REQUEST });
    try {
      const { data } = await axios.get(`/barchart?month=${month}`);
      dispatch({ type: GET_BAR_CHART_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_BAR_CHART_DATA_FAILURE,
        payload: error?.response?.data?.message,
      });

      console.error(
        "Error fetching bar chart data:",
        error?.response?.data?.message
      );
    }
  };

export const getPieChartData =
  ({ month }) =>
  async (dispatch) => {
    dispatch({ type: GET_PIE_CHART_DATA_REQUEST });
    try {
      const { data } = await axios.get(`/piechart?month=${month}`);

      dispatch({ type: GET_PIE_CHART_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PIE_CHART_DATA_FAILURE,
        payload: error?.response?.data?.message,
      });
      console.error(
        "Error fetching pie chart data:",
        error?.response?.data?.message
      );
    }
  };

export const getCombinedData =
  ({ month, search, page, perPage }) =>
  async (dispatch) => {
    dispatch({ type: GET_COMBINED_DATA_REQUEST });
    try {
      const { data } = await axios.get(`/combined`, {
        params: { month, search, page, perPage },
      });
      dispatch({ type: GET_COMBINED_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_COMBINED_DATA_FAILURE,
        payload: error?.response?.data?.message,
      });
      console.error(
        "Error fetching combined data:",
        error?.response?.data?.message
      );
    }
  };
