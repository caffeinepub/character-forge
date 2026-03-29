import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

actor {
  type Character = {
    id : Nat;
    name : Text;
    gameSystem : Text; // "DnD" or "Shadowrun"
    race : Text;
    gender : Text;
    archetype : Text; // Class for DnD, archetype for Shadowrun
    avatarId : Nat;
  };

  module Character {
    public func compare(c1 : Character, c2 : Character) : Order.Order {
      Nat.compare(c1.id, c2.id);
    };
  };

  var nextId = 0;
  let characters = Map.empty<Nat, Character>();

  func getCharacterInternal(id : Nat) : Character {
    switch (characters.get(id)) {
      case (null) { Runtime.trap("Character not found") };
      case (?character) { character };
    };
  };

  public shared ({ caller }) func createCharacter(name : Text, gameSystem : Text, race : Text, gender : Text, archetype : Text, avatarId : Nat) : async Nat {
    let id = nextId;
    nextId += 1;

    let character : Character = {
      id;
      name;
      gameSystem;
      race;
      gender;
      archetype;
      avatarId;
    };

    characters.add(id, character);
    id;
  };

  public query ({ caller }) func getCharacter(id : Nat) : async Character {
    getCharacterInternal(id);
  };

  public query ({ caller }) func getAllCharacters() : async [Character] {
    characters.values().toArray().sort();
  };

  public shared ({ caller }) func deleteCharacter(id : Nat) : async () {
    ignore getCharacterInternal(id); // Ensure character exists
    characters.remove(id);
  };
};
