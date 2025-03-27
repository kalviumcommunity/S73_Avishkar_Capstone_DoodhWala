import MilkmanNavbar from "./milkmanNav";
import CustomerNavbar from "./customerNav";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole");

  return userRole == "milkman" ? <MilkmanNavbar /> : <CustomerNavbar />;
};

export default Navbar;
