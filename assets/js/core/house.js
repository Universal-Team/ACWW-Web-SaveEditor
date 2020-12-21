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
import { Room } from './room.js';

const HouseSizeDebts = [ 19800, 120000, 298000, 598000, 728000, 848000, 948000 ];

export class House {
	constructor(startoffs) { this.startPoint = startoffs; };

	/* Returns a room. */
	GetRoom(room) { return new Room(this.startPoint + (Math.min(4, room) * 0x450)); };

	/* House debts. */
	GetDebts() { return SavData.getUint32(this.startPoint + 0x1590, true); };
	SetDebts(v) { SavData.setUint32(this.startPoint + 0x1590, v, true); };

	/* Unlocks all songs for the house. */
	UnlockSongs() {
		const SongList = [ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x3F ];

		for (let i = 0; i < 9; i++) {
			SavData.setUint8(this.startPoint + 0x1594 + i, SongList[i]);
		}
	};

	/* House size. */
	GetHouseSize() { return (SavData.getUint8(this.startPoint + 0x15A0) & 7); };
	SetHouseSize(v) {
		SavData.setUint8(this.startPoint + 0x15A0, ((this.GetHouseSize() & ~7) | (Math.min(6, v) & 7)));
		this.SetDebts(HouseSizeDebts[Math.min(6, v)]); // Should we do it that way?
	};
};