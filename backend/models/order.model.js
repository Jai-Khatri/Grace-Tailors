import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "name of the customer is required"],
    },
    address:{
        type:String,
        required:[true, "Address of the customer is required"]
    },
    date:{
        type:String,
        required:[true, "Date of the order is required"]
    },
    phoneNo:{
        type:Number,
        required:[true, "Phone number of the customer is required"],
        unique: true
    },
    customerId:{
        type:Number,
        required: [true, "Customer ID of the customer is required"],
        unique:true
    },
    pant:{
        measurements:[
            {
                length:{type:Number},

                waist:{type:Number},

                hips:{type:Number},

                forkLength:{type:Number},

                thighs:{type:Number},

                calf:{type:Number},

                bottom:{type:Number}
            }
        ],
        type:{
            type:String,
        }
    },
    shirt:{
        measurements:[
            {
                length:{type: Number},

                chest:{type:Number},

                abs:{type:Number},

                hips:{type:Number},

                sleevelength:{type:Number},

                arms:{type:Number},

                shoulder:{type:Number},

                collar:{type:Number}
            }
        ],
        type:{
            type:String,
        },
    },

    deliveryDate:{type:String},

    balance:{ type:Number},

    advanceAmount:{ type:Number},

    totalAmount:{ type:Number}

} , 
{versionKey: false , timestamps: true}
)

const Order = mongoose.model("Order" , orderSchema);

export default Order;