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

/*
	Calculates the checksum.

	buffer: The savebuffer.
	startoffs: The Startoffset.
	checkoffs: The checksum offset / 2, cause uint16_t.
	length: The length to calculate / 2, cause uint16_t.
*/
export function CalculateChecksum(buffer, startoffs, checkoffs, length) {
	if (!buffer) return 0;

	let checksVar = 0;

	for(let index = 0; index < length; index++) {
		if (index == checkoffs) continue;

		checksVar = (checksVar + buffer.getUint16(startoffs + (index * 2), true)) % 0x10000;
	}

	return 0x10000 - checksVar;
};

/*
	Returns true, if the checksum is valid, else false.

	buffer: The savebuffer.
	startoffs: The Startoffset.
	checkoffs: The checksum offset / 2, cause uint16_t.
	length: The length to calculate / 2, cause uint16_t.
	currentChecksum: The current checksum value.
*/
export function ChecksumValid(buffer, startoffs, checkoffs, length, currentChecksum) {
	if (!buffer) return false;

	return (Boolean)(CalculateChecksum(buffer, startoffs, checkoffs, length) == currentChecksum);
};

/*
	Fix the main checksums, if invalid.

	buffer: The savebuffer.
	startoffs: The Startoffset.
	checkoffs: The checksum offset.
	length: The length to calculate / 2, cause uint16_t.
*/
export function fixMainChecksum(buffer, startoffs, checkoffs, length) {
	if (!buffer) return;

	if (!ChecksumValid(buffer, startoffs, (checkoffs / 2), length, buffer.getUint16(checkoffs, true))) {
		buffer.setUint16(checkoffs, CalculateChecksum(buffer, startoffs, (checkoffs / 2), length), true);
	}
};