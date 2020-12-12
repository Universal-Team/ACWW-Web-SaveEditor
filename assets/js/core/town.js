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

import { ReadString, SetString } from '../utils/encoding.js';
import { SavData, RawData } from '../utils/savutils.js';
import { Item } from './item.js';
import { Pattern } from './pattern.js';

const TOWN_EUR_USA = {
	TOWN_ID: 0x2, // uint16_t.
	TOWN_NAME: 0x4,
	TOWNNAME_LENGTH: 8,
	ACRE: 0xC330, // uint8_t, 36.
	MAP_ITEMS: 0xC354, // uint16_t, 4096.
	MAP_BURIED: 0xE354, // Bit indexes.
	TOWNFLAG: 0x15930, // Pattern.
	LOST_AND_FOUND: 0x15EC0, // uint16_t, 15.
	RECYCLE_ITEMS: 0x15EDE, // uint16_t, 15.
	TURNIP_PRICE: 0x15F5D // uint8_t.
};

const TOWN_JPN = {
	TOWN_ID: 0x2, // uint16_t.
	TOWN_NAME: 0x4,
	TOWNNAME_LENGTH: 6,
	ACRE: 0xA32C, // uint8_t, 36.
	MAP_ITEMS: 0xA350, // uint16_t, 4096.
	MAP_BURIED: 0xC350, // Bit indexes.
	TOWNFLAG: 0x11C5C, // Pattern.
	LOST_AND_FOUND: 0x12114, // uint16_t, 15.
	RECYCLE_ITEMS: 0x12132, // uint16_t, 15.
	TURNIP_PRICE: 0x121A3 // uint8_t.
};

const TOWN_KOR = {
	TOWN_ID: 0x2, // uint16_t.
	TOWN_NAME: 0x4,
	TOWNNAME_LENGTH: 6,
	ACRE: 0xD304, // uint8_t, 36.
	MAP_ITEMS: 0xD328, // uint16_t, 4096.
	MAP_BURIED: 0xF328, // Bit indexes.
	TOWNFLAG: 0x16D0C, // Pattern.
	LOST_AND_FOUND: 0x172C0, // uint16_t, 15.
	RECYCLE_ITEMS: 0x172DE, // uint16_t, 15.
	TURNIP_PRICE: 0x17370 // uint8_t.
};

export class Town {
	constructor(region) {
		this.region = region;

		switch(this.region) {
			case 0:
			case 1:
				this.data = TOWN_EUR_USA;
				break;

			case 2:
				this.data = TOWN_JPN;
				break;

			case 3:
				this.data = TOWN_KOR;
				break;

			default:
				this.data = null;
				break;
		}
	};


	/* Town ID. */
	GetTownID() { return SavData.getUint16(this.data.TOWN_ID, true); };
	SetTownID(v) { SavData.setUint16(this.data.TOWN_ID, Math.min(65535, v), true); };

	/* Town Name. */
	GetTownName() { return ReadString(SavData, this.data.TOWN_NAME, this.data.TOWNNAME_LENGTH, (this.region == 2), (this.region == 3)); };
	SetTownName(v) { SetString(SavData, this.data.TOWN_NAME, this.data.TOWNNAME_LENGTH, (this.region == 2), (this.region == 3), v); };

	/* Town Map Acre. */
	GetAcre(slot) { return SavData.getUint8(this.data.ACRE + Math.min(35, slot)); };
	SetAcre(slot, v) { SavData.setUint8(this.data.ACRE + Math.min(35, slot), Math.min(131, v)); };

	/* Town Map Items. 4095. */
	GetMapItem(slot, size, style) {
		return new Item(SavData.getUint16(this.data.MAP_ITEMS + (Math.min(4095, slot) * 2)), size, style);
	};
	SetMapItem(slot, v) { SavData.setUint16(this.data.MAP_ITEMS + (Math.min(4095, slot) * 2), v, true); };

	/* Town Flag Pattern. */
	GetTownFlag() { return new Pattern(this.data.TOWNFLAG, this.region); };

	/* Lost and Found Items. */
	GetLostAndFoundItems(slot, size, style) {
		return new Item(SavData.getUint16(this.data.LOST_AND_FOUND + (Math.min(14, slot) * 2)), size, style);
	};
	SetLostAndFoundItems(slot, v) { SavData.setUint16(this.data.LOST_AND_FOUND + (Math.min(14, slot) * 2), v, true); };

	/* Recycle Items. */
	GetRecycleItems(slot, size, style) {
		return new Item(SavData.getUint16(this.data.RECYCLE_ITEMS + (Math.min(14, slot) * 2)), size, style);
	};
	SetRecycleItems(slot, v) { SavData.setUint16(this.data.RECYCLE_ITEMS + (Math.min(14, slot) * 2), v, true); };

	/* Turnip Price. */
	GetTurnipPrice() { return SavData.getUint8(this.data.TURNIP_PRICE); };
	SetTurnipPrice(v) { SavData.setUint8(this.data.TURNIP_PRICE, Math.min(255, v)); };
};