import express, { Response, Request } from "express";
import { Store } from "../entity/store";
import { FindConditions, getRepository, Equal, QueryRunnerProviderAlreadyReleasedError, Like, SimpleConsoleLogger } from "typeorm";
import { number } from "joi";
import { authId, auth, authPage} from "../Joi/validation_schema";


export const getStores = async function (req: Request, res: Response) {
    const repository = await getRepository(Store);
    const page: number = Number(req.query.page as string);
    const name: string = (req.query.name as string);

    const result = {
        where: {},
        take: 10,
        skip: 0,
    } as any

    try{    
        
        await authPage.validateAsync({page});

        if (page) {
            result.skip = (page - 1) * result.take
        }
        

        if (name) {
            result.where.name = Like("%"+ name +"%");
        }
    
        const data = await repository.findAndCount(result);
        return res.status(200).send(data);

    } catch(err) {
        res.sendStatus(404).send({message: err});
    }
}


export const postStores = async function (req: Request, res: Response) {
    const name : string = (req.query.name as string);
    const address: string = (req.query.address as string);

    try {
        await auth.validateAsync({name, address});
        const repository = await getRepository(Store);

        if (await repository.findOne({name, address})) {
           return res.status(422).send({message: 'there is already a store with that name/ address'});
        } else {
            const newStore = new Store;
            newStore.name = name;
            newStore.address = address;
            await repository.save(newStore);
            res.sendStatus(201);
        }
        
    } catch (err) {
        res.sendStatus(404).send({message: err})
    }
}

export const deleteStores = async function (req: Request, res: Response) {
    const repository = getRepository(Store);
    const date: Date = new Date();
    const id: number = Number(req.query.id as string);

    try {
        await authId.validateAsync({id});

        const idResult = await repository.findOneOrFail({id});
            if (idResult && idResult.deleted_at === null) {
                await repository.softDelete(id);
                idResult.deleted_at = date;
                res.sendStatus(201);
            } else {
                res.status(404).send({message: 'already deleted'});
            }
    } catch (err) {
        res.status(404).send({message: 'there was an error, please try again', err})
    }
}