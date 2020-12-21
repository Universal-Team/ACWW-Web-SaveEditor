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

let activeTown, acreToSelect = 0;

import { Item } from '../core/item.js'; // Item class for the canvas.
import { Pattern } from '../core/pattern.js'; // Pattern class.
import { sav } from '../utils/savutils.js'; // For the Sav class.
import { InitializePatternEditor, LoadPattern } from './patternEditor.js'; // Pattern Editor, for town flag.
import { Town } from '../core/town.js'; // Town class.

/*
	Prepare the Town Editor.
*/
export function PrepareTownEditor() {
	/* TODO: Load Acres or so there? */
	LoadTown();
};

document.getElementById("TownFlagPattern").onclick = function() {
	if (activeTown) {
		InitializePatternEditor(2);
		LoadPattern(activeTown.GetTownFlag());
	}
};

/* Acre stuff. */
document.getElementById("acresGrid").onclick = () => TownAcreCheck();
document.getElementById("AcreSelection").onclick = () => AcreSelectCheck();
document.getElementById("Select-Acre-Cancel").onclick = function() {
	document.getElementById("Menu-Tabs").classList.remove("d-none");
	document.getElementById("TownEditor").classList.remove("d-none");
	document.getElementById("SelectAcre").classList.add("d-none");
};

/* Town Map Acre Handling. */
function TownAcreCheck() {
	if (activeTown) {
		let clicked = false;
		const Acres = document.getElementById('acresGrid').children;

		for (let i = 0; i < 36; i++) {
			Acres[i].onclick = function() {
				SelectAcre(i);
				clicked = true;
			}

			if (clicked) break; // In case it got clicked -> break the for loop!
		}
	}
};

/*
	Acre Selection handling.
*/
function AcreSelectCheck() {
	if (activeTown) {
		let clicked = false;
		const Acres = document.getElementById('AcreSelection').children;

		for (let i = 0; i < 131; i++) {
			Acres[i].onclick = function() {
				EndOfAcreSelection(i);
				clicked = true;
			}

			if (clicked) break; // In case it got clicked -> break the for loop!
		}
	}
};

/*
	Opens the Acre Selection.

	selection: Which acre got clicked?
*/
function SelectAcre(selection) {
	acreToSelect = selection;

	/* Hide Menu + Tab and show acre selection. */
	document.getElementById("Menu-Tabs").classList.add("d-none");
	document.getElementById("TownEditor").classList.add("d-none");
	document.getElementById("SelectAcre").classList.remove("d-none");
};

/*
	Close the Acre Selection.

	selection: Which acre got selected?
*/
function EndOfAcreSelection(selection) {
	activeTown.SetAcre(acreToSelect, selection); // Set selected Acre.

	let acre = document.createElement("img");
	acre.src = "./assets/images/acres/" + activeTown.GetAcre(acreToSelect).toString(16).toUpperCase() + ".png";
	acre.width = 64;
	acre.height = 64;
	document.getElementById("acresGrid").replaceChild(acre, document.getElementById("acresGrid").children[acreToSelect]);

	document.getElementById("Menu-Tabs").classList.remove("d-none");
	document.getElementById("TownEditor").classList.remove("d-none");
	document.getElementById("SelectAcre").classList.add("d-none");
};


/*
	Load Town stuff.
*/
export function LoadTown() {
	activeTown = sav.GetTown();
	document.getElementById("acresGrid").clear(); // Clear all images first.
	document.getElementById("TownFlagPattern").clear();

	document.getElementById("Town-Editor-Name").value = activeTown.GetTownName();
	document.getElementById("Town-Editor-ID").value = activeTown.GetTownID();
	document.getElementById("Town-Editor-Turnip-Price").value = activeTown.GetTurnipPrice();

	const acresGrid = document.getElementById("acresGrid");
	/* Load Acres. */
	for (let i = 0; i < 36; i++) {
		let acre = document.createElement("img");
		acre.src = "./assets/images/acres/" + activeTown.GetAcre(i).toString(16).toUpperCase() + ".png";

		acre.width = 64;
		acre.height = 64;

		acresGrid.appendChild(acre);
	}

	/* Load Town Flag Pattern. */
	document.getElementById("TownFlagPattern").appendChild(activeTown.GetTownFlag().image);
};