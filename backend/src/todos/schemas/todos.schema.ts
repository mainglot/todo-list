import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type TodosDocument = HydratedDocument<Todos>;

@Schema()
export class Todos {
    @Prop()
    id: number;

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