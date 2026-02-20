import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

import sizeMe, {SizeMeProps} from 'react-sizeme'

import {Menu, Dropdown} from 'semantic-ui-react'

import constants from '../constants/client-constants'

import '../styles/menu.scss'

const setDefault = () => {
  const menuItems = constants.menuItems
  const routes = constants.routes
  // Current route location
  const location = useLocation()
  let defaultItem
  switch (location.pathname) {
    case routes.aboutMe:
      defaultItem = menuItems.aboutMe
      break
    case routes.resume:
      defaultItem = menuItems.resume
      break
    case routes.technicalSkills:
      defaultItem = menuItems.technicalSkills
      break
    case routes.workExperience:
      defaultItem = menuItems.workExperience
      break

    default:
      defaultItem = menuItems.aboutMe
  }

  return defaultItem
}

export const MenuStackable: React.FC<SizeMeProps> = ({size}) => {
  // Menu items refs
  const menuItems = constants.menuItems
  // Links refs
  const routes = constants.routes

  // Sets default menu item based upon route on load
  let defaultItem = setDefault()

  const [activeItem, setActiveItem] = useState(defaultItem)

  const [showNavMenu, setShowNavMenu] = useState(false)

  // Sets flag to show tool bar or not
  const toolBarClicked = () => {
    setShowNavMenu(!showNavMenu)
  }

  const scrollToTop = () => {
    if (window.scrollTo) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } else {
      window.scrollY = 0
      window.scrollX = 0
    }
  }

  const invertedMenuItemSelected = (item: string) => {
    setActiveItem(item)
    scrollToTop()
  }

  // Sets active item in tool bar and then hides show menu
  const sideBarItemSelected = (item: string) => {
    setActiveItem(item)
    setShowNavMenu(false)
    scrollToTop()
  }

  return (
    <div>
      {size?.width != null && size.width > constants.shiftMaxWidth ? (
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <Menu.Item
              className="image-header"
              as={Link}
              to={routes.aboutMe}
              onClick={() => invertedMenuItemSelected(menuItems.aboutMe)}
            >
              <img src="header-favicon.png" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={routes.aboutMe}
              name={menuItems.aboutMe}
              active={activeItem === menuItems.aboutMe}
              onClick={() => invertedMenuItemSelected(menuItems.aboutMe)}
            >
              About me
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={routes.workExperience}
              name={menuItems.workExperience}
              active={activeItem === menuItems.workExperience}
              onClick={() => invertedMenuItemSelected(menuItems.workExperience)}
            >
              Work experience
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={routes.technicalSkills}
              name={menuItems.technicalSkills}
              active={activeItem === menuItems.technicalSkills}
              onClick={() =>
                invertedMenuItemSelected(menuItems.technicalSkills)
              }
            >
              Technologies and skills
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={routes.resume}
              name={menuItems.resume}
              active={activeItem === menuItems.resume}
              onClick={() => invertedMenuItemSelected(menuItems.resume)}
            >
              Resume
            </Menu.Item>
            <Menu.Item
              className="custom-icon"
              position="right"
              style={{padding: 0}}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/benjamin-mccain/"
              >
                <img src="linkedin.png" />
              </a>
              <a
                style={{marginLeft: '10px', marginRight: '10px'}}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/benjmac"
              >
                <img src="images/github.png" />
              </a>
            </Menu.Item>
          </div>
        </div>
      ) : (
        <div>
          <Menu attached="top">
            <Dropdown item icon="sidebar" simple onClick={toolBarClicked}>
              {showNavMenu ? (
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={routes.aboutMe}
                    active={activeItem === menuItems.aboutMe}
                    onClick={() => sideBarItemSelected(menuItems.aboutMe)}
                  >
                    About me
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={routes.workExperience}
                    active={activeItem === menuItems.workExperience}
                    onClick={() =>
                      sideBarItemSelected(menuItems.workExperience)
                    }
                  >
                    Work experience
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={routes.technicalSkills}
                    active={activeItem === menuItems.technicalSkills}
                    onClick={() =>
                      sideBarItemSelected(menuItems.technicalSkills)
                    }
                  >
                    Technologies and skills
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={routes.resume}
                    name={menuItems.resume}
                    active={activeItem === menuItems.resume}
                    onClick={() => sideBarItemSelected(menuItems.resume)}
                  >
                    Resume
                  </Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <div />
              )}
            </Dropdown>
            <Menu.Item
              className="custom-icon"
              position="right"
              style={{padding: 0}}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/benjamin-mccain/"
              >
                <img src="linkedin.png" />
              </a>
              <a
                style={{marginLeft: '10px', marginRight: '10px'}}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/benjmac"
              >
                <img src="images/github.png" />
              </a>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  )
}

export default sizeMe()(MenuStackable)
