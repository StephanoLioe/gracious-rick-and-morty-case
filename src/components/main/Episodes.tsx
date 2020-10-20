import React, { useState } from "react";
import { useQuery } from "react-query";
import { CharacterItem } from "../character/CharacterItem";

const getCharacterId = (character: string) => {
  const splittedArr = character.split("/");
  return splittedArr[splittedArr.length - 1];
};

const getCharacterIds = (characters: string[]) => {
  if (characters.length <= 0) {
    return [];
  }
  return characters.map(getCharacterId);
};

interface IEpisodeListProps {
  setCharacterIds: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedEpisode: React.Dispatch<React.SetStateAction<IEpisode | null>>;
  selectedEpisode: IEpisode | null;
}

const EpisodeList: React.FC<IEpisodeListProps> = ({
  setCharacterIds,
  setSelectedEpisode,
  selectedEpisode = null,
}) => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["episodes", page], () =>
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`).then((res) =>
      res.json()
    )
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }

  const handleCharacterIds = (characters: string[]): void => {
    const charIdsArr = getCharacterIds(characters);
    setCharacterIds(charIdsArr);
  };

  const handleNextPage = () => {
    setPage((page: number) => page + 1);
  };
  const handlePrevPage = () => {
    setPage((page: number) => page - 1);
  };

  const hasNext = data.info.next ? true : false;
  const hasPrev = data.info.prev ? true : false;

  return (
    <div className="list">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <button disabled={!hasPrev} onClick={handlePrevPage}>
          {"<"}
        </button>
        <button disabled={!hasNext} onClick={handleNextPage}>
          {">"}
        </button>
      </div>
      {data &&
        data.results &&
        data.results.map((episode: IEpisode) => (
          <div
            className={`context-list ${
              episode.id === selectedEpisode?.id ? "active" : ""
            }`}
            key={episode.id}
            onClick={() => {
              handleCharacterIds(episode.characters);
              setSelectedEpisode(episode);
            }}
          >
            {episode.name}
          </div>
        ))}
    </div>
  );
};

export const Episodes: React.FC = () => {
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );

  const handleSetSeleced = (character: ICharacter) => {
    setSelectedCharacter((prev) =>
      prev?.id === character.id ? null : character
    );
  };

  return (
    <div className="main episode">
      <EpisodeList
        setCharacterIds={setCharacterIds}
        setSelectedEpisode={setSelectedEpisode}
        selectedEpisode={selectedEpisode}
      />
      <div className="content">
        {characterIds.length > 0 &&
          characterIds.map((characterId: string) => (
            <CharacterItem
              key={characterId}
              characterId={characterId}
              selectedCharacter={selectedCharacter}
              setSelectedCharacter={handleSetSeleced}
            />
          ))}
      </div>
    </div>
  );
};
