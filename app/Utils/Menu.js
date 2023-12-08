/** @format */

// Import specific icons from react-icons
import {
  AiOutlineHome,
  AiOutlineOrderedList,
  AiOutlineCheck,
  AiOutlineUnorderedList,
} from "react-icons/ai";

// Define the menu array using the correct imported icons
const menu = [
  {
    id: 1,
    title: "Home",
    icon: AiOutlineHome,
    link: "/",
  },
  {
    id: 2,
    title: "List",
    icon: AiOutlineUnorderedList,
    link: "/login",
  },
  {
    id: 3,
    title: "Check",
    icon: AiOutlineHome, // Change this to a different icon, e.g., AiOutlineHome, AiOutlineCheck, etc.
    link: "/",
  },
  {
    id: 4,
    title: "Todo",
    icon: AiOutlineCheck,
    link: "/",
  },
];

// Export the menu array
export default menu;
