## NFT MARKETPLACE FRONT-END THEGRAPH
L'obiettivo è quello di creare le seguenti pagine:
1. home page:
	in questa pagina si mostra gli NFT recentementi listati. Per questa sezione:
		- se sei l'owner del NFT, puoi aggiornare i dati listati
		- se no, puoi comprare l'NFT
2. sell page:
	- in questa pagina si possono vendere gli NFT e quindi listare 
	- è possibile fare i withdraw
	
Inoltre viene creato un header standard per tutte le pagine.

### THEGRAPH: 
Allo scopo di creare questa dApp vengono registrati gli eventi che avvengono sul contratto deployato all'indirizzo: `0xa232A29941e2Daf1BEb2B5d033c66073045FfE62`
Per impostare thegraph viene seguita la guida: https://thegraph.com/studio/subgraph/nft-marketplace/
Una volta terminato il processo avremo: 
    - abi, 
    - generated: dove compiliamo il codice graph, 
    - node-modules, 
    - src: dove definiamo e comunichiamo a the graph co me approciarsi al contratto, 
    - network.json: network information, 
    - package.json, 
    - schema.graphQL,
    - subgraph.yaml come combinare i file assieme, 
    - tsconfig.json
In primo luogo in `schema.graphql` si può creare le tabelle che vogliamo (`ActiveItem`, `ItemListed`, `ItemCanceled`, `ItemBought`). Puoi con `graph codegen` aggiorno alcuni file.
Poi in `src/nf-tmarketplace.ts` definisco come mappare e salvare gli eventi che ho.
Nota: andiamo su etherscan e prendiamo il `Block` di partenza dove viene deployato il contratto che osserviamo e in `subgraph.yaml` aggiungiamo `startBlock: XXXX` dove XXXX è il #Block-1 . Cosi facendo si fa partire subgraph da quando il contratto è stato generato e non dalla genesi di ethereum.

## deploy subgraph
Per far questo procediamo con i comandi suggeriti sempre da the graph in https://thegraph.com/studio/subgraph/nft-marketplace/ e cioè:
graph auth --studio e50a251bb0756834adc1466aacd1fc44
graph codegen && graph build
graph deploy --studio nft-marketplace

  NFTmarketplace,
  NFTSold,
  NFTlisted,
  listDeleted,
  listingUpdate,
  withdrawSuccess