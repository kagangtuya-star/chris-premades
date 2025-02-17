import {effectUtils, genericUtils, itemUtils} from '../../../utils.js';
async function use({workflow}) {
    let effectData = {
        name: genericUtils.format('CHRISPREMADES.Auras.Source', {auraName: workflow.item.name}),
        img: workflow.item.img,
        origin: workflow.item.uuid,
        duration: itemUtils.convertDuration(workflow.item)
    };
    effectUtils.addMacro(effectData, 'aura', ['auraOfPurityAura']);
    await effectUtils.createEffect(workflow.actor, effectData, {concentrationItem: workflow.item, strictlyInterdependent: true, identifier: 'auraOfPurity', rules: 'modern'});
}
async function create({trigger: {entity: effect, target, identifier}}) {
    let targetEffect = effectUtils.getEffectByIdentifier(target.actor, identifier);
    if (targetEffect) return;
    let conditionResistances = ['blinded', 'charmed', 'deafened', 'frightened', 'paralyzed', 'poisoned', 'stunned'];
    let effectData = {
        name: effect.name.split(':')[0],
        img: effect.img,
        origin: effect.uuid,
        duration: {
            seconds: effect.duration.remaining
        },
        changes: [
            {
                key: 'system.traits.dr.value',
                mode: 2,
                value: 'poison',
                priority: 20
            },
            ...conditionResistances.map(condition => { 
                return {
                    key: 'flags.chris-premades.CR.' + condition,
                    mode: 5,
                    value: 1,
                    priority: 20
                };
            })
        ],
        flags: {
            'chris-premades': {
                aura: true,
                effect: {
                    noAnimation: true
                },
                rules: 'modern'
            }
        }
    };
    effectUtils.addMacro(effectData, 'combat', ['auraOfPurityAura']);
    return {
        effectData,
        effectOptions: {
            identifier
        }
    };
}
export let auraOfPurity = {
    name: 'Aura of Purity',
    version: '1.1.12',
    rules: 'modern',
    midi: {
        item: [
            {
                pass: 'rollFinished',
                macro: use,
                priority: 50
            }
        ]
    }
};
export let auraOfPurityAura = {
    name: 'Aura of Purity: Aura',
    version: auraOfPurity.version,
    rules: 'modern',
    aura: [
        {
            pass: 'create',
            macro: create,
            priority: 50,
            distance: 30,
            identifier: 'auraOfPurityAura',
            disposition: 'ally'
        }
    ]
};