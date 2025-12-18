/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../nls.js';
import { MenuId, MenuRegistry } from '../../../platform/actions/common/actions.js';
import { CommandsRegistry } from '../../../platform/commands/common/commands.js';
import { INotificationService } from '../../../platform/notification/common/notification.js';

const toolsCategory = localize('tools.category', "Tools");

const toolPlaceholders = [
	{
		id: 'workbench.action.tools.placeholderOne',
		title: localize('tools.placeholderOne', "Tools: Placeholder 1"),
		menuTitle: localize({ key: 'miToolPlaceholderOne', comment: ['&& denotes a mnemonic'] }, "Placeholder &&1"),
		message: localize('tools.placeholderOne.message', "Tool menu placeholder 1. Replace with a real command."),
		order: 1
	},
	{
		id: 'workbench.action.tools.placeholderTwo',
		title: localize('tools.placeholderTwo', "Tools: Placeholder 2"),
		menuTitle: localize({ key: 'miToolPlaceholderTwo', comment: ['&& denotes a mnemonic'] }, "Placeholder &&2"),
		message: localize('tools.placeholderTwo.message', "Tool menu placeholder 2. Replace with a real command."),
		order: 2
	},
	{
		id: 'workbench.action.tools.placeholderThree',
		title: localize('tools.placeholderThree', "Tools: Placeholder 3"),
		menuTitle: localize({ key: 'miToolPlaceholderThree', comment: ['&& denotes a mnemonic'] }, "Placeholder &&3"),
		message: localize('tools.placeholderThree.message', "Tool menu placeholder 3. Replace with a real command."),
		order: 3
	}
] as const;

MenuRegistry.appendMenuItem(MenuId.MenubarMainMenu, {
	submenu: MenuId.MenubarToolsMenu,
	title: {
		value: 'Tools',
		original: 'Tools',
		mnemonicTitle: localize({ key: 'mTools', comment: ['&& denotes a mnemonic'] }, "&&Tools")
	},
	order: 7.5
});

for (const placeholder of toolPlaceholders) {
	CommandsRegistry.registerCommand(placeholder.id, accessor => {
		const notificationService = accessor.get(INotificationService);
		notificationService.info(placeholder.message);
	});

	MenuRegistry.appendMenuItem(MenuId.CommandPalette, {
		command: {
			id: placeholder.id,
			title: placeholder.title,
			category: toolsCategory
		}
	});

	MenuRegistry.appendMenuItem(MenuId.MenubarToolsMenu, {
		group: '1_tools',
		command: {
			id: placeholder.id,
			title: placeholder.menuTitle
		},
		order: placeholder.order
	});
}
