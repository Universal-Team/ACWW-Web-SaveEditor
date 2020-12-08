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

/*	Palette to display from.
	Format is: R G B.
*/
export const Palette = [
	"FF0000", "FF7331", "FFAD00", "FFFF00", "ADFF00", "52FF00", "00FF00", "00AD52", "0052AD", "0000FF", "5200FF", "AD00FF", "FF00FF", "000000", "FFFFFF",
	"FF7B7B", "FFB57B", "FFE77B", "FFFF7B", "DEFF7B", "ADFF7B", "7BFF7B", "52AD84", "5284AD", "7B7BFF", "B57BFF", "E77BFF", "FF7BFF", "000000", "FFFFFF",
	"A50000", "A53100", "A57300", "A5A500", "73A500", "31A500", "00A500", "005221", "002152", "0000A5", "3100A5", "7300A5", "A500A5", "000000", "FFFFFF",
	"009C00", "5ACE6B", "B5FFDE", "009C6B", "52CEA5", "ADFFD6", "0052AD", "2984D6", "5AADFF", "0000FF", "4A6BFF", "314ADE", "1821B5", "00008C", "FFFFFF",
	"AD7300", "D6AD42", "FFDE8C", "FF0839", "FF4A6B", "FF949C", "AD00FF", "D663FF", "FFCEFF", "FFBD9C", "DE9473", "BD634A", "9C3921", "7B1000", "FFFFFF",
	"FF0000", "FF5200", "FFB55A", "FFEFAD", "7B1000", "A54A31", "D6846B", "FFBD9C", "5AADFF", "84C6FF", "ADE7FF", "D6FFFF", "6B6B6B", "000000", "FFFFFF",
	"00FF00", "42FF42", "8CFF8C", "D6FFD6", "0000FF", "4242FF", "8C8CFF", "D6D6FF", "FF0000", "FF4242", "FF8C8C", "FFD6D6", "6B6B6B", "000000", "FFFFFF",
	"003100", "426342", "849C84", "C6D6C6", "7B1000", "A54A29", "D68C5A", "FFC68C", "D6B500", "E7CE39", "F7DE7B", "FFF7BD", "6B6B6B", "000000", "FFFFFF",
	"0000FF", "FF0000", "FFFF00", "4242FF", "FF4242", "FFFF42", "8C8CFF", "FF8C8C", "FFFF8C", "D6D6FF", "FFD6D6", "FFFFD6", "6B6B6B", "000000", "FFFFFF",
	"00FF00", "0000FF", "FF00FF", "42FF42", "4242FF", "FF42FF", "8CFF8C", "8C8CFF", "FF8CFF", "D6FFD6", "D6D6FF", "FFD6FF", "6B6B6B", "000000", "FFFFFF",
	"FF0000", "FF7B00", "FFFF00", "84FF00", "00FF00", "00847B", "0000FF", "7B00FF", "FF94FF", "D6B500", "BD1000", "5A1000", "6B6B6B", "000000", "FFFFFF",
	"109463", "087B52", "108C39", "319C31", "CEA54A", "CE9439", "BD8C4A", "D68C31", "AD734A", "8C5A31", "6B4229", "84EFFF", "31CEEF", "00A5C6", "FFFFFF",
	"D6DEE7", "B5CEDE", "E7EFEF", "F7F7F7", "84737B", "948C6B", "847B63", "9C845A", "739CB5", "FF2929", "FFFF00", "9421FF", "009CBD", "000000", "FFFFFF",
	"FFFFFF", "F7EFEF", "E7DEDE", "D6CECE", "C6B5B5", "B5A5A5", "A59494", "9C8484", "8C6B6B", "7B5A5A", "6B4A4A", "5A3131", "4A2121", "421010", "310000",
	"FFFFFF", "EFEFEF", "DEDEDE", "CECECE", "B5B5B5", "A5A5A5", "949494", "848484", "6B6B6B", "5A5A5A", "4A4A4A", "313131", "212121", "101010", "000000",
	"FF8C7B", "FF0000", "FF7B00", "FFFF00", "008400", "00FF00", "0000FF", "009CFF", "D600FF", "FF6BFF", "9C0000", "FF9400", "FFBD94", "000000", "FFFFFF"
];

const PATTERN_EUR_USA = {
	PATTERN_SIZE: 0x228,
	IMAGE: 0, // 0x0 - 0x1FF. Raw Image buffer.
	IMAGE_SIZE: 0x200,
	NAME: 0x216,
	NAME_SIZE: 15,
	CREATOR_ID: 0x20A, // uint16_t.
	CREATOR_NAME: 0x20C,
	CREATOR_NAME_SIZE: 8,
	CREATOR_GENDER: 0x214, // uint8_t.
	ORIG_TOWN_ID: 0x200, // uint16_t.
	ORIG_TOWN_NAME: 0x202,
	ORIG_TOWN_NAME_SIZE: 8,
	DESIGNTYPE: 0x226, // uint8_t.
	PALETTE: 0x226 // uint8_t.
};

const PATTERN_JPN = {
	PATTERN_SIZE: 0x220,
	IMAGE: 0, // 0x0 - 0x1FF. Raw Image buffer.
	IMAGE_SIZE: 0x200,
	NAME: 0x212,
	NAME_SIZE: 10,
	CREATOR_ID: 0x208, // uint16_t.
	CREATOR_NAME: 0x20A,
	CREATOR_NAME_SIZE: 6,
	CREATOR_GENDER: 0x210, // uint8_t.
	ORIG_TOWN_ID: 0x200, // uint16_t.
	ORIG_TOWN_NAME: 0x202,
	ORIG_TOWN_NAME_SIZE: 6,
	DESIGNTYPE: 0x21C, // uint8_t.
	PALETTE: 0x21C // uint8_t.
};

