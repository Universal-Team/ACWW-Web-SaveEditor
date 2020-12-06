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

const VILLAGER_EUR_USA = {
	VILLAGER_SIZE: 0x700,
	PATTERN: 0x340,
	PATTERN_SIZE: 0x228,
	LETTER: 0x568,
	LETTER_SIZE: 0xF4,
	FURNITURE: 0x6AC, // uint16_t, 10.
	PERSONALITY: 0x6CA, // uint8_t.
	ID: 0x6CB, // uint8_t, also known as Species.
	SHIRT: 0x6EC, // uint16_t.
	WALLPAPER: 0x6EE, // uint8_t index.
	CARPET: 0x6EF, // uint8_t index.
	UMBRELLA: 0x6F4 // uint8_t index.
};

const VILLAGER_JPN = {
	VILLAGER_SIZE: 0x5C0,
	PATTERN: 0x280,
	PATTERN_SIZE: 0x220,
	LETTER: 0x4A0,
	LETTER_SIZE: 0x8C,
	FURNITURE: 0x578, // uint16_t, 10.
	PERSONALITY: 0x594, // uint8_t.
	ID: 0x595, // uint8_t, also known as Species.
	SHIRT: 0x5AE, // uint16_t.
	WALLPAPER: 0x5B0, // uint8_t index.
	CARPET: 0x5B1, // uint8_t index.
	UMBRELLA: 0x544 // uint8_t index.
};

const VILLAGER_KOR = {
	VILLAGER_SIZE: 0x7EC,
	PATTERN: 0x400,
	PATTERN_SIZE: 0x234,
	LETTER: 0x634,
	LETTER_SIZE: 0x100,
	FURNITURE: 0x78C, // uint16_t, 10.
	PERSONALITY: 0x7AE, // uint8_t.
	ID: 0x7AF, // uint8_t, also known as Species.
	SHIRT: 0x7D2, // uint16_t.
	WALLPAPER: 0x7D4, // uint8_t index.
	CARPET: 0x7D5, // uint8_t index.
	UMBRELLA: 0x7DA // uint8_t index.
};

class Villager {
	constructor(startoffs, region) {
		this.region = region;
		this.startPoint = startoffs;

		/* Set proper data offsets. */
		switch(this.region) {
			case 0:
			case 1:
				this.data = VILLAGER_EUR_USA;
				break;

			case 2:
				this.data = VILLAGER_JPN;
				break;

			case 3:
				this.data = VILLAGER_KOR;
				break;

			default:
				this.data = null;
		}
	};

	GetPattern() { return new Pattern(this.startPoint + this.data.PATTERN, this.region); };

	/* Villager Furnitures. 0 - 9. */
	GetFurniture(slot) { return SavData.getUint16(this.startPoint + this.data.FURNITURE + (slot * 2), true); };
	SetFurniture(slot, v) { SavData.setUint16(this.startPoint + this.data.FURNITURE + (slot * 2), v, true); };

	/* Villager Personality. */
	GetPersonality() { return SavData.getUint8(this.startPoint + this.data.PERSONALITY); };
	SetPersonality(v) { SavData.setUint8(this.startPoint + this.data.PERSONALITY, v); };

	/* Villager ID, aka species. */
	GetID() { return SavData.getUint8(this.startPoint + this.data.ID); };
	SetID(v) { SavData.setUint8(this.startPoint + this.data.ID, v); };

	/* Villager Shirt. */
	GetShirt() { return SavData.getUint16(this.startPoint + this.data.SHIRT, true); };
	SetShirt(v) { SavData.setUint16(this.startPoint + this.data.SHIRT, v, true); };

	/* Villager Wallpaper. */
	GetWallpaper() { return SavData.getUint8(this.startPoint + this.data.WALLPAPER); };
	SetWallpaper(v) { SavData.setUint8(this.startPoint + this.data.WALLPAPER, v); };

	/* Villager Carpet. */
	GetCarpet() { return SavData.getUint8(this.startPoint + this.data.CARPET); };
	SetCarpet(v) { SavData.setUint8(this.startPoint + this.data.CARPET, v); };

	/* Villager Umbrella. */
	GetUmbrella() { return SavData.getUint8(this.startPoint + this.data.UMBRELLA); };
	SetUmbrella(v) { SavData.setUint8(this.startPoint + this.data.UMBRELLA, v); };
};