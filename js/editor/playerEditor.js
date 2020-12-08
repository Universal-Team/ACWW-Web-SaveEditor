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

import { Player } from '../core/player.js';
import { Pattern } from '../core/pattern.js';
import { sav, RawData, SavData, SaveSav } from '../utils/savutils.js';

/* Player switch. */
document.getElementById("Player 0").onclick = () => LoadPlayer(0);
document.getElementById("Player 1").onclick = () => LoadPlayer(1);
document.getElementById("Player 2").onclick = () => LoadPlayer(2);
document.getElementById("Player 3").onclick = () => LoadPlayer(3);

/* Wallet. */
document.getElementById("WalletAmount").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetWallet(document.getElementById("WalletAmount").value);
};
document.getElementById("MinWallet").onclick = () => {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("WalletAmount").value = 0;
		activePlayer.SetWallet(0);
	}
};
document.getElementById("MaxWallet").onclick = () => {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("WalletAmount").value = 99999;
		activePlayer.SetWallet(99999);
	}
};

/* Bank. */
document.getElementById("BankAmount").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetBank(document.getElementById("BankAmount").value);
};
document.getElementById("MinBank").onclick = () => {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("BankAmount").value = 0;
		activePlayer.SetBank(0);
	}
};
document.getElementById("MaxBank").onclick = () => {
	if (activePlayer && activePlayer.Exist()) {
		document.getElementById("BankAmount").value = 999999999;
		activePlayer.SetBank(999999999);
	}
};

/* Playername. */
document.getElementById("PlayerName").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetName(document.getElementById("PlayerName").value);
};

/* Facetype. */
document.getElementById("Facetype").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetFace(document.getElementById("Facetype").value);
};

/* Hairstyle. */
document.getElementById("Hairstyle").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetHairstyle(document.getElementById("Hairstyle").value);
};

/* Haircolor. */
document.getElementById("Haircolor").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetHaircolor(document.getElementById("Haircolor").value);
};

/* Tan. */
document.getElementById("Tan").onchange = () => {
	if (activePlayer && activePlayer.Exist()) activePlayer.SetTan(document.getElementById("Tan").value);
};


export function PreparePlayerEditor() {
	for (let i = 0; i < 4; i++) {
		/* Hide all Players. */
		document.getElementById("Player " + i.toString()).disabled = true;
	}

	for (let i = 0; i < 4; i++) {
		let tmpPlayer = sav.GetPlayer(i);

		if (tmpPlayer.Exist()) document.getElementById("Player " + i.toString()).disabled = false;
	}

	LoadPlayer(0);
}

/*
	Loads a player as active player.

	index: The player index (0 - 3).
*/
export function LoadPlayer(index) {
	document.getElementById("Player-Pattern").clear();

	pNum = index;
	activePlayer = sav.GetPlayer(index); // Load Player from Player class.
	let exist = activePlayer.Exist(); // Get if player exist.

	document.getElementById("PlayerName").maxlength = activePlayer.data.NAME_SIZE;
	document.getElementById("PlayerName").value = (exist ? activePlayer.GetName() : "");

	document.getElementById("WalletAmount").value = (exist ? activePlayer.GetWallet() : 0);
	document.getElementById("BankAmount").value = (exist ? activePlayer.GetBank() : 0);
	document.getElementById("Facetype").value = (exist ? activePlayer.GetFace() : 0);
	document.getElementById("Hairstyle").value = (exist ? activePlayer.GetHairstyle() : 0);
	document.getElementById("Haircolor").value = (exist ? activePlayer.GetHaircolor() : 0);
	document.getElementById("Tan").value = (exist ? activePlayer.GetTan() : 0);

	/* Pattern. */
	if (exist) {
		for (let i = 0; i < 8; i++) {
			let Pattern = activePlayer.GetPattern(i);

			let e = document.createElement("p");
            e.innerText = "Pattern Name: " + Pattern.GetName() + "\nCreator Name: " + Pattern.GetCreatorName() +
                          "\nOrigin Town Name: " + Pattern.GetOriginTownName();
						  document.getElementById("Player-Pattern").appendChild(e);
			document.getElementById("Player-Pattern").appendChild(Pattern.image);
		}
	}
}