const PATTERN_KOR = {
	PATTERN_SIZE: 0x234,
	IMAGE: 0, // 0x0 - 0x1FF. Raw Image buffer.
	IMAGE_SIZE: 0x200,
	NAME: 0x21E,
	NAME_SIZE: 10,
	CREATOR_ID: 0x20E, // uint16_t.
	CREATOR_NAME: 0x210,
	CREATOR_NAME_SIZE: 6,
	CREATOR_GENDER: 0x21C, // uint8_t.
	ORIG_TOWN_ID: 0x200, // uint16_t.
	ORIG_TOWN_NAME: 0x202,
	ORIG_TOWN_NAME_SIZE: 6,
	DESIGNTYPE: 0x232, // uint8_t.
	PALETTE: 0x232 // uint8_t.
};

export class Pattern {
	constructor(startoffs, region) {
		this.region = region;
		this.startPoint = startoffs;

		/* Create Canvas. */
		this.image = document.createElement('canvas');
		this.image.width = 32; // Default size.
		this.image.height = 32; // Default size.

		/* Set proper data offsets. */
		switch(this.region) {
			case 0:
			case 1:
				this.data = PATTERN_EUR_USA;
				break;

			case 2:
				this.data = PATTERN_JPN;
				break;

			case 3:
				this.data = PATTERN_KOR;
				break;

			default:
				this.data = null;
		}

		if (this.data) this.Refresh();
	}


	/* Refresh the Image. */
	Refresh() {
		this.imageContext = this.image.getContext('2d');

		for (let y = 0; y < 32; y++) {
			for (let x = 0; x < 16; x++) {
				let TwoPixels = SavData.getUint8(this.startPoint + (y * 16) + x);

				this.imageContext.fillStyle = "#" + Palette[Math.max(0, (TwoPixels & 0x0F) - 1) + (this.GetPalette() * 15)];
				this.imageContext.fillRect(x * 2, y, 1, 1);

				this.imageContext.fillStyle = "#" + Palette[Math.max(0, ((TwoPixels & 0xF0) >> 4) - 1) + (this.GetPalette() * 15)];
				this.imageContext.fillRect(x * 2 + 1, y, 1, 1);
			}
		}
	}

	/* Pattern Name. */
	GetName() { return ReadString(SavData, this.startPoint + this.data.NAME, this.data.NAME_SIZE, (this.region == 2), (this.region == 3)); };
	SetName(v) { SetString(SavData, this.startPoint + this.data.NAME, this.data.NAME_SIZE, (this.region == 2), (this.region == 3), v); };

	/* Player Creator ID. */
	GetCreatorID() { return SavData.getUint16(this.startPoint + this.data.CREATOR_ID, true); };
	SetCreatorID(v) { SavData.setUint16(this.startPoint + this.data.CREATOR_ID, Math.min(65535, v), true); };

	/* Player Creator Name. */
	GetCreatorName() { return ReadString(SavData, this.startPoint + this.data.CREATOR_NAME, this.data.CREATOR_NAME_SIZE, (this.region == 2), (this.region == 3)); };
	SetCreatorName(v) { SetString(SavData, this.startPoint + this.data.CREATOR_NAME, this.data.CREATOR_NAME_SIZE, (this.region == 2), (this.region == 3), v); };

	/* Player Creator Gender. */
	GetCreatorGender() { return SavData.getUint8(this.startPoint + this.data.CREATOR_GENDER); };
	SetCreatorGender(v) { SavData.setUint8(this.startPoint + this.data.CREATOR_GENDER, Math.min(1, v)); };

	/* Origin Town ID. */
	GetOriginTownID() { return SavData.getUint16(this.startPoint + this.data.ORIG_TOWN_ID, true); };
	SetOriginTownID(v) { SavData.setUint16(this.startPoint + this.data.ORIG_TOWN_ID, Math.min(65535, v), true); };

	/* Origin Town Name. */
	GetOriginTownName() { return ReadString(SavData, this.startPoint + this.data.ORIG_TOWN_NAME, this.data.ORIG_TOWN_NAME_SIZE, (this.region == 2), (this.region == 3)); };
	SetOriginTownName(v) { SetString(SavData, this.startPoint + this.data.ORIG_TOWN_NAME, this.data.ORIG_TOWN_NAME_SIZE, (this.region == 2), (this.region == 3), v); };

	/* Designtype: 9 is often the default. */
	GetDesignType() { return SavData.getUint8(this.startPoint + this.data.DESIGNTYPE) & 0x0F; };
	SetDesignType(v) { SavData.setUint8(this.startPoint + this.data.DESIGNTYPE, (this.GetDesignType() & 0xF0) | (Math.min(9, v) & 0x0F)); };

	/* Palette. 0 - 14. */
	GetPalette() { return (SavData.getUint8(this.startPoint + this.data.PALETTE) & 0xF0) >> 4; };
	SetPalette(v) { SavData.setUint8(this.startPoint + this.data.PALETTE, (Math.min(14, v) << 4) & 0xF0); };

	/*
		Set Player Data to the Pattern.

		p: Player class.
	*/
	SetPlayerData(p) {
		this.SetCreatorID(p.GetPlayerID());
		this.SetCreatorName(p.GetName());
		this.SetCreatorGender(p.GetGender());
		this.SetOriginTownID(p.GetTownID());
		this.SetOriginTownName(p.GetTownName());
	};

	/*
		Set a pixel.

		x: x Position.
		y: y Position.
		clr: Color index.
	*/
	SetPixel(x, y, clr) {
		SavData.setUint8(this.startPoint + (Math.min(31, y) * 32) + Math.min(31, x), Math.min(14, clr));
	};
};