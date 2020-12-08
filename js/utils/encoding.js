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

/*
	ⓢ is actually s̊, but that's two characters.
	☔ would be better as 💧, but that's too big for a char16_t.
*/
const wwCharacterDictionary = [
	'\0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
	'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e',
	'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
	'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '⨍',
	'ⓢ', 'Œ', 'Ž', 'š', 'œ', 'ž', 'Ÿ', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È',
	'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Đ', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù',
	'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'β', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é',
	'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú',
	'û', 'ü', 'ý', 'þ', 'ÿ', ' ', '\n', '!', '"', '#', '$', '%', '&', '´', '(', ')',
	'*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']',
	'^', '_', '´', '{', '|', '}', '~', '€', '‚', '„', '…', '†', '‡', '＾', '‰', '⟨',
	'‘', '’', '“', '”', '•', '–', '—', '˜', '™', '⟩', ' ', '¡', '¢', '£', '¤', '¥',
	'╎', '§', '¨', '©', 'ª', '«', '¬', '-', '®', '‾', '°', '±', '²', '³', '⁄', 'µ',
	'¶', '•', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', '×', '÷', '☔', '★', '❤', '♪',
	'\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0',
	'\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0'
];

/*
	☔ would be better as 💧, but that's too big for a char16_t.
*/
const wwCharacterDictionaryJapanese = [
	'\0', 'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ',
	'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま',
	'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん', 'が',
	'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び',
	'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ',
	'っ', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ',
	'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', '二', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'へ', 'ホ', 'マ',
	'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ソ', 'ガ',
	'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ',
	'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ',
	'ッ', 'ヴ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
	'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
	'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	' ', '\n', 'ー', '~', '･', '。', '、', '!', '?', '.', ',', '｢', '｣', '(', ')', '<',
	'>', '\'', '\"', '_', '+', '=', '&', '@', ':', ';', '×', '÷', '☔', '★', '♥', '♪'
];

/*
	Convert a Wild World String to readable string. (EUR, USA, JPN)

	buffer: The Savebuffer.
	offset: Where to start.
	length: String length.
	isJPN: If is JPN or not.
*/
function WWToString(buffer, offset, length, isJPN) {
	var string = '';

	for (let i = 0; i < length; i++) {
		if ((isJPN ? wwCharacterDictionaryJapanese[buffer.getUint8(offset + i)] : wwCharacterDictionary[buffer.getUint8(offset + i)]) == '\0') break;

		string += (isJPN ? wwCharacterDictionaryJapanese[buffer.getUint8(offset + i)] : wwCharacterDictionary[buffer.getUint8(offset + i)]);
	}

	return string;
}

/*
	Converts a String to Wild World format. (EUR, USA, JPN)

	buffer: The Savebuffer.
	offset: Where to start.
	length: The string length.
	isJPN: If is JPN or not.
	string: The wanted string.
*/
function StringToWW(buffer, offset, length, isJPN, string) {
	let index = 0;

	while(index < length) {
		index++;

		let couldFind = false;
		for (let i = 0; i < 256; i++) {
			if (string.charAt(index - 1) == (isJPN ? wwCharacterDictionaryJapanese[i] : wwCharacterDictionary[i])) {
				buffer.setUint8(offset + (index - 1), i);
				couldFind = true;
				break;
			}
		}

		if (!couldFind) buffer.setUint8(offset + (index - 1), 0x0); // Place 0x0 aka \0.
	}
}

/*
	Read an UTF-16 string from the savbuffer. (KOR)

	buffer: The savebuffer.
	offset: From where to read.
	length: The length of the string.
*/
function ReadUTF16(buffer, offset, length) {
	str = "";

	for(let i = 0; i < length * 2; i += 2) {
		if (buffer.getUint16(offset + i, true) == 0) break; // If 0, we break here.

		str += String.fromCharCode(buffer.getUint16(offset + i, true));
	}

	return str;
}

/*
	Set an UTF16-String to the savebuffer. (KOR)

	buffer: The savebuffer.
	offset: Where to write to.
	length: The string length.
	str: The string.
*/
function SetUTF16(buffer, offset, length, str) {
	var end = false;

	for (let i = 0; i < length; i++) {
		/* end -> NULL Terminator and fill with Zero until the end. */
		if (end) {
			buffer.setUint16(offset + (i * 2), 0x0, true);
			continue;
		}

		/* \0 -> NULL Terminator, set end and fill with Zero. */
		if (str.charAt(i) == "\0") {
			end = true;
			buffer.setUint16(offset + (i * 2), 0x0, true);
			continue;
		}

		/* If there is no NULL Terminator, set from string. */
		buffer.setUint16(offset + (i * 2), str.charCodeAt(i), true);
	}
}

/*
	Main String Read function.

	buffer: The savebuffer.
	offset: Where to read from.
	length: The string length.
	isJPN: If it's Japanese or not.
	isKOR: If it's Korean or not.
*/
export function ReadString(buffer, offset, length, isJPN, isKOR) {
	if (isKOR) return ReadUTF16(buffer, offset, length);

	return WWToString(buffer, offset, length, isJPN);
}

/*
	Main String Write function.

	buffer: The savebuffer.
	offset: Where to write to.
	length: The string length.
	isJPN: If it's Japanese or not.
	isKOR: If it's Korean or not.
	str: The string.
*/
export function SetString(buffer, offset, length, isJPN, isKOR, str) {
	if (isKOR) SetUTF16(buffer, offset, length, str);
	else StringToWW(buffer, offset, length, isJPN, str);
}