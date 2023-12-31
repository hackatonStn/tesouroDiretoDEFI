"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITPFt__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                indexed: false,
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
        ],
        name: "CreatedTPFt",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
        ],
        name: "FrozenBalance",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "TransferBatch",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "URI",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "balanceOfBatch",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
        ],
        name: "createTPFt",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "tpftAmount",
                type: "uint256",
            },
        ],
        name: "decreaseFrozenBalance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "tpftAmount",
                type: "uint256",
            },
        ],
        name: "directPlacement",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
        ],
        name: "getTPFtId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "tpftAmount",
                type: "uint256",
            },
        ],
        name: "increaseFrozenBalance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiverAddress",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "acronym",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "code",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "maturityDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ITPFt.TPFtData",
                name: "tpftData",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "tpftAmount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeBatchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class ITPFt__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ITPFt__factory = ITPFt__factory;
ITPFt__factory.abi = _abi;
