import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type TodosDocument = HydratedDocument<Todos>;

@Schema()
export class Todos {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    description: string;

    @Prop({
        default: false,
    })
    done: boolean;

    @Prop({
        default: false,
    })
    deleted: boolean;
}

export const TodosSchema = SchemaFactory.createForClass(Todos);