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
import { Item } from './item.js';

const LETTER_EUR_USA = {
	LETTER_SIZE: 0xF4,
	TOWNNAME_LENGTH: 8,
	PLAYERNAME_LENGTH: 8,

	TOWNID_RECEIVER: 0x4, // uint16_t.
	TOWNNAME_RECEIVER: 0x6,
	PLAYERID_RECEIVER: 0xE, // uint16_t.
	PLAYERNAME_RECEIVER: 0x10,

	TOWNID_SENDER: 0x1C, // uint16_t.
	TOWNNAME_SENDER: 0x1E,
	PLAYERID_SENDER: 0x26, // uint16_t.
	PLAYERNAME_SENDER: 0x28,

	INTRO_PART: 0x34,
	INTRO_LENGTH: 24,
	BODY_PART: 0x4C,
	BODY_LENGTH: 129,
	END_PART: 0xCC,
	END_LENGTH: 32,

	INTRO_INDEX: 0xEC, // uint8_t.
	PAPER_ID: 0xED, // uint8_t.
	FLAGS: 0xEE, // uint8_t.
	ATTACHMENT_ITEM: 0xF0 // uint16_t.
};

const LETTER_JPN = {
	LETTER_SIZE: 0x8C,
	TOWNNAME_LENGTH: 6,
	PLAYERNAME_LENGTH: 6,

	TOWNID_RECEIVER: 0x4, // uint16_t.
	TOWNNAME_RECEIVER: 0x6,
	PLAYERID_RECEIVER: 0xC, // uint16_t.
	PLAYERNAME_RECEIVER: 0xE,

	TOWNID_SENDER: 0x18, // uint16_t.
	TOWNNAME_SENDER: 0x1A,
	PLAYERID_SENDER: 0x20, // uint16_t.
	PLAYERNAME_SENDER: 0x22,

	INTRO_PART: 0x2C,
	INTRO_LENGTH: 10,
	BODY_PART: 0x36,
	BODY_LENGTH: 64,
	END_PART: 0x76,
	END_LENGTH: 16,

	INTRO_INDEX: 0x86, // uint8_t.
	PAPER_ID: 0x87, // uint8_t.
	FLAGS: 0x88, // uint8_t.
	ATTACHMENT_ITEM: 0x8A // uint16_t.
};

const LETTER_KOR = {
	LETTER_SIZE: 0x100,
	TOWNNAME_LENGTH: 6,
	PLAYERNAME_LENGTH: 6,

	TOWNID_RECEIVER: 0x4, // uint16_t.
	TOWNNAME_RECEIVER: 0x6,
	PLAYERID_RECEIVER: 0x12, // uint16_t.
	PLAYERNAME_RECEIVER: 0x14,

	TOWNID_SENDER: 0x24, // uint16_t.
	TOWNNAME_SENDER: 0x26,
	PLAYERID_SENDER: 0x32, // uint16_t.
	PLAYERNAME_SENDER: 0x34,

	INTRO_PART: 0x44,
	INTRO_LENGTH: 10,
	BODY_PART: 0x58,
	BODY_LENGTH: 64,
	END_PART: 0xD8,
	END_LENGTH: 16,

	INTRO_INDEX: 0xF8, // uint8_t.
	PAPER_ID: 0xF9, // uint8_t.
	FLAGS: 0xFA, // uint8_t.
	ATTACHMENT_ITEM: 0xFC // uint16_t.
};

export class Letter {
	constructor(startoffs, region) {
		this.startPoint = startoffs;
		this.region = region;

		switch(this.region) {
			case 0:
			case 1:
				this.data = LETTER_EUR_USA;
				break;

			case 2:
				this.data = LETTER_JPN;
				break;

			case 3:
				this.data = LETTER_KOR;
				break;

			default:
				this.data = null;
		}
	};


	/* Receiver Town ID. */
	GetReceiverTownID() { return SavData.getUint16(this.startPoint + this.data.TOWNID_RECEIVER, true); };
	SetReceiverTownID(v) { SavData.setUint16(this.startPoint + this.data.TOWNID_RECEIVER, Math.min(65535, v), true); };

	/* Receiver Town Name. */
	GetReceiverTownName() { return ReadString(SavData, this.startPoint + this.data.TOWNNAME_RECEIVER, this.data.TOWNNAME_LENGTH, (this.region == 2), (this.region == 3)); };
	SetReceiverTownName(v) { SetString(SavData, this.startPoint + this.data.TOWNNAME_RECEIVER, this.data.TOWNNAME_LENGTH, (this.region == 2), (this.region == 3), v); };

