/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace ITesouroDireto {
  export type LiquidityPoolStruct = {
    tokenA: BigNumberish;
    reserveA: BigNumberish;
    reserveReal: BigNumberish;
    totalSupplyLP: BigNumberish;
    priceA: BigNumberish;
    swapFee: BigNumberish;
  };

  export type LiquidityPoolStructOutput = [
    tokenA: bigint,
    reserveA: bigint,
    reserveReal: bigint,
    totalSupplyLP: bigint,
    priceA: bigint,
    swapFee: bigint
  ] & {
    tokenA: bigint;
    reserveA: bigint;
    reserveReal: bigint;
    totalSupplyLP: bigint;
    priceA: bigint;
    swapFee: bigint;
  };
}

export interface ITesouroDiretoInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addLiquidtyPool"
      | "calculateLiquidityTokens"
      | "createLiquidtyPool"
      | "getPool"
      | "swap"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "LiquidityAdded" | "newLiquidityPool" | "swapped"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addLiquidtyPool",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateLiquidityTokens",
    values: [BigNumberish, ITesouroDireto.LiquidityPoolStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "createLiquidtyPool",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPool",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [BigNumberish, BigNumberish, boolean, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidtyPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateLiquidityTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createLiquidtyPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
}

export namespace LiquidityAddedEvent {
  export type InputTuple = [
    sender: AddressLike,
    poolId: BigNumberish,
    amountTokenA: BigNumberish,
    amountRealTokenizado: BigNumberish,
    amountLiquidity: BigNumberish
  ];
  export type OutputTuple = [
    sender: string,
    poolId: bigint,
    amountTokenA: bigint,
    amountRealTokenizado: bigint,
    amountLiquidity: bigint
  ];
  export interface OutputObject {
    sender: string;
    poolId: bigint;
    amountTokenA: bigint;
    amountRealTokenizado: bigint;
    amountLiquidity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace newLiquidityPoolEvent {
  export type InputTuple = [
    id: BigNumberish,
    pool: ITesouroDireto.LiquidityPoolStruct
  ];
  export type OutputTuple = [
    id: bigint,
    pool: ITesouroDireto.LiquidityPoolStructOutput
  ];
  export interface OutputObject {
    id: bigint;
    pool: ITesouroDireto.LiquidityPoolStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace swappedEvent {
  export type InputTuple = [
    sender: AddressLike,
    id: BigNumberish,
    amountIn: BigNumberish,
    amountOut: BigNumberish,
    isTokenAToRealDigital: boolean,
    newPrice: BigNumberish
  ];
  export type OutputTuple = [
    sender: string,
    id: bigint,
    amountIn: bigint,
    amountOut: bigint,
    isTokenAToRealDigital: boolean,
    newPrice: bigint
  ];
  export interface OutputObject {
    sender: string;
    id: bigint;
    amountIn: bigint;
    amountOut: bigint;
    isTokenAToRealDigital: boolean;
    newPrice: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ITesouroDireto extends BaseContract {
  connect(runner?: ContractRunner | null): ITesouroDireto;
  waitForDeployment(): Promise<this>;

  interface: ITesouroDiretoInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addLiquidtyPool: TypedContractMethod<
    [liquidityPoolID: BigNumberish, amountA: BigNumberish],
    [void],
    "nonpayable"
  >;

  calculateLiquidityTokens: TypedContractMethod<
    [
      realTokenizadoAmount: BigNumberish,
      pool: ITesouroDireto.LiquidityPoolStruct
    ],
    [bigint],
    "view"
  >;

  createLiquidtyPool: TypedContractMethod<
    [tokenA: BigNumberish, initialPriceA: BigNumberish, swapFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  getPool: TypedContractMethod<
    [poolId: BigNumberish],
    [ITesouroDireto.LiquidityPoolStructOutput],
    "view"
  >;

  swap: TypedContractMethod<
    [
      poolId: BigNumberish,
      amountIn: BigNumberish,
      isTokenAToRealDigital: boolean,
      minAmountOut: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addLiquidtyPool"
  ): TypedContractMethod<
    [liquidityPoolID: BigNumberish, amountA: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "calculateLiquidityTokens"
  ): TypedContractMethod<
    [
      realTokenizadoAmount: BigNumberish,
      pool: ITesouroDireto.LiquidityPoolStruct
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "createLiquidtyPool"
  ): TypedContractMethod<
    [tokenA: BigNumberish, initialPriceA: BigNumberish, swapFee: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getPool"
  ): TypedContractMethod<
    [poolId: BigNumberish],
    [ITesouroDireto.LiquidityPoolStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "swap"
  ): TypedContractMethod<
    [
      poolId: BigNumberish,
      amountIn: BigNumberish,
      isTokenAToRealDigital: boolean,
      minAmountOut: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "LiquidityAdded"
  ): TypedContractEvent<
    LiquidityAddedEvent.InputTuple,
    LiquidityAddedEvent.OutputTuple,
    LiquidityAddedEvent.OutputObject
  >;
  getEvent(
    key: "newLiquidityPool"
  ): TypedContractEvent<
    newLiquidityPoolEvent.InputTuple,
    newLiquidityPoolEvent.OutputTuple,
    newLiquidityPoolEvent.OutputObject
  >;
  getEvent(
    key: "swapped"
  ): TypedContractEvent<
    swappedEvent.InputTuple,
    swappedEvent.OutputTuple,
    swappedEvent.OutputObject
  >;

  filters: {
    "LiquidityAdded(address,uint256,uint256,uint256,uint256)": TypedContractEvent<
      LiquidityAddedEvent.InputTuple,
      LiquidityAddedEvent.OutputTuple,
      LiquidityAddedEvent.OutputObject
    >;
    LiquidityAdded: TypedContractEvent<
      LiquidityAddedEvent.InputTuple,
      LiquidityAddedEvent.OutputTuple,
      LiquidityAddedEvent.OutputObject
    >;

    "newLiquidityPool(uint256,tuple)": TypedContractEvent<
      newLiquidityPoolEvent.InputTuple,
      newLiquidityPoolEvent.OutputTuple,
      newLiquidityPoolEvent.OutputObject
    >;
    newLiquidityPool: TypedContractEvent<
      newLiquidityPoolEvent.InputTuple,
      newLiquidityPoolEvent.OutputTuple,
      newLiquidityPoolEvent.OutputObject
    >;

    "swapped(address,uint256,uint256,uint256,bool,uint256)": TypedContractEvent<
      swappedEvent.InputTuple,
      swappedEvent.OutputTuple,
      swappedEvent.OutputObject
    >;
    swapped: TypedContractEvent<
      swappedEvent.InputTuple,
      swappedEvent.OutputTuple,
      swappedEvent.OutputObject
    >;
  };
}