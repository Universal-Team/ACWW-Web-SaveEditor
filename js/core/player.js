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
import { SavData } from '../utils/savutils.js';
import { Pattern } from './pattern.js';
import { Letter } from './letter.js';

const PLAYER_EUR_USA = {
	PLAYER_SIZE: 0x228C,
	FACE_HAIRSTYLE: 0x223C, // uint8_t.
	TAN_HAIRCOLOR: 0x223D, // uint8_t.
	GENDER: 0x228A, // uint8_t.
	PLAYER_ID: 0x2280, // uint16_t.
	TOWN_ID: 0x2276, // uint16_t.
	TOWN_NAME: 0x2278,
	TOWN_SIZE: 8,
	NAME: 0x2282,
	NAME_SIZE: 8,
	WALLET_AMOUNT: 0x1B40, // uint32_t.
	BANK_AMOUNT: 0x21E4, // uint32_t.
	POCKET: 0x1B22, // uint16_t.
	DRESSER: 0x15430, // uint16_t, not from the startPoint.
	PATTERN: 0, // Well, a pattern class or so.
	PATTERN_SIZE: 0x228,
	LETTER: 0x1148, // 0xF4.
	LETTER_SIZE: 0xF4,
	ACORNS: 0x2225, // uint8_t, from the Acorn Festival.
	BED: -1, // TODO.
};

const PLAYER_JPN = {
	PLAYER_SIZE: 0x1D10,
	FACE_HAIRSTYLE: 0x1CC6, // uint8_t.
	TAN_HAIRCOLOR: 0x1CC7, // uint8_t.
	GENDER: 0x1CFB, // uint8_t.
	PLAYER_ID: 0x1D04, // uint16_t.
	TOWN_ID: 0x1CFC, // uint16_t.
	TOWN_NAME: 0x1CFE,
	TOWN_SIZE: 6,
	NAME: 0x1D06,
	NAME_SIZE: 6,
	WALLET_AMOUNT: 0x16C4, // uint32_t.
	BANK_AMOUNT: 0x1C70, // uint32_t.
	POCKET: 0x16A6, // uint16_t.
	DRESSER: 0x11764, // uint16_t, not from the startPoint.
	PATTERN: 0, // Well, a pattern class or so.
	PATTERN_SIZE: 0x220,
	LETTER: 0x1108, // 0x8C.
	LETTER_SIZE: 0x8C,
	ACORNS: 0x1CB1, // uint8_t, from the Acorn Festival.
	BED: 0x1C9E, // uint8_t.
};

const PLAYER_KOR = {
	PLAYER_SIZE: 0x249C,
	FACE_HAIRSTYLE: 0x243C, // uint8_t.
	TAN_HAIRCOLOR: 0x243D, // uint8_t.
	GENDER: 0x249A, // uint8_t.
	PLAYER_ID: 0x248C, // uint16_t.
	TOWN_ID: 0x247E, // uint16_t.
	TOWN_NAME: 0x2480,
	TOWN_SIZE: 6,
	NAME: 0x248E,
	NAME_SIZE: 6,
	WALLET_AMOUNT: 0x1C10, // uint32_t.
	BANK_AMOUNT: 0x23E0, // uint32_t.
	POCKET: 0x1BF2, // uint16_t.
	DRESSER: 0x16800, // uint16_t, not from the startPoint.
	PATTERN: 0, // Well, a pattern class or so.
	PATTERN_SIZE: 0x234,
	LETTER: 0x11A8, // 0x100.
	LETTER_SIZE: 0x100,
	ACORNS: 0x2421, // uint8_t, from the Acorn Festival.
	BED: -1, // TODO.
};

export class Player {
	constructor(startoffs, region, player) {
		this.region = region;
		this.startPoint = startoffs;
		this.playerIndex = player;

		/* Set proper data offsets. */
		switch(this.region) {
			case 0:
			case 1:
				this.data = PLAYER_EUR_USA;
				break;

			case 2:
				this.data = PLAYER_JPN;
				break;

			case 3:
				this.data = PLAYER_KOR;
				break;

			default:
				this.data = null;
		}
	}


	/* Player Face. */
	GetFace() { return (SavData.getUint8(this.startPoint + this.data.FACE_HAIRSTYLE) & 0xF); };
	SetFace(v) { SavData.setUint8(this.startPoint + this.data.FACE_HAIRSTYLE, (this.GetFace() & 0xF0) | (Math.min(15, v) & 0xF)); };

	/* Player Tan. */
	GetTan() { return (SavData.getUint8(this.startPoint + this.data.TAN_HAIRCOLOR) >> 4); };
	SetTan(v) { SavData.setUint8(this.startPoint + this.data.TAN_HAIRCOLOR, (this.GetTan() & 0x0F) | (Math.min(3, v) << 4)); };

	/* Player Hairstyle. */
	GetHairstyle() { return (SavData.getUint8(this.startPoint + this.data.FACE_HAIRSTYLE) >> 4); };
	SetHairstyle(v) { SavData.setUint8(this.startPoint + this.data.FACE_HAIRSTYLE, ((this.GetHairstyle() & 0x0F) | (Math.min(15, v) << 4))); };

	/* Player Haircolor. */
	GetHaircolor() { return (SavData.getUint8(this.startPoint + this.data.TAN_HAIRCOLOR) & 0xF); };
	SetHaircolor(v) { SavData.setUint8(this.startPoint + this.data.TAN_HAIRCOLOR, ((this.GetHaircolor() & 0xF0) | (Math.min(7, v) & 0xF))); };

	/* Player Gender. */
	GetGender() { return SavData.getUint8(this.startPoint + this.data.GENDER); };
	SetGender(v) { SavData.setUint8(this.startPoint + this.data.GENDER, Math.min(1, v)); };

	/* Player ID. */
	GetPlayerID() { return SavData.getUint16(this.startPoint + this.data.PLAYER_ID, true); };
	SetPlayerID(v) { SavData.setUint16(this.startPoint + this.data.PLAYER_ID, Math.min(65535, v), true); };

	/* Player Town ID. */
	GetTownID() { return SavData.getUint16(this.startPoint + this.data.TOWN_ID, true); };
	SetTownID(v) { SavData.setUint16(this.startPoint + this.data.TOWN_ID, Math.min(65535, v), true); };

	/* Player Town Name. */
	GetTownName() { return ReadString(SavData, this.startPoint + this.data.TOWN_NAME, this.data.TOWN_SIZE, (this.region == 2), (this.region == 3)); };
	SetTownName(v) { SetString(SavData, this.startPoint + this.data.TOWN_NAME, this.data.TOWN_SIZE, (this.region == 2), (this.region == 3), v); };

	/* Player Name. */
	GetName() { return ReadString(SavData, this.startPoint + this.data.NAME, this.data.NAME_SIZE, (this.region == 2), (this.region == 3)); };
	SetName(v) { SetString(SavData, this.startPoint + this.data.NAME, this.data.NAME_SIZE, (this.region == 2), (this.region == 3), v); };

	/* Player Wallet. */
	GetWallet() { return SavData.getUint32(this.startPoint + this.data.WALLET_AMOUNT, true); };
	SetWallet(v) { SavData.setUint32(this.startPoint + this.data.WALLET_AMOUNT, Math.min(99999, v), true); };

	/* Player Bank. */
	GetBank() { return SavData.getUint32(this.startPoint + this.data.BANK_AMOUNT, true); };
	SetBank(v) { SavData.setUint32(this.startPoint + this.data.BANK_AMOUNT, Math.min(999999999, v), true); };

	/* Player Exist? */
	Exist() { return this.GetPlayerID() != 0; };

	/* Pocket Items: 0 - 14. */
	GetPocketItem(slot) { return SavData.getUint16(this.startPoint + this.data.POCKET + (Math.min(14, slot) * 2), true); };
	SetPocketItem(slot, v) { SavData.setUint16(this.startPoint + this.data.POCKET + (Math.min(14, slot) * 2), v, true); };

	/* Dresser Items: 0 - 89. */
	GetDresserItem(slot) { return SavData.getUint16(this.data.DRESSER + (0xB4 * this.playerIndex) + Math.min(89, slot) * 2, true); };
	SetDresserItem(slot, v) { SavData.setUint16(this.data.DRESSER + (0xB4 * this.playerIndex) + Math.min(89, slot) * 2, v, true); };

	/* Pattern. 0 - 7. */
	GetPattern(slot) { return new Pattern(this.startPoint + this.data.PATTERN + (Math.min(7, slot) * this.data.PATTERN_SIZE), this.region); };

	/* Get Pocket Letters. 0 - 9. */
	GetPocketLetter(slot) { return new Letter(this.startoffs + this.data.LETTER + (Math.min(9, slot) * this.data.LETTER_SIZE), this.region); };
};