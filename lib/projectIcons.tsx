import React from "react";
import {
  FaRocket,
  FaCode,
  FaBolt,
  FaBrain,
  FaCubes,
  FaDatabase,
  FaGlobe,
  FaShieldAlt,
  FaStore,
  FaPenNib,
  FaVideo,
  FaRobot,
  FaMoon,
} from "react-icons/fa";
import type { ProjectIconKey } from "@/content/projects";

export const projectIconMap: Record<
  ProjectIconKey,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  rocket: FaRocket,
  code: FaCode,
  bolt: FaBolt,
  brain: FaBrain,
  cubes: FaCubes,
  database: FaDatabase,
  globe: FaGlobe,
  shield: FaShieldAlt,
  store: FaStore,
  pen: FaPenNib,
  video: FaVideo,
  robot: FaRobot,
  moon: FaMoon,
};
