import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  console.log("🚀 ~ CartProvider ~ subscribedCourses:", subscribedCourses)

  const updateSubscribedCourses = (courses) => {
    setSubscribedCourses(courses);
  };

  return (
    <CartContext.Provider value={{ subscribedCourses, updateSubscribedCourses }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
