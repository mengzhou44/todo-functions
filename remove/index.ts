import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {MongoClient} from 'mongodb'

const url = 'mongodb://mengcosmosdb:vSfiCmG6GGxSKHLSVh0dbgpv1Sd3Y8dsbkB1A5TPxkRqskzUv1crI8ofvfiDaPZyFcHSF98eOAgAACDbwemVzQ==@mengcosmosdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mengcosmosdb@'

const client = new MongoClient(url)

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    
    await client.connect()
 
    let db = client.db('mydb')
    let collection = db.collection('todos')
   
    const {_id} = req.body; 
    context.log(_id)
    await collection.deleteOne({ _id })

    context.res = {
        body: 'deleted!'
    };

};

export default httpTrigger;