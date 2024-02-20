import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BarChart from "../components/BarChart";
import Combined from "../components/Combined";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import CloseIcon from "@mui/icons-material/Close";

import PieChart from "../components/PieChart";
import Statistics from "../components/Statistics";

import { useDispatch, useSelector } from "react-redux";
import { CLEAR_GLOBAL_ERROR } from "../redux/transaction/actionType";

const App = () => {
  const error = useSelector((state) => state.transaction.error);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch({ type: CLEAR_GLOBAL_ERROR });
  };

  return (
    <div className="container max-w-[76rem] mx-auto">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/barchart" element={<BarChart />} />
        <Route path="/piechart" element={<PieChart />} />
        <Route path="/combined" element={<Combined />} />
      </Routes>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          onClose={handleClose}
        >
          <SnackbarContent
            style={{ backgroundColor: "red", color: "white" }}
            message={<span>{error}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      )}
    </div>
  );
};

export default App;
