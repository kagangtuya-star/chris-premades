import {combatUtils, dialogUtils, genericUtils, rollUtils, workflowUtils} from '../../../utils.js';
async function attack({trigger: {entity: item}, workflow}) {
    if (workflow.hitTargets.size !== 1 || item.system.uses.value == 0 || !workflowUtils.isAttackType(workflow, 'weaponAttack')) return;
    let selection = await dialogUtils.confirm(item.name, genericUtils.format('CHRISPREMADES.Dialog.Use', {itemName: item.name}));
    if (!selection) return;
    await workflowUtils.completeItemUse(item, {}, {configureDialog: false});
    genericUtils.setProperty(workflow, 'chris-premades.savageAttacker', true);
}
async function damage({trigger: {entity: item}, workflow}) {
    if (!workflow?.['chris-premades']?.savageAttacker) return;
    let oldRoll = workflow.damageRoll;
    let newRoll = await rollUtils.damageRoll(oldRoll.formula, workflow.activity, oldRoll.options);
    if (oldRoll.total >= newRoll.total) return;
    await workflow.setDamageRolls(newRoll);
}
async function combatEnd({trigger: {entity: item}}) {
    await combatUtils.setTurnCheck(item, 'savageAttacker', true);
}
export let savageAttacker = {
    name: 'Savage Attacker',
    version: '1.5.10',
    rules: 'modern',
    midi: {
        actor: [
            {
                pass: 'attackRollComplete',
                macro: attack,
                priority: 200
            },
            {
                pass: 'damageRollComplete',
                macro: damage,
                priority: 25
            }
        ]
    },
    combat: [
        {
            pass: 'combatEnd',
            macro: combatEnd,
            priority: 50
        }
    ]
};