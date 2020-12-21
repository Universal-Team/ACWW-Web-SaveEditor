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
import { Pattern } from './pattern.js';

const SHOP_EUR_USA = {
	AbleSister: 0xFAFC,
	PTSize: 0x228
};

const SHOP_JPN = {
	AbleSister: 0xDAF8,
	PTSize: 0x220
};

const SHOP_KOR = {
	AbleSister: 0x10AD0,
	PTSize: 0x234
};

export class Shop {
	constructor(reg) {
		this.region = reg;

		switch(this.region) {
			case 0:
			case 1:
				this.data = SHOP_EUR_USA;
				break;

			case 2:
				this.data = SHOP_JPN;
				break;

			case 3:
				this.data = SHOP_KOR;
				break;

			default:
				this.data = null;
		}
	};

	AbleSisterPattern(slot) { return new Pattern(this.data.AbleSister + (Math.min(7, slot) * this.data.PTSize), this.region); };
};
