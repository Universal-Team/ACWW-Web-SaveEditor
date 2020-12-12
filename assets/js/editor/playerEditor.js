/*
	This file is part of ACWW Web SaveEditor.
	Copyright (C) 2020 by Universal-Team.

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Additional Terms 7.b and 7.c of GPLv3 apply to this file:
		* Requiring preservation of specified reasonable legal notices or
		  author attributions in that material or in the Appropriate Legal
		  Notices displayed by works containing it.
		* Prohibiting misrepresentation of the origin of that material,
		  or requiring that modified versions of such material be marked in
		  reasonable ways as different from the original version.
*/

let activePlayer, pNum = 0;

import { getRandomNumber } from '../main.js';
import { Item } from '../core/item.js';
import { Player } from '../core/player.js';
import { Pattern } from '../core/pattern.js';
import { sav, RawData, SavData, SaveSav } from '../utils/savutils.js';
import { InitializePatternEditor, LoadPattern } from './patternEditor.js';

/* Player switch. */
document.getElementById("Player 0").onclick = () => LoadPlayer(0);
document.getElementById("Player 1").onclick = () => LoadPlayer(1);
document.getElementById("Player 2").onclick = () => LoadPlayer(2);
document.getElementById("Player 3").onclick = () => LoadPlayer(3);

/* Playername. */
document.getElementById("PlayerName").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetName(document.getElementById("PlayerName").value);
};

/* Wallet. */
document.getElementById("WalletAmount").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetWallet(document.getElementById("WalletAmount").value);
};
document.getElementById("MinWallet").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("WalletAmount").value = 0;
		activePlayer.SetWallet(document.getElementById("WalletAmount").value);
	}
};
document.getElementById("MaxWallet").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("WalletAmount").value = 99999;
		activePlayer.SetWallet(document.getElementById("WalletAmount").value);
	}
};
document.getElementById("RandomWallet").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("WalletAmount").value = getRandomNumber(0, 99999);
		activePlayer.SetWallet(document.getElementById("WalletAmount").value);
	}
};

/* Bank. */
document.getElementById("BankAmount").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetBank(document.getElementById("BankAmount").value);
};
document.getElementById("MinBank").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("BankAmount").value = 0;
		activePlayer.SetBank(document.getElementById("BankAmount").value);
	}
};
document.getElementById("MaxBank").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("BankAmount").value = 999999999;
		activePlayer.SetBank(document.getElementById("BankAmount").value);
	}
};
document.getElementById("RandomBank").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("BankAmount").value = getRandomNumber(0, 999999999);
		activePlayer.SetWallet(document.getElementById("BankAmount").value);
	}
};

/* Gender. */
document.getElementById("Gender").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetGender(document.getElementById("Gender").value);
};
document.getElementById("RandomGender").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("Gender").value = getRandomNumber(1, 2) - 1; // 1, 2 seems to be more random than 0, 1.
		activePlayer.SetGender(document.getElementById("Gender").value);
	}
};

/* Facetype. */
document.getElementById("Facetype").onchange = function() {
	if (activePlayer && activePlayer.Exist())  {
		activePlayer.SetFace(document.getElementById("Facetype").value);
		document.getElementById("FacetypePrev").src = "./assets/images/faces/" + activePlayer.GetFace().toString() + ".png";
	}
};
document.getElementById("RandomFacetype").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {

		document.getElementById("Facetype").value = (activePlayer.GetGender() ? (getRandomNumber(8, 15)) : (getRandomNumber(0, 7)));
		activePlayer.SetFace(document.getElementById("Facetype").value);
		document.getElementById("FacetypePrev").src = "./assets/images/faces/" + activePlayer.GetFace().toString() + ".png";
	}
};

/* Hairstyle. */
document.getElementById("Hairstyle").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetHairstyle(document.getElementById("Hairstyle").value);
};
document.getElementById("RandomHairstyle").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("Hairstyle").value = (activePlayer.GetGender() ? (getRandomNumber(8, 15)) : (getRandomNumber(0, 7)));
		activePlayer.SetHairstyle(document.getElementById("Hairstyle").value);
	}
};

/* Haircolor. */
document.getElementById("Haircolor").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetHaircolor(document.getElementById("Haircolor").value);
};
document.getElementById("RandomHaircolor").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("Haircolor").value = getRandomNumber(0, 6);
		activePlayer.SetHaircolor(document.getElementById("Haircolor").value);
	}
};

/* Tan. */
document.getElementById("Tan").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetTan(document.getElementById("Tan").value);
};
document.getElementById("RandomTan").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("Tan").value = getRandomNumber(3, 0);
		activePlayer.SetTan(document.getElementById("Tan").value);
	}
};

