import React from "react";
import { useQuery } from "react-query";
import "./characterItem.css";

interface ICharacterProps {
  characterId: string;
  selectedCharacter: ICharacter | null;
  setSelectedCharacter: (character: ICharacter) => void;
}

export const CharacterItem: React.FC<ICharacterProps> = ({
  characterId,
  selectedCharacter = null,
  setSelectedCharacter,
}) => {
  const { data, status } = useQuery<ICharacter>(
    ["character", characterId],
    () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      ).then((res) => res.json())
  );

  if (status === "loading") {
    // TODO handle loading
    return null;
  }
  if (status === "error") {
    // TODO handle error
    return null;
  }

  if (!data) {
    return null;
  }
  const selected = data.id === selectedCharacter?.id;
  const name = selected ? `name: ${data.name}` : data.name;
  return (
    <div
      onClick={() => setSelectedCharacter(data)}
      className={`character-list-item${selected ? " selected" : ""}`}
    >
      <img src={data.image} />
      <div className="character-list-item--content">
        <div>{name}</div>
        {selected && <CharacterContent character={data} />}
      </div>
    </div>
  );
};

const CharacterContent = ({ character }: { character: ICharacter }) => {
  const { data: origin, status: statusOrigin } = useQuery<ILocation>(
    ["origin", character.origin.url],
    () => fetch(character.origin.url).then((res) => res.json())
  );
  const { data: location, status: statusLocation } = useQuery<ILocation>(
    ["location", character.location.url],
    () => fetch(character.location.url).then((res) => res.json())
  );
  return (
    <div>
      <div>Species: {character.species}</div>
      <div>Gender: {character.gender}</div>
      {location && <div>Location: {location.name}</div>}
      {origin && <div>Origin: {origin.name}</div>}
      <div>Species: {character.species}</div>
      <div>Status: {character.status}</div>
    </div>
  );
};
