// // src/context/ToastContext.jsx
// import React, { createContext, useContext, useState } from "react";
// import { Snackbar, Alert } from "@mui/material";

// const ToastContext = createContext();

// export const ToastProvider = ({ children }) => {
//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const showToast = (message : string, severity = "info") => {
//     setToast({ open: true, message, severity });
//   };

//   const handleClose = () => {
//     setToast({ ...toast, open: false });
//   };

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//       {/* severity={toast.severity} */}
//       <Snackbar
//         open={toast.open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert onClose={handleClose}  variant="filled">
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </ToastContext.Provider>
//   );
// };

// // custom hook
// export const useToast = () => useContext(ToastContext);
