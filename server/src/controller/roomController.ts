import RoomID from "../Models/roomId";

export const CreateRoom = async (req: any, res: any) => {
    try {
        const { name, roomId } = req.body;

        // Check if roomId already exists
        const existingRoom = await RoomID.findOne({ roomId });
        if (existingRoom) {
            return res.status(400).json({ message: "Room ID already exists" });
        }

        // Create new room
        const newRoom = new RoomID({ roomName: name, roomId, createdBy: req.userId });
        await newRoom.save();
        res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const GetJoinedRooms = async (req: any, res: any) => {
    try {
        const rooms = await RoomID.find({ createdBy: req.userId });

        const memberInRooms = await RoomID.find({ members: req.userId });

        rooms.push(...memberInRooms.filter(room => !rooms.includes(room)));

        const formattedRooms = rooms.map(room => ({
            name: room.roomName,
            roomId: room.roomId
        }));
        res.status(200).json({ rooms: formattedRooms });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const JoinExistingRoom = async (req: any, res: any) => {
    try {
        const { roomId } = req.body;
        const room = await RoomID.findOne({ roomId });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Add user to room members if not already a member
        if (room.members.includes(req.userId)) {
            return res.status(400).json({ message: "Already a member of the room" });
        }

        room.members.push(req.userId);
        await room.save();

        res.status(200).json({ message: "Joined room successfully", room: { name: room.roomName, roomId: room.roomId } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const LeaveRoom = async (req: any, res: any) => {
    try {
        const { roomId } = req.body;
        const room = await RoomID.findOne({ roomId });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Remove user from room members
        room.members = room.members.filter(memberId => memberId.toString() !== req.userId);
        await room.save();
        res.status(200).json({ message: "Left room successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}