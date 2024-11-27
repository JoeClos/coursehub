import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  const updateSubscribedCourses = (courses) => {
    setSubscribedCourses(courses);
  };

  const clearSubscribedCourses = () => { setSubscribedCourses([]); };

  return (
    <CartContext.Provider value={{ subscribedCourses, clearSubscribedCourses, updateSubscribedCourses }}>
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
