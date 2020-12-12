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
import Personalities from './strings/en/personalities.js';
import Villagers from './strings/en/villagers.js';

/* Editors. */
import { LoadPlayer, PreparePlayerEditor } from './editor/playerEditor.js';
import { PrepareTownEditor } from './editor/townEditor.js';
import { LoadVillager, PrepareVillagerEditor } from './editor/villagerEditor.js';
import { sav, SaveSav } from './utils/savutils.js';

let currentTab = "Player-Tab";

/* Tab handles. */
document.getElementById("Player-Tab").onclick = () => TabSwitch("Player-Tab");
document.getElementById("Villager-Tab").onclick = () => TabSwitch("Villager-Tab");
document.getElementById("Town-Tab").onclick = () => TabSwitch("Town-Tab");
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
			document.getElementById("PlayerInfo").classList.add("d-none");
			break;

		case "Villager-Tab":
			document.getElementById("VillagerEditor").classList.add("d-none");
			document.getElementById("VillagerInfo").classList.add("d-none");
			break;

		case "Town-Tab":
			document.getElementById("TownEditor").classList.add("d-none");
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

		case "Town-Tab":
			document.getElementById("TownEditor").classList.remove("d-none");
			PrepareTownEditor();
			break;
	}
};

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
};

/*
	Initialize the Main Editor things.
*/
export function InitializeMainEditor() {
	/* Init Hairstyles. */
	for (let i = 0; i < 16; i++) {
		let e = document.createElement("option");
		e.innerText = Hairstyles[i];
		e.value = i;
		document.getElementById("Hairstyle").appendChild(e);
	}

	/* Init Facetypes. */
	for (let i = 0; i < 16; i++) {
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
	document.getElementById("ItemList").value = 0xFFF1; // Set current item to: 0xFFF1 -> Empty Item.

	/* Init Villager Species. */
	for (let i = 0; i < 151; i++) {
		let e = document.createElement("option");
		let index = Object.getOwnPropertyNames(Villagers)[i];
		e.innerText = Villagers[index].name + " - " + Villagers[index].category;
		e.value = index;
		document.getElementById("Villager Species").appendChild(e);
	}

	/* Init Villager Personality. */
	for (let i = 0; i < 7; i++) {
		let e = document.createElement("option");
		e.innerText = Personalities[i];
		e.value = i;
		document.getElementById("Villager Personality").appendChild(e);
	}

	/* Init Player Editor Gender. */
	for (let i = 0; i < 2; i++) {
		let e = document.createElement("option");
		e.innerText = (i ? "Female" : "Male");
		e.value = i;
		document.getElementById("Gender").appendChild(e);
	}

	/* Init Pattern Editor Gender. */
	for (let i = 0; i < 2; i++) {
		let e = document.createElement("option");
		e.innerText = (i ? "Female" : "Male");
		e.value = i;
		document.getElementById("Pattern-Editor-Creator-Gender").appendChild(e);
	}

	/* Init Pattern Editor Own Player Selector. */
	for (let i = 0; i < 4; i++) {
		if (sav.GetPlayer(i).Exist()) {
			let e = document.createElement("option");
			e.innerText = sav.GetPlayer(i).GetName();
			e.value = i;
			document.getElementById("Pattern-Editor-Player-Selector").appendChild(e);
		}
	}

	/* Init Acre Selection. */
	for (let i = 0; i < 131; i++) {
		let acre = document.createElement("img");
		acre.src = "assets/images/acres/" + i.toString(16).toUpperCase() + ".png";
		acre.width = 50; // is 50 good size? Maybe changes required.
		acre.height = 50;
		document.getElementById("AcreSelection").appendChild(acre);
	}

	/* Menu Init. */
	document.getElementById("SavLoader").classList.add("d-none");
	document.getElementById("Menu-Tabs").classList.remove("d-none");
	document.getElementById("Menu-Tabs").classList.add("Tabs");

	/* Player is always first selected Tab. */
	document.getElementById("Player-Tab").classList.add("selectedTab");
	document.getElementById("Player-Tab").classList.remove("btnTabs");
	document.getElementById("PlayerEditor").classList.remove("d-none");
	PreparePlayerEditor(); // Prepare Player Editor!
};

/*
	Call this, when you need to clear all childs from an HTML Element, like the Pattern canvas, for example.
*/
Object.defineProperty(HTMLElement.prototype, "clear", { value: function clear() {
	while(this.firstChild) this.removeChild(this.firstChild);
  }, enumerable: false })

/*
	Returns a randomized number.

	minValue: Min num.
	maxValue: Max num.
*/
export function getRandomNumber(minValue, maxValue) {
	/* Ensure, those are full numbers. */
	minValue = Math.ceil(minValue);
	maxValue = Math.floor(maxValue);

	return Math.floor(Math.random() * (maxValue)) + minValue;
};

/*
	Download a Buffer to a file.

	Buffer: The buffer.
*/
export function DownloadFile(Buffer, name) {
	let blob = new Blob([Buffer], { type: "application/octet-stream" });
	let a = document.createElement('a');
	let url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = name; // Set download name.
	a.click();
};