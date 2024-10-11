import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Aside = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setCurrentPage("/");
        break;
      case "/payment-tracking":
        setCurrentPage("/payment-tracking");
        break;
      case "/project-management":
        setCurrentPage("/project-management");
        break;
      case "/project-details":
        setCurrentPage("/project-details");
        break;
      case "/settings":
        setCurrentPage("/settings");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return { currentPage };
};
