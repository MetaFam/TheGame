/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web3ContextType } from '#contexts/Web3Context';

export interface GameProperties {
  name: string;
  startingElement: string;
  assets?: any;
  elements: any;
  jumpers: any;
  attributes: any;
  connections?: any;
  components?: any;
}

export type GamePropertiesType = GameProperties;

export interface IGameContext {
  game: GameProperties;
  gameState: (place?: string, reset?: boolean) => IGameState['state'];
  handleChoice: (choice: string) => Promise<string | void>;
  reset: () => boolean;
  visited: (increment?: boolean) => string;
  mint: () => Promise<any>;
  disconnect: Web3ContextType['disconnect'];
  txLoading: boolean;
  account: string;
  network?: number;
  connected: Web3ContextType['connected'];
  connecting: Web3ContextType['connecting'];
}

export interface IComponentsObject {
  [key: string]: IComponent;
}

export interface IComponent {
  name: string;
  assets: IAsset[] | null;
  root?: boolean;
  attributes: IAttributesObject[];
  children: string[];
}

export interface IAttributesObject {
  [key: string]: IAttribute;
}
export interface IAttribute {
  name: string | null;
  value: IAttributeValue;
}

export interface IAttributeValue {
  data: string | number | [] | null;
  type: string;
}
export interface IElementsObject {
  [key: string]: IElement;
}

export interface IElement {
  components: IComponent[] | null;
  content: string;
  outputs: string[] | null;
  theme: string;
  title: string;
}

export interface IConnectionsObject {
  [key: string]: IConnection;
}

export interface IConnection {
  label: string;
  sourceType: string;
  sourceId: string;
  targetType: string;
  targetid: string;
  theme: string;
  type: string;
}

export interface IJumpersObject {
  [key: string]: IJumper;
}
export interface IJumper {
  elementId: string;
}

export interface IAssetsObject {
  [key: string]: IAsset;
}

export interface IAsset {
  name?: AssetType['name'];
  type?: AssetType['type'];
  root?: AssetType['root'];
  children?: AssetType['children'];
}

export type AssetType = {
  name?: string;
  type?: string;
  root?: boolean;
  children?: string[];
};

export interface IGameOptions {
  name: string;
  currentState: string;
}

export interface IGameState {
  state: string | null;
}
