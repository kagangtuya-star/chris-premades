import {dialogUtils, genericUtils, itemUtils, rollUtils} from '../../utils.js';
async function attack({trigger: {entity: item}, workflow}) {
    if (!workflow.item) return;
    if (workflow.activity.actionType != 'rwak' || !workflow.activity.damage?.parts.length) return;
    let selection = await dialogUtils.confirm(item.name, genericUtils.format('CHRISPREMADES.Dialog.Use', {itemName: item.name}));
    if (!selection) return;
    await item.displayCard();
    let bonusFormula = itemUtils.getConfig(item, 'bonus');
    let bonus = workflow.activity.attack.bonus === '' ? bonusFormula : workflow.item.system.attack.bonus + ' + ' + bonusFormula;
    let formula = itemUtils.getConfig(item, 'formula');
    let newActivity = genericUtils.deepClone(workflow.activity);
    newActivity.attack.bonus = bonus;
    newActivity.damage.parts[0].custom = {
        enabled: true,
        formula: newActivity.damage.parts[0].formula + ' + ' + formula
    };
    workflow.activity = newActivity;
}
export let sharpshooter = {
    name: 'Sharpshooter',
    version: '1.1.0',
    midi: {
        actor: [
            {
                pass: 'preambleComplete',
                macro: attack,
                priority: 150
            }
        ]
    },
    config: [
        {
            value: 'formula',
            label: 'CHRISPREMADES.Config.Formula',
            type: 'text',
            default: '10',
            homebrew: true,
            category: 'homebrew'
        },
        {
            value: 'bonus',
            label: 'CHRISPREMADES.Config.AttackBonus',
            type: 'text',
            default: '-5',
            homebrew: true,
            category: 'homebrew'
        }
    ]
};