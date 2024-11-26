//ts file
import { GenshinCharacter } from "../../type";

async function fetchCharacters() {
  try {
    const response = await fetch("http://localhost:3000/api/characters");
    const characters = await response.json();

    const characterList = document.getElementById("characterList");
    characterList.innerHTML = characters
      .map(
        (char: GenshinCharacter) =>
          `
            <div>
                <h3>${char.char_name}</h3>
                <p>Region: ${char.region}</p>
                <p>Vision: ${char.vision}</p>
                <p>Weapon: ${char.weapon}</p>
        
            </div>
            `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

fetchCharacters();
