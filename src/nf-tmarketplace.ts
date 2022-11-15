import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NFTSold,
  NFTlisted,
  listDeleted,
} from "../generated/NFTmarketplace/NFTmarketplace"
import { ActiveItem, ItemListed, ItemCanceled, ItemBought } from "../generated/schema"

export function handleNFTSold(event: NFTSold): void {
  // prendiamo la struttura che abbiamo costruito per ItemBought e creiamo un elemente con un random ID definito dal tokenId e del nftAddress
  let itemBought = ItemBought.load(getIdFromEventParams(event.params._tokenId, event.params._nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params._tokenId, event.params._nftAddress))
  if(!itemBought){
    itemBought = new ItemBought(
      getIdFromEventParams(event.params._tokenId, event.params._nftAddress)
    )
  }
  itemBought.buyer = event.params.to 
  itemBought.nftAddress = event.params._nftAddress
  itemBought.tokenId = event.params._tokenId
  activeItem!.buyer = event.params.to
  itemBought.save()

  activeItem!.save()
  
}

export function handleNFTlisted(event: NFTlisted): void {
  let itemListed = ItemListed.load(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  if(!itemListed){
    itemListed = new ItemListed(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  }
  if(!activeItem){
    activeItem = new ActiveItem(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  }
  itemListed.seller = event.params.seller
  activeItem.seller = event.params.seller

  itemListed.nftAddress = event.params._NFTContract
  activeItem.nftAddress = event.params._NFTContract

  itemListed.tokenId = event.params._tokenId
  activeItem.tokenId = event.params._tokenId

  itemListed.price = event.params._price
  activeItem.price = event.params._price
  
  activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")
  
  itemListed.save()
  activeItem.save()
}

export function handlelistDeleted(event: listDeleted): void {
  let itemCanceled = ItemCanceled.load(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  if(!itemCanceled){
    itemCanceled = new ItemCanceled(getIdFromEventParams(event.params._tokenId, event.params._NFTContract))
  }
  itemCanceled.seller = event.params.seller
  itemCanceled.nftAddress = event.params._NFTContract
  itemCanceled.tokenId = event.params._tokenId
  // se impostiamo il dead address significa che l'item è stata cancellata
  activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD") // this the dead address

  itemCanceled.save()
  activeItem!.save()
}


function getIdFromEventParams(tokenId:BigInt,NftAddress:Address): string{
  return tokenId.toHexString() + NftAddress.toHexString()
}