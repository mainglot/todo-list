import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    age: number;

    @Prop()
    token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);