import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true}
)

const recordModel = mongoose.model("record", recordSchema);
export default recordModel;