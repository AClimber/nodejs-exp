const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true,
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function addToCart(course) {
    const items = [...this.cart.items];
    const index = items.findIndex(item => item.courseId.toString() === course.id.toString());

    if (index >= 0) {
        items[index].count++;
    } else {
        items.push({
            courseId: course._id,
            count: 1
        });
    }

    this.cart = {items};

    return this.save();
};

userSchema.methods.removeFromCart = function removeFromCart(id) {
    let items = [...this.cart.items];
    const index = items.findIndex(item => {
        return item.courseId.toString() === id.toString();
    });

    if (items[index].count === 1) {
        items = items.filter(item => item.courseId.toString() !== id.toString());
    } else {
        items[index].count--;
    }
    this.cart = {items};

    return this.save();
};

userSchema.methods.clearCart = function clearCart() {
    this.cart= {items: []};
    return this.save();
};

module.exports = model('User', userSchema);
