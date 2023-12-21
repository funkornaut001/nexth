// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {TaxLossHarvester} from "../src/TaxLossHarvester.sol"; 
import {console2} from "forge-std/Test.sol";

contract DeployTaxLossHarvester is Script {
    function run() external {
        vm.startBroadcast();

        // Set the initial parameters for the TaxLossHarvester constructor
        address companyWallet = 0x9768818565ED5968fAACC6F66ca02CBf2785dB84; 

        // Deploy the TaxLossHarvester contract
        TaxLossHarvester harvester = new TaxLossHarvester(companyWallet);

        console2.log("TaxLossHarvester deployed at:", address(harvester));

        vm.stopBroadcast();
    }
}
