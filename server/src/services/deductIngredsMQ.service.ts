import amqp, { Channel, Connection } from "amqplib"
import config from "../config";
import { IngredientToReduce } from "../interfaces/deductIngredient.interface";
import { DeliveryBoxToReduce } from "../interfaces/deductDeliveryBox.interface";
import { deductIngredientsFromOrder } from "../models/ingredient/ingredient.query";
import { deductDeliveryBoxesFromOrder } from "../models/deliveryBox/deliveryBox.query";


const queue = "marketplaceToInventory"
let connection: Connection;
let channel: Channel;

// Connect and Create rabbit mq channel and connection
export async function connectAndConsumeMQDataToReduceIngreds() {

    try {
        const ampqServer = config.AMQP_URL
        connection = await amqp.connect(ampqServer)
        channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false })

        await channel.consume(queue, async (data) => {
            if (data) {
                console.log('data has come');
                const order = JSON.parse(data.content.toString())
                // console.log('Ingreds to deduct From Queue', order);
                const { orderType, restaurantId, ingredientsToReduce, deliveryBoxesToReduce } = order;
                console.log('data that has come from skeleton/kds to minus from inventory', ingredientsToReduce);


                const orderWithIngredients = { orderType: orderType, restaurantId: restaurantId, ingredientsToReduce: ingredientsToReduce as IngredientToReduce[] };
                const orderWithDeliveryBoxes = { orderType: orderType, restaurantId: restaurantId, deliveryBoxesToReduce: deliveryBoxesToReduce as DeliveryBoxToReduce[] };
                console.log('orderWithDeliveryBoxes', orderWithDeliveryBoxes);



                await deductIngredientsFromOrder(orderWithIngredients);
                // if (orderWithDeliveryBoxes.deliveryBoxesToReduce.length !== 0) {
                //   await deductDeliveryBoxesFromOrder(orderWithDeliveryBoxes);
                // }

            }
        }, { noAck: true })

    } catch (err) {
        console.log(err);
    }
}


// Close rabbitmq connection and channel
export async function closeMQConnection() {
    try {
        if (connection) await connection.close()
        if (channel) await channel.close()

    } catch (error) {
        console.log(error);
    }
}

