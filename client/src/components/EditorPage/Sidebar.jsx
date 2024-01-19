import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import closeIcon from "../../assets/close.svg";
import Client from "../EditorPage/Client";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

function Sidebar({ sidebarRef }) {
	const navigate = useNavigate();
	const { roomId } = useParams();
	const { clients } = useContext(Context);

	const copyRoomId = async () => {
		try {
			await navigator.clipboard.writeText(roomId);
			toast.success("Room ID has been copied to clipboard");
		} catch (error) {
			toast.error("Could to copy room ID");
			console.log(error);
		}
	};

	const leaveRoom = () => {
		navigate("/");
	};

	const hideSidebar = () =>
		sidebarRef.current.classList.add("-translate-x-full");

	return (
		<aside
			className="w-screen sm:w-[300px] p-4 min-h-full max-h-full bg-dark flex flex-col absolute top-0 left-0 z-10 -translate-x-full sm:translate-x-0 sm:static transition-transform duration-400"
			ref={sidebarRef}
		>
			{/* Close menu button */}
			<button className="absolute top-4 right-4 block sm:hidden">
				<img
					src={closeIcon}
					alt=""
					className="w-6 h-6"
					onClick={hideSidebar}
				/>
			</button>
			<h2 className="pb-4">Connected</h2>
			<div className="flex justify-center overflow-y-auto flex-grow ">
				<div className="w-full h-full flex items-start flex-wrap gap-x-2 gap-y-6">
					{clients.map((client) => {
						return (
							<Client
								key={client.socketId}
								username={client.username}
							/>
						);
					})}
				</div>
			</div>
			<div className="flex flex-col items-center gap-4 pt-3">
				<button
					className="w-full py-3 bg-white text-black"
					onClick={copyRoomId}
				>
					Copy Link
				</button>
				<button
					className="w-full py-3 bg-primary text-black"
					onClick={leaveRoom}
				>
					Leave
				</button>
			</div>
		</aside>
	);
}

Sidebar.propTypes = {
	sidebarRef: PropTypes.object.isRequired,
};

export default Sidebar;
