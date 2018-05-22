import { getRepository } from "typeorm";
import { Buy } from "../db/entity/Buy";
import { Consumer } from "../db/entity/Consumer";

export default async function getConsumerById(
  consumerId: number,
): Promise<Consumer | undefined> {
  const consumerRepository = getRepository(Consumer);
  const consumer = await consumerRepository.findOne(consumerId, {
    relations: ["currentShop"],
  });
  return consumer;
}
