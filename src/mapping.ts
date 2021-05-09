import { BigInt } from "@graphprotocol/graph-ts";
import {
  Contract,
  BuyerUpdated,
  ProductCreated,
  ProductPurchased,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../generated/Contract/Contract";
import { Buyer, Product, Purchase, Seller } from "../generated/schema";

export function handleBuyerUpdated(event: BuyerUpdated): void {
  let entity = new Buyer(event.transaction.from.toHex());
  entity.metadata = event.params.metadata;
  entity.save();
}

export function handleProductCreated(event: ProductCreated): void {
  let entity = new Product(event.params.productId.toHex());
  entity.metadata = event.params.metadata;
  entity.price = event.params.price;
  entity.seller = event.params.sellerAddres.toHex();
  entity.createdOn = event.block.timestamp;
  entity.save();

  let seller = new Seller(event.params.sellerAddres.toHex());
  seller.save();
}

export function handleProductPurchased(event: ProductPurchased): void {
  let entity = new Purchase(event.transaction.hash.toHex());
  entity.timestamp = event.block.timestamp;
  entity.product = event.params.productId.toHex();
  entity.buyer = event.params.buyer.toHex();

  let product = Product.load(event.params.productId.toHex());
  entity.seller = product.seller;

  entity.save();

  let buyer = new Buyer(event.params.buyer.toHex());
  buyer.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}
