import {tokenUtils} from '../../../../utils.js';
async function early({trigger: {entity: item}, workflow}) {
    if (workflow.targets.size !== 1) return;
    console.log('here 1');
    let nearbyTargets = tokenUtils.findNearby(workflow.targets.first(), 5, 'enemy').filter(i => i.document.uuid !== workflow.token.document.uuid);
    console.log('here 2');
    if (!nearbyTargets.length) return;
    console.log('here 3');
    workflow.tracker.advantage.add(item.name, item.name);
    console.log(workflow);
    debugger;
}
export let packTactics = {
    name: 'Pack Tactics',
    translation: 'CHRISPREMADES.Macros.PackTactics.Name',
    version: '0.12.83',
    midi: {
        actor: [
            {
                pass: 'preambleComplete',
                macro: early,
                priority: 50
            }
        ]
    },
    isGenericFeature: true,
    genericConfig: []
};