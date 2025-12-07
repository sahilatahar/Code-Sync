import mongoose from "mongoose";

const roomIDSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    roomName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

const RoomID = mongoose.model('RoomID', roomIDSchema);

export default RoomID;