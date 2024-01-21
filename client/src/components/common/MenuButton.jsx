import menuIcon from "../../assets/menu.svg"
import PropTypes from "prop-types"

function MenuButton({ sidebarRef }) {
    const showSidebar = () =>
        sidebarRef.current.classList.remove("-translate-x-full")

    return (
        <button className="absolute right-4 top-4 z-10 block sm:hidden">
            <img
                src={menuIcon}
                alt="menu"
                className="h-6 w-6"
                onClick={showSidebar}
            />
        </button>
    )
}

MenuButton.propTypes = {
    sidebarRef: PropTypes.object.isRequired,
}

export default MenuButton
