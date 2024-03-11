import {
  CLEAR_GLOBAL_ERROR,
  CLEAR_MESSAGE,
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
  INITIATE_DATABASE_REQUEST,
  INITIATE_DATABASE_SUCCESS,
} from "./actionType";

const initialState = {
  message:null,
  dashboardData: { transactions: [], totalPages: 1 },
  stats: null,
  barChartData: [],
  pieChartData: [],
  combinedData: null,
  isLoading: false,
  error: null,
};

export const transactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_DATABASE_REQUEST:
    case GET_ALL_TRANSACTIONS_DATA_REQUEST:
    case GET_STATISTICS_DATA_REQUEST:
    case GET_BAR_CHART_DATA_REQUEST:
    case GET_PIE_CHART_DATA_REQUEST:
    case GET_COMBINED_DATA_REQUEST:
      return { ...state, isLoading: true, error: null };

    case INITIATE_DATABASE_SUCCESS:
      return{
         ...state,
         isLoading: false,
         error: null,
         message: payload,
      }
    case GET_ALL_TRANSACTIONS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        dashboardData: {
          ...state.dashboardData,
          transactions: payload.transactions,
          totalPages: payload.totalPages,
        },
      };
    case GET_STATISTICS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        stats: payload,
      };

    case GET_BAR_CHART_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        barChartData: payload,
      };
    case GET_PIE_CHART_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        pieChartData: payload,
      };
    case GET_COMBINED_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        combinedData: payload,
      };
    case GET_ALL_TRANSACTIONS_DATA_FAILURE:
    case GET_STATISTICS_DATA_FAILURE:
    case GET_BAR_CHART_DATA_FAILURE:
    case GET_PIE_CHART_DATA_FAILURE:
    case GET_COMBINED_DATA_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case CLEAR_GLOBAL_ERROR:
      return { ...state, isLoading: false, error: null };
    case CLEAR_MESSAGE:
      return{...state, message:null}

    default:
      return state;
  }
};
