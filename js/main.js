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

let player, pattern, villager;

import Hairstyles from './strings/en/hairstyles.js';
import Haircolors from './strings/en/haircolors.js';
import Personalities from './strings/en/personalities.js';

import { GetItemName } from './core/item.js';
import { sav, RawData, SavData } from './utils/savutils.js';
import { Player } from './core/player.js';
import { Pattern, DecodePattern, PatternImageData } from './core/pattern.js';
import { Villager } from './core/villager.js';
import { Sav } from './core/sav.js';

export function Test() {
	player = sav.GetPlayer(0);
	pattern = player.GetPattern(0);
	villager = sav.GetVillager(0);

	/* Log Player info as test. */
	console.log("PLAYER");
	console.log("Player Name: " + player.GetName());
	console.log("Player ID: " + player.GetPlayerID());
	console.log("Hairstyle: " + Hairstyles[player.GetHairstyle()]);
	console.log("Haircolor: " + Haircolors[player.GetHaircolor()]);
	console.log("Wallet Amount: " + player.GetWallet());
	console.log("Bank Amount: " + player.GetBank());
	console.log("Pocket Slot 1: " + GetItemName(player.GetPocketItem(0)));

	/* Log Villager info as test. */
	console.log("VILLAGER");
	console.log("Villager Exist: " + (villager.Exist() ? "Yes." : "No."));
	console.log("Villager ID: " + villager.GetID());
	console.log("Villager Name: " + villager.GetVillagerName());
	console.log("Villager Personality: " + Personalities[villager.GetPersonality()]);
	console.log("Villager Shirt: " + GetItemName(villager.GetShirt()));

	/* Log Pattern info as test. */
	console.log("PATTERN");
	console.log("Pattern Name: " + pattern.GetName());
	console.log("Origin Town Name: " + pattern.GetOriginTownName());
	console.log("Origin Town ID: " + pattern.GetOriginTownID());
	console.log("Creator Name: " + pattern.GetCreatorName());
	console.log("Creator ID: " + pattern.GetCreatorID());
	console.log("Creator Gender: " + (pattern.GetCreatorGender() ? "Female" : "Male"));
	console.log("Designtype: " + pattern.GetDesignType());
	console.log("Palette: " + (pattern.GetPalette() + 1)); // Palette '0' does not exist, hence 1 - 15 instead of 0 - 14.

	/* Pattern test display. */
	let patternData = DecodePattern(pattern);
	PatternImageData(patternData, pattern.GetPalette(), "TestCanvas");
}