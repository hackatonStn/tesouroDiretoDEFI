// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/**
 * @title Interface for TesouroDireto Contract
 *
 * Esta interface define as funcionalidades do contrato TesouroDireto, um contrato inteligente
 * baseado no Ethereum que implementa a lógica de um pool de liquidez para troca de tokens.
 *
 * Principais características:
 * 1. Criação de Pool de Liquidez: Permite a criação de novos pools de liquidez com parâmetros específicos.
 * 2. Adição de Liquidez: Usuários podem adicionar liquidez a um pool existente, recebendo tokens de liquidez em troca.
 * 3. Cálculo de Tokens de Liquidez: Calcula a quantidade de tokens de liquidez a serem emitidos com base no valor depositado no pool.
 * 4. Swap de Tokens: Permite a troca de tokens dentro do pool, com taxas de swap aplicáveis.
 * 5. Consulta de Pools: Fornece informações sobre pools de liquidez específicos.
 * 6. Suporte a Interfaces: Verifica o suporte para interfaces específicas pelo contrato.
 *
 * A constante 'k' no contexto de pools de liquidez é um conceito chave nos Automated Market Makers (AMMs).
 * Em um pool de liquidez AMM, 'k' é o produto das quantidades de dois tipos de tokens no pool (k = tokenA * tokenB).
 * Esta constante é usada para manter a relação de troca entre os tokens, garantindo que o pool permaneça balanceado.
 */

interface ITesouroDireto {
    // Evento emitido quando um novo pool de liquidez é criado
    event newLiquidityPool(uint256 indexed id, LiquidityPool pool);

    // Evento emitido quando liquidez é adicionada a um pool existente
    event LiquidityAdded(address sender, uint256 poolId, uint256 amountTokenA, uint256 amountRealTokenizado, uint256 amountLiquidity);

    // Evento emitido após uma operação de swap bem-sucedida
    event swapped(address sender, uint256 id, uint256 amountIn, uint256 amountOut, bool isTokenAToRealDigital, uint256 newPrice);

    // Estrutura representando um pool de liquidez no contrato
    struct LiquidityPool {
        uint256 tokenA;
        uint256 reserveA;
        uint256 reserveReal;
        uint256 totalSupplyLP;
        uint256 priceA;
        uint256 swapFee;
    }

    // Cria um novo pool de liquidez
    function createLiquidtyPool(uint256 tokenA, uint256 initialPriceA, uint256 swapFee) external;

    // Adiciona liquidez a um pool existente
    function addLiquidtyPool(uint256 liquidityPoolID, uint256 amountA) external;

    // Calcula a quantidade de tokens de liquidez a serem emitidos para um determinado valor de depósito
    function calculateLiquidityTokens(uint256 realTokenizadoAmount, LiquidityPool memory pool) external pure returns (uint256);

    // Realiza uma operação de swap entre tokens no pool especificado
    function swap(uint256 poolId, uint256 amountIn, bool isTokenAToRealDigital, uint256 minAmountOut) external;

    // Retorna os detalhes de um pool de liquidez específico
    function getPool(uint256 poolId) external view returns (LiquidityPool memory);

 
}
