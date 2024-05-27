async function attack(workflow) {
    if (!workflow.isFumble) return;
    workflow.isFumble = false;
    let roll = await new Roll('-100').evaluate();
    workflow.setAttackRoll(roll);
}
async function damage(workflow) {
    if (workflow.hitTargets.size) return;
    //apply damage function here
}
export let acidArrow = {
    name: 'Acid Arrow',
    version: '0.12.0',
    midi: {
        item: [
            {
                pass: 'postAttackRoll',
                macro: attack,
                priority: 50
            },
            {
                pass: 'postDamageRoll',
                macro: damage,
                priority: 50
            }
        ]
    }
};