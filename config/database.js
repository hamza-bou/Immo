import mongoose from "mongoose";

let connected = false;

const connectdb = async() => {
    mongoose.set('strictQuery', true);

    if (connected) {
        console.log("MongoDB already connected !!");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        connected = true;
        console.log("mongodb connected !!");
    } catch (err) {
        console.log(err);
    }
}

export default connectdb;