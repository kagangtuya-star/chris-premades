import {summons} from '../../utility/summons.js';
import {chris} from '../../helperFunctions.js';
export async function conjureWoodlandBeings({speaker, actor, token, character, item, args, scope, workflow}) {
    let spellLevel = workflow.castData?.castLevel;
    if (!spellLevel) return;
    let totalSummons = Math.floor(1 * ((spellLevel - 2) / 2));
    if (!totalSummons || totalSummons < 1) return;
    let selection = await chris.dialog('How many fey creatures?', [
        [totalSummons + ' fey creatures of CR 2 or lower', 2], 
        [(totalSummons * 2) + ' fey creatures of CR 1 or lower', 1], 
        [(totalSummons * 4) + ' fey creatures of CR 1/2 or lower', 0.5], 
        [(totalSummons * 8) + ' fey creatures of CR 1/4 or lower', 0.25]
    ]);
    if (!selection) return;
    let folder = chris.getConfiguration(workflow.item, 'folder') ?? 'Chris Premades';
    let actors = game.actors.filter(i => i.folder?.name === folder).filter(i => i.system?.details?.type?.value.toLowerCase() === 'fey').filter(i => i.system?.details?.cr <= selection);
    if (!actors) {
        ui.notifications.warn('No matching actors found in specified folder!');
        return;
    }
    let userId = game.settings.get('chris-premades', 'LastGM');
    if (game.settings.get('chris-premades', 'Player Choses Conjures')) userId = game.userId;
    if (!userId) return;
    let sourceActors = await chris.remoteDocumentsDialog(userId, 'Select Summons (Max ' + (totalSummons * 2 / selection) + ')', actors);
    if (!sourceActors) return;
    if (sourceActors.length > (totalSummons * 2 / selection)) {
        ui.notifications.info('Too many selected, try again!');
        return;
    }
    let updates = {
        'token': {
            'disposition': 1 
        }
    };
    await summons.spawn(sourceActors, updates, 3600, workflow.item);
}