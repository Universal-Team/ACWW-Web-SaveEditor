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

/* Strings. */
import Hairstyles from './strings/en/hairstyles.js';
import Facetypes from './strings/en/facetypes.js';
import Haircolors from './strings/en/haircolors.js';
import Items from './strings/en/items.js';
import Villagers from './strings/en/villagers.js';

/* Editors. */
import { LoadPlayer, PreparePlayerEditor } from './editor/playerEditor.js';
import { LoadVillager, PrepareVillagerEditor } from './editor/villagerEditor.js';
import { SaveSav } from './utils/savutils.js';

let currentTab = "Player-Tab";

/* Tab handles. */
document.getElementById("Player-Tab").onclick = () => TabSwitch("Player-Tab");
document.getElementById("Villager-Tab").onclick = () => TabSwitch("Villager-Tab");
document.getElementById("SaveChanges").onclick = () => SaveSav();

/*
	Switch the active menu.

	oldMenu: Old menu, which to hide.
	newMenu: New menu, which to show.
*/
export function MenuSwitch(oldMenu, newMenu) {
	/* Hide old menu. */
	switch(oldMenu) {
		case "Player-Tab":
			document.getElementById("PlayerEditor").classList.add("d-none");
			break;

		case "Villager-Tab":
			document.getElementById("VillagerEditor").classList.add("d-none");
			break;
	}

	/* Switch the new active menu. */
	switch(newMenu) {
		case "Player-Tab":
			document.getElementById("PlayerEditor").classList.remove("d-none");
			PreparePlayerEditor();
			break;

		case "Villager-Tab":
			document.getElementById("VillagerEditor").classList.remove("d-none");
			PrepareVillagerEditor();
			break;
	}
}

/*
	Switch the tabs.

	newTab: What's the new Tab?
*/
export function TabSwitch(newTab) {
	if (currentTab == newTab) return;

	MenuSwitch(currentTab, newTab);

	/* Switch New Tab. */
	document.getElementById(newTab).classList.remove("btnTabs");
	document.getElementById(newTab).classList.add("selectedTab");

	/* Switch current Tab. */
	document.getElementById(currentTab).classList.remove("selectedTab");
	document.getElementById(currentTab).classList.add("btnTabs");
	currentTab = newTab;
}

/*
	Initialize the Main Editor things.
*/
export function InitializeMainEditor() {
	/* Init Hairstyles. */
	for (let i = 0; i < 15; i++) {
		let e = document.createElement("option");
		e.innerText = Hairstyles[i];
		e.value = i;
		document.getElementById("Hairstyle").appendChild(e);
	}

	/* Init Facetypes. */
	for (let i = 0; i < 15; i++) {
		let e = document.createElement("option");
		e.innerText = Facetypes[i];
		e.value = i;
		document.getElementById("Facetype").appendChild(e);
	}

	/* Init Tan. */
	for (let i = 0; i < 4; i++) {
		let e = document.createElement("option");
		e.innerText = i;
		e.value = i;
		document.getElementById("Tan").appendChild(e);
	}

	/* Init Haircolors. */
	for (let i = 0; i < 7; i++) {
		let e = document.createElement("option");
		e.innerText = Haircolors[i];
		e.value = i;
		document.getElementById("Haircolor").appendChild(e);
	}

	/* Init Item List. */
	for (let i = 0; i < 3260; i++) {
		let e = document.createElement("option");
		let index = Object.getOwnPropertyNames(Items)[i];
		e.innerText = Items[index].name + " - " + Items[index].category;
		e.value = index;
		document.getElementById("ItemList").appendChild(e);
	}
	document.getElementById("ItemList").value = 0xFFF1;

	/* Init Villager Species. */
	for (let i = 0; i < 151; i++) {
		let e = document.createElement("option");
		let index = Object.getOwnPropertyNames(Villagers)[i];
		e.innerText = Villagers[index].name + " - " + Villagers[index].category;
		e.value = index;
		document.getElementById("Villager Species").appendChild(e);
	}

	/* Menu Init. */
	document.getElementById("SavLoader").classList.add("d-none");
	document.getElementById("Menu-Tabs").classList.remove("d-none");
	document.getElementById("PlayerEditor").classList.remove("d-none");
}

/*
	Call this, when you need to clear all childs from an HTML Element, like the Pattern canvas, for example.
*/
HTMLElement.prototype.clear = function() {
    while (this.firstChild) this.removeChild(this.firstChild);
};