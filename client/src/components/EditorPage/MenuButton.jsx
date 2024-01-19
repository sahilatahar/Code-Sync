import menuIcon from "../../assets/menu.svg"
import PropTypes from "prop-types"

function MenuButton({ sidebarRef }) {
	const showSidebar = () =>
		sidebarRef.current.classList.remove("-translate-x-full")

	return (
		<button className="absolute top-4 right-4 block sm:hidden z-10">
			<img
				src={menuIcon}
				alt="menu"
				className="w-6 h-6"
				onClick={showSidebar}
			/>
		</button>
	)
}

MenuButton.propTypes = {
	sidebarRef: PropTypes.object.isRequired,
}

export default MenuButton
