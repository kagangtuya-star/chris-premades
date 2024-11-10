import {effectUtils, constants, genericUtils, actorUtils} from '../../utils.js';
let cleanUpList = [];
let validKeys = [
    'macro.CE',
    'macro.CUB',
    'macro.StatusEffect',
    'StatusEffect'
];
let effectData = {
    'name': 'Condition Advantage',
    'img': constants.tempConditionIcon,
    'duration': {
        'turns': 1
    },
    'changes': [
        {
            'key': 'flags.midi-qol.advantage.ability.save.all',
            'value': '1',
            'mode': 5,
            'priority': 120
        }
    ],
    'flags': {
        'chris-premades': {
            'effect': {
                'noAnimation': true
            }
        }
    }
};
async function preambleComplete(workflow) {
    if (!workflow.targets.size) return;
    if (workflow.item.system.save?.dc === null || workflow.item.system.save === undefined) return;
    let item = workflow.item;
    if (workflow.workflowOptions.isOverTime) {
        let effect = actorUtils.getEffects(workflow.targets.first().actor).find(i => i.name === workflow.item.name);
        if (effect?.origin) item = (await fromUuid(effect.origin)) ?? workflow.item;
    }
    let macros = item.flags['chris-premades']?.macros?.midi?.item ?? [];
    if (!item.effects.size && !macros.length) return;
    let itemConditions = new Set();
    item.effects.forEach(effect => {
        effect.changes.forEach(element => {
            if (validKeys.includes(element.key)) itemConditions.add(element.value.toLowerCase());
        });
        let effectConditions = effect.flags['chris-premades']?.conditions;
        if (effectConditions) effectConditions.forEach(c => itemConditions.add(c.toLowerCase()));
        itemConditions = itemConditions.union(effect.statuses ?? new Set());
    });
    let proneMacros = [
        'proneOnFail'
    ];
    if (macros.some(i => proneMacros.includes(i))) itemConditions.add('prone');
    if (!itemConditions.size) return;
    await Promise.all(workflow.targets.map(async token => {
        await Promise.all(itemConditions.map(async condition => {
            let flagData = token.document.actor?.flags?.['chris-premades']?.CR?.[condition];
            if (flagData) {
                let types = String(flagData).split(',').map(i => i.toLowerCase());
                if (types.includes('1') || types.includes('true') || types.includes(item.system.save.ability)) {
                    let effect = await effectUtils.createEffect(token.document.actor, effectData);
                    cleanUpList.push(effect.uuid);
                }
            }
        }));
    }));
}
async function RollComplete(workflow) {
    await Promise.all(cleanUpList.map(async i => {
        let effect = await fromUuid(i);
        if (effect) genericUtils.remove(effect);
    }));
    cleanUpList = [];
}
export let conditionResistance = {
    preambleComplete,
    RollComplete
};