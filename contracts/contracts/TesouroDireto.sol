// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// import "@openzeppelin/contracts/utils/math/Math.sol";
import "hardhat/console.sol";

import "./drex/ITPFt.sol";
import "./drex/RealTokenizado.sol";
import "./ITesouroDireto.sol";

contract TesouroDireto is ITesouroDireto, AccessControl, ERC1155 {
    ITPFt private tPFt;
    RealTokenizado private realTokenizado;
    address private tPFtManager;

    mapping(uint256 => LiquidityPool) public liquidityPools; // mapeamento dos pools de liquidez
    uint256 private liquidityPoolsSequence = 1;

    bytes32 public constant CREATOR_LIQUIIDITY_POOL_ROLE =
        keccak256("CREATOR_LIQUIIDITY_POOL_ROLE");

    constructor(
        address _RealTokenizado,
        address _TPFT,
        address _TPFtManager
    ) ERC1155("url") {
        tPFt = ITPFt(_TPFT);
        realTokenizado = RealTokenizado(_RealTokenizado);
        tPFtManager = _TPFtManager;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CREATOR_LIQUIIDITY_POOL_ROLE, msg.sender);
        _grantRole(CREATOR_LIQUIIDITY_POOL_ROLE, _TPFtManager);
    }

    function createLiquidtyPool(
        uint256 tokenA,
        uint256 initialPriceA,
        uint256 swapFee
    ) public onlyRole(CREATOR_LIQUIIDITY_POOL_ROLE) {
        LiquidityPool memory pool = LiquidityPool(
            tokenA,
            0,
            0,
            0,
            initialPriceA,
            swapFee
        );
        liquidityPools[liquidityPoolsSequence] = pool;
        emit newLiquidityPool(liquidityPoolsSequence, pool);
        liquidityPoolsSequence++;
    }

    function addLiquidtyPool(uint256 liquidityPoolID, uint256 amountA) public {
        LiquidityPool storage pool = liquidityPools[liquidityPoolID];
        require(pool.tokenA > 0, unicode"Pool não existe");
        require(amountA > 0, "Quantidade de tokenA deve ser maior que zero");

        uint256 realDigitalValue = 0;

        if (pool.totalSupplyLP == 0) {
            realDigitalValue = (amountA * pool.priceA) / 1e8;
        } else {
            realDigitalValue = (amountA * pool.reserveReal) / pool.reserveA;
        }
        console.log("totalSupplyLP", pool.totalSupplyLP);
        console.log("amountA", amountA);
        console.log(" pool.initialPriceA",  pool.priceA);
        console.log("realDigitalValue", realDigitalValue);
        require(
            realTokenizado.balanceOf(msg.sender) >= realDigitalValue,
            "Saldo de Real Digital insuficiente"
        );
        require(
            tPFt.balanceOf( msg.sender, pool.tokenA) >= amountA,
            "Saldo de TPFt insuficiente"
        );

        // deve ter allowance para o contrato
        realTokenizado.transferFrom(msg.sender, tPFtManager, realDigitalValue);

        uint256 amountLP = calculateLiquidityTokens(realDigitalValue, pool);

        pool.reserveA += amountA;
        pool.reserveReal += realDigitalValue;

        //necessita da role DIRECT_PLACEMENT_ROLE no contrato TPFt
        tPFt.safeTransferFrom(
            msg.sender,
            tPFtManager,
            pool.tokenA,
            amountA,
            ""
        );

        _mint(msg.sender, liquidityPoolID, amountLP, "");
        pool.totalSupplyLP += amountLP;
        emit LiquidityAdded( msg.sender,liquidityPoolID, amountA, realDigitalValue, amountLP);
    }

    function calculateLiquidityTokens(
        uint256 realTokenizadoAmount,
        LiquidityPool memory pool
    ) public pure returns (uint256) {
        // Se o pool é novo, a quantidade de tokens de liquidez pode ser igual ao montante de um dos tokens,
        if (pool.totalSupplyLP == 0) {
            return realTokenizadoAmount; // Exemplo simplificado
        }
        // Se o pool já tem liquidez, calculamos a proporção baseada nas reservas existentes
        else {
            uint256 liquidityTokenAmount = (realTokenizadoAmount *
                pool.totalSupplyLP) / pool.reserveReal;
            return liquidityTokenAmount;
        }
    }

    function swap(
        uint256 poolId,
        uint256 amountIn,
        bool isTokenAToRealDigital,
        uint256 minAmountOut
    ) public {
        LiquidityPool storage pool = liquidityPools[poolId];

        uint256 amountOut;
        if (isTokenAToRealDigital) {
            // Token A para Real Digital
            amountOut = getAmountOut(
                amountIn,
                pool.reserveA,
                pool.reserveReal,
                pool.swapFee
            );
            require(amountOut >= minAmountOut, "Slippage limit exceeded");
            // Transferir Token A do usuário para o pool
            tPFt.safeTransferFrom(
                msg.sender,
                tPFtManager,
                pool.tokenA,
                amountIn,
                ""
            );

            // Transferir Real Digital do pool para o usuário
            realTokenizado.transferFrom(tPFtManager, msg.sender, amountOut);
            liquidityPools[poolId].reserveA += amountIn;
            liquidityPools[poolId].reserveReal -= amountOut;
        } else {
            // DREX para Token A

            amountOut = getAmountOut(
                amountIn,
                pool.reserveReal,
                pool.reserveA,
                pool.swapFee
            );
            require(amountOut >= minAmountOut, "Slippage limit exceeded");
            require(amountOut <= pool.reserveA, "Insufficient liquidity");

            // Transferir Token A do pool para o usuário
           tPFt.safeTransferFrom(
                tPFtManager,
                msg.sender,
                pool.tokenA,
                amountOut,
                ""
            );

            // Transferir DREX do usuário para o pool
            require(
                realTokenizado.transferFrom(
                    msg.sender,
                    tPFtManager,
                    amountIn
                ),
                unicode"Transferência de DREX falhou"
            );

            liquidityPools[poolId].reserveA -= amountOut;
            liquidityPools[poolId].reserveReal += amountIn;

            
        }
            uint256 newPrice = (pool.reserveReal * 1e8) / pool.reserveA;
        emit swapped(msg.sender, poolId, amountIn, amountOut, false, newPrice);
    }

        // Função para calcular a quantidade de saída com base na quantidade de entrada, reservas e taxa de swap
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut,
        uint256 swapFee
    ) private pure returns (uint256) {
        require(amountIn > 0, "Invalid input amount");
        require(reserveIn > 0 && reserveOut > 0, "Invalid pool reserves");

        // uint256 amountFee = amountIn * swapFee / 1e8;
        uint256 amountInWithFee = (amountIn * (1e8 - swapFee)) / 1e8;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = reserveIn + amountInWithFee;

        return numerator / denominator;
    }

    // Implementing the inherited functions from ERC1155 and AccessControl
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getPool( uint256 poolId) public view returns (LiquidityPool memory) {
        return liquidityPools[poolId];
    }
}
