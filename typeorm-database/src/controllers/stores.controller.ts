import express, { Response, Request } from "express";
import { Store } from "../entity/store";
import { FindConditions, getRepository, Equal, QueryRunnerProviderAlreadyReleasedError, Like } from "typeorm";
import { number } from "joi";
import {authPage, authName, authAddress} from "../Joi/validation_schema";


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
        // const checkPage = await authPage.validateAsync({page})
        // const checkName = await authName.validateAsync({name})
        
        if (page) {
            result.skip = (page - 1) * result.take
        }

        if (name) {
        result.where.name = Like("%"+ name +"%")
        }

    } catch(err) {
        res.sendStatus(404);
    }

        const data = await repository.find(result);
        res.status(200).send(data);
}


export const postStores = async function (req: Request, res: Response) {
    const name : string = (req.query.name as string);
    const address: string = (req.query.address as string);
    
    try {
        await authName.validateAsync({name})
        await authAddress.validateAsync({address})
        //verificacion de que ambas son string y no se ingresan numbers

        const repository = getRepository(Store);

        if (await repository.findOne({name, address})) {
            res.status(422).send({message: 'there is already a store with that name/ address'});
        } else {

        const newStore = new Store;
        newStore.name = name;
        newStore.address = address;
        repository.save(newStore);
        res.sendStatus(201);
        }

    } catch (err) {
        res.sendStatus(404).send({"error": err, "message": 'Something went wrong!'});
    }
    //trycatch no hace nada y tira error unhandled promise rejection
}

export const deleteStores = async function (req: Request, res: Response) {
    const repository = getRepository(Store);
    const date: Date = new Date();
    const id = req.query!;

    try {
        await authPage.validateAsync(id);
        //verficacion que se ingresa un number x req.query
        //verificar si esa tienda ya fue dada de baja, en caso que si, mandar error
        const idResult = await repository.findOneOrFail(id);
            if (idResult) {
                repository.softDelete(id);
                idResult.deleted_at = date;
                res.sendStatus(201);
            } else {
                res.status(404).send({message: 'already deleted'});
            }
    } catch (err) {
        res.status(404).send({message: 'The id requested was not found or has a character'})
    }
    //trycatch error
}