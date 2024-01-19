import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

function FormComponent() {
	const navigate = useNavigate();

	const [roomID, setRoomID] = useState("");
	const [username, setUsername] = useState("");

	const createNewRoomID = () => {
		setRoomID(uuidv4());
		toast.success("Created a new ROOM ID");
	};

	const joinRoom = (e) => {
		e.preventDefault();

		if (!roomID || !username) {
			toast.error("ROOM ID & username is required");
			return;
		}
		navigate(`/editor/${roomID}`, {
			state: {
				username,
			},
		});
	};

	return (
		<div className="w-[95%] max-w-[500px] sm:w-[500px] flex justify-center items-center gap-4 sm:p-8 p-4 flex-col">
			<h1 className="mb-4 text-3xl md:text-5xl md:mb-8">Code Sync</h1>
			<h4 className="text-base font-bold self-start">
				Paste Invitation ROOM ID
			</h4>
			<form onSubmit={joinRoom} className="flex flex-col gap-4 w-full">
				<input
					type="text"
					name="roomID"
					placeholder="ROOM ID"
					className="w-full px-3 py-2 focus:outline-none border-none text-black"
					onChange={(e) => setRoomID(e.target.value)}
					value={roomID}
				/>
				<input
					type="text"
					name="username"
					placeholder="USERNAME"
					className="w-full px-3 py-2 focus:outline-none border-none text-black"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
				<button
					type="submit"
					className="bg-primary py-2 px-8 self-end text-black"
					onClick={joinRoom}
				>
					Join
				</button>
			</form>
			<p className="select-none self-start">
				{"If you don't have an invite then create"}{" "}
				<span
					className="text-primary cursor-pointer underline"
					onClick={createNewRoomID}
				>
					new room
				</span>
			</p>
		</div>
	);
}

export default FormComponent;
