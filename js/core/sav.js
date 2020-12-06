/*
	This file is part of ACWW Web SaveEditor.
	Copyright (C) 2020 by SuperSaiyajinStackZ.

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

import { SavData, memcpy } from '../utils/savutils.js';
import { Player } from './player.js';
import { Villager } from './villager.js';
import { fixMainChecksum } from '../utils/checksum.js';

const SAV_EUR = {
	CHECKSUM_OFFSET: 0x15FDC,
	SAVCOPY_OFFSET: 0x15FE0,
	SAVCOPY_SIZE: 0x15FE0,
	REGION: "EUR",
	PLAYER_SIZE: 0x228C,
	PLAYER_START: 0xC,
	VILLAGER_START: 0x8A3C,
	VILLAGER_SIZE: 0x700
};

const SAV_USA = {
	CHECKSUM_OFFSET: 0x15FDC,
	SAVCOPY_OFFSET: 0x15FE0,
	SAVCOPY_SIZE: 0x15FE0,
	REGION: "USA",
	PLAYER_SIZE: 0x228C,
	PLAYER_START: 0xC,
	VILLAGER_START: 0x8A3C,
	VILLAGER_SIZE: 0x700
};

const SAV_JPN = {
	CHECKSUM_OFFSET: 0x12220,
	SAVCOPY_OFFSET: 0x12224,
	SAVCOPY_SIZE: 0x12224,
	REGION: "JPN",
	PLAYER_SIZE: 0x1D10,
	PLAYER_START: 0xC,
	VILLAGER_START: 0x744C,
	VILLAGER_SIZE: 0x5C0
};

const SAV_KOR = {
	CHECKSUM_OFFSET: 0x173F8,
	SAVCOPY_OFFSET: 0x173FC,
	SAVCOPY_SIZE: 0x173FC,
	REGION: "KOR",
	PLAYER_SIZE: 0x249C,
	PLAYER_START: 0x14,
	VILLAGER_START: 0x9284,
	VILLAGER_SIZE: 0x7EC
};

export class Sav {
	constructor(region) {
		this.region = region; // 0: EUR, 1: USA, 2: JPN, 3: KOR.

		switch(this.region) {
			case 0:
				this.data = SAV_EUR;
				break;

			case 1:
				this.data = SAV_USA;
				break;

			case 2:
				this.data = SAV_JPN;
				break;

			case 3:
				this.data = SAV_KOR;
				break;

			default:
				this.data = null;
		}
	}


	/*
		Return a player.

		0 - 3 is valid.
	*/
	GetPlayer(player) {
		if (player > 3) return null;
		if (!this.data) return null;

		return new Player(this.data.PLAYER_START + (player * this.data.PLAYER_SIZE), this.region, player);
	};

	/*
		Return a villager.

		0 - 7 is valid.
	*/
	GetVillager(villager) {
		if (villager > 7) return null;
		if (!this.data) return null;

		return new Villager(this.data.VILLAGER_START + (villager * this.data.VILLAGER_SIZE), this.region);
	};

	/*
		Return the Region.
	*/
	PrintRegion() { console.log("Detected Region: " + this.data.REGION + "."); };

	/*
		Finish call, before downloading the file.

		This does fix the main checksum, if needed + copy the first Savcopy to the second one.
	*/
	Finish() {
		if (this.data) {
			fixMainChecksum(SavData, 0x0, this.data.CHECKSUM_OFFSET, (this.data.SAVCOPY_SIZE / 2));
			memcpy(RawData, 0x0, RawData, this.data.SAVCOPY_OFFSET, this.data.SAVCOPY_SIZE);
		}
	};
};