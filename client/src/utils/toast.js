import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "14px",
  background: "#ffffff",
  color: "#0f172a",
  padding: "16px 18px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 12px 30px rgba(15,23,42,.12)",
  fontWeight: 500,
};

export const showSuccess = (message) => {
  toast.success(message, {
    style: baseStyle,
    iconTheme: {
      primary: "#22c55e",
      secondary: "#fff",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: baseStyle,
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    icon: "ℹ️",
    style: baseStyle,
  });
};

export const showWarning = (message) => {
  toast(message, {
    icon: "⚠️",
    style: {
      ...baseStyle,
      border: "1px solid #fbbf24",
    },
  });
};