/* Pocket Item Handling. */
document.getElementById("PocketGrid").onclick = () => CheckPocketClick();
function CheckPocketClick() {
	if (activePlayer && activePlayer.Exist()) { // Check if exist first!
		const items = document.getElementById('PocketGrid').children;

		for (let i = 0; i < 15; i++) {
			items[i].onclick = function() {
				activePlayer.SetPocketItem(i, document.getElementById("ItemList").value);
				document.getElementById("PocketGrid").replaceChild(activePlayer.GetPocketItem(i, 35, "ItemOutline").canvas, items[i]);
			}
		}
	}
};

/* Dresser Item Handling. */
document.getElementById("DresserBox1").onclick = () => CheckDresserClick(0);
document.getElementById("DresserBox2").onclick = () => CheckDresserClick(1);
document.getElementById("DresserBox3").onclick = () => CheckDresserClick(2);
document.getElementById("DresserBox4").onclick = () => CheckDresserClick(3);
document.getElementById("DresserBox5").onclick = () => CheckDresserClick(4);
document.getElementById("DresserBox6").onclick = () => CheckDresserClick(5);
function CheckDresserClick(box) {
	if (activePlayer && activePlayer.Exist()) { // Check if exist first!
		const items = document.getElementById('DresserBox' + (box + 1).toString()).children;

		for (let i = 0; i < 15; i++) {
			items[i].onclick = function() {
				activePlayer.SetDresserItem(i + (box * 15), document.getElementById("ItemList").value);
				document.getElementById('DresserBox' + (box + 1).toString()).replaceChild(activePlayer.GetDresserItem(i + (box * 15), 35, "ItemOutline").canvas, items[i]);
			}
		}
	}
};

/* Pattern Handling. */
document.getElementById("Player-Pattern").onclick = () => CheckPatternClick();
function CheckPatternClick() {
	if (activePlayer && activePlayer.Exist()) { // Check if exist first!
		let clicked = false;
		const patterns = document.getElementById('Player-Pattern').children;

		for (let i = 0; i < 8; i++) {
			patterns[i].onclick = function() {
				InitializePatternEditor(0);
				LoadPattern(activePlayer.GetPattern(i));
				clicked = true;
			};

			if (clicked) break;
		}
	}
};



/*
	Prepare Player Editor.
*/
export function PreparePlayerEditor() {
	for (let i = 0; i < 4; i++) {
		/* Hide all Players. */
		document.getElementById("Player " + i.toString()).disabled = true;
	}

	for (let i = 0; i < 4; i++) {
		let tmpPlayer = sav.GetPlayer(i);

		if (tmpPlayer.Exist()) document.getElementById("Player " + i.toString()).disabled = false;
	}
};

/*
	Loads a player as active player.

	index: The player index (0 - 3).
*/
export function LoadPlayer(index) {
	document.getElementById("PocketGrid").clear();
	document.getElementById("Player-Pattern").clear();

	/* Clear Dresser boxes. */
	for (let i = 1; i < 7; i++) {
		document.getElementById("DresserBox" + i.toString()).clear();
	}

	pNum = index; // Is used for later, to display the current player button as active.
	activePlayer = sav.GetPlayer(index); // Load Player from Player class.
	const exist = activePlayer.Exist(); // Get if player exist.

	if (exist) {
		document.getElementById("PlayerInfo").classList.remove("d-none"); // Remove no-display if exist.

		document.getElementById("PlayerName").value = activePlayer.GetName();
		document.getElementById("WalletAmount").value = activePlayer.GetWallet();
		document.getElementById("BankAmount").value = activePlayer.GetBank();
		document.getElementById("Gender").value = activePlayer.GetGender();
		document.getElementById("Facetype").value = activePlayer.GetFace();
		document.getElementById("FacetypePrev").src = "./assets/images/faces/" + activePlayer.GetFace().toString() + ".png";
		document.getElementById("Hairstyle").value = activePlayer.GetHairstyle();
		document.getElementById("Haircolor").value = activePlayer.GetHaircolor();
		document.getElementById("Tan").value = activePlayer.GetTan();

		/* Pattern. */
		for (let i = 0; i < 8; i++) {
			let Pattern = activePlayer.GetPattern(i);
			document.getElementById("Player-Pattern").appendChild(Pattern.image);
		}

		/* Pocket Items. */
		const pocketGrid = document.getElementById("PocketGrid");
		for (let i = 0; i < 15; i++) {
			pocketGrid.appendChild(activePlayer.GetPocketItem(i, 35, "ItemOutline").canvas);
		}

		/* Dresser Items. */
		let box = 0;
		for (let i = 0; i < 90; i++) {
			if (i % 15 == 0) box++;

			document.getElementById("DresserBox" + box.toString()).appendChild(activePlayer.GetDresserItem(i, 35, "ItemOutline").canvas);
		}
	}
};