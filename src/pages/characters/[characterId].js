import NavBar from "@/components/navbar";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { getCharacterById } from "../../services/characterService";
import Loading from "@/components/loading";

export default function Character() {

  const router = useRouter();
  const characterId = router.query.characterId;
  const [character, setCharacter] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    handleGetCharacter(characterId);
  }, [characterId]);

  const handleGetCharacter = (characterId) => {
    if (!characterId)
      return;

    setShowLoading(true);
    getCharacterById(characterId)
      .then(data => {
        setCharacter(data?.results[0]);
      }).finally(() => {
        setShowLoading(false);
      });
  }

  return (
    <>
      <NavBar />
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <main className="px-3">
            <img className="" src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} />
            <h1>{character.name}</h1>
            <p className="lead">{character.description}</p>
            {!character.description && <p className="lead">This character do not have description!</p>}
          </main>
        </div>
      </div>
      {showLoading && <Loading />}
    </>
  )
}