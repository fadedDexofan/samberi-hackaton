import Koa from "koa";
import { getRepository } from "typeorm";
import { Buy } from "../db/entity/Buy";
import { Consumer } from "../db/entity/Consumer";

export default async function getById(
  ctx: Koa.Context,
  uuid: string,
): Promise<Buy | undefined> {
  const consumerRepository = getRepository(Consumer);
  const updatedConsumer = await consumerRepository.findOneOrFail(
    ctx.params.id,
    {
      relations: [
        "buys",
        "buys.consumer",
        "buys.goods",
        "buys.sharedConsumer",
        "sharedBuys",
        "sharedBuys.goods",
        "sharedBuys.consumer",
      ],
    },
  );
  const consumer = updatedConsumer.buys.filter((val) => val.uuid === uuid);
  if (!consumer.length) {
    return undefined;
  }
  return consumer[0];
}
