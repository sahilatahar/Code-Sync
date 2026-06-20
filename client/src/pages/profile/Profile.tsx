import React, { useEffect, useState } from 'react'
import logo from "@/assets/logo.svg"
import Card from '@/components/cards/Card';
import axios from 'axios';
import toast from 'react-hot-toast';

function Profile() {

    const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || "").token : null;
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || "") : null;
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    const [newRoom, setNewRoom] = useState({
        name: "",
        roomId: ""
    })
    const [existingRoomId, setExistingRoomId] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [openExistingRoomPopup, setOpenExistingRoomPopup] = useState(false);

    const [rooms, setRooms] = React.useState<{name: string, roomId: string}[]>([]);

    const fetchRooms = async () => {
        try {
            const fetchedRooms = await axios.get(BACKEND_URL + "/api/rooms/joined", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setRooms(fetchedRooms.data.rooms);
        } catch (error) {
            toast.error('Failed to fetch rooms');
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [token, BACKEND_URL]);

    const createRoom = async (room: {name: string, roomId: string}) => {
        try {
            const res = await axios.post(BACKEND_URL + "/api/rooms/create", room, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 201) {
                toast.success('Room created successfully!');
                setOpenPopup(false);
                setNewRoom({name: "", roomId: ""});
                setRooms((prevRooms) => [...prevRooms, room]);
            } 
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }

    }

    const JoinExistingRoom = async (roomId: string) => {
        if(roomId.trim() === "") {
            toast.error("Room ID cannot be empty");
            return;
        }
        else if(roomId.length < 5) {
            toast.error("Room ID must be at least 5 characters long");
            return;
        }
        try {
            const res = await axios.post(BACKEND_URL + "/api/rooms/joinExistingRoom", {roomId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                toast.success('Joined room successfully!');
                setOpenExistingRoomPopup(false);
                setExistingRoomId("");
                fetchRooms();
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    }


    

  return (
    <div>
        <div className='flex sm:flex-row flex-col p-5 items-center'>
            <div className="flex w-full justify-center sm:w-1/2 max-w-[400px] sm:pl-4">
                <img src={logo} alt="Logo" className="w-full"/>
            </div>
            <div className=''>
                <p>
                    welcome, {userInfo?.username}
                </p>
            </div>
        </div>
        <div className=''>

            <button className='bg-white text-black px-4 py-2 rounded-md ml-5 border border-black'
                onClick={() => setOpenExistingRoomPopup(true)}
            >
                Join Room
            </button>

            <button className='bg-primary text-white px-4 py-2 rounded-md ml-5'
                onClick={() => setOpenPopup(true)}
            >
                Create Room
            </button>
        </div>
        <div className='p-5'>
            <h2
                className='font-bold text-2xl mb-4'
            >Rooms</h2>
            <div className='flex flex-wrap gap-4'>
                {
                    rooms.length === 0 ? (
                        <p>No rooms joined yet.</p>
                    ) : (
                        rooms.map((room, index) => (
                            <Card key={index} data={room}  />
                        ))
                    )
                }
            </div>
        </div>
        {openPopup && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='bg-white p-6 rounded-md w-80'>
                    <h2 className='text-xl font-bold mb-4 text-black'>Create New Room</h2>
                    <input
                        type="text"
                        placeholder="Room Name"
                        className='w-full border border-gray-300 p-2 rounded-md mb-4 text-black'
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Room ID"
                        className='w-full border border-gray-300 p-2 rounded-md mb-4 text-black'
                        value={newRoom.roomId}
                        onChange={(e) => setNewRoom({...newRoom, roomId: e.target.value})}
                    />
                    <div className='flex justify-end gap-2'>
                        <button
                            className='bg-gray-300 text-black px-4 py-2 rounded-md'
                            onClick={() => setOpenPopup(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-primary text-white px-4 py-2 rounded-md'
                            onClick={() => {
                                createRoom(newRoom);
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        )}

        {openExistingRoomPopup && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='bg-white p-6 rounded-md w-80'>
                    <h2 className='text-xl font-bold mb-4 text-black'>Join Existing Room</h2>
                    <input
                        type="text"
                        placeholder="Room ID"
                        className='w-full border border-gray-300 p-2 rounded-md mb-4 text-black'
                        value={existingRoomId}
                        onChange={(e) => setExistingRoomId(e.target.value)}
                    />  
                    <div className='flex justify-end gap-2'>
                        <button
                            className='bg-gray-300 text-black px-4 py-2 rounded-md'
                            onClick={() => setOpenExistingRoomPopup(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-primary text-white px-4 py-2 rounded-md'
                            onClick={() => JoinExistingRoom(existingRoomId)}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        )}
                    

    </div>
  )
}

export default Profile