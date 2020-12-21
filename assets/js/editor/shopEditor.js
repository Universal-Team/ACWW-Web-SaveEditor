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

let activeShop;

import { Pattern } from '../core/pattern.js'; // Pattern class.
import { sav } from '../utils/savutils.js'; // For the Sav class.
import { InitializePatternEditor, LoadPattern } from './patternEditor.js'; // Pattern Editor, for town flag.
import { Shop } from '../core/shop.js'; // Shop class.

/* Able Sister Pattern Handling. */
document.getElementById("AbleSisterPattern").onclick = () => CheckPatternClick();
function CheckPatternClick() {
	if (activeShop) {
		let clicked = false;
		const patterns = document.getElementById('AbleSisterPattern').children;

		for (let i = 0; i < 8; i++) {
			patterns[i].onclick = function() {
				InitializePatternEditor(3);
				LoadPattern(activeShop.AbleSisterPattern(i));
				clicked = true;
			};

			if (clicked) break;
		}
	}
};

/*
	Prepare the Shop editor.
*/
export function PrepareShopEditor() {
	LoadShop();
};

/*
	Load the shops.
*/
function LoadShop() {
	activeShop = sav.GetShop();
	document.getElementById("AbleSisterPattern").clear();

	for (let i = 0; i < 8; i++) {
		document.getElementById("AbleSisterPattern").appendChild(activeShop.AbleSisterPattern(i).image);
	}
};