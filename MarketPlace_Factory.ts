import hre from "hardhat"
import { ethers } from "hardhat";
import {
    time
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";




async function main() {
    
    
    const [deployer, user1, user2] = await hre.ethers.getSigners();

    const assetPrice = 3
    const myAsset = {
        name: "Shoe",
        price: assetPrice,

    }

   



        const MarketPlace = await ethers.getContractFactory("MarketPlace");
        const marketPlace = await MarketPlace.connect(deployer).deploy()
        
        const  MarketPlaceFactory = await ethers.getContractFactory("MarketPlace_Factory");
        
        const marketPlaceFactoryTx = await MarketPlaceFactory.connect(deployer).deploy(marketPlace)

    

    const marketPlaceFactoryInstance = await hre.ethers.getContractAt("MarketPlace_Factory", marketPlaceFactoryTx);


     //starting scripting

     console.log("########### deploying claim faucet ##########")

     const deployMarketPlaceContTx1 =  await marketPlaceFactoryInstance.connect(user1).deployMarketPlace();
 
     deployMarketPlaceContTx1.wait();
 
     console.log({"MarketPlaceCont 1 deployed to": deployMarketPlaceContTx1})
 
     const deployMarketPlaceContTx2 = await marketPlaceFactoryInstance
     .connect(user1)
     .deployMarketPlace();
 
     deployMarketPlaceContTx2.wait();
 
     console.log({"MarketPlaceCont 1 deployed to": deployMarketPlaceContTx2})
 
     console.log("######## Getting the  length and data of deployed MarketPlace Contracts ########");
 
     const getLengthOfDeployedContract = await marketPlaceFactoryInstance.getLengthOfDeployedContract();
 
     console.log({"Length of MarketPlace Contract": getLengthOfDeployedContract.toString()});
 
 
     const getUserContracts = await marketPlaceFactoryInstance.connect(user1).getUserDeployedContracts();
 
     console.table(getUserContracts);
 
     console.log("######## Getting User Deployed MarketPlace by Index ########");
 
     const {deployer_: deployerA, deployedContract_: deployedContractA} = await marketPlaceFactoryInstance
     .connect(user1)
     .getUserDeployedContractByIndex(0);
 
     const {deployer_: deployerB, deployedContract_: deployedContractB} = await marketPlaceFactoryInstance
     .connect(user2)
     .getUserDeployedContractByIndex(1);
 
 
     console.log([{"Deployer": deployerA, "Deployed Contract Address": deployedContractA},
                 {"Deployer": deployerB, "Deployed Contract Address": deployedContractB},
             ]);
 
 
 
 
 
 
     
 }
 
 main().catch((error) => {
     console.error(error);
     process.exitCode = 1
 })