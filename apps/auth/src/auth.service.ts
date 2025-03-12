import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDTO } from './dto/signup,dto';
import { User } from '../../../libs/shared/src/schema/users.schema';
import { ROLE } from '../../../libs/shared/src/enums/role.enum';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly usersModel: Model<User>,
    ) { }


    async createUser(payload: SignupDTO): Promise<User> {
        try {
            const response = await this.usersModel.create(payload);

            return response ? response as User : null;
        } catch (error) {
            console.error(`Something went wrong at database end`, error.message);
            return null;
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const response = await this.usersModel.findOne({ email });

            return response ? response as User : null;
        } catch (error) {
            console.error(`Something went wrong at database end`, error.message);
            return null;
        }
    }

    async deleteByEmail(email: string): Promise<boolean> {
        try {
            const response = await this.usersModel.deleteOne({ email });

            return response ? response.deletedCount > 0 : false;
        } catch (error) {
            console.error(`Something went wrong at database end`, error.message);
            return null;
        }
    }

    async updateByRoleToAdmin(email: string): Promise<boolean> {
        try {
            const response = await this.usersModel.updateOne({ email }, {
                $set: {
                    role: ROLE.ADMIN
                }
            });

            return response ? response.modifiedCount > 0 : false;
        } catch (error) {
            console.error(`Something went wrong at database end`, error.message);
            return null;
        }
    }

}
