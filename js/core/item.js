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

const ItemColors = {
	"Furniture": "#63E25A",
	"Gyroid": "#DA9B50",
	"Clothes": "#538FB9",
	"Song": "#B5EDC4",
	"Paper": "#B5EDEA",
	"Trash": "#778859",
	"Shell": "#FCCBD3",
	"Fruit": "#E1B1E1",
	"Turnip": "#E1B1E1",
	"Catchable": "#C6E665",
	"Item": "#FCB534",
	"WallpaperCarpet": "#AC6666",
	"Fossil": "#746459",
	"Tool": "#999999",
	"Tree": "#A16A43",
	"Weed": "#349834",
	"Flower": "#ED85C4",
	"Rock": "#343434",
	"MoneyRock": "#B45959",
	"Money": "#FCFC34",
	"Building": "#777777",
	"ParchedFlowers": "#B48534",
	"WateredFlowers": "#34B1B1",
	"Pattern": "#ACACFC",
	"WiltedFlowers": "#70705C",
	"Occupied": "#A5A5A5",
	"Invalid": "#FC3434",
	"None": "#DDDDDD"
};

export class Item {
	constructor(ID, size) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = size;
		this.canvas.height = size;
		this.canvas.classList.add("ItemOutline");
		this.canvasContext = this.canvas.getContext('2d');
		this.canvasContext.fillStyle = this.Refresh(ID);
		this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}


	Refresh(ID) {
		if (ID == 0xFFF1) return ItemColors["None"];
		else if (ID == 0xF030) return ItemColors["Occupied"];
		else if (ID <= 0x1C) return ItemColors["Flower"];
		else if (ID >= 0x1D && ID <= 0x24) return ItemColors["Weed"];
		else if ((ID >= 0x25 && ID <= 0x6D) || (ID >= 0xC7 && ID <= 0xD3)) return ItemColors["Tree"];
		else if (ID >= 0x6E && ID <= 0x8) return ItemColors["ParchedFlower"];
		else if (ID >= 0x8A && ID <= 0xA5) return ItemColors["WateredFlower"];
		else if (ID >= 0xA7 && ID <= 0xC6) return ItemColors["Pattern"];
		else if ((ID >= 0xE3 && ID <= 0xE7) || (ID >= 0xED && ID <= 0xFB)) return ItemColors["Rock"];
		else if (ID >= 0xE8 && ID <= 0xEC) return ItemColors["MoneyRock"];
		else if (ID >= 0x1000 && ID <= 0x10FF) return ItemColors["Paper"];
		else if ((ID >= 0x1100 && ID <= 0x1143) || (ID >= 0x1144 && ID <= 0x1187)) return ItemColors["WallpaperCarpet"];
		else if ((ID >= 0x11A8 && ID <= 0x12AF) || (ID >= 0x13A8 && ID <= 0x1457)) return ItemColors["Clothes"];
		else if (ID >= 0x12B0 && ID <= 0x131F) return ItemColors["Catchable"];
		else if (ID >= 0x1323 && ID <= 0x1368) return ItemColors["Song"];
		else if (ID >= 0x1369 && ID <= 0x139F) return ItemColors["Tool"];
		else if (ID >= 0x1492 && ID <= 0x14FD) return ItemColors["Money"];
		else if ((ID >= 0x14FE && ID <= 0x1530) || (ID >= 0x1542 && ID <= 0x1548) || (ID >= 0x155E && ID <= 0x156D)) return ItemColors["Item"];
		else if ((ID >= 0x1531 && ID <= 0x1541)) return ItemColors["Turnip"];
		else if (ID == 0x1549) return ItemColors["Fossil"];
		else if (ID >= 0x1554 && ID <= 0x155C) return ItemColors["Shell"];
		else if ((ID >= 0x3000 && ID <= 0x45D8) || (ID >= 0x47D8 && ID <= 0x4BA0)) return ItemColors["Furniture"];
		else if (ID >= 0x45DC && ID <= 0x47D4) return ItemColors["Gyroid"];
		else if ((ID >= 0x5000 && ID <= 0x5021) || (ID == 0xF030 || ID == 0xF031)) return ItemColors["Building"];
		else return ItemColors["Invalid"];
	};
};