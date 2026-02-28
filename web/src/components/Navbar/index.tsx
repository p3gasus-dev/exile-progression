import { useClearGemProgress } from "../../state/gem-progress";
import { useClearRouteProgress } from "../../state/route-progress";
import { useClearCollapseProgress } from "../../state/section-collapse";
import { borderListStyles, interactiveStyles } from "../../styles";
import { trackEvent } from "../../utility/telemetry";
import styles from "./styles.module.css";
import classNames from "classnames";
import React, { useState } from "react";
import {
  FaBars,
  FaBook,
  FaGithub,
  FaLayerGroup,
  FaMap,
  FaSlidersH,
  FaTachometerAlt,
  FaTools,
  FaUndoAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarItemProps {
  label: string;
  icon?: React.ReactNode;
  expand: boolean;
  active?: boolean;
  onClick: () => void;
}

function NavbarItem({ label, expand, icon, active, onClick }: NavbarItemProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.navItem, styles.navElement, {
        [styles.expand]: expand,
        [styles.active]: active && !expand,
        [borderListStyles.item]: expand,
        [interactiveStyles.activePrimary]: active,
        [interactiveStyles.activeSecondary]: !active && !expand,
        [interactiveStyles.hoverPrimary]: expand,
      })}
    >
      {icon}
      {label}
    </button>
  );
}

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const [navExpand, setNavExpand] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const clearRouteProgress = useClearRouteProgress();
  const clearGemProgress = useClearGemProgress();
  const clearCollapseProgress = useClearCollapseProgress();

  const go = (path: string) => {
    navigate(path);
    setNavExpand(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={classNames(styles.navbar, { [styles.expand]: navExpand })}
    >
      <div
        className={classNames(styles.navHolder, { [styles.expand]: navExpand })}
      >
        {/* Hamburger */}
        <button onClick={() => setNavExpand(!navExpand)}>
          <FaBars
            aria-label="Menu"
            className={classNames(styles.navIcon, interactiveStyles.activePrimary)}
            display="block"
          />
        </button>

        <div
          className={classNames(styles.navMain, { [styles.expand]: navExpand })}
        >
          <div
            className={classNames(styles.navItems, { [styles.expand]: navExpand })}
          >
            <NavbarItem
              label="Dashboard"
              expand={navExpand}
              active={isActive("/")}
              icon={<FaTachometerAlt className="inlineIcon" />}
              onClick={() => go("/")}
            />
            <NavbarItem
              label="Route"
              expand={navExpand}
              active={isActive("/route")}
              icon={<FaMap className="inlineIcon" />}
              onClick={() => go("/route")}
            />
            <NavbarItem
              label="Campaign"
              expand={navExpand}
              active={isActive("/campaign")}
              icon={<FaBook className="inlineIcon" />}
              onClick={() => go("/campaign")}
            />
            <NavbarItem
              label="Atlas"
              expand={navExpand}
              active={isActive("/atlas")}
              icon={<FaLayerGroup className="inlineIcon" />}
              onClick={() => go("/atlas")}
            />
            <NavbarItem
              label="Build"
              expand={navExpand}
              active={isActive("/build")}
              icon={<FaSlidersH className="inlineIcon" />}
              onClick={() => go("/build")}
            />
            <NavbarItem
              label="Settings"
              expand={navExpand}
              active={isActive("/settings")}
              icon={<FaTools className="inlineIcon" />}
              onClick={() => go("/settings")}
            />

            {/* ── Utility items (expand-only) ─────────── */}
            <NavbarItem
              label="Reset Progress"
              expand={navExpand}
              icon={<FaUndoAlt className="inlineIcon" />}
              onClick={() => {
                clearRouteProgress();
                clearGemProgress();
                clearCollapseProgress();
                setNavExpand(false);
              }}
            />
            <NavbarItem
              label="GitHub"
              expand={navExpand}
              icon={<FaGithub className="inlineIcon" />}
              onClick={() => {
                trackEvent({
				  name: "github",
				 });
                window.open(
                  "https://github.com/heartofphos/exile-progression",
                  "_blank"
                );
                setNavExpand(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