	/* Receiver Player ID. */
	GetReceiverPlayerID() { return SavData.getUint16(this.startPoint + this.data.PLAYERID_RECEIVER, true); };
	SetReceiverPlayerID(v) { SavData.setUint16(this.startPoint + this.data.PLAYERID_RECEIVER, Math.min(65535, v), true); };

	/* Receiver Player Name. */
	GetReceiverPlayerName() { return ReadString(SavData, this.startPoint + this.data.PLAYERNAME_RECEIVER, this.data.PLAYERNAME_LENGTH, (this.region == 2), (this.region == 3)); };
	SetReceiverPlayerName(v) { SetString(SavData, this.startPoint + this.data.PLAYERNAME_RECEIVER, this.data.PLAYERNAME_LENGTH, (this.region == 2), (this.region == 3), v); };


	/* Sender Town ID. */
	GetSenderTownID() { return SavData.getUint16(this.startPoint + this.data.TOWNID_SENDER, true); };
	SetSenderTownID(v) { SavData.setUint16(this.startPoint + this.data.TOWNID_SENDER, Math.min(65535, v), true); };

	/* Sender Town Name. */
	GetSenderTownName() { return ReadString(SavData, this.startPoint + this.data.TOWNNAME_SENDER, this.data.TOWNNAME_LENGTH, (this.region == 2), (this.region == 3)); };
	SetSenderTownName(v) { SetString(SavData, this.startPoint + this.data.TOWNNAME_SENDER, this.data.TOWNNAME_LENGTH, (this.region == 2), (this.region == 3), v); };

	/* Sender Player ID. */
	GetSenderPlayerID() { return SavData.getUint16(this.startPoint + this.data.PLAYERID_SENDER, true); };
	SetSenderPlayerID(v) { SavData.setUint16(this.startPoint + this.data.PLAYERID_SENDER, Math.min(65535, v), true); };

	/* Sender Player Name. */
	GetSenderPlayerName() { return ReadString(SavData, this.startPoint + this.data.PLAYERNAME_SENDER, this.data.PLAYERNAME_LENGTH, (this.region == 2), (this.region == 3)); };
	SetSenderPlayerName(v) { SetString(SavData, this.startPoint + this.data.PLAYERNAME_SENDER, this.data.PLAYERNAME_LENGTH, (this.region == 2), (this.region == 3), v); };


	/* Letter Intro part. */
	GetIntroPart() { return ReadString(SavData, this.startPoint + this.data.INTRO_PART, this.data.INTRO_LENGTH, (this.region == 2), (this.region == 3)); };
	SetIntroPart(v) { SetString(SavData, this.startPoint + this.data.INTRO_PART, this.data.INTRO_LENGTH, (this.region == 2), (this.region == 3), v); };

	/* Letter Body part. */
	GetBodyPart() { return ReadString(SavData, this.startPoint + this.data.BODY_PART, this.data.BODY_LENGTH, (this.region == 2), (this.region == 3)); };
	SetBodyPart(v) { SetString(SavData, this.startPoint + this.data.BODY_PART, this.data.BODY_LENGTH, (this.region == 2), (this.region == 3), v); };

	/* Letter End part. */
	GetEndPart() { return ReadString(SavData, this.startPoint + this.data.END_PART, this.data.END_LENGTH, (this.region == 2), (this.region == 3)); };
	SetEndPart(v) { SetString(SavData, this.startPoint + this.data.END_PART, this.data.END_LENGTH, (this.region == 2), (this.region == 3), v); };


	/* Intro name index. */
	GetIntroIndex() { return SavData.getUint8(this.startPoint + this.data.INTRO_INDEX); };
	SetIntroIndex(v) { SavData.setUint8(this.startPoint + this.data.INTRO_INDEX, v); }; // TODO: Max pos?

	/* Paper ID. */
	GetPaperID() { return SavData.getUint8(this.startPoint + this.data.PAPER_ID); };
	SePaperID(v) { SavData.setUint8(this.startPoint + this.data.PAPER_ID, Math.min(0x3F, v)); };

	/* Letter Flags. */
	GetFlags() { return SavData.getUint8(this.startPoint + this.data.FLAGS); };
	SetFlags(v) { SavData.setUint8(this.startPoint + this.data.FLAGS, v); };

	/* Letter exist? */
	Exist() { return (Boolean)(this.GetFlags() != 0); };

	/* Attachment Item. */
	GetItem() { return new Item(SavData.getUint16(this.startPoint + this.data.ATTACHMENT_ITEM, true)); };
	SetItem(v) { SavData.setUint16(this.startPoint + this.data.ATTACHMENT_ITEM, v, true); };
};