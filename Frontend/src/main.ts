import { GenshinCharacter } from "../../type";

document.getElementById("searchButton")?.addEventListener("click", async () => {
  const searchTerm = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value;

  try {
    const response = await fetch(
      `http://localhost:3000/api/data?name=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();

    const resultDiv = document.getElementById("result");
    if (data.length > 0) {
      resultDiv.innerHTML = data
        .map(
          (char: GenshinCharacter) => `
                <div>
                  <h3>${char.char_name}</h3>
                  <p>Region: ${char.region}</p>
                  <p>Vision: ${char.vision}</p>
                  <p>Weapon: ${char.weapon}</p>
                </div>`
        )
        .join("");
    } else {
      resultDiv.innerHTML = "No character found.";
    }
  } catch (error) {
    console.error("Error fetching character data:", error);
  }
});

document
  .getElementById("addCharacterForm")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const char_name = (document.getElementById("charInput") as HTMLInputElement)
      .value;
    const region = (document.getElementById("regionInput") as HTMLInputElement)
      .value;
    const vision = (document.getElementById("visionInput") as HTMLInputElement)
      .value;
    const weapon = (document.getElementById("weaponInput") as HTMLInputElement)
      .value;

    try {
      const response = await fetch("http://localhost:3000/api/add-character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ char_name, region, vision, weapon }),
      });

      if (response.ok) {
        const newCharacter = await response.json();
        console.log("Character added:", newCharacter);
        alert("Character added successfully!");
        // Optionally, clear the input fields after successful submission
        (
          document.getElementById("addCharacterForm") as HTMLFormElement
        ).reset();
      } else {
        console.error("Error adding character:", response.statusText);
        alert("Failed to add character.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add character.");
    }
  });

document.getElementById("deleteButton")?.addEventListener("click", async () => {
  const DeleteInput = (document.getElementById("delete") as HTMLInputElement)
    .value;

  if (!DeleteInput) {
    alert("Please enter a character name to delete.");
    return;
  }

  const response = await fetch(`http://localhost:3000/api/delete-character`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ char_name: DeleteInput }),
  });

  const result = await response.text();

  if (response.ok) {
    alert(result); // Success message from server
  } else {
    alert(`Error: ${result}`); // Error message from server
  }
});
