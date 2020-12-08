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

export let RawData, SavData; // uint8 array + DataView.
let fileName; // Savefile name.
export let sav; // The Sav class.
let saveSize; // Size of the Sav.

/*
	That is used, to use use the Gamecode + Savcopy offsets for getting the Save region.
*/
const InitStruct = {
	Gamecodes: [ 0xC5, 0x8A, 0x32, 0x32 ], // The gamecode from offset 0x0 & SavCopyOffset.
	SavCopyOffsets: [ 0x15FE0, 0x15FE0, 0x12224, 0x173FC ], // The Savcopy offsets.
	ValidSizes: [ 0x40000, 0x4007A, 0x80000, 0x8007A ] // Valid Savesizes.
};

import { InitializeMainEditor } from '../main.js';
import { LoadPlayer } from '../editor/playerEditor.js';
import { Sav } from '../core/sav.js';

document.getElementById("savSelector").onchange = (e) => loadSav(e.target.files[0]); // Used to handle things after SavSelection.

/*
	Loads a Savefile.

	savefile: The savefile to read from.
*/
export function loadSav(savefile) {
	let good = false;

	if (!savefile) {
		alert("No savefile selected!");
		return false;
	}

	fileName = savefile.name;
	saveSize = savefile.size;

	for (let i = 0; i < 4; i++) {
		if (saveSize == InitStruct.ValidSizes[i]) {
			good = true;
			break;
		}
	}

	if (good) {
		let reader = new FileReader();

		reader.readAsArrayBuffer(savefile);
		reader.onload = function() { LoadData(this.result); }; // Load data.

	} else {
		alert("The Savesize does not match for a valid Animal Crossing: Wild World Save!");
		return false;
	}
}

/*
	Detect the Savefile.

	SaveData: The buffer to detect from.
*/
export function DetectSavefile(SaveData) {
	sav = null; // Reset to null first.

	for (let i = 0; i < 4; i++) {
		if (SaveData.getUint8(0x0) == InitStruct.Gamecodes[i] && SaveData.getUint8(InitStruct.SavCopyOffsets[i]) == InitStruct.Gamecodes[i]) {
			sav = new Sav(i);
			break;
		}
	}
}

/*
	Reloads the RawData and SavData.

	buffer: The buffer to load from.
*/
export function LoadData(buffer) {
	RawData = new Uint8Array(buffer);
	SavData = new DataView(RawData.buffer);
	DetectSavefile(SavData); // Detect the savefile.

	if (sav != null) {
		sav.PrintRegion();
		InitializeMainEditor();
	}
}

/*
	Lets you download the Savefile.
*/
export function SaveSav() {
	if (sav == null) return;

	/* Fix checksum and copy to second Savcopy. */
	sav.Finish();

	/* Download the file. */
	let blob = new Blob([RawData], { type: "application/octet-stream" });
	let a = document.createElement('a');
	let url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName; // Set download name.
	a.click();
}

/*
	Copy the data from a buffer to another or so.

	src: The source buffer.
	srcOffset: The startoffset of the source buffer.
	dst: The destination buffer.
	dstOffset: The startoffset of the destination buffer.
	length: The length to copy.
*/
export function memcpy(src, srcOffset, dst, dstOffset, length) {
	for (let index = 0; index < length; index++) {
		dst[dstOffset + index] = src[srcOffset + index];
	}
}