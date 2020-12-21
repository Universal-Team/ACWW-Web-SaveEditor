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

import { SavData } from '../utils/savutils.js';
import { Item } from './item.js';

export class Room {
	constructor(startoffs) { this.startPoint = startoffs; };

	/* Room Item Layer 1. */
	GetItemLayer1(slot) { return new Item(SavData.getUint16(this.startPoint + (Math.min(255, slot) * 2), true)); };
	SetItemLayer1(slot, v) { SavData.setUint16(this.startPoint + (Math.min(255, slot) * 2), v, true); };

	/* Room Item Layer 2. */
	GetItemLayer2(slot) { return new Item(SavData.getUint16(this.startPoint + 0x200 + (Math.min(255, slot) * 2), true)); };
	SetItemLayer2(slot, v) { SavData.setUint16(this.startPoint + 0x200 + (Math.min(255, slot) * 2), v, true); };

	/* Room Carpet. */
	GetCarpet() { return new Item(SavData.getUint16(this.startPoint + 0x448, true)); };
	SetCarpet(v) { SavData.setUint16(this.startPoint + 0x448, v, true); };

	/* Room Wallpaper. */
	GetWallpaper() { return new Item(SavData.getUint16(this.startPoint + 0x44A, true)); };
	SetWallpaper(v) { SavData.setUint16(this.startPoint + 0x44A, v, true); };

	/* Room Song. */
	GetSong() { return new Item(SavData.getUint16(this.startPoint + 0x44C, true)); };
	SetSong(v) { SavData.setUint16(this.startPoint + 0x44C, v, true); };
};