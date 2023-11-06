import '../css/Sidebar.css';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { SCALUP } from '../../Utils/constant';
import { SCADOWN } from '../../Utils/constant';
import ThreeLineIcon from '../utils/logo-icon.svg'

const Sidebar = () => {
    let [toggleSideBarIcon, settoggleSideBarIcon] = useState();

    let appLayout = useRef(null);
    let toggle = useRef(false);

    let handleSideBar = () => {
        if (toggle.current) {
            appLayout.current.style.width = SCALUP;
            toggle.current = false;
            let navItems = document.querySelectorAll(".navitem");
            for (let item of navItems) {
                item.style.width = SCALUP;
            }
        }
        else {
            appLayout.current.style.width = SCADOWN;
            toggle.current = true;
            let navItems = document.querySelectorAll(".navitem");
            for (let item of navItems) {
                item.style.width = SCADOWN;
            }
        }
    }

    let handleActiveNavlink = () => {
        let allLinkItem = document.querySelector(".active")
        allLinkItem.background = "lightgray";
    }

    return (
        <div className="AppLayout" ref={appLayout}>

            <div className="navbar-container">
                <div className="app-logo " >
                    {
                        toggleSideBarIcon === true ?
                            (<i class="fa-solid fa-beat fa-arrow-right fa-lg toggle-icon"
                                onClick={() => { settoggleSideBarIcon(!toggleSideBarIcon); handleSideBar(); }} >
                            </i>) :
                            (<i class="fa-solid fa-beat fa-arrow-left fa-lg toggle-icon"
                                onClick={() => { settoggleSideBarIcon(!toggleSideBarIcon); handleSideBar(); }} >
                            </i>)
                    }
                    <img src={ThreeLineIcon} className="app-logo-img" alt="App Logo" />
                </div>

                <NavLink to='/app' className="navitem" id="children" onClick={handleActiveNavlink} >
                    <div>
                        <i className="fa-solid fa-user nav-item-icon" />
                    </div>
                    <NavLink to='/app' className="link" onClick={handleActiveNavlink}  >Children</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#children" place="right">
                            Children
                        </Tooltip>
                    )
                }

                <NavLink to='/app/task-creation' className="navitem" id="task-creation">
                    <div>
                        <i className="fa-solid fa-bars nav-item-icon" />
                    </div>
                    <NavLink to='/app/task-creation' className="link" onClick={handleActiveNavlink}  >Task Creation</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#task-creation" place="right">
                            Task Creation
                        </Tooltip>
                    )
                }

                <NavLink to='/app/task-review' className="navitem" id="task-review">
                    <div>
                        <i className="fa-solid fa-envelope nav-item-icon" />
                    </div>
                    <NavLink to='/app/task-review' >Task review</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#task-review" place="right">
                            Task Review
                        </Tooltip>
                    )
                }

                <NavLink to='/app/parent' className="navitem" id="parent">
                    <div>
                        <i class="fa-solid fa-user-tie nav-item-icon"></i>
                    </div>
                    <NavLink to='/app/parent' >Parent</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#parent" place="right">
                            Parent
                        </Tooltip>
                    )
                }

                <NavLink to='/app/invite-friend' className="navitem" id="invitea-friend">
                    <div>
                        <i className="fa-solid fa-heart nav-item-icon" />
                    </div>
                    <NavLink to='/app/invite-friend' >Invite a friend</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#invitea-friend" place="right">
                            Invite Friend
                        </Tooltip>
                    )
                }

                <NavLink to='/app/account' className="navitem" id="account">
                    <div>
                        <i className="fa-solid fa-gear nav-item-icon" />
                    </div>
                    <NavLink to='/app/account'  >Account</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#account" place="right">
                            Account
                        </Tooltip>
                    )
                }

                <NavLink to='/app/help' className="navitem" id="Help">
                    <div>
                        <i className="fa-solid fa-comment nav-item-icon" />
                    </div>
                    <NavLink to='/app/Help' >Help</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#Help" place="right">
                            Help
                        </Tooltip>
                    )
                }

                <NavLink to='/app/help' className="navitem" id="AboutGPS">
                    <div>
                        <i className="fa-solid fa-location-dot nav-item-icon" />
                    </div>
                    <NavLink to='/app/Help'  >AboutGPS</NavLink>
                </NavLink>
                {
                    toggleSideBarIcon && (
                        <Tooltip anchorSelect="#AboutGPS" place="right">
                            AboutGPS
                        </Tooltip>
                    )
                }
            </div>
        </div>
    )
}

export default Sidebar;
