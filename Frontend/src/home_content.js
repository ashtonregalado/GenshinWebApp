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
Object.defineProperty(exports, "__esModule", { value: true });
function fetchCharacters() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/characters");
            const characters = yield response.json();
            const characterList = document.getElementById("characterList");
            characterList.innerHTML = characters
                .map((char) => `
            <div>
                <h3>${char.char_name}</h3>
                <p>Region: ${char.region}</p>
                <p>Vision: ${char.vision}</p>
                <p>Weapon: ${char.weapon}</p>
        
            </div>
            `)
                .join("");
        }
        catch (error) {
            console.error("Error fetching characters:", error);
        }
    });
}
fetchCharacters();
