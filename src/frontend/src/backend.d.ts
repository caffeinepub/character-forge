import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Character {
    id: bigint;
    gameSystem: string;
    name: string;
    race: string;
    archetype: string;
    gender: string;
    avatarId: bigint;
}
export interface backendInterface {
    createCharacter(name: string, gameSystem: string, race: string, gender: string, archetype: string, avatarId: bigint): Promise<bigint>;
    deleteCharacter(id: bigint): Promise<void>;
    getAllCharacters(): Promise<Array<Character>>;
    getCharacter(id: bigint): Promise<Character>;
}
