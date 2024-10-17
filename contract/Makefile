-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil zktest

build:
	forge build

compile:
	forge compile

test:; forge test -vvv

format:; forge fmt

clean:; forge clean && forge cache clean

deploy: 
	forge create --rpc-url $(RPC_URL_LOCAL) --private-key $(LOCAL_PRIVATE_KEY)  src/JokeDapp.sol:JokeDapp --constructor-args 1 300

deploy-test: 
	forge script script/DeployJoke.s.sol:DeployJoke --rpc-url $(RPC_URL_LOCAL) --private-key $(LOCAL_PRIVATE_KEY) --broadcast

# deploy-sepolia: 
# 	forge script script/DeployFundMe.s.sol:DeployFundMe --rpc-url $(SEPOLIA_RPC_URL) --private-key $(SEPOLIA_PRIVATE_KEY) --broadcast -vvv

