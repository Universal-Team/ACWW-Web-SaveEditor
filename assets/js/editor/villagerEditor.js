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

let activeVillager, vNum = 0;

import { getRandomNumber } from '../main.js';
import { Villager } from '../core/villager.js';
import { sav, RawData, SavData, SaveSav } from '../utils/savutils.js';
import { InitializePatternEditor, LoadPattern } from './patternEditor.js';

/* Villager switch. */
document.getElementById("Villager 0").onclick = () => LoadVillager(0);
document.getElementById("Villager 1").onclick = () => LoadVillager(1);
document.getElementById("Villager 2").onclick = () => LoadVillager(2);
document.getElementById("Villager 3").onclick = () => LoadVillager(3);
document.getElementById("Villager 4").onclick = () => LoadVillager(4);
document.getElementById("Villager 5").onclick = () => LoadVillager(5);
document.getElementById("Villager 6").onclick = () => LoadVillager(6);
document.getElementById("Villager 7").onclick = () => LoadVillager(7);

/* The Villager Pattern. */
document.getElementById("VillagerPattern").onclick = function() {
	if (activeVillager && activeVillager.Exist()) {
		InitializePatternEditor(1);
		LoadPattern(activeVillager.GetPattern());
	}
};

/* Furniture Handling. */
document.getElementById("VillagerFurnitures").onclick = () => CheckFurnitureClick();
function CheckFurnitureClick() {
	if (activeVillager && activeVillager.Exist()) { // Check if exist first!
		const items = document.getElementById('VillagerFurnitures').children;

		for (let i = 0; i < 10; i++) {
			items[i].onclick = function() {
				activeVillager.SetFurniture(i, document.getElementById("ItemList").value);
				document.getElementById("VillagerFurnitures").replaceChild(activeVillager.GetFurniture(i).canvas, items[i]);
			}
		}
	}
};

/* Villager Species / ID. */
document.getElementById("Villager Species").onchange = function() {
	if (activeVillager && activeVillager.Exist()) activeVillager.SetID(document.getElementById("Villager Species").value);
};
document.getElementById("RandomVillager").onclick = function() {
	if (activeVillager && activeVillager.Exist()) {
		document.getElementById("Villager Species").value = getRandomNumber(0, 0x95);
		activeVillager.SetID(document.getElementById("Villager Species").value);
	}
};

/* Villager Personality. */
document.getElementById("Villager Personality").onchange = function() {
	if (activeVillager && activeVillager.Exist()) activeVillager.SetPersonality(document.getElementById("Villager Personality").value);
};
document.getElementById("RandomPersonality").onclick = function() {
	if (activeVillager && activeVillager.Exist()) {
		document.getElementById("Villager Personality").value = getRandomNumber(0, 5);
		activeVillager.SetPersonality(document.getElementById("Villager Personality").value);
	}
};


/*
	Prepare Villager Editor.
*/
export function PrepareVillagerEditor() {
	for (let i = 0; i < 8; i++) {
		/* Hide all Villagers. */
		document.getElementById("Villager " + i.toString()).disabled = true;
	}

	for (let i = 0; i < 8; i++) {
		let tmpVillager = sav.GetVillager(i);

		if (tmpVillager.Exist()) document.getElementById("Villager " + i.toString()).disabled = false;
	}
}

/*
	Loads a villager as active villager.

	index: The villager index (0 - 7).
*/
export function LoadVillager(index) {
	vNum = index; // Is used for later, to display the current villager button as active.
	activeVillager = sav.GetVillager(index);
	let exist = activeVillager.Exist(); // Get if villager exist.

	document.getElementById("VillagerPattern").clear();
	document.getElementById("VillagerFurnitures").clear();

	if (exist) {
		document.getElementById("VillagerInfo").classList.remove("d-none"); // Remove no-display if exist.

		document.getElementById("Villager Species").value = activeVillager.GetID();
		document.getElementById("Villager Personality").value = activeVillager.GetPersonality();
		document.getElementById("VillagerPattern").appendChild(activeVillager.GetPattern().image);

		/* Load Furnitures. */
		for (let i = 0; i < 10; i++) {
			document.getElementById("VillagerFurnitures").appendChild(activeVillager.GetFurniture(i).canvas);
		}
	}
}