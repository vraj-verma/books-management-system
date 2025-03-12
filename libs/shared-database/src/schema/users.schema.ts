import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ROLE } from "../enums/role.enum";

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.userId = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
})
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: String, enum: Object.values(ROLE), default: ROLE.REGULAR })
    role: ROLE;

}

export const UsersSchema = SchemaFactory.createForClass(User);