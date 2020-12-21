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

let activeRoom, activeHouse;

import { House } from '../core/house.js'; // House class.
import { Room } from '../core/room.js'; // Room class.
import RoomNames from '../strings/en/roomnames.js'; // Room names.
import { sav, SavData } from '../utils/savutils.js'; // Sav class.

/* Room change. */
document.getElementById("Room 0").onclick = () => LoadRoom(0);
document.getElementById("Room 1").onclick = () => LoadRoom(1);
document.getElementById("Room 2").onclick = () => LoadRoom(2);
document.getElementById("Room 3").onclick = () => LoadRoom(3);
document.getElementById("Room 4").onclick = () => LoadRoom(4);

/* House size. */
document.getElementById("HouseSize").onchange = function() {
	if (activeHouse) {
		activeHouse.SetHouseSize(document.getElementById("HouseSize").value);
		document.getElementById("HouseDebt").value = activeHouse.GetDebts();
	}
};

/* House debts. */
document.getElementById("HouseDebt").onchange = function() {
	if (activeHouse) activeHouse.SetDebts(document.getElementById("HouseDebt").value);
};

/* Unlock House Songs. */
document.getElementById("UnlockHouseSongs").onclick = function() {
	if (activeHouse) {
		activeHouse.UnlockSongs();
		alert("All Songs unlocked!");
	}
};

/* Item Layer 1 handling. */
document.getElementById("Layer1RoomGrid").onclick = () => CheckLayer1();
function CheckLayer1() {
	if (activeRoom) {
		const items = document.getElementById('Layer1RoomGrid').children;

		for (let i = 0; i < 256; i++) {
			items[i].onclick = function() {
				activeRoom.SetItemLayer1(i, document.getElementById("ItemList").value);
				document.getElementById("Layer1RoomGrid").replaceChild(activeRoom.GetItemLayer1(i).canvas, items[i]);
			}
		}
	}
};

/* Item Layer 2 handling. */
document.getElementById("Layer2RoomGrid").onclick = () => CheckLayer2();
function CheckLayer2() {
	if (activeRoom) {
		const items = document.getElementById('Layer2RoomGrid').children;

		for (let i = 0; i < 256; i++) {
			items[i].onclick = function() {
				activeRoom.SetItemLayer2(i, document.getElementById("ItemList").value);
				document.getElementById("Layer2RoomGrid").replaceChild(activeRoom.GetItemLayer2(i).canvas, items[i]);
			}
		}
	}
};

/*
	Prepare the House Editor and load the first room.
*/
export function PrepareHouseEditor() {
	activeHouse = sav.GetHouse();
	document.getElementById("HouseSize").value = activeHouse.GetHouseSize();
	document.getElementById("HouseDebt").value = activeHouse.GetDebts();
	LoadRoom(0);
};

/*
	Loads a room.
*/
function LoadRoom(room) {
	document.getElementById("Layer1RoomGrid").clear();
	document.getElementById("Layer2RoomGrid").clear();
	document.getElementById("RoomItems").clear();

	activeRoom = activeHouse.GetRoom(room);

	/* Load item layer grids. */
	for (let i = 0; i < 256; i++) {
		document.getElementById("Layer1RoomGrid").appendChild(activeRoom.GetItemLayer1(i).canvas);
		document.getElementById("Layer2RoomGrid").appendChild(activeRoom.GetItemLayer2(i).canvas);
	}

	document.getElementById("RoomItems").appendChild(activeRoom.GetWallpaper().canvas);
	document.getElementById("RoomItems").appendChild(activeRoom.GetCarpet().canvas);
	document.getElementById("RoomItems").appendChild(activeRoom.GetSong().canvas);
};