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
		document.getElementById("Gender").value = getRandomNumber(0, 1);
		activePlayer.SetGender(document.getElementById("Gender").value);
	}
};

/* Facetype. */
document.getElementById("Facetype").onchange = function() {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetFace(document.getElementById("Facetype").value);
};
document.getElementById("RandomFacetype").onclick = function() {
	if (activePlayer && activePlayer.Exist()) {

		document.getElementById("Facetype").value = (activePlayer.GetGender() ? (getRandomNumber(8, 15)) : (getRandomNumber(0, 7)));
		activePlayer.SetFace(document.getElementById("Facetype").value);
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
document.getElementById("Player-Pocket").onclick = () => CheckPocketClick();
function CheckPocketClick() {
	if (activePlayer && activePlayer.Exist()) { // Check if exist first!
		let items = document.getElementById('Player-Pocket').children;

		for (let i = 0; i < 15; i++) {
			items[i].onclick = function() {
				activePlayer.SetPocketItem(i, document.getElementById("ItemList").value);
				document.getElementById("Player-Pocket").replaceChild(activePlayer.GetPocketItem(i, 25).canvas, items[i]);
			}
		}
	}
}

/* Dresser Item Handling. */
document.getElementById("Player-Dresser").onclick = () => CheckDresserClick();
function CheckDresserClick() {
	if (activePlayer && activePlayer.Exist()) { // Check if exist first!
		let items = document.getElementById('Player-Dresser').children;

		for (let i = 0; i < 90; i++) {
			items[i].onclick = function() {
				activePlayer.SetDresserItem(i, document.getElementById("ItemList").value);
				document.getElementById("Player-Dresser").replaceChild(activePlayer.GetDresserItem(i, 25).canvas, items[i]);
			}
		}
	}
}

/* Pattern Test. */
document.getElementById("Player-Pattern").onclick = () => CheckPatternClick();
function CheckPatternClick() {
	if (activePlayer && activePlayer.Exist()) { // Check if exist first!
		let clicked = false;
		let patterns = document.getElementById('Player-Pattern').children;

		for (let i = 0; i < 8; i++) {
			patterns[i * 2 + 1].onclick = function() {
				InitializePatternEditor(0);
				LoadPattern(activePlayer.GetPattern(i));
				clicked = true;
			};

			if (clicked) break;
		}
	}
}

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
}

/*
	Loads a player as active player.

	index: The player index (0 - 3).
*/
export function LoadPlayer(index) {
	document.getElementById("Player-Pocket").clear();
	document.getElementById("Player-Pattern").clear();
	document.getElementById("Player-Dresser").clear();

	pNum = index;
	activePlayer = sav.GetPlayer(index); // Load Player from Player class.
	const exist = activePlayer.Exist(); // Get if player exist.

	if (exist) {
		document.getElementById("PlayerInfo").classList.remove("d-none"); // Remove no-display if exist.

		document.getElementById("PlayerName").value = activePlayer.GetName();
		document.getElementById("WalletAmount").value = activePlayer.GetWallet();
		document.getElementById("BankAmount").value = activePlayer.GetBank();
		document.getElementById("Gender").value = activePlayer.GetGender();
		document.getElementById("Facetype").value = activePlayer.GetFace();
		document.getElementById("Hairstyle").value = activePlayer.GetHairstyle();
		document.getElementById("Haircolor").value = activePlayer.GetHaircolor();
		document.getElementById("Tan").value = activePlayer.GetTan();

		/* Pattern. */
		for (let i = 0; i < 8; i++) {
			let Pattern = activePlayer.GetPattern(i);

			let e = document.createElement("p");
            e.innerText = "Pattern Name: " + Pattern.GetName() + "\nCreator Name: " + Pattern.GetCreatorName() +
                          "\nOrigin Town Name: " + Pattern.GetOriginTownName();
						  document.getElementById("Player-Pattern").appendChild(e);
			document.getElementById("Player-Pattern").appendChild(Pattern.image);
		}

		/* Pocket Items. */
		for (let i = 0; i < 15; i++) {
			document.getElementById("Player-Pocket").appendChild(activePlayer.GetPocketItem(i, 25).canvas);
		}

		/* Dresser Items. */
		for (let i = 0; i < 90; i++) {
			document.getElementById("Player-Dresser").appendChild(activePlayer.GetDresserItem(i, 25).canvas);
		}
	}
}