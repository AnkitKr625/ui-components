import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  FaMobileAlt,
  GiSofa,
  HiChevronDown,
  HiChevronRight,
  IoArrowBack,
  MdSportsbaseball,
  MdSportscricket,
  MdTablerestaurant,
} from "oh-vue-icons/icons";

addIcons(
  FaMobileAlt,
  GiSofa,
  HiChevronDown,
  HiChevronRight,
  IoArrowBack,
  MdSportsbaseball,
  MdSportscricket,
  MdTablerestaurant
);

export function registerIcons(app) {
  app.component("v-icon", OhVueIcon);
}
