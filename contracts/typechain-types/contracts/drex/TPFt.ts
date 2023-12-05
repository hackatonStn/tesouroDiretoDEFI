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
} from "../../common";

export declare namespace ITPFt {
  export type TPFtDataStruct = {
    acronym: string;
    code: string;
    maturityDate: BigNumberish;
  };

  export type TPFtDataStructOutput = [
    acronym: string,
    code: string,
    maturityDate: bigint
  ] & { acronym: string; code: string; maturityDate: bigint };
}

export interface TPFtInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "AUCTION_PLACEMENT_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "DIRECT_PLACEMENT_ROLE"
      | "FREEZER_ROLE"
      | "MINTER_ROLE"
      | "allowAuctionPlacement"
      | "allowDirectPlacement"
      | "allowFreezingPlacement"
      | "allowTPFtMint"
      | "balanceOf"
      | "balanceOfBatch"
      | "createTPFt"
      | "decreaseFrozenBalance"
      | "directPlacement"
      | "disableAddress"
      | "enableAddress"
      | "getRoleAdmin"
      | "getTPFtId"
      | "grantRole"
      | "hasRole"
      | "increaseFrozenBalance"
      | "isApprovedForAll"
      | "isEnabledAddress"
      | "mint"
      | "pause"
      | "paused"
      | "renounceRole"
      | "revokeRole"
      | "safeBatchTransferFrom"
      | "safeTransferFrom"
      | "setApprovalForAll"
      | "supportsInterface"
      | "unpause"
      | "uri"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ApprovalForAll"
      | "CreatedTPFt"
      | "FrozenBalance"
      | "Paused"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "TransferBatch"
      | "TransferSingle"
      | "URI"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "AUCTION_PLACEMENT_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DIRECT_PLACEMENT_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FREEZER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINTER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowAuctionPlacement",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allowDirectPlacement",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allowFreezingPlacement",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allowTPFtMint",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [AddressLike[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "createTPFt",
    values: [ITPFt.TPFtDataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseFrozenBalance",
    values: [AddressLike, ITPFt.TPFtDataStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "directPlacement",
    values: [AddressLike, AddressLike, ITPFt.TPFtDataStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "disableAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "enableAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTPFtId",
    values: [ITPFt.TPFtDataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseFrozenBalance",
    values: [AddressLike, ITPFt.TPFtDataStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isEnabledAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, ITPFt.TPFtDataStruct, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish[],
      BigNumberish[],
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;

  decodeFunctionResult(
    functionFragment: "AUCTION_PLACEMENT_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DIRECT_PLACEMENT_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FREEZER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINTER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowAuctionPlacement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowDirectPlacement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowFreezingPlacement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowTPFtMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createTPFt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseFrozenBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "directPlacement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disableAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTPFtId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseFrozenBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isEnabledAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
}

export namespace ApprovalForAllEvent {
  export type InputTuple = [
    account: AddressLike,
    operator: AddressLike,
    approved: boolean
  ];
  export type OutputTuple = [
    account: string,
    operator: string,
    approved: boolean
  ];
  export interface OutputObject {
    account: string;
    operator: string;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CreatedTPFtEvent {
  export type InputTuple = [id: BigNumberish, tpftData: ITPFt.TPFtDataStruct];
  export type OutputTuple = [id: bigint, tpftData: ITPFt.TPFtDataStructOutput];
  export interface OutputObject {
    id: bigint;
    tpftData: ITPFt.TPFtDataStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FrozenBalanceEvent {
  export type InputTuple = [from: AddressLike, balance: BigNumberish];
  export type OutputTuple = [from: string, balance: bigint];
  export interface OutputObject {
    from: string;
    balance: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferBatchEvent {
  export type InputTuple = [
    operator: AddressLike,
    from: AddressLike,
    to: AddressLike,
    ids: BigNumberish[],
    values: BigNumberish[]
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    ids: bigint[],
    values: bigint[]
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    ids: bigint[];
    values: bigint[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferSingleEvent {
  export type InputTuple = [
    operator: AddressLike,
    from: AddressLike,
    to: AddressLike,
    id: BigNumberish,
    value: BigNumberish
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    id: bigint,
    value: bigint
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    id: bigint;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace URIEvent {
  export type InputTuple = [value: string, id: BigNumberish];
  export type OutputTuple = [value: string, id: bigint];
  export interface OutputObject {
    value: string;
    id: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface TPFt extends BaseContract {
  connect(runner?: ContractRunner | null): TPFt;
  waitForDeployment(): Promise<this>;

  interface: TPFtInterface;

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

  AUCTION_PLACEMENT_ROLE: TypedContractMethod<[], [string], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DIRECT_PLACEMENT_ROLE: TypedContractMethod<[], [string], "view">;

  FREEZER_ROLE: TypedContractMethod<[], [string], "view">;

  MINTER_ROLE: TypedContractMethod<[], [string], "view">;

  allowAuctionPlacement: TypedContractMethod<
    [member: AddressLike],
    [void],
    "nonpayable"
  >;

  allowDirectPlacement: TypedContractMethod<
    [member: AddressLike],
    [void],
    "nonpayable"
  >;

  allowFreezingPlacement: TypedContractMethod<
    [member: AddressLike],
    [void],
    "nonpayable"
  >;

  allowTPFtMint: TypedContractMethod<
    [member: AddressLike],
    [void],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<
    [account: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;

  balanceOfBatch: TypedContractMethod<
    [accounts: AddressLike[], ids: BigNumberish[]],
    [bigint[]],
    "view"
  >;

  createTPFt: TypedContractMethod<
    [tpftData: ITPFt.TPFtDataStruct],
    [void],
    "nonpayable"
  >;

  decreaseFrozenBalance: TypedContractMethod<
    [
      from: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  directPlacement: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  disableAddress: TypedContractMethod<
    [member: AddressLike],
    [void],
    "nonpayable"
  >;

  enableAddress: TypedContractMethod<
    [member: AddressLike],
    [void],
    "nonpayable"
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  getTPFtId: TypedContractMethod<
    [tpftData: ITPFt.TPFtDataStruct],
    [bigint],
    "view"
  >;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  increaseFrozenBalance: TypedContractMethod<
    [
      from: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  isApprovedForAll: TypedContractMethod<
    [account: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;

  isEnabledAddress: TypedContractMethod<
    [member: AddressLike],
    [boolean],
    "view"
  >;

  mint: TypedContractMethod<
    [
      receiverAddress: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  safeBatchTransferFrom: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  safeTransferFrom: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setApprovalForAll: TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  uri: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "AUCTION_PLACEMENT_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DIRECT_PLACEMENT_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "FREEZER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "MINTER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "allowAuctionPlacement"
  ): TypedContractMethod<[member: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowDirectPlacement"
  ): TypedContractMethod<[member: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowFreezingPlacement"
  ): TypedContractMethod<[member: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowTPFtMint"
  ): TypedContractMethod<[member: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<
    [account: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "balanceOfBatch"
  ): TypedContractMethod<
    [accounts: AddressLike[], ids: BigNumberish[]],
    [bigint[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "createTPFt"
  ): TypedContractMethod<
    [tpftData: ITPFt.TPFtDataStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "decreaseFrozenBalance"
  ): TypedContractMethod<
    [
      from: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "directPlacement"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "disableAddress"
  ): TypedContractMethod<[member: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "enableAddress"
  ): TypedContractMethod<[member: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getTPFtId"
  ): TypedContractMethod<[tpftData: ITPFt.TPFtDataStruct], [bigint], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "increaseFrozenBalance"
  ): TypedContractMethod<
    [
      from: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isApprovedForAll"
  ): TypedContractMethod<
    [account: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isEnabledAddress"
  ): TypedContractMethod<[member: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [
      receiverAddress: AddressLike,
      tpftData: ITPFt.TPFtDataStruct,
      tpftAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "safeBatchTransferFrom"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setApprovalForAll"
  ): TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "uri"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getEvent(
    key: "ApprovalForAll"
  ): TypedContractEvent<
    ApprovalForAllEvent.InputTuple,
    ApprovalForAllEvent.OutputTuple,
    ApprovalForAllEvent.OutputObject
  >;
  getEvent(
    key: "CreatedTPFt"
  ): TypedContractEvent<
    CreatedTPFtEvent.InputTuple,
    CreatedTPFtEvent.OutputTuple,
    CreatedTPFtEvent.OutputObject
  >;
  getEvent(
    key: "FrozenBalance"
  ): TypedContractEvent<
    FrozenBalanceEvent.InputTuple,
    FrozenBalanceEvent.OutputTuple,
    FrozenBalanceEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "TransferBatch"
  ): TypedContractEvent<
    TransferBatchEvent.InputTuple,
    TransferBatchEvent.OutputTuple,
    TransferBatchEvent.OutputObject
  >;
  getEvent(
    key: "TransferSingle"
  ): TypedContractEvent<
    TransferSingleEvent.InputTuple,
    TransferSingleEvent.OutputTuple,
    TransferSingleEvent.OutputObject
  >;
  getEvent(
    key: "URI"
  ): TypedContractEvent<
    URIEvent.InputTuple,
    URIEvent.OutputTuple,
    URIEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "ApprovalForAll(address,address,bool)": TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;
    ApprovalForAll: TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;

    "CreatedTPFt(uint256,tuple)": TypedContractEvent<
      CreatedTPFtEvent.InputTuple,
      CreatedTPFtEvent.OutputTuple,
      CreatedTPFtEvent.OutputObject
    >;
    CreatedTPFt: TypedContractEvent<
      CreatedTPFtEvent.InputTuple,
      CreatedTPFtEvent.OutputTuple,
      CreatedTPFtEvent.OutputObject
    >;

    "FrozenBalance(address,uint256)": TypedContractEvent<
      FrozenBalanceEvent.InputTuple,
      FrozenBalanceEvent.OutputTuple,
      FrozenBalanceEvent.OutputObject
    >;
    FrozenBalance: TypedContractEvent<
      FrozenBalanceEvent.InputTuple,
      FrozenBalanceEvent.OutputTuple,
      FrozenBalanceEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "TransferBatch(address,address,address,uint256[],uint256[])": TypedContractEvent<
      TransferBatchEvent.InputTuple,
      TransferBatchEvent.OutputTuple,
      TransferBatchEvent.OutputObject
    >;
    TransferBatch: TypedContractEvent<
      TransferBatchEvent.InputTuple,
      TransferBatchEvent.OutputTuple,
      TransferBatchEvent.OutputObject
    >;

    "TransferSingle(address,address,address,uint256,uint256)": TypedContractEvent<
      TransferSingleEvent.InputTuple,
      TransferSingleEvent.OutputTuple,
      TransferSingleEvent.OutputObject
    >;
    TransferSingle: TypedContractEvent<
      TransferSingleEvent.InputTuple,
      TransferSingleEvent.OutputTuple,
      TransferSingleEvent.OutputObject
    >;

    "URI(string,uint256)": TypedContractEvent<
      URIEvent.InputTuple,
      URIEvent.OutputTuple,
      URIEvent.OutputObject
    >;
    URI: TypedContractEvent<
      URIEvent.InputTuple,
      URIEvent.OutputTuple,
      URIEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
