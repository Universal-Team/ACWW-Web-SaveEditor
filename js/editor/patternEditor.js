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

/* Last Menus; 0: Player Pattern, 1: Villager Pattern, 2: Town Flag, 3: Able Sister Pattern. */
let activePattern, lastMenu = 0;

import { Pattern } from '../core/pattern.js';
import { sav } from '../utils/savutils.js';

/* Pattern Name. */
document.getElementById("Pattern-Editor-Name").onchange = function() {
	if (activePattern) activePattern.SetName(document.getElementById("Pattern-Editor-Name").value);
};

/* Pattern Creator Name. */
document.getElementById("Pattern-Editor-Creator-Name").onchange = function() {
	if (activePattern) activePattern.SetCreatorName(document.getElementById("Pattern-Editor-Creator-Name").value);
};

/* Pattern Creator ID. */
document.getElementById("Pattern-Editor-Creator-ID").onchange = function() {
	if (activePattern) activePattern.SetCreatorID(document.getElementById("Pattern-Editor-Creator-ID").value);
};

/* Pattern Creator Gender. */
document.getElementById("Pattern-Editor-Creator-Gender").onchange = function() {
	if (activePattern) activePattern.SetCreatorGender(document.getElementById("Pattern-Editor-Creator-Gender").value);
};

/* Pattern Origin Town Name. */
document.getElementById("Pattern-Editor-Town-Name").onchange = function() {
	if (activePattern) activePattern.SetOriginTownName(document.getElementById("Pattern-Editor-Town-Name").value);
};

/* Pattern Origin Town ID. */
document.getElementById("Pattern-Editor-Town-ID").onchange = function() {
	if (activePattern) activePattern.SetOriginTownID(document.getElementById("Pattern-Editor-Town-ID").value);
};

/* Inject Pattern. */
document.getElementById("InjectPattern").onclick = function() {
	if (activePattern) { // Ensure Pattern is good.
		let input = document.createElement("input");
		input.type = "file";
		input.accept = ".acww";
		input.click(); // Execute file selection.

		input.onchange = function(e) {
			let reader = new FileReader();
			reader.readAsArrayBuffer(e.target.files[0]);

			reader.onload = function() {
				let raw = new Uint8Array(this.result);

				if (activePattern.InjectPattern(raw)) {
					activePattern.Refresh();
					RefreshInfo();
					document.getElementById("PatternEditor").replaceChild(activePattern.image, document.getElementById("PatternEditor").lastChild);
				}
			};
		};
	}
};

/* Dump Pattern. */
document.getElementById("DumpPattern").onclick = function() {
	if (activePattern) activePattern.DownloadPattern("Pattern.acww");
}

/* Own Pattern. */
document.getElementById("Pattern-Editor-Own-Apply").onclick = function() {
	if (activePattern) {
		if (sav.GetPlayer(document.getElementById("Pattern-Editor-Player-Selector").value).Exist()) { // Check if player exist.
			activePattern.SetPlayerData(sav.GetPlayer(document.getElementById("Pattern-Editor-Player-Selector").value));
			RefreshInfo();
		}
	}
};


/*
	Initialize the Pattern Editor Menu.

	menu: The last menu before access. (See above for numbers).
*/
export function InitializePatternEditor(menu) {
	lastMenu = menu;
	document.getElementById("Menu-Tabs").classList.add("d-none"); // No Tabs here when in the Pattern Editor.

	switch(lastMenu) {
		case 0:
			document.getElementById("PlayerEditor").classList.add("d-none");
			break;

		case 1:
			document.getElementById("VillagerEditor").classList.add("d-none");
			break;

		case 2:
			break; // Town menu.

		case 3:
			break; // Shop menu.
	}
}

/*
	After we are done here, go back to the last menu.
*/
document.getElementById("Pattern-Editor-Return").onclick = function() {
	document.getElementById("PatternEditor").removeChild(document.getElementById("PatternEditor").lastChild);
	document.getElementById("PatternEditor").classList.add("d-none");
	document.getElementById("Menu-Tabs").classList.remove("d-none"); // Display Tabs again.

	switch(lastMenu) {
		case 0:
			// Player Pattern.
			document.getElementById("PlayerEditor").classList.remove("d-none");
			break;

		case 1:
			// Villager Pattern.
			document.getElementById("VillagerEditor").classList.remove("d-none");
			break;

		case 2:
			// TownFlag Pattern.
			break;

		case 3:
			// Able Sister Pattern.
			break;
	}
};

/*
	Loads the Pattern.

	ptrn: The pattern.
*/
export function LoadPattern(ptrn) {
	activePattern = ptrn;
	document.getElementById("PatternEditor").classList.remove("d-none"); // Remove the none class.

	/* Set values. */
	RefreshInfo();
	document.getElementById("PatternEditor").appendChild(activePattern.image);
}

/*
	Refresh the Pattern Infos.
*/
function RefreshInfo() {
	if (activePattern) {
		document.getElementById("Pattern-Editor-Name").value = activePattern.GetName();
		document.getElementById("Pattern-Editor-Creator-Name").value = activePattern.GetCreatorName();
		document.getElementById("Pattern-Editor-Creator-ID").value = activePattern.GetCreatorID();
		document.getElementById("Pattern-Editor-Creator-Gender").value = activePattern.GetCreatorGender();
		document.getElementById("Pattern-Editor-Town-Name").value = activePattern.GetOriginTownName();
		document.getElementById("Pattern-Editor-Town-ID").value = activePattern.GetOriginTownID();
	}
}