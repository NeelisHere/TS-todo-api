import mongoose from 'mongoose'

const databaseURL = process.env.MONGO_URI || 'mongodb+srv://npaulbe19:12345@cluster-xy.vfml1ip.mongodb.net/?retryWrites=true&w=majority'

const connectDB = () => {
    mongoose.connect(databaseURL)
        .then(() => console.log('Connected to database...'))
        .catch((err) => console.log(err))
}

export default connectDB