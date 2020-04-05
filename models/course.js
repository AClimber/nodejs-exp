const {Schema, model} = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

courseSchema.method('toClient', function toClient() {
    const course = this.toObject();

    course.id = course._id;
    delete course._id;
});

module.exports = model('Course', courseSchema);
