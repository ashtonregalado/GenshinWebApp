"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = document.getElementById("searchButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = document.getElementById("searchInput").value;
    try {
        const response = yield fetch(`http://localhost:3000/api/data?name=${encodeURIComponent(searchTerm)}`);
        const data = yield response.json();
        const resultDiv = document.getElementById("result");
        if (data.length > 0) {
            resultDiv.innerHTML = data
                .map((char) => `
                <div>
                  <h3>${char.char_name}</h3>
                  <p>Region: ${char.region}</p>
                  <p>Vision: ${char.vision}</p>
                  <p>Weapon: ${char.weapon}</p>
                </div>`)
                .join("");
        }
        else {
            resultDiv.innerHTML = "No character found.";
        }
    }
    catch (error) {
        console.error("Error fetching character data:", error);
    }
}));
(_b = document
    .getElementById("addCharacterForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const char_name = document.getElementById("charInput")
        .value;
    const region = document.getElementById("regionInput")
        .value;
    const vision = document.getElementById("visionInput")
        .value;
    const weapon = document.getElementById("weaponInput")
        .value;
    try {
        const response = yield fetch("http://localhost:3000/api/add-character", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ char_name, region, vision, weapon }),
        });
        if (response.ok) {
            const newCharacter = yield response.json();
            console.log("Character added:", newCharacter);
            alert("Character added successfully!");
            // Optionally, clear the input fields after successful submission
            document.getElementById("addCharacterForm").reset();
        }
        else {
            console.error("Error adding character:", response.statusText);
            alert("Failed to add character.");
        }
    }
    catch (error) {
        console.error("Error:", error);
        alert("Failed to add character.");
    }
}));
(_c = document.getElementById("deleteButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const DeleteInput = document.getElementById("delete")
        .value;
    if (!DeleteInput) {
        alert("Please enter a character name to delete.");
        return;
    }
    const response = yield fetch(`http://localhost:3000/api/delete-character`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ char_name: DeleteInput }),
    });
    const result = yield response.text();
    if (response.ok) {
        alert(result); // Success message from server
    }
    else {
        alert(`Error: ${result}`); // Error message from server
    }
}));
