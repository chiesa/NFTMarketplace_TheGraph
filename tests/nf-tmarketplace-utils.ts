import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NFTSold,
  NFTlisted,
  listDeleted,
  withdrawSuccess
} from "../generated/NFTmarketplace/NFTmarketplace"

export function createNFTSoldEvent(
  from: Address,
  to: Address,
  _tokenId: BigInt,
  _nftAddress: Address
): NFTSold {
  let nftSoldEvent = changetype<NFTSold>(newMockEvent())

  nftSoldEvent.parameters = new Array()

  nftSoldEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "_nftAddress",
      ethereum.Value.fromAddress(_nftAddress)
    )
  )

  return nftSoldEvent
}

export function createNFTlistedEvent(
  _NFTContract: Address,
  _tokenId: BigInt,
  _price: BigInt,
  seller: Address
): NFTlisted {
  let nfTlistedEvent = changetype<NFTlisted>(newMockEvent())

  nfTlistedEvent.parameters = new Array()

  nfTlistedEvent.parameters.push(
    new ethereum.EventParam(
      "_NFTContract",
      ethereum.Value.fromAddress(_NFTContract)
    )
  )
  nfTlistedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  nfTlistedEvent.parameters.push(
    new ethereum.EventParam("_price", ethereum.Value.fromUnsignedBigInt(_price))
  )
  nfTlistedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return nfTlistedEvent
}

export function createlistDeletedEvent(
  _NFTContract: Address,
  _tokenId: BigInt,
  seller: Address
): listDeleted {
  let listDeletedEvent = changetype<listDeleted>(newMockEvent())

  listDeletedEvent.parameters = new Array()

  listDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "_NFTContract",
      ethereum.Value.fromAddress(_NFTContract)
    )
  )
  listDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  listDeletedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listDeletedEvent
}

export function createwithdrawSuccessEvent(
  _to: Address,
  amount: BigInt
): withdrawSuccess {
  let withdrawSuccessEvent = changetype<withdrawSuccess>(newMockEvent())

  withdrawSuccessEvent.parameters = new Array()

  withdrawSuccessEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  withdrawSuccessEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawSuccessEvent
}